'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Button } from '@/components/Button'
import { Border } from '@/components/Border'
import { PageIntro } from '@/components/PageIntro'
import { ContactSection } from '@/components/ContactSection'
import { api } from '@/lib/api-client'
import clsx from 'clsx'
import { useId } from 'react'

function TextInput({
  label,
  type = 'text',
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type={type}
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

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    tenantId: '',
    businessName: '',
    businessType: 'photography',
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // You'll need to create these endpoints in your API
      const response = await api.auth.login({
        email: formData.email,
        password: formData.password,
      })

      // Store token (in httpOnly cookie ideally, but for demo we'll use localStorage)
      localStorage.setItem('auth_token', response.token)
      localStorage.setItem('user_role', response.user.role)
      localStorage.setItem('tenant_id', response.tenantId.toString())
      localStorage.setItem('user_name', response.user.name)
      localStorage.setItem('user_email', response.user.email)
      localStorage.setItem('user_id', response.user.id.toString())

      // Redirect based on role
      if (response.user.role === 'admin' || response.user.role === 'staff') {
        router.push('/dashboard')
      } else {
        router.push('/bookings')
      }
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  //   const handleRegister = async (e: React.FormEvent) => {
  //     e.preventDefault()
  //     setIsLoading(true)
  //     setError(null)

  //     try {
  //       // Register new tenant
  //       const response = await api.tenants.registerTenant({
  //         businessName: formData.businessName,
  //         subdomain: formData.tenantId,
  //         businessType: formData.businessType,
  //         email: formData.email,
  //         password: formData.password,
  //         timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  //         currency: 'USD',
  //       })

  //       // Auto-login after registration
  //       localStorage.setItem('auth_token', response.token)
  //       localStorage.setItem('user_role', 'admin')
  //       localStorage.setItem('tenant_id', response.tenant.id.toString())

  //       router.push('/admin/dashboard')
  //     } catch (err) {
  //       setError('Registration failed. Please try again.')
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }

  return (
    <>
      <PageIntro
        eyebrow="Authentication"
        title={isLogin ? 'Welcome Back' : 'Start Your Free Trial'}
      >
        <p>
          {isLogin
            ? 'Sign in to manage your studio, bookings, and clients.'
            : 'Create your studio account and start accepting bookings in minutes.'}
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-24">
        <FadeIn className="w-full">
          <div className="mx-auto max-w-md">
            {/* Toggle */}
            {/* <div className="mb-8 flex rounded-lg bg-gray-100 p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={clsx(
                  'flex-1 rounded-md px-4 py-2 text-sm font-medium transition',
                  isLogin
                    ? 'bg-white text-meet-primary shadow'
                    : 'text-meet-secondary hover:text-meet-primary',
                )}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={clsx(
                  'flex-1 rounded-md px-4 py-2 text-sm font-medium transition',
                  !isLogin
                    ? 'bg-white text-meet-primary shadow'
                    : 'text-meet-secondary hover:text-meet-primary',
                )}
              >
                Create Account
              </button>
            </div> */}

            {/* Error Message */}
            {error && (
              <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Form */}
            <Border className="p-8">
              <form onSubmit={handleLogin}>
                {/* {!isLogin && (
                  <>
                    <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
                      <TextInput
                        label="Business Name"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        required
                      />
                      <TextInput
                        label="Tenant ID / Subdomain"
                        name="tenantId"
                        value={formData.tenantId}
                        onChange={handleInputChange}
                        required
                        placeholder="your-studio-name"
                      />
                    </div>
                    <div className="my-4">
                      <p className="mt-1 text-xs text-meet-secondary/60">
                        This will be your studio's URL: {formData.tenantId}
                        .yourdomain.com
                      </p>
                    </div>
                    <div className="mb-4">
                      <label className="mb-2 block text-sm font-medium text-meet-primary">
                        Business Type
                      </label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-meet-secondary/30 bg-transparent px-4 py-3 text-meet-primary focus:border-meet-secondary focus:outline-none"
                        required
                      >
                        <option value="photography">Photography Studio</option>
                        <option value="salon">Hair Salon</option>
                        <option value="spa">Spa & Wellness</option>
                        <option value="fitness">Fitness Studio</option>
                        <option value="consulting">Consulting</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </>
                )}  */}

                <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
                  <TextInput
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <TextInput
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-6">
                  {isLogin && (
                    <div className="mt-2 text-right">
                      <button
                        type="button"
                        className="text-sm text-meet-secondary hover:text-meet-primary"
                        onClick={() =>
                          alert('Password reset functionality coming soon!')
                        }
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full justify-center bg-meet-secondary"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-b border-white"></div>
                  ) : isLogin ? (
                    'Sign In'
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>

              {/* Demo Credentials */}
              {isLogin && (
                <div className="mt-6 rounded-lg bg-gray-50 p-4">
                  <p className="mb-2 text-sm font-medium text-meet-primary">
                    Demo Accounts:
                  </p>
                  <div className="space-y-1 text-xs text-meet-secondary/60">
                    <p>Admin: meetstudioco@gmail.com / admin123</p>
                    <p>Staff: staff@example.com / temporary_password</p>
                    {/* <p>Client: client@example.com / password123</p> */}
                  </div>
                </div>
              )}
            </Border>

            {/* Additional Info */}
            <p className="mt-8 text-center text-sm text-meet-secondary/60">
              By signing in, you agree to our{' '}
              <a href="/terms" className="text-meet-secondary hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href="/privacy"
                className="text-meet-secondary hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </FadeIn>
      </Container>

      <ContactSection />
    </>
  )
}
