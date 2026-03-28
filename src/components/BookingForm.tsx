'use client'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { FadeIn } from '@/components/FadeIn'
import { api, getBaseUrl } from '@/lib/api-client'
import {
  AvailabilityResponse,
  AvailableSlot,
  CategoryWithServices,
  Service,
  ServiceAddon,
} from '@/shared/sdk/chronos'
import { BaseAPIRequestFactory } from '@/shared/sdk/chronos/apis/baseapi'
import clsx from 'clsx'
import { FormEvent, useId, useState, useEffect } from 'react'
import { ClockIcon, StarIcon } from './Icons'

function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full border border-meet-secondary/30 bg-transparent px-6 pb-4 pt-12 text-base/6 text-meet-secondary ring-4 ring-transparent transition focus:border-meet-secondary focus:outline-none focus:ring-meet-secondary/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-meet-secondary transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-meet-secondary peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-meet-secondary"
      >
        {label}
      </label>
    </div>
  )
}

function AddonCheckbox({
  addon,
  checked,
  onChange,
  formatPrice,
}: {
  addon: ServiceAddon
  checked: boolean
  onChange: (checked: boolean) => void
  formatPrice: (cents: number, currency: string) => string
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-4 transition-all hover:border-meet-secondary hover:bg-gray-50">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 rounded border-gray-300 text-meet-secondary accent-meet-primary focus:ring-meet-secondary "
      />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <span className="font-medium text-meet-primary">{addon.name}</span>
            {addon.description && (
              <p className="text-sm text-meet-secondary/70">
                {addon.description}
              </p>
            )}
          </div>
          <span className="font-medium text-meet-secondary">
            {addon.requiresQuote
              ? 'Contact for quote'
              : formatPrice(addon.price, addon.currency)}
          </span>
        </div>
      </div>
    </label>
  )
}

