'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Button } from '@/components/Button'
import { Border } from '@/components/Border'
import { PageIntro } from '@/components/PageIntro'
import { ContactSection } from '@/components/ContactSection'
import { api } from '@/lib/api-client'
import clsx from 'clsx'
import { format } from 'date-fns'
import { BookingWithDetails, ServiceAddon } from '@/shared/sdk/chronos'

export default function BookingManagementPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingManagementContent />
    </Suspense>
  )
}

function BookingManagementContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [bookingWithDetails, setBookingWithDetails] =
    useState<BookingWithDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showReschedule, setShowReschedule] = useState(false)
  const [availableDates, setAvailableDates] = useState<Date[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Parse addons from service if they exist
  const [serviceAddons, setServiceAddons] = useState<ServiceAddon[]>([])

  const calculateTotal = () => {
    if (!bookingWithDetails) return 0

    let total = bookingWithDetails.service.priceCents

    if (
      bookingWithDetails.service.addons &&
      bookingWithDetails.service.addons.length > 0
    ) {
      const addons: ServiceAddon[] = JSON.parse(
        bookingWithDetails.service.addons,
      )
      total += addons
        .filter(
          (addon) =>
            bookingWithDetails.service.addons!.includes(addon.id) &&
            !addon.requiresQuote,
        )
        //@ts-ignore
        .reduce((sum, addon) => sum + addon['price_cents'], 0)
    }

    return total
  }

  useEffect(() => {
    if (!token) {
      setError('No management token provided')
      setIsLoading(false)
      return
    }
    fetchBooking()
    generateAvailableDates()
  }, [token])

  useEffect(() => {
    if (bookingWithDetails?.service?.addons) {
      try {
        const addons = JSON.parse(bookingWithDetails.service.addons)
        console.log('Parsed Addons:', addons)
        setServiceAddons(addons)
      } catch (e) {
        console.error('Failed to parse addons:', e)
        setServiceAddons([])
      }
    }
  }, [bookingWithDetails])

  const fetchBooking = async () => {
    try {
      const data = await api.bookings.getBookingByToken(token!)
      setBookingWithDetails(data)
    } catch (err) {
      setError('Invalid or expired booking link')
    } finally {
      setIsLoading(false)
    }
  }

  const generateAvailableDates = () => {
    const dates: Date[] = []
    const today = new Date()
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      if (date.getDay() !== 0) {
        // Skip Sundays
        dates.push(date)
      }
    }
    setAvailableDates(dates)
  }

  const checkAvailability = async (date: Date) => {
    if (!bookingWithDetails) return

    try {
      const formattedDate = format(date, 'yyyy-MM-dd')
      const result = await api.bookings.checkBookingAvailability({
        staffId: bookingWithDetails.staffId,
        date: formattedDate,
        serviceId: bookingWithDetails.service.id,
      })
      setAvailableTimes(result.availableSlots || [])
    } catch (error) {
      console.error('Failed to check availability:', error)
    }
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    checkAvailability(date)
  }

  const handleReschedule = async () => {
    if (!bookingWithDetails || !selectedDate || !selectedTime) return

    setIsProcessing(true)
    try {
      // Use magic link endpoint for guest rescheduling
      await api.bookings.rescheduleBookingMagic(bookingWithDetails.id, {
        token: token!,
        bookingDate: format(selectedDate, 'yyyy-MM-dd'),
        bookingTime: selectedTime,
      })
      setSuccessMessage('Booking rescheduled successfully!')
      setShowReschedule(false)
      setSelectedDate(null)
      setSelectedTime(null)
      fetchBooking() // Refresh booking details
    } catch (error) {
      console.error('Failed to reschedule:', error)
      setError('Failed to reschedule. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCancel = async () => {
    if (
      !bookingWithDetails ||
      !confirm('Are you sure you want to cancel this booking?')
    )
      return

    setIsProcessing(true)
    try {
      // Use magic link endpoint for guest cancellation
      await api.bookings.cancelBookingMagic(bookingWithDetails.id, token!)
      setSuccessMessage('Booking cancelled successfully.')
      fetchBooking() // Refresh to show cancelled status
    } catch (error) {
      console.error('Failed to cancel booking:', error)
      setError('Failed to cancel. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const formatPrice = (cents: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(cents / 100)
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
    }
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'
  }

  if (isLoading) {
    return (
      <>
        <PageIntro eyebrow="Booking Management" title="Loading your booking...">
          <p>Please wait while we retrieve your booking details.</p>
        </PageIntro>
        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <div className="flex justify-center">
            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-meet-secondary"></div>
          </div>
        </Container>
      </>
    )
  }

  if (error || !bookingWithDetails) {
    return (
      <>
        <PageIntro eyebrow="Error" title="Invalid or Expired Link">
          <p>
            {error || 'The booking management link is invalid or has expired.'}
          </p>
        </PageIntro>
        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <div className="text-center">
            <p className="text-meet-secondary">
              Please check your email for a valid link or contact us for
              assistance.
            </p>
            <Button href="/book" className="mt-8 bg-meet-secondary">
              Book New Session
            </Button>
          </div>
        </Container>
        <ContactSection />
      </>
    )
  }

  return (
    <>
      <PageIntro
        eyebrow="Booking Management"
        title={`Booking #${bookingWithDetails.id}`}
      >
        <p>Manage your photography session details below.</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 rounded-lg bg-green-50 p-4 text-center text-green-800">
              {successMessage}
            </div>
          )}

          {/* Status Banner */}
          <div
            className={clsx(
              'mb-8 rounded-lg p-4',
              bookingWithDetails.booking.status === 'cancelled'
                ? 'bg-red-50'
                : bookingWithDetails.booking.status === 'completed'
                  ? 'bg-blue-50'
                  : 'bg-green-50',
            )}
          >
            <p className="text-center font-medium">
              {bookingWithDetails.booking.status === 'cancelled'
                ? 'This booking has been cancelled.'
                : bookingWithDetails.booking.status === 'completed'
                  ? 'This session has been completed. Thank you!'
                  : bookingWithDetails.booking.status === 'confirmed'
                    ? 'Your booking is confirmed.'
                    : 'Your booking is pending confirmation.'}
            </p>
          </div>

          {/* Booking Details */}
          <Border className="mb-8 p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 font-display text-xl font-semibold text-meet-primary">
                  Session Details
                </h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-meet-secondary/70">Service:</dt>
                    <dd className="font-medium text-meet-primary">
                      {bookingWithDetails.service.name}
                    </dd>
                  </div>
                  {/* <div className="flex justify-between">
                    <dt className="text-meet-secondary/70">Photographer:</dt>
                    <dd className="font-medium text-meet-primary">
                      {bookingWithDetails.staff?.name || 'To be assigned'}
                    </dd>
                  </div> */}
                  <div className="flex justify-between">
                    <dt className="text-meet-secondary/70">Date:</dt>
                    <dd className="font-medium text-meet-primary">
                      {format(
                        new Date(bookingWithDetails.booking.bookingDate),
                        'EEEE, MMMM d, yyyy',
                      )}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-meet-secondary/70">Time:</dt>
                    <dd className="font-medium text-meet-primary">
                      {bookingWithDetails.booking.bookingTime.substring(0, 5)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-meet-secondary/70">Duration:</dt>
                    <dd className="font-medium text-meet-primary">
                      {bookingWithDetails.service.durationMinutes} minutes
                    </dd>
                  </div>

                  {/* Addons Section */}
                  {serviceAddons.length > 0 && (
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <dt className="mb-2 text-meet-secondary/70">
                        Selected Add-ons:
                      </dt>
                      <dd>
                        <ul className="space-y-1">
                          {serviceAddons.map((addon) => (
                            <li
                              key={addon.id}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-meet-primary">
                                • {addon.name}
                              </span>
                              <span className="text-meet-secondary">
                                {addon.requiresQuote
                                  ? 'Quote'
                                  : formatPrice(
                                      //@ts-ignore
                                      addon['price_cents'],
                                      addon.currency,
                                    )}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  )}

                  <div className="flex justify-between border-t pt-3">
                    <dt className="font-semibold text-meet-primary">Total:</dt>
                    <dd className="text-lg font-bold text-meet-secondary">
                      {formatPrice(
                        calculateTotal(),
                        bookingWithDetails.service.currency,
                      )}
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="mb-4 font-display text-xl font-semibold text-meet-primary">
                  Client Information
                </h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-meet-secondary/70">Name:</dt>
                    <dd className="font-medium text-meet-primary">
                      {bookingWithDetails.userName}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-meet-secondary/70">Email:</dt>
                    <dd className="font-medium text-meet-primary">
                      {bookingWithDetails.userEmail}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-meet-secondary/70">Phone:</dt>
                    <dd className="font-medium text-meet-primary">
                      {bookingWithDetails.booking.guestPhone || 'Not provided'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Border>

          {/* Actions */}
          {bookingWithDetails.booking.status !== 'cancelled' &&
            bookingWithDetails.booking.status !== 'completed' && (
              <div className="space-y-6">
                {/* Reschedule Section */}
                <div>
                  <Button
                    onClick={() => setShowReschedule(!showReschedule)}
                    disabled={isProcessing}
                    className="mb-4 bg-meet-secondary"
                  >
                    {showReschedule
                      ? 'Hide Reschedule'
                      : 'Reschedule Appointment'}
                  </Button>

                  {showReschedule && (
                    <Border className="p-6">
                      <h4 className="mb-4 font-semibold text-meet-primary">
                        Select New Date & Time
                      </h4>

                      {/* Date Selection */}
                      <div className="mb-6">
                        <p className="mb-2 text-sm text-meet-secondary/70">
                          Select a date:
                        </p>
                        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                          {availableDates.map((date) => (
                            <button
                              key={date.toISOString()}
                              onClick={() => handleDateSelect(date)}
                              disabled={isProcessing}
                              className={clsx(
                                'rounded-lg border p-2 text-center transition-all',
                                selectedDate?.toDateString() ===
                                  date.toDateString()
                                  ? 'border-meet-secondary bg-meet-secondary text-white'
                                  : 'border-gray-200 hover:border-meet-secondary',
                              )}
                            >
                              <div className="text-xs">
                                {format(date, 'MMM')}
                              </div>
                              <div className="text-base font-bold">
                                {format(date, 'd')}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time Selection */}
                      {selectedDate && availableTimes.length > 0 && (
                        <div className="mb-6">
                          <p className="mb-2 text-sm text-meet-secondary/70">
                            Select a time:
                          </p>
                          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                            {availableTimes.map((time) => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                disabled={isProcessing}
                                className={clsx(
                                  'rounded-lg border p-2 text-center transition-all',
                                  selectedTime === time
                                    ? 'border-meet-secondary bg-meet-secondary text-white'
                                    : 'border-gray-200 hover:border-meet-secondary',
                                )}
                              >
                                {time.substring(0, 5)}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedDate && availableTimes.length === 0 && (
                        <p className="mb-6 text-center text-meet-secondary/60">
                          No available times for this date.
                        </p>
                      )}

                      <div className="flex gap-4">
                        <Button
                          onClick={handleReschedule}
                          disabled={
                            !selectedDate || !selectedTime || isProcessing
                          }
                          className="flex-1 bg-meet-secondary"
                        >
                          {isProcessing
                            ? 'Processing...'
                            : 'Confirm Reschedule'}
                        </Button>
                        <Button
                          onClick={() => setShowReschedule(false)}
                          disabled={isProcessing}
                          className="flex-1 bg-gray-200 text-meet-primary hover:bg-gray-300"
                        >
                          Cancel
                        </Button>
                      </div>
                    </Border>
                  )}
                </div>

                {/* Cancel Button */}
                <div className="flex justify-end">
                  <Button
                    onClick={handleCancel}
                    disabled={isProcessing}
                    className="bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
                  >
                    {isProcessing ? 'Processing...' : 'Cancel Booking'}
                  </Button>
                </div>
              </div>
            )}

          {/* Back to Home */}
          <div className="mt-12 text-center">
            <Button
              href="/"
              className="bg-gray-200 text-meet-primary hover:bg-gray-300"
            >
              Return to Home
            </Button>
          </div>
        </FadeIn>
      </Container>

      <ContactSection />
    </>
  )
}
