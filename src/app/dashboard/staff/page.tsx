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
import { User } from '@/shared/sdk/chronos'
import {
  ArrowIcon,
  EyeIcon,
  EyeSlashIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@/components/Icons'

export default function StaffManagementPage() {
  const router = useRouter()
  const [staff, setStaff] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingStaff, setEditingStaff] = useState<User | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'staff',
    password: '',
  })

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (!token) {
      router.push('/auth')
      return
    }
    fetchStaff()
  }, [])

  const fetchStaff = async () => {
    setIsLoading(true)
    try {
      const data = await api.users.getAllUsers()
      // Filter to show only staff and admin
      const staffList = data.filter(
        (user: any) => user.role === 'staff' || user.role === 'admin',
      )
      setStaff(staffList)
    } catch (error) {
      console.error('Failed to fetch staff:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingStaff) {
        // Update existing staff
        const updateData: any = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          role: formData.role,
        }

        // Only include password if it was changed
        if (formData.password && formData.password !== '') {
          updateData.passwordHash = formData.password
        }

        await api.users.updateUser(editingStaff.id, updateData)
      } else {
        // Create new staff - require password
        if (!formData.password) {
          alert('Password is required for new staff members')
          return
        }

        await api.users.createUser({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          role: formData.role,
          passwordHash: formData.password,
        })
      }
      fetchStaff()
      setShowModal(false)
      resetForm()
    } catch (error) {
      console.error('Failed to save staff:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this staff member?')) return
    try {
      await api.users.deleteUser(id)
      fetchStaff()
    } catch (error) {
      console.error('Failed to delete staff:', error)
    }
  }

  //   const handleToggleStatus = async (id: number, currentStatus: boolean) => {
  //     try {
  //       await api.users.updateUser(id, {
  //         isActive: !currentStatus,
  //       })
  //       fetchStaff()
  //     } catch (error) {
  //       console.error('Failed to toggle staff status:', error)
  //     }
  //   }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'staff',
      password: '',
    })
    setEditingStaff(null)
    setShowPassword(false)
  }

  const openEditModal = (staff: User) => {
    setEditingStaff(staff)
    setFormData({
      name: staff.name,
      email: staff.email,
      phone: staff.phone || '',
      role: staff.role,
      password: '', // Don't show existing password
    })
    setShowModal(true)
  }

  const generateRandomPassword = () => {
    const length = 12
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
    let password = ''
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setFormData({ ...formData, password })
  }

  return (
    <>
      <PageIntro eyebrow="Dashboard" title="Staff Management">
        <p>Add, edit, or remove staff members and manage their permissions.</p>
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
            >
              <div className="flex gap-2 bg-none text-white">
                <PlusIcon className="h-5 w-5 fill-white" />
                Add Staff Member
              </div>
            </Button>
          </div>

          {/* Staff Table */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-meet-secondary"></div>
            </div>
          ) : staff.length === 0 ? (
            <Border className="p-12 text-center">
              <p className="text-meet-secondary/60">No staff members found.</p>
              <Button
                onClick={() => {
                  resetForm()
                  setShowModal(true)
                }}
                className="mt-4 bg-meet-secondary"
              >
                Add Your First Staff Member
              </Button>
            </Border>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-meet-secondary/20">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Role</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((member) => (
                    <tr
                      key={member.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-3 font-medium">{member.name}</td>
                      <td className="p-3">{member.email}</td>
                      <td className="p-3">{member.phone || '—'}</td>
                      <td className="p-3">
                        <span
                          className={clsx(
                            'rounded-full px-3 py-1 text-sm font-medium',
                            member.role === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800',
                          )}
                        >
                          {member.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(member)}
                            className="rounded p-1 text-meet-secondary/70 hover:bg-gray-100 hover:text-meet-primary"
                            title="Edit staff member"
                          >
                            <PencilIcon className="h-5 w-5 fill-meet-secondary" />
                          </button>
                          <button
                            onClick={() => handleDelete(member.id)}
                            className="rounded p-1 text-red-500 hover:bg-red-50"
                            title="Delete staff member"
                          >
                            <TrashIcon className="h-5 w-5 fill-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </FadeIn>
      </Container>

      {/* Staff Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-8">
            <h3 className="mb-6 font-display text-2xl font-semibold text-meet-primary">
              {editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                >
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Password Field */}
              <div>
                <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                  {editingStaff
                    ? 'New Password (leave blank to keep current)'
                    : 'Password'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required={!editingStaff}
                    className="w-full rounded-lg border border-gray-200 p-2 pr-10 focus:border-meet-secondary focus:outline-none"
                    placeholder={
                      editingStaff ? 'Enter new password' : 'Enter password'
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 fill-meet-secondary" />
                    ) : (
                      <EyeIcon className="h-5 w-5 fill-meet-secondary" />
                    )}
                  </button>
                </div>

                {/* Password generation option */}
                {!editingStaff && (
                  <button
                    type="button"
                    onClick={generateRandomPassword}
                    className="mt-2 text-sm text-meet-secondary hover:text-meet-primary"
                  >
                    🔑 Generate random password
                  </button>
                )}
              </div>

              {/* Password strength indicator (optional) */}
              {formData.password && formData.password.length > 0 && (
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-xs text-meet-secondary/70">
                    Password strength:{' '}
                    {formData.password.length < 6
                      ? '⚠️ Weak'
                      : formData.password.length < 10
                        ? '� Good'
                        : '💪 Strong'}
                  </p>
                </div>
              )}

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
                  {editingStaff ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