// Enhanced RadioInput to show addons when selected
function ServiceCard({
  service,
  selected,
  onSelect,
  formatPrice,
  selectedAddons,
  onAddonToggle,
}: {
  service: Service
  selected: boolean
  onSelect: () => void
  formatPrice: (cents: number, currency: string) => string
  selectedAddons: string[]
  onAddonToggle: (addonId: string, checked: boolean) => void
}) {
  const [showDetails, setShowDetails] = useState(false)
  const addons = service.addons ? JSON.parse(service.addons) : []

  return (
    <div
      className={clsx(
        'overflow-hidden rounded-lg border-2 transition-all',
        selected ? 'border-meet-secondary' : 'border-gray-200',
      )}
    >
      {/* Service Header */}
      <div className="p-6">
        <div className="flex gap-6">
          {/* Service Image */}
          {service.imageUrl && (
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
              <img
                src={service.imageUrl}
                alt={service.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </div>
          )}

          {/* Service Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-meet-primary">
                  {service.name}
                </h3>
                {service.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-meet-secondary/70">
                    {service.description}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-meet-secondary/60">
                    <ClockIcon className="h-3 w-3 fill-meet-secondary" />{' '}
                    {service.durationMinutes} min
                  </span>
                  {addons.length > 0 && (
                    <span className="flex items-center gap-1 text-meet-secondary/60">
                      <StarIcon className="h-4 w-4 fill-meet-secondary" />{' '}
                      {addons.length} add-on{addons.length !== 1 ? 's' : ''}{' '}
                      available
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-meet-secondary">
                  {formatPrice(service.priceCents, service.currency)}
                </div>
                <button
                  type="button"
                  onClick={() => setShowDetails(!showDetails)}
                  className="mt-2 text-sm text-meet-secondary hover:text-meet-primary"
                >
                  {showDetails ? 'Hide details' : 'View details'}
                </button>
              </div>
            </div>

            {/* Select Button */}
            <div className="mt-4 flex justify-end">
              <Button
                type="button"
                onClick={onSelect}
                className={clsx(
                  'px-6',
                  selected
                    ? 'bg-meet-secondary'
                    : 'bg-gray-200 text-meet-primary hover:bg-gray-300',
                )}
              >
                {selected ? 'Selected' : 'Select'}
              </Button>
            </div>
          </div>
        </div>

        {/* Service Details (expandable) */}
        {showDetails && service.description && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            <p className="whitespace-pre-line text-sm text-meet-secondary">
              {service.description}
            </p>
          </div>
        )}
      </div>

      {/* Addons Section (only shown when service is selected) */}
      {selected && addons.length > 0 && (
        <div className="border-t border-meet-secondary/20 bg-gray-50 p-6">
          <h4 className="mb-3 font-medium text-meet-primary">
            Enhance Your Session
          </h4>
          <div className="space-y-2">
            {addons.map((addon: ServiceAddon) => (
              <AddonCheckbox
                key={addon.id}
                addon={addon}
                checked={selectedAddons.includes(addon.id)}
                onChange={(checked) => onAddonToggle(addon.id, checked)}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function RadioInput({
  label,
  description,
  price,
  duration,
  color,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & {
  label: string
  description?: string
  price?: string
  duration?: string
  color?: string
}) {
  return (
    <label
      className={clsx(
        'flex cursor-pointer gap-x-4 rounded-lg border-2 p-6 transition-all hover:scale-[1.02]',
        props.checked
          ? 'border-meet-secondary bg-meet-secondary/5'
          : 'border-gray-200',
      )}
      style={{ borderColor: props.checked ? color : undefined }}
    >
      <input
        type="radio"
        {...props}
        className="mt-1 h-6 w-6 flex-none appearance-none rounded-full border border-meet-primary/20 outline-none checked:border-[0.5rem] checked:border-meet-primary focus-visible:ring-1 focus-visible:ring-meet-primary focus-visible:ring-offset-2"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <span className="text-lg font-semibold text-meet-primary">
            {label}
          </span>
          {price && (
            <span className="text-xl font-bold text-meet-secondary">
              {price}
            </span>
          )}
        </div>
        {description && (
          <p className="mt-1 text-sm text-meet-secondary">{description}</p>
        )}
        {duration && (
          <p className="mt-2 text-xs text-meet-secondary">{duration}</p>
        )}
      </div>
    </label>
  )
}

function DateButton({
  date,
  selected,
  onClick,
}: {
  date: Date
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'rounded-lg border p-3 text-center transition-all',
        selected
          ? 'border-meet-secondary bg-meet-secondary text-white'
          : 'border-gray-200 hover:border-meet-secondary hover:bg-meet-secondary/5',
      )}
    >
      <div className="text-xs uppercase">
        {date.toLocaleString('default', { month: 'short' })}
      </div>
      <div className="text-lg font-bold">{date.getDate()}</div>
      <div className="text-xs">
        {date.toLocaleString('default', { weekday: 'short' })}
      </div>
    </button>
  )
}

function TimeButton({
  time,
  staffName,
  staffId,
  selected,
  onClick,
}: {
  time: string
  staffName: string
  staffId: number
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex flex-col items-center rounded-lg border p-3 text-center transition-all',
        selected
          ? 'border-meet-secondary bg-meet-secondary text-white'
          : 'border-gray-200 hover:border-meet-secondary hover:bg-meet-secondary/5',
      )}
    >
      <span className="text-lg font-semibold">{time.substring(0, 5)}</span>
      <span
        className={clsx(
          'mt-1 text-xs',
          selected ? 'text-white/80' : 'text-meet-secondary/60',
        )}
      >
        With {staffName}
      </span>
    </button>
  )
}

export function BookingForm() {
  const [step, setStep] = useState(1)
  const [isSuccess, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [magicLink, setMagicLink] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [emailSent, setEmailSent] = useState(false)

  // Data states
  const [categories, setCategories] = useState<CategoryWithServices[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedAddons, setSelectedAddons] = useState<ServiceAddon[]>([])
  const [availableDates, setAvailableDates] = useState<Date[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [staffName, setStaffName] = useState<string>('Sarah Johnson')
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([])
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null)
  const [selectedStaffName, setSelectedStaffName] = useState<string | null>(
    null,
  )

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  })

  const calculateTotal = () => {
    if (!selectedService) return 0

    let total = selectedService.priceCents || 0

    selectedAddons.forEach((addon) => {
      if (!addon.requiresQuote) {
        total += addon.price || 0
      }
    })

    return total
  }

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories()
    generateAvailableDates()
  }, [])

  const fetchCategories = async () => {
    try {
      const data = await api.categories.getCategoriesWithServices()
      setCategories(data)
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const generateAvailableDates = () => {
    const dates: Date[] = []
    const today = new Date()
    for (let i = 1; i <= 60; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      if (date.getDay() !== 0) {
        dates.push(date)
      }
    }
    setAvailableDates(dates)
  }

  const checkAvailability = async (serviceId: number, date: Date) => {
    setIsLoading(true)
    try {
      const formattedDate = date.toISOString().split('T')[0]
      const result = await api.bookings.checkBookingAvailability({
        date: formattedDate,
        serviceId: serviceId,
      })

      setAvailableSlots(result.availableSlots || [])
    } catch (error) {
      console.error('Availability check failed:', error)
      setAvailableSlots([])
    } finally {
      setIsLoading(false)
    }
  }
  const sendBookingEmail = async () => {
    try {
      const addonDetails = selectedAddons.map((addon) => ({
        name: addon.name,
        price: addon.requiresQuote
          ? 'Quote'
          : formatPrice(addon.price || 0, addon.currency || 'USD'),
      }))

      const emailData = {
        guestName: formData.name,
        guestEmail: formData.email,
        guestPhone: formData.phone || 'Not provided',
        serviceName: selectedService?.name || '',
        staffName: staffName,
        bookingDate: selectedDate?.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        bookingTime: selectedTime?.substring(0, 5),
        duration: selectedService?.durationMinutes || 0,
        addons: addonDetails,
        total: formatPrice(
          calculateTotal(),
          selectedService?.currency || 'USD',
        ),
        notes: formData.notes || 'No notes provided',
        magicLink: magicLink || '',
      }

      const response = await fetch(
        'https://us-central1-meet-o-studio.cloudfunctions.net/sendBookingConfirmation',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        },
      )

      if (response.ok) {
        setEmailSent(true)
        console.log('Booking confirmation email sent')
      } else {
        console.error('Failed to send email')
      }
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    setSelectedAddons([]) // Reset addons when service changes
  }

  const handleAddonToggle = (addon: ServiceAddon, checked: boolean) => {
    setSelectedAddons((prev) =>
      checked ? [...prev, addon] : prev.filter((a) => a.id !== addon.id),
    )
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    if (selectedService) {
      checkAvailability(selectedService.id, date)
    }
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const formattedDate = selectedDate?.toISOString().split('T')[0]

      // Prepare addons with the correct structure
      const addonsToSend = selectedAddons.map(
        ({ id, name, price, currency, requiresQuote, isAvailable }) => ({
          id,
          name,
          price,
          currency,
          requiresQuote,
          isAvailable,
        }),
      )

      const baseUrl = window.location.origin

      // Create booking with addons
      const response = await api.bookings.createBooking({
        staffId: selectedStaffId || 1,
        serviceId: selectedService?.id || 0,
        bookingDate: formattedDate || '',
        bookingTime: selectedTime || '',
        notes: formData.notes,
        guestName: formData.name,
        guestEmail: formData.email,
        guestPhone: formData.phone || undefined,
        addons: addonsToSend,
        priceCents: selectedService?.priceCents || 0,
        currency: selectedService?.currency || 'JMD',
        frontendUrl: baseUrl,
      })

      // Store magic link for display
      if (response.magicLink) {
        setMagicLink(response.magicLink)
        await sendBookingEmail()
      }

      setSuccess(true)
      setStep(4)
    } catch (error: any) {
      console.error('Booking failed:', error)
      setError(error.message || 'Booking failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (cents: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(cents / 100)
  }

  const resetForm = () => {
    setStep(1)
    setSelectedService(null)
    setSelectedAddons([])
    setSelectedDate(null)
    setSelectedTime(null)
    setFormData({ name: '', email: '', phone: '', notes: '' })
    setSuccess(false)
    setMagicLink(null)
    setEmailSent(false)
  }

  const goBack = () => {
    if (step === 2) {
      setStep(1)
      setSelectedService(null)
      setSelectedAddons([])
    } else if (step === 3) {
      setStep(2)
    }
  }

  // Update ServiceCard to pass the full addon object
  const ServiceCardWithAddons = ({
    service,
    selected,
    onSelect,
  }: {
    service: Service
    selected: boolean
    onSelect: () => void
  }) => {
    const [showDetails, setShowDetails] = useState(false)
    const addons = service.addons ? JSON.parse(service.addons) : []
    const serviceSelectedAddons = selectedAddons.filter((a) =>
      addons.some((sa: ServiceAddon) => sa.id === a.id),
    )

    return (
      <div
        className={clsx(
          'overflow-hidden rounded-lg border-2 transition-all',
          selected ? 'border-meet-secondary' : 'border-gray-200',
        )}
      >
        {/* Service Header */}
        <div className="p-6">
          <div className="flex gap-6">
            {service.imageUrl && (
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-meet-primary">
                    {service.name}
                  </h3>
                  {service.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-meet-secondary/70">
                      {service.description}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-meet-secondary/60">
                      <ClockIcon className="h-3 w-3 fill-meet-secondary" />{' '}
                      {service.durationMinutes} min
                    </span>
                    {addons.length > 0 && (
                      <span className="flex items-center gap-1 text-meet-secondary/60">
                        <StarIcon className="h-4 w-4 fill-meet-secondary" />{' '}
                        {addons.length} add-on{addons.length !== 1 ? 's' : ''}{' '}
                        available
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-meet-secondary">
                    {formatPrice(service.priceCents, service.currency)}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDetails(!showDetails)}
                    className="mt-2 text-sm text-meet-secondary hover:text-meet-primary"
                  >
                    {showDetails ? 'Hide details' : 'View details'}
                  </button>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  type="button"
                  onClick={onSelect}
                  className={clsx(
                    'px-6',
                    selected
                      ? 'bg-meet-secondary'
                      : 'bg-gray-200 text-meet-primary hover:bg-gray-300',
                  )}
                >
                  {selected ? 'Selected' : 'Select'}
                </Button>
              </div>
            </div>
          </div>

          {showDetails && service.description && (
            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="whitespace-pre-line text-sm text-meet-secondary">
                {service.description}
              </p>
            </div>
          )}
        </div>

        {/* Addons Section */}
        {selected && addons.length > 0 && (
          <div className="border-t border-meet-secondary/20 bg-gray-50 p-6">
            <h4 className="mb-3 font-medium text-meet-primary">
              Enhance Your Session
            </h4>
            <div className="space-y-2">
              {addons.map((addon: ServiceAddon) => (
                <AddonCheckbox
                  key={addon.id}
                  addon={addon}
                  checked={serviceSelectedAddons.some((a) => a.id === addon.id)}
                  onChange={(checked) => handleAddonToggle(addon, checked)}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Update the render section to use ServiceCardWithAddons
  return (
    <FadeIn className="w-full">
      {/* Progress Indicator - same as before */}
      <div className="mb-24 w-full">
        <div className="flex w-full items-center justify-between">
          {['Select Service', 'Choose Time', 'Your Details', 'Confirm'].map(
            (label, i) => (
              <div className="flex flex-1 last:flex-none" key={label}>
                <div className="flex flex-col items-center last:w-auto">
                  <div
                    className={clsx(
                      'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold',
                      step > i + 1
                        ? 'bg-meet-secondary text-white'
                        : step === i + 1
                          ? 'bg-meet-secondary text-white ring-4 ring-meet-secondary/20'
                          : 'bg-gray-100 text-gray-400',
                    )}
                  >
                    {step > i + 1 ? '✓' : i + 1}
                  </div>
                  <p
                    className={clsx(
                      'mt-2 text-sm',
                      step === i + 1 ? 'text-meet-secondary' : 'text-gray-400',
                    )}
                  >
                    {label}
                  </p>
                </div>
                {i < 3 && (
                  <div
                    className={clsx(
                      'mx-2 mt-4 h-1 flex-1',
                      step > i + 1 ? 'bg-meet-secondary' : 'bg-gray-200',
                    )}
                  />
                )}
              </div>
            ),
          )}
        </div>
      </div>

      {/* Step 1: Service Selection */}
      {step === 1 && (
        <div>
          <h2 className="mb-6 font-display text-2xl font-semibold text-meet-primary">
            Select a Service
          </h2>

          {categories.length === 0 ? (
            <p className="py-8 text-center text-meet-secondary/60">
              Loading services...
            </p>
          ) : (
            <div className="space-y-8">
              {categories.map((category) => (
                <div key={category.id}>
                  <h3 className="mb-4 font-display text-xl font-semibold text-meet-primary">
                    {category.name}
                  </h3>
                  <div className="space-y-4">
                    {category.services.map((service) => (
                      <ServiceCardWithAddons
                        key={service.id}
                        service={service}
                        selected={selectedService?.id === service.id}
                        onSelect={() => handleServiceSelect(service)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <Button
              disabled={selectedService == null}
              onClick={() => setStep(2)}
              className="bg-meet-secondary"
            >
              Continue to Date & Time
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Date & Time Selection - same as before */}
      {step === 2 && selectedService && (
        <div className="w-full flex-col items-start">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-semibold text-meet-primary">
              Select Date & Time
            </h2>
            <p className="mt-1 text-sm text-meet-secondary/70">
              {selectedService.name} • {selectedService.durationMinutes} minutes
            </p>
          </div>

          {/* Date Selection */}
          <div className="mb-8">
            <h3 className="mb-3 font-medium text-meet-primary">
              Select a Date
            </h3>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              {availableDates.map((date) => (
                <DateButton
                  key={date.toISOString()}
                  date={date}
                  selected={
                    selectedDate?.toDateString() === date.toDateString()
                  }
                  onClick={() => handleDateSelect(date)}
                />
              ))}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div>
              <h3 className="mb-3 font-medium text-meet-primary">
                Available Times for{' '}
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </h3>
              {isLoading ? (
                <div className="py-8 text-center text-meet-secondary/60">
                  Checking availability...
                </div>
              ) : availableSlots.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {availableSlots.map((slot, index) => (
                    <TimeButton
                      key={`${slot.time}-${slot.staffId}-${index}`}
                      time={slot.time}
                      staffName={slot.staffName}
                      staffId={slot.staffId}
                      selected={
                        selectedTime === slot.time &&
                        selectedStaffId === slot.staffId
                      }
                      onClick={() => {
                        setSelectedTime(slot.time)
                        setSelectedStaffId(slot.staffId)
                        setSelectedStaffName(slot.staffName)
                      }}
                    />
                  ))}
                </div>
              ) : (
                <p className="py-8 text-center text-meet-secondary/60">
                  No available times for this date. Please select another date.
                </p>
              )}
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              onClick={goBack}
              className="bg-gray-200 text-meet-primary hover:bg-gray-300"
            >
              Back
            </Button>
            <Button disabled={selectedTime == null} onClick={() => setStep(3)}>
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Client Details - update summary to show selected addons */}
      {step === 3 && selectedService && selectedDate && selectedTime && (
        <div>
          <h2 className="mb-6 font-display text-2xl font-semibold text-meet-primary">
            Your Information
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="isolate mb-6 -space-y-px rounded-2xl bg-white/50">
              <TextInput
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <TextInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <TextInput
                label="Phone (optional)"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <TextInput
                label="Special Requests or Notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </div>

            {/* Enhanced Booking Summary with Addons */}
            <Border className="mb-6 p-6">
              <h3 className="mb-3 font-semibold text-meet-primary">
                Booking Summary
              </h3>

              {selectedService.imageUrl && (
                <div className="mb-4 flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={selectedService.imageUrl}
                      alt={selectedService.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-meet-primary">
                      {selectedService.name}
                    </p>
                    <p className="text-sm text-meet-secondary/70">
                      {selectedService.durationMinutes} minutes
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-meet-secondary/70">Base Service:</span>
                  <span className="font-medium text-meet-primary">
                    {formatPrice(
                      selectedService.priceCents,
                      selectedService.currency,
                    )}
                  </span>
                </div>

                {selectedAddons.length > 0 && (
                  <>
                    <div className="border-t border-gray-100 pt-2">
                      <p className="mb-2 font-medium text-meet-primary">
                        Selected Add-ons:
                      </p>
                      {selectedAddons.map((addon) => (
                        <div
                          key={addon.id}
                          className="flex justify-between pl-4 text-sm"
                        >
                          <span className="text-meet-secondary/70">
                            • {addon.name}
                          </span>
                          <span className="text-meet-secondary">
                            {addon.requiresQuote
                              ? 'Quote'
                              : formatPrice(
                                  addon.price || 0,
                                  addon.currency || 'USD',
                                )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="flex justify-between border-t pt-3">
                  <span className="font-semibold text-meet-primary">
                    Total:
                  </span>
                  <span className="text-lg font-bold text-meet-secondary">
                    {formatPrice(calculateTotal(), selectedService.currency)}
                  </span>
                </div>
              </div>
            </Border>

            <div className="flex justify-between gap-4">
              <Button type="button" onClick={goBack}>
                Back
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !formData.name || !formData.email}
                className="bg-meet-secondary"
              >
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-b border-white"></div>
                ) : (
                  'Confirm Booking'
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && isSuccess && (
        <div className="py-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mb-2 font-display text-2xl font-semibold text-meet-primary">
            Booking Confirmed!
          </h2>
          <p className="mb-4 text-meet-secondary/70">
            We&apos;ve sent a confirmation email to {formData.email} with all
            the details.
          </p>

          {magicLink && (
            <div className="mx-auto mb-6 max-w-md rounded-lg bg-blue-50 p-4">
              <p className="mb-2 text-sm font-medium text-blue-800">
                Save this link to manage your booking:
              </p>
              <a
                href={magicLink}
                className="break-all text-xs text-blue-600 underline hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                {magicLink}
              </a>
              <p className="mt-2 text-xs text-blue-600">
                You can also access this link from your email.
              </p>
            </div>
          )}

          <Button onClick={resetForm} className="bg-meet-secondary">
            Book Another Session
          </Button>
        </div>
      )}
    </FadeIn>
  )
}
