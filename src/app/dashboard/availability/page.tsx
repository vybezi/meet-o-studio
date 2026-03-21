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
import { Availability, User } from '@/shared/sdk/chronos'
import { format } from 'util'
import { ArrowIcon, PlusIcon, TrashIcon } from '@/components/Icons'

const DAYS_OF_WEEK = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
]

export default function AvailabilityManagementPage() {
  const router = useRouter()
  const [staff, setStaff] = useState<User[]>([])
  const [availability, setAvailability] = useState<Availability[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<number | ''>('')
  const [formData, setFormData] = useState({
    staffId: '',
    type: 'recurring' as 'recurring' | 'specific',
    dayOfWeek: '1',
    specificDate: '',
    startTime: '09:00',
    endTime: '17:00',
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [staffData, availabilityData] = await Promise.all([
        api.users.getAllUsers(),
        api.availability.getAllAvailability(),
      ])
      // Filter staff members
      const staffList = staffData.filter(
        (user: any) => user.role === 'staff' || user.role === 'admin',
      )
      setStaff(staffList)
      setAvailability(availabilityData)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const availabilityData = {
        staffId: parseInt(formData.staffId),
        dayOfWeek:
          formData.type === 'recurring' ? parseInt(formData.dayOfWeek) : null,
        specificDate:
          formData.type === 'specific' ? formData.specificDate : null,
        startTime: `${formData.startTime}:00`,
        endTime: `${formData.endTime}:00`,
        isRecurring: formData.type === 'recurring',
      }

      await api.availability.createAvailability(availabilityData)
      fetchData()
      setShowModal(false)
      resetForm()
    } catch (error) {
      console.error('Failed to create availability:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this availability slot?'))
      return
    try {
      await api.availability.deleteAvailability(id)
      fetchData()
    } catch (error) {
      console.error('Failed to delete availability:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      staffId: '',
      type: 'recurring',
      dayOfWeek: '1',
      specificDate: '',
      startTime: '09:00',
      endTime: '17:00',
    })
  }

  const getStaffName = (staffId: number) => {
    const member = staff.find((s) => s.id === staffId)
    return member?.name || 'Unknown'
  }

  const formatDayOfWeek = (day: number | null) => {
    if (day === null) return '—'
    return DAYS_OF_WEEK.find((d) => d.value === day)?.label || 'Unknown'
  }

  const formatTime = (time: string) => {
    return time.substring(0, 5)
  }

  if (isLoading) {
    return (
      <Container className="py-20">
        <div className="flex justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-meet-secondary"></div>
        </div>
      </Container>
    )
  }

  return (
    <>
      <PageIntro eyebrow="Dashboard" title="Availability Management">
        <p>
          Set recurring schedules and specific date availability for staff
          members.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          {/* Actions Bar */}
          <div className="mb-8 flex justify-between">
            <Button onClick={() => router.push('/dashboard')}>
              <div className="flex gap-2 bg-none text-white">
                <ArrowIcon className="w-4 rotate-180 fill-white" /> Back to
                Dashboard
              </div>
            </Button>
            <Button
              onClick={() => {
                resetForm()
                setShowModal(true)
              }}
              className="bg-meet-secondary"
            >
              <div className="flex gap-2 bg-none text-white">
                <PlusIcon className="h-5 w-5 fill-white" />
                Add Availability
              </div>
            </Button>
          </div>

          {/* Staff Filter */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium text-meet-secondary/70">
              Filter by Staff
            </label>
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value as number | '')}
              className="w-full max-w-xs rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
            >
              <option value="">All Staff</option>
              {staff.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Grid */}
          {staff.length === 0 ? (
            <Border className="p-12 text-center">
              <p className="text-meet-secondary/60">
                No staff members found. Please add staff members first.
              </p>
              <Button
                href="/dashboard/staff"
                className="mt-4 bg-meet-secondary"
              >
                Go to Staff Management
              </Button>
            </Border>
          ) : (
            <div className="space-y-8">
              {staff
                .filter(
                  (member) => !selectedStaff || member.id === selectedStaff,
                )
                .map((member) => {
                  const memberAvailability = availability.filter(
                    (a) => a.staffId === member.id,
                  )
                  const recurringSlots = memberAvailability.filter(
                    (a) => a.isRecurring,
                  )
                  const specificSlots = memberAvailability.filter(
                    (a) => !a.isRecurring,
                  )

                  return (
                    <Border key={member.id} className="p-6">
                      <h2 className="mb-4 font-display text-xl font-semibold text-meet-primary">
                        {member.name}
                      </h2>

                      {/* Recurring Schedule */}
                      {recurringSlots.length > 0 && (
                        <div className="mb-6">
                          <h3 className="mb-3 font-medium text-meet-secondary">
                            Weekly Schedule
                          </h3>
                          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                            {recurringSlots.map((slot) => (
                              <div
                                key={slot.id}
                                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                              >
                                <div>
                                  <div className="font-medium">
                                    {formatDayOfWeek(slot.dayOfWeek!)}
                                  </div>
                                  <div className="text-sm text-meet-secondary/70">
                                    {formatTime(slot.startTime)} -{' '}
                                    {formatTime(slot.endTime)}
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleDelete(slot.id)}
                                  className="rounded p-1 text-red-500 hover:bg-red-50"
                                >
                                  <TrashIcon className="h-4 w-4 fill-red-500" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Specific Date Availability */}
                      {specificSlots.length > 0 && (
                        <div>
                          <h3 className="mb-3 font-medium text-meet-secondary">
                            Special Dates
                          </h3>
                          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                            {specificSlots.map((slot) => (
                              <div
                                key={slot.id}
                                className="flex items-center justify-between rounded-lg bg-blue-50 p-3"
                              >
                                <div>
                                  <div className="font-medium">
                                    {new Date(
                                      slot.specificDate!,
                                    ).toLocaleDateString('en-US', {
                                      weekday: 'short',
                                      month: 'short',
                                      day: 'numeric',
                                    })}
                                  </div>
                                  <div className="text-sm text-meet-secondary/70">
                                    {formatTime(slot.startTime)} -{' '}
                                    {formatTime(slot.endTime)}
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleDelete(slot.id)}
                                  className="rounded p-1 text-red-500 hover:bg-red-50"
                                >
                                  trash icon
                                  {/* <TrashIcon className="h-4 w-4" /> */}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {memberAvailability.length === 0 && (
                        <p className="py-4 text-center text-meet-secondary/60">
                          No availability set for this staff member.
                        </p>
                      )}
                    </Border>
                  )
                })}
            </div>
          )}
        </FadeIn>
      </Container>

      {/* Add Availability Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-8">
            <h3 className="mb-6 font-display text-2xl font-semibold text-meet-primary">
              Add Availability
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                  Staff Member
                </label>
                <select
                  name="staffId"
                  value={formData.staffId}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                >
                  <option value="">Select Staff</option>
                  {staff.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                  Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="type"
                      value="recurring"
                      checked={formData.type === 'recurring'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-meet-secondary focus:ring-meet-secondary"
                    />
                    <span className="text-sm">Weekly Recurring</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="type"
                      value="specific"
                      checked={formData.type === 'specific'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-meet-secondary focus:ring-meet-secondary"
                    />
                    <span className="text-sm">Specific Date</span>
                  </label>
                </div>
              </div>

              {formData.type === 'recurring' ? (
                <div>
                  <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                    Day of Week
                  </label>
                  <select
                    name="dayOfWeek"
                    value={formData.dayOfWeek}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                  >
                    {DAYS_OF_WEEK.map((day) => (
                      <option key={day.value} value={day.value}>
                        {day.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                    Date
                  </label>
                  <input
                    type="date"
                    name="specificDate"
                    value={formData.specificDate}
                    onChange={handleInputChange}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    required
                    className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                    End Time
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <Button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    resetForm()
                  }}
                  className="bg-gray-200 text-meet-primary hover:bg-gray-300"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-meet-secondary">
                  Add Availability
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
