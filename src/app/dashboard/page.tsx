'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Button } from '@/components/Button'
import { Border } from '@/components/Border'
import { PageIntro } from '@/components/PageIntro'
import { ContactSection } from '@/components/ContactSection'
import { api } from '@/lib/api-client'
import clsx from 'clsx'
import { format } from 'date-fns'
import {
  BookingResponse,
  BookingWithDetails,
  ServiceAddon,
} from '@/shared/sdk/chronos'
import { SearchIcon } from '@/components/Icons'
import { useAuth } from '@/components/AuthProvider'

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'staff' | 'client'
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout, isLoading: authLoading } = useAuth()
  const [bookings, setBookings] = useState<BookingResponse[]>([])
  const [filteredBookings, setFilteredBookings] = useState<BookingResponse[]>(
    [],
  )
  const [isLoading, setIsLoading] = useState(true)
  const [isBookingDetailsLoading, setIsBookingDetailsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd'),
  )
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [allBookings, setAllBookings] = useState(false)
  const [selectedBooking, setSelectedBooking] =
    useState<BookingResponse | null>(null)
  const [selectedBookingWithDetails, setSelectedBookingWithDetails] =
    useState<BookingWithDetails | null>(null)

  // Addons state - now comes from the booking response directly
  const [bookingAddons, setBookingAddons] = useState<ServiceAddon[]>([])

  const [searchQuery, setSearchQuery] = useState('')
  const [searchField, setSearchField] = useState<'name' | 'email' | 'both'>(
    'both',
  )
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth')
      return
    }
    if (user) {
      fetchBookings()
    }
  }, [user, authLoading, selectedDate, filterStatus, allBookings])

  // Parse addons from the selected booking when modal opens
  useEffect(() => {
    if (selectedBooking?.addons) {
      // Addons are already parsed in BookingResponse
      setBookingAddons(selectedBooking.addons)
    } else {
      setBookingAddons([])
    }
  }, [selectedBooking])

  // Filter bookings based on search
  useEffect(() => {
    if (!bookings.length) {
      setFilteredBookings([])
      return
    }

    setIsSearching(true)

    const timeoutId = setTimeout(() => {
      const filtered = bookings.filter((booking) => {
        if (!searchQuery.trim()) return true

        const query = searchQuery.toLowerCase().trim()
        const guestName = (booking.guestName || '').toLowerCase()
        const guestEmail = (booking.guestEmail || '').toLowerCase()

        switch (searchField) {
          case 'name':
            return guestName.includes(query)
          case 'email':
            return guestEmail.includes(query)
          case 'both':
          default:
            return guestName.includes(query) || guestEmail.includes(query)
        }
      })

      setFilteredBookings(filtered)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, searchField, bookings])

  const fetchBookings = async () => {
    setIsLoading(true)
    try {
      const data = await api.bookings.getAllBookings(
        undefined,
        undefined,
        undefined,
        undefined,
        filterStatus !== 'all' ? filterStatus : undefined,
        allBookings ? undefined : selectedDate,
        allBookings ? undefined : selectedDate,
      )

      // For staff, filter in memory
      const userRole = localStorage.getItem('user_role')
      let filtered = data

      if (userRole === 'staff') {
        const staffId = parseInt(localStorage.getItem('user_id')!)
        filtered = data.filter((b: any) => b.staffId === staffId)
      }

      setBookings(filtered)
      setFilteredBookings(filtered)
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (bookingId: number, newStatus: string) => {
    try {
      await api.bookings.updateBooking(bookingId, {
        status: newStatus,
      })
      fetchBookings() // Refresh
    } catch (error) {
      console.error('Failed to update booking status:', error)
    }
  }

  const fetchBookingDetails = async (bookingId: number) => {
    if (!bookingId) return
    if (isBookingDetailsLoading) return
    if (selectedBookingWithDetails?.id === bookingId) {
      setShowBookingModal(true)
      return
    }
    setIsBookingDetailsLoading(true)
    try {
      const data = await api.bookings.getBookingWithDetails(bookingId)
      setSelectedBookingWithDetails(data)
      setShowBookingModal(true)
    } catch (error) {
      console.error('Failed to fetch booking details:', error)
    } finally {
      setIsBookingDetailsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_role')
    localStorage.removeItem('user_name')
    localStorage.removeItem('user_email')
    localStorage.removeItem('user_id')
    localStorage.removeItem('tenant_id')
    router.push('/auth')
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

  const convertTo12Hour = (time24: string) => {
    const [hours, minutes] = time24.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const hour12 = hours % 12 || 12
    const paddedMinutes = minutes.toString().padStart(2, '0')
    return `${hour12}:${paddedMinutes} ${period}`
  }

  const formatPrice = (cents: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(cents / 100)
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  const getSearchResultText = () => {
    if (!searchQuery.trim()) return null
    const count = filteredBookings.length
    const total = bookings.length
    return `Found ${count} ${count === 1 ? 'result' : 'results'} ${count !== total ? `out of ${total}` : ''}`
  }

  const calculateTotalWithAddons = () => {
    if (!selectedBooking) return 0

    let total = selectedBooking.priceCents || 0

    if (selectedBooking.addons && selectedBooking.addons.length > 0) {
      total += selectedBooking.addons
        .filter((addon) => !addon.requiresQuote)
        .reduce((sum, addon) => sum + (addon.price || 0), 0)
    }

    return total
  }

  if (authLoading) {
    return (
      <Container className="py-20">
        <div className="flex justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-meet-secondary"></div>
        </div>
      </Container>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      <PageIntro eyebrow="Dashboard" title={`Welcome back, ${user.name}`}>
        <p>
          {user.role === 'admin'
            ? 'Manage all bookings, staff, and services for your studio.'
            : user.role === 'staff'
              ? 'View and manage your scheduled appointments.'
              : 'View your booking history.'}
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          {/* Search Bar */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                Search Bookings
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchIcon className="h-5 w-5 fill-meet-secondary" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by client name or email..."
                  className="block w-full rounded-lg border border-gray-200 py-2 pl-10 pr-10 focus:border-meet-secondary focus:outline-none focus:ring-1 focus:ring-meet-secondary"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <svg
                      className="h-5 w-5 stroke-meet-primary text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <div className="min-w-[120px]">
                <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                  Search In
                </label>
                <select
                  value={searchField}
                  onChange={(e) =>
                    setSearchField(e.target.value as 'name' | 'email' | 'both')
                  }
                  className="w-full rounded-lg border border-gray-200 p-2 text-sm text-meet-secondary focus:border-meet-secondary focus:outline-none"
                >
                  <option value="both">Name & Email</option>
                  <option value="name">Name Only</option>
                  <option value="email">Email Only</option>
                </select>
              </div>
            </div>

            {/* Search results info */}
            {searchQuery && (
              <div className="mt-2 flex items-center justify-between text-sm">
                <p className="text-meet-secondary/70">
                  {isSearching ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-meet-secondary border-t-transparent"></div>
                      Searching...
                    </span>
                  ) : (
                    getSearchResultText()
                  )}
                </p>
                {filteredBookings.length > 0 && (
                  <p className="text-xs text-meet-secondary/50">
                    Showing {filteredBookings.length} of {bookings.length}{' '}
                    bookings
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="mb-8 mt-12 flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-meet-secondary/70">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 rounded-lg border border-gray-200 p-2"
              />
            </div>
            <div className="flex flex-col justify-between">
              <label className="block text-sm font-medium text-meet-secondary/70">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="mt-1 rounded-lg border border-gray-200 p-2"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            {(user.role === 'admin' || user.role === 'staff') && (
              <div className="flex items-end">
                <Button href="/book" className="bg-meet-secondary">
                  + New Booking
                </Button>
              </div>
            )}
            {user.role === 'admin' && (
              <div className="flex items-end">
                <Button
                  onClick={() => setAllBookings(!allBookings)}
                  className="bg-meet-secondary"
                >
                  {allBookings
                    ? '- View Bookings By Date'
                    : '+ View All Bookings'}
                </Button>
              </div>
            )}
          </div>

          {/* Bookings Table */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-meet-secondary"></div>
            </div>
          ) : filteredBookings.length === 0 ? (
            <Border className="p-12 text-center">
              <p className="text-meet-secondary/60">
                {searchQuery
                  ? `No bookings found matching "${searchQuery}"`
                  : 'No bookings found for this date.'}
              </p>
              {searchQuery && (
                <Button
                  onClick={clearSearch}
                  className="mt-4 bg-meet-secondary"
                >
                  Clear Search
                </Button>
              )}
            </Border>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-meet-secondary/20">
                    <th className="p-3 text-left">Time</th>
                    <th className="p-3 text-left">Client</th>
                    <th className="p-3 text-left">Service</th>
                    <th className="p-3 text-left">Add-ons</th>
                    <th className="p-3 text-left">Total</th>
                    <th className="p-3 text-left">Status</th>
                    {(user.role === 'admin' || user.role === 'staff') && (
                      <th className="p-3 text-left">Actions</th>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-3">
                        <div className="font-medium">
                          {convertTo12Hour(booking.bookingTime)}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium">
                          {booking.guestName || 'Guest'}
                        </div>
                        <div className="text-sm text-meet-secondary/60">
                          {booking.guestEmail}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium">
                          Service #{booking.serviceId}
                        </div>
                        <div className="text-sm text-meet-secondary/60">
                          {booking.durationMinutes} min
                        </div>
                      </td>
                      <td className="p-3">
                        {booking.addons && booking.addons.length > 0 ? (
                          <div className="space-y-1">
                            {booking.addons.slice(0, 2).map((addon) => (
                              <div
                                key={addon.id}
                                className="text-xs text-meet-secondary"
                              >
                                • {addon.name}
                              </div>
                            ))}
                            {booking.addons.length > 2 && (
                              <div className="text-xs text-meet-secondary/50">
                                +{booking.addons.length - 2} more
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-meet-secondary/50">
                            —
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-medium">
                        {formatPrice(booking.priceCents, booking.currency)}
                      </td>
                      <td className="p-3">
                        {user.role === 'admin' || user.role === 'staff' ? (
                          <select
                            value={booking.status}
                            onChange={(e) =>
                              handleStatusChange(booking.id, e.target.value)
                            }
                            className={clsx(
                              'rounded-full px-3 py-1 text-sm font-medium',
                              getStatusBadge(booking.status),
                            )}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirm</option>
                            <option value="completed">Complete</option>
                            <option value="cancelled">Cancel</option>
                          </select>
                        ) : (
                          <span
                            className={clsx(
                              'rounded-full px-3 py-1 text-sm font-medium',
                              getStatusBadge(booking.status),
                            )}
                          >
                            {booking.status}
                          </span>
                        )}
                      </td>
                      {(user.role === 'admin' || user.role === 'staff') && (
                        <td className="p-3">
                          <Button
                            onClick={() => {
                              setSelectedBooking(booking)
                              fetchBookingDetails(booking.id)
                            }}
                            className="bg-gray-200 text-sm text-meet-primary hover:bg-gray-300"
                          >
                            {isBookingDetailsLoading &&
                            selectedBooking?.id === booking.id ? (
                              <div className="h-5 w-5 animate-spin rounded-full border-b border-meet-primary"></div>
                            ) : (
                              'View'
                            )}
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Staff Management (Admin only) */}
          {user.role === 'admin' && (
            <div className="mt-16">
              <h2 className="mb-6 font-display text-2xl font-semibold text-meet-primary">
                Quick Actions
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                <Border className="p-6 text-center">
                  <h3 className="mb-2 font-semibold">Staff Management</h3>
                  <p className="mb-4 text-sm text-meet-secondary/70">
                    Add or remove staff members
                  </p>
                  <Button href="/dashboard/staff" className="bg-meet-secondary">
                    Manage Staff
                  </Button>
                </Border>
                <Border className="p-6 text-center">
                  <h3 className="mb-2 font-semibold">Services</h3>
                  <p className="mb-4 text-sm text-meet-secondary/70">
                    Update services and pricing
                  </p>
                  <Button
                    href="/dashboard/services"
                    className="bg-meet-secondary"
                  >
                    Manage Services
                  </Button>
                </Border>
                <Border className="p-6 text-center">
                  <h3 className="mb-2 font-semibold">Availability</h3>
                  <p className="mb-4 text-sm text-meet-secondary/70">
                    Set staff schedules
                  </p>
                  <Button
                    href="/dashboard/availability"
                    className="bg-meet-secondary"
                  >
                    Manage Availability
                  </Button>
                </Border>
              </div>
            </div>
          )}

          {/* User Info Bar */}
          <div className="mb-8 mt-24 flex items-center justify-between rounded-lg bg-meet-secondary/5 p-4">
            <div>
              <span className="text-sm text-meet-secondary/70">
                Logged in as
              </span>
              <p className="font-medium text-meet-primary">
                {user.name} ({user.role})
              </p>
            </div>
            <Button
              onClick={handleLogout}
              className="bg-gray-200 text-meet-primary hover:bg-gray-300"
            >
              Logout
            </Button>
          </div>
        </FadeIn>
      </Container>

      {/* Booking Details Modal */}
      {showBookingModal && selectedBooking && selectedBookingWithDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[70vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-8">
            <h3 className="mb-4 font-display text-2xl font-semibold text-meet-primary">
              Booking Details
            </h3>

            {/* Client Information */}
            <div className="mb-6">
              <h4 className="mb-2 font-medium text-meet-primary">
                Client Information
              </h4>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-meet-secondary/70">Name:</dt>
                  <dd className="font-medium">
                    {selectedBooking.guestName || 'Guest'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-meet-secondary/70">Email:</dt>
                  <dd className="font-medium">
                    {selectedBooking.guestEmail || 'Not provided'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-meet-secondary/70">Phone:</dt>
                  <dd className="font-medium">
                    {selectedBooking.guestPhone || 'Not provided'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Service Details */}
            <div className="mb-6">
              <h4 className="mb-2 font-medium text-meet-primary">
                Service Details
              </h4>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-meet-secondary/70">Service:</dt>
                  <dd className="font-medium">
                    {selectedBookingWithDetails.service.name}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-meet-secondary/70">Date:</dt>
                  <dd className="font-medium">
                    {format(
                      new Date(selectedBookingWithDetails.booking.bookingDate),
                      'EEEE, MMMM d, yyyy',
                    )}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-meet-secondary/70">Time:</dt>
                  <dd className="font-medium">
                    {convertTo12Hour(
                      selectedBookingWithDetails.booking.bookingTime,
                    )}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-meet-secondary/70">Duration:</dt>
                  <dd className="font-medium">
                    {selectedBookingWithDetails.service.durationMinutes} minutes
                  </dd>
                </div>
              </dl>
            </div>

            {/* Addons Section */}
            {selectedBooking.addons && selectedBooking.addons.length > 0 && (
              <div className="mb-6">
                <h4 className="mb-2 font-medium text-meet-primary">
                  Selected Add-ons
                </h4>
                <ul className="space-y-2">
                  {selectedBooking.addons.map((addon) => (
                    <li
                      key={addon.id}
                      className="flex justify-between rounded-lg bg-gray-50 p-3"
                    >
                      <span className="text-meet-primary">{addon.name}</span>
                      <span className="font-medium text-meet-secondary">
                        {addon.requiresQuote
                          ? 'Contact for quote'
                          : formatPrice(addon.price, addon.currency)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price Summary */}
            <div className="mb-6 rounded-lg bg-meet-secondary/5 p-4">
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-meet-primary">Base Price:</span>
                <span className="text-meet-secondary">
                  {formatPrice(
                    selectedBooking.priceCents,
                    selectedBooking.currency,
                  )}
                </span>
              </div>
              {selectedBooking.addons && selectedBooking.addons.length > 0 && (
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-meet-primary">Add-ons Total:</span>
                  <span className="text-meet-secondary">
                    {formatPrice(
                      calculateTotalWithAddons() - selectedBooking.priceCents,
                      selectedBooking.currency,
                    )}
                  </span>
                </div>
              )}
              <div className="mt-3 flex justify-between border-t border-meet-secondary/20 pt-3 text-xl font-bold">
                <span className="text-meet-primary">Total:</span>
                <span className="text-meet-secondary">
                  {formatPrice(
                    calculateTotalWithAddons(),
                    selectedBooking.currency,
                  )}
                </span>
              </div>
            </div>

            {/* Notes */}
            {selectedBooking.notes && (
              <div className="mb-6">
                <h4 className="mb-2 font-medium text-meet-primary">Notes</h4>
                <p className="whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-meet-secondary">
                  {selectedBooking.notes}
                </p>
              </div>
            )}

            {/* Close Button */}
            <div className="mt-6 flex justify-end">
              <Button
                onClick={() => {
                  setShowBookingModal(false)
                  setSelectedBooking(null)
                }}
                className="bg-gray-200 text-meet-primary hover:bg-gray-300"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
