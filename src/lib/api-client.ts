import {
  AvailabilityApi,
  BookingsApi,
  CategoriesApi,
  createConfiguration,
  HttpMethod,
  IsomorphicFetchHttpLibrary,
  RequestContext,
  ResponseContext,
  ServicesApi,
  TenantsApi,
  UsersApi,
  AuthApi,
  CalendarApi,
} from '@/shared/sdk/chronos'

// Get tenant ID from environment or cookie
export const getTenantId = (): string => {
  return process.env.NEXT_PUBLIC_TENANT_ID || '1'
}

// Get base URL from environment
export const getBaseUrl = (): string => {
  // return process.env.NEXT_PUBLIC_API_URL || 'https://chronos-api.silascoley.com'
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
}

// Get auth token from localStorage
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token')
  }
  return null
}

// Create the configuration with middleware
const createApiConfiguration = (tenantId?: string, customBasePath?: string) => {
  const baseUrl = customBasePath || getBaseUrl()
  const tid = tenantId || getTenantId()

  // Create the base server configuration
  const baseServer = {
    makeRequestContext: (endpoint: string, httpMethod: HttpMethod) => {
      const url = `${baseUrl}${endpoint}`
      const requestContext = new RequestContext(url, httpMethod)

      // Set headers directly on the request context
      requestContext.setHeaderParam('x-tenant-id', tid)
      requestContext.setHeaderParam('Content-Type', 'application/json')

      // Add auth token if available
      const token = getAuthToken()
      if (token) {
        requestContext.setHeaderParam('Authorization', `Bearer ${token}`)
      }

      return requestContext
    },
  }

  return createConfiguration({
    baseServer,
    httpApi: new IsomorphicFetchHttpLibrary(),
    promiseMiddleware: [
      {
        pre(request: RequestContext): Promise<RequestContext> {
          // Log requests in development
          if (process.env.NODE_ENV === 'development') {
            console.log(`🔐 Request to: ${request.getUrl()}`)
            console.log(`📋 Headers:`, request.getHeaders())
          }
          return Promise.resolve(request)
        },
        post(response: ResponseContext): Promise<ResponseContext> {
          // Handle 401 Unauthorized - redirect to login
          if (
            response.httpStatusCode === 401 &&
            typeof window !== 'undefined'
          ) {
            console.log(
              'Authentication failed, redirecting to login...',
              response,
            )
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user_role')
            localStorage.removeItem('tenant_id')
            localStorage.removeItem('user_name')
            localStorage.removeItem('user_email')
            localStorage.removeItem('user_id')
            window.location.href = '/auth'
          }
          return Promise.resolve(response)
        },
      },
    ],
  })
}

// Create a singleton configuration
const defaultConfig = createApiConfiguration()

// Export configured API instances
export const api = {
  categories: new CategoriesApi(defaultConfig),
  bookings: new BookingsApi(defaultConfig),
  availability: new AvailabilityApi(defaultConfig),
  services: new ServicesApi(defaultConfig),
  users: new UsersApi(defaultConfig),
  tenants: new TenantsApi(defaultConfig),
  auth: new AuthApi(defaultConfig),
  calendar: new CalendarApi(defaultConfig),
}

// For creating APIs with custom tenant ID
export const createTenantApi = (tenantId: string, customBasePath?: string) => {
  const config = createApiConfiguration(tenantId, customBasePath)
  return {
    categories: new CategoriesApi(config),
    bookings: new BookingsApi(config),
    availability: new AvailabilityApi(config),
    services: new ServicesApi(config),
    users: new UsersApi(config),
    tenants: new TenantsApi(config),
  }
}

// For server-side usage
export const createServerApi = (
  tenantId: string,
  token?: string,
  basePath?: string,
) => {
  const baseUrl = basePath || getBaseUrl()

  const baseServer = {
    makeRequestContext: (endpoint: string, httpMethod: HttpMethod) => {
      const url = `${baseUrl}${endpoint}`
      const requestContext = new RequestContext(url, httpMethod)

      // Set headers directly
      requestContext.setHeaderParam('x-tenant-id', tenantId)
      requestContext.setHeaderParam('Content-Type', 'application/json')

      // Add auth token if provided for server-side
      if (token) {
        requestContext.setHeaderParam('Authorization', `Bearer ${token}`)
      }

      return requestContext
    },
  }

  const config = createConfiguration({
    baseServer,
    httpApi: new IsomorphicFetchHttpLibrary(),
    promiseMiddleware: [],
  })

  return {
    categories: new CategoriesApi(config),
    bookings: new BookingsApi(config),
    availability: new AvailabilityApi(config),
    services: new ServicesApi(config),
    users: new UsersApi(config),
    tenants: new TenantsApi(config),
  }
}
