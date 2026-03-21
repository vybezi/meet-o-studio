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
import {
  Category,
  CreateNewServiceRequest,
  Service,
  ServiceAddon,
  ServiceResponse,
  UpdateService,
  UpdateServiceRequest,
} from '@/shared/sdk/chronos'
import { ArrowIcon, PencilIcon, PlusIcon, TrashIcon } from '@/components/Icons'

interface AddonFormData {
  id: string
  name: string
  description: string | null | undefined
  price: number
  currency: string
  requiresQuote: boolean
  isAvailable: boolean
}

export default function ServicesManagementPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [services, setServices] = useState<ServiceResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showAddonModal, setShowAddonModal] = useState(false)
  const [editingService, setEditingService] = useState<ServiceResponse | null>(
    null,
  )
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingAddon, setEditingAddon] = useState<AddonFormData | null>(null)
  const [serviceAddons, setServiceAddons] = useState<ServiceAddon[]>([])

  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    imageUrl: '',
    durationMinutes: 60,
    priceCents: 0,
    currency: 'USD',
    color: '#3B82F6',
    isActive: true,
    categoryId: '',
  })

  const [addonForm, setAddonForm] = useState({
    name: '',
    description: '',
    priceCents: 0,
    currency: 'USD',
    requiresQuote: false,
    isAvailable: true,
  })

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [categoriesData, servicesData] = await Promise.all([
        api.categories.getAllCategories(),
        api.services.getAllServices(),
      ])
      setCategories(categoriesData)
      setServices(servicesData)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (cents: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(cents / 100)
  }

  const handleServiceInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target
    setServiceForm({
      ...serviceForm,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const handleAddonInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target
    setAddonForm({
      ...addonForm,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : parseInt(value) || value,
    })
  }

  const handleCategoryInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCategoryForm({
      ...categoryForm,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddonSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newAddon: ServiceAddon = {
      id: editingAddon?.id || crypto.randomUUID(),
      name: addonForm.name,
      description: addonForm.description || undefined,
      price: addonForm.priceCents,
      currency: addonForm.currency,
      requiresQuote: addonForm.requiresQuote,
      isAvailable: addonForm.isAvailable,
    }

    if (editingAddon) {
      setServiceAddons(
        serviceAddons.map((a) => (a.id === editingAddon.id ? newAddon : a)),
      )
    } else {
      setServiceAddons([...serviceAddons, newAddon])
    }

    setShowAddonModal(false)
    resetAddonForm()
  }

  const handleDeleteAddon = (id: string) => {
    if (!confirm('Are you sure you want to delete this add-on?')) return
    setServiceAddons(serviceAddons.filter((a) => a.id !== id))
  }

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingService) {
        const serviceData: UpdateServiceRequest = {
          ...serviceForm,
          categoryId: serviceForm.categoryId
            ? parseInt(serviceForm.categoryId)
            : null,
          priceCents: parseInt(serviceForm.priceCents.toString()),
          durationMinutes: parseInt(serviceForm.durationMinutes.toString()),
          addons: serviceAddons.length > 0 ? serviceAddons : null,
        }
        await api.services.updateService(editingService.id, serviceData)
      } else {
        const serviceData: CreateNewServiceRequest = {
          ...serviceForm,
          categoryId: serviceForm.categoryId
            ? parseInt(serviceForm.categoryId)
            : null,
          priceCents: parseInt(serviceForm.priceCents.toString()),
          durationMinutes: parseInt(serviceForm.durationMinutes.toString()),
          addons: serviceAddons.length > 0 ? serviceAddons : null,
        }
        await api.services.createService(serviceData)
      }
      fetchData()
      setShowServiceModal(false)
      resetServiceForm()
    } catch (error) {
      console.error('Failed to save service:', error)
    }
  }

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingCategory) {
        await api.categories.updateCategory(editingCategory.id, categoryForm)
      } else {
        await api.categories.createCategory({
          color: categoryForm.color,
          description: categoryForm.description,
          name: categoryForm.name,
          displayOrder: categories.length + 1,
          isActive: true,
        })
      }
      fetchData()
      setShowCategoryModal(false)
      resetCategoryForm()
    } catch (error) {
      console.error('Failed to save category:', error)
    }
  }

  const handleDeleteService = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    try {
      await api.services.deleteService(id)
      fetchData()
    } catch (error) {
      console.error('Failed to delete service:', error)
    }
  }

  const handleDeleteCategory = async (id: number) => {
    if (
      !confirm(
        'Are you sure you want to delete this category? Services in this category will become uncategorized.',
      )
    )
      return
    try {
      await api.categories.deleteCategory(id)
      fetchData()
    } catch (error) {
      console.error('Failed to delete category:', error)
    }
  }

  const resetServiceForm = () => {
    setServiceForm({
      name: '',
      description: '',
      imageUrl: '',
      durationMinutes: 60,
      priceCents: 0,
      currency: 'USD',
      color: '#3B82F6',
      isActive: true,
      categoryId: '',
    })
    setServiceAddons([])
    setEditingService(null)
  }

  const resetAddonForm = () => {
    setAddonForm({
      name: '',
      description: '',
      priceCents: 0,
      currency: 'USD',
      requiresQuote: false,
      isAvailable: true,
    })
    setEditingAddon(null)
  }

  const resetCategoryForm = () => {
    setCategoryForm({
      name: '',
      description: '',
      color: '#3B82F6',
    })
    setEditingCategory(null)
  }

  const openServiceModal = (service?: ServiceResponse) => {
    if (service) {
      setEditingService(service)
      setServiceForm({
        name: service.name,
        description: service.description || '',
        imageUrl: service.imageUrl || '',
        durationMinutes: service.durationMinutes,
        priceCents: service.priceCents,
        currency: service.currency,
        color: service.color || '#3B82F6',
        isActive: service.isActive,
        categoryId: service.categoryId?.toString() || '',
      })
      setServiceAddons(service.addons || [])
    } else {
      resetServiceForm()
    }
    setShowServiceModal(true)
  }

  const openAddonModal = (addon?: ServiceAddon) => {
    if (addon) {
      setEditingAddon({
        id: addon.id,
        name: addon.name,
        description: addon.description || '',
        price: addon.price,
        currency: addon.currency,
        requiresQuote: addon.requiresQuote,
        isAvailable: addon.isAvailable,
      })
      setAddonForm({
        name: addon.name,
        description: addon.description || '',
        priceCents: addon.price,
        currency: addon.currency,
        requiresQuote: addon.requiresQuote,
        isAvailable: addon.isAvailable,
      })
    } else {
      resetAddonForm()
    }
    setShowAddonModal(true)
  }

  const openCategoryModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category)
      setCategoryForm({
        name: category.name,
        description: category.description || '',
        color: category.color || '#3B82F6',
      })
    } else {
      resetCategoryForm()
    }
    setShowCategoryModal(true)
  }

  return (
    <>
      <PageIntro eyebrow="Dashboard" title="Services Management">
        <p>Manage your service offerings, pricing, add-ons, and categories.</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          {/* Navigation */}
          <Button onClick={() => router.push('/dashboard')}>
            <div className="flex gap-2 bg-none text-white">
              <ArrowIcon className="w-4 rotate-180 fill-white" /> Back to
              Dashboard
            </div>
          </Button>

          {/* Categories Section */}
          <div className="my-12">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold text-meet-primary">
                Categories
              </h2>
              <Button
                onClick={() => openCategoryModal()}
                className="bg-meet-secondary"
              >
                <div className="flex gap-2 bg-none text-white">
                  <PlusIcon className="h-5 w-5 fill-white" />
                  Add Category
                </div>
              </Button>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-10">
                <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-meet-secondary"></div>
              </div>
            ) : categories.length === 0 ? (
              <Border className="p-8 text-center">
                <p className="text-meet-secondary/60">No categories found.</p>
              </Border>
            ) : (
              <div className="grid gap-4 md:grid-cols-3">
                {categories.map((category) => (
                  <Border key={category.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-meet-primary">
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="mt-1 text-sm text-meet-secondary/70">
                            {category.description}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openCategoryModal(category)}
                          className="rounded p-1 text-meet-secondary/70 hover:bg-gray-100 hover:text-meet-primary"
                        >
                          <PencilIcon className="h-4 w-4 fill-meet-secondary" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="rounded p-1 text-red-500 hover:bg-red-50"
                        >
                          <TrashIcon className="h-4 w-4 fill-red-500" />
                        </button>
                      </div>
                    </div>
                    <div
                      className="mt-2 h-1 w-12 rounded"
                      style={{ backgroundColor: category.color || '#3B82F6' }}
                    />
                  </Border>
                ))}
              </div>
            )}
          </div>

          {/* Services Section */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold text-meet-primary">
                Services
              </h2>
              <Button
                onClick={() => openServiceModal()}
                className="bg-meet-secondary"
              >
                <div className="flex gap-2 bg-none text-white">
                  <PlusIcon className="h-5 w-5 fill-white" />
                  Add Service
                </div>
              </Button>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-10">
                <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-meet-secondary"></div>
              </div>
            ) : services.length === 0 ? (
              <Border className="p-12 text-center">
                <p className="text-meet-secondary/60">No services found.</p>
              </Border>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-meet-secondary/20">
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Category</th>
                      <th className="p-3 text-left">Duration</th>
                      <th className="p-3 text-left">Price</th>
                      <th className="p-3 text-left">Add-ons</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => {
                      const category = categories.find(
                        (c) => c.id === service.categoryId,
                      )
                      return (
                        <tr
                          key={service.id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="p-3">
                            <div className="font-medium">{service.name}</div>
                            {service.description && (
                              <div className="text-sm text-meet-secondary/60">
                                {service.description.substring(0, 50)}...
                              </div>
                            )}
                          </td>
                          <td className="p-3">
                            {category ? (
                              <span
                                className="rounded-full px-3 py-1 text-sm font-medium"
                                style={{
                                  backgroundColor: `${category.color}20`,
                                  color: category.color!,
                                }}
                              >
                                {category.name}
                              </span>
                            ) : (
                              <span className="text-meet-secondary/60">—</span>
                            )}
                          </td>
                          <td className="p-3">{service.durationMinutes} min</td>
                          <td className="p-3 font-medium">
                            {formatPrice(service.priceCents, service.currency)}
                          </td>
                          <td className="p-3">
                            {service.addons?.length > 0 ? (
                              <div className="space-y-1">
                                <div className="flex items-center gap-1">
                                  <span className="text-sm font-medium text-meet-primary">
                                    {service.addons.length}
                                  </span>
                                  <span className="text-xs text-meet-secondary/60">
                                    add-on
                                    {service.addons.length !== 1 ? 's' : ''}
                                  </span>
                                </div>
                                <div className="text-xs text-meet-secondary/50">
                                  {service.addons
                                    .slice(0, 2)
                                    .map((a) => a.name)
                                    .join(', ')}
                                  {service.addons.length > 2 &&
                                    ` +${service.addons.length - 2} more`}
                                </div>
                              </div>
                            ) : (
                              <span className="text-meet-secondary/50">—</span>
                            )}
                          </td>
                          <td className="p-3">
                            <span
                              className={clsx(
                                'rounded-full px-3 py-1 text-sm font-medium',
                                service.isActive
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800',
                              )}
                            >
                              {service.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => openServiceModal(service)}
                                className="rounded p-1 text-meet-secondary/70 hover:bg-gray-100 hover:text-meet-primary"
                              >
                                <PencilIcon className="h-5 w-5 fill-meet-secondary" />
                              </button>
                              <button
                                onClick={() => handleDeleteService(service.id)}
                                className="rounded p-1 text-red-500 hover:bg-red-50"
                              >
                                <TrashIcon className="h-5 w-5 fill-red-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </FadeIn>
      </Container>

      {/* Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-8">
            <h3 className="mb-6 font-display text-2xl font-semibold text-meet-primary">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h3>

            <div className="grid grid-cols-2 gap-8">
              {/* Left Column - Basic Info */}
              <div>
                <form className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                      Service Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={serviceForm.name}
                      onChange={handleServiceInputChange}
                      required
                      className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={serviceForm.description}
                      onChange={handleServiceInputChange}
                      rows={3}
                      className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="imageUrl"
                      value={serviceForm.imageUrl}
                      onChange={handleServiceInputChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                        Category
                      </label>
                      <select
                        name="categoryId"
                        value={serviceForm.categoryId}
                        onChange={handleServiceInputChange}
                        className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                      >
                        <option value="">No Category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                        Duration (minutes)
                      </label>
                      <input
                        type="number"
                        name="durationMinutes"
                        value={serviceForm.durationMinutes}
                        onChange={handleServiceInputChange}
                        min="5"
                        step="5"
                        required
                        className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                        Price (in cents)
                      </label>
                      <input
                        type="number"
                        name="priceCents"
                        value={serviceForm.priceCents}
                        onChange={handleServiceInputChange}
                        min="0"
                        required
                        className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                        Currency
                      </label>
                      <select
                        name="currency"
                        value={serviceForm.currency}
                        onChange={handleServiceInputChange}
                        className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="JMD">JMD (J$)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                      Color
                    </label>
                    <input
                      type="color"
                      name="color"
                      value={serviceForm.color}
                      onChange={handleServiceInputChange}
                      className="h-10 w-full rounded-lg border border-gray-200 p-1"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={serviceForm.isActive}
                      onChange={(e) =>
                        setServiceForm({
                          ...serviceForm,
                          isActive: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-meet-secondary focus:ring-meet-secondary"
                    />
                    <label className="text-sm text-meet-primary">Active</label>
                  </div>
                </form>
              </div>

              {/* Right Column - Add-ons Management */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-display text-lg font-semibold text-meet-primary">
                    Service Add-ons
                  </h4>
                  <Button
                    onClick={() => openAddonModal()}
                    className="bg-meet-secondary text-sm"
                  >
                    <div className="flex gap-1 bg-none text-white">
                      <PlusIcon className="h-4 w-4 fill-white" />
                      Add Add-on
                    </div>
                  </Button>
                </div>

                {serviceAddons.length === 0 ? (
                  <Border className="p-8 text-center">
                    <p className="text-sm text-meet-secondary/60">
                      No add-ons added yet. Add optional upgrades for this
                      service.
                    </p>
                  </Border>
                ) : (
                  <div className="space-y-3">
                    {serviceAddons.map((addon) => (
                      <div
                        key={addon.id}
                        className="flex items-start justify-between rounded-lg border border-gray-200 p-4"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h5 className="font-medium text-meet-primary">
                              {addon.name}
                            </h5>
                            {!addon.isAvailable && (
                              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                                Inactive
                              </span>
                            )}
                            {addon.requiresQuote && (
                              <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">
                                Quote Required
                              </span>
                            )}
                          </div>
                          {addon.description && (
                            <p className="mt-1 text-sm text-meet-secondary/70">
                              {addon.description}
                            </p>
                          )}
                          <div className="mt-2 text-sm font-medium text-meet-secondary">
                            {addon.requiresQuote
                              ? 'Contact for quote'
                              : formatPrice(addon.price, addon.currency)}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openAddonModal(addon)}
                            className="rounded p-1 text-meet-secondary/70 hover:bg-gray-100"
                          >
                            <PencilIcon className="h-4 w-4 fill-meet-secondary" />
                          </button>
                          <button
                            onClick={() => handleDeleteAddon(addon.id)}
                            className="rounded p-1 text-red-500 hover:bg-red-50"
                          >
                            <TrashIcon className="h-4 w-4 fill-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-4 border-t pt-6">
              <Button
                type="button"
                onClick={() => {
                  setShowServiceModal(false)
                  resetServiceForm()
                }}
                className="bg-gray-200 text-meet-primary hover:bg-gray-300"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleServiceSubmit}
                className="bg-meet-secondary"
              >
                {editingService ? 'Update Service' : 'Create Service'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add-on Modal */}
      {showAddonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-8">
            <h3 className="mb-6 font-display text-2xl font-semibold text-meet-primary">
              {editingAddon ? 'Edit Add-on' : 'Add New Add-on'}
            </h3>
            <form onSubmit={handleAddonSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                  Add-on Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={addonForm.name}
                  onChange={handleAddonInputChange}
                  required
                  className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                  Description
                </label>
                <textarea
                  name="description"
                  value={addonForm.description}
                  onChange={handleAddonInputChange}
                  rows={2}
                  className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                    Price (in cents)
                  </label>
                  <input
                    type="number"
                    name="priceCents"
                    value={addonForm.priceCents}
                    onChange={handleAddonInputChange}
                    min="0"
                    className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={addonForm.currency}
                    onChange={handleAddonInputChange}
                    className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JMD">JMD (J$)</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="requiresQuote"
                    checked={addonForm.requiresQuote}
                    onChange={handleAddonInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-meet-secondary focus:ring-meet-secondary"
                  />
                  <span className="text-sm text-meet-primary">
                    Requires Quote
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={addonForm.isAvailable}
                    onChange={handleAddonInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-meet-secondary focus:ring-meet-secondary"
                  />
                  <span className="text-sm text-meet-primary">Available</span>
                </label>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <Button
                  type="button"
                  onClick={() => {
                    setShowAddonModal(false)
                    resetAddonForm()
                  }}
                  className="bg-gray-200 text-meet-primary hover:bg-gray-300"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-meet-secondary">
                  {editingAddon ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-8">
            <h3 className="mb-6 font-display text-2xl font-semibold text-meet-primary">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h3>
            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                  Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={categoryForm.name}
                  onChange={handleCategoryInputChange}
                  required
                  className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                  Description
                </label>
                <textarea
                  name="description"
                  value={categoryForm.description}
                  onChange={handleCategoryInputChange}
                  rows={3}
                  className="w-full rounded-lg border border-gray-200 p-2 focus:border-meet-secondary focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-meet-secondary/70">
                  Color
                </label>
                <input
                  type="color"
                  name="color"
                  value={categoryForm.color}
                  onChange={handleCategoryInputChange}
                  className="h-10 w-full rounded-lg border border-gray-200 p-1"
                />
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <Button
                  type="button"
                  onClick={() => {
                    setShowCategoryModal(false)
                    resetCategoryForm()
                  }}
                  className="bg-gray-200 text-meet-primary hover:bg-gray-300"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-meet-secondary">
                  {editingCategory ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
