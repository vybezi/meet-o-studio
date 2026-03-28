# .BookingsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**cancelBookingAuth**](BookingsApi.md#cancelBookingAuth) | **PATCH** /bookings/{id}/cancel | Cancel a booking (authenticated)
[**cancelBookingMagic**](BookingsApi.md#cancelBookingMagic) | **PATCH** /bookings/{id}/cancel-magic | Cancel a booking via magic link
[**checkBookingAvailability**](BookingsApi.md#checkBookingAvailability) | **POST** /bookings/check-availability | Check if a time slot is available
[**completeBooking**](BookingsApi.md#completeBooking) | **PATCH** /bookings/{id}/complete | Mark a booking as completed
[**confirmBooking**](BookingsApi.md#confirmBooking) | **PATCH** /bookings/{id}/confirm | Confirm a booking
[**createBooking**](BookingsApi.md#createBooking) | **POST** /bookings | Create a new booking
[**deleteBooking**](BookingsApi.md#deleteBooking) | **DELETE** /bookings/{id} | Delete a booking
[**getAllBookings**](BookingsApi.md#getAllBookings) | **GET** /bookings | Get all bookings with optional filtering
[**getBookingById**](BookingsApi.md#getBookingById) | **GET** /bookings/{id} | Get a booking by ID
[**getBookingByToken**](BookingsApi.md#getBookingByToken) | **GET** /bookings/manage | Get booking by magic link token
[**getBookingWithDetails**](BookingsApi.md#getBookingWithDetails) | **GET** /bookings/{id}/details | Get a booking with user and service details
[**getBookingsByDate**](BookingsApi.md#getBookingsByDate) | **GET** /bookings/date/{date} | Get bookings by date
[**getBookingsByStaff**](BookingsApi.md#getBookingsByStaff) | **GET** /bookings/staff/{staff_id} | Get bookings by staff ID
[**getBookingsByStatus**](BookingsApi.md#getBookingsByStatus) | **GET** /bookings/status/{status} | Get bookings by status
[**getBookingsByUser**](BookingsApi.md#getBookingsByUser) | **GET** /bookings/user/{user_id} | Get bookings by user ID
[**getUpcomingBookings**](BookingsApi.md#getUpcomingBookings) | **GET** /bookings/upcoming/{days} | Get upcoming bookings
[**rescheduleBookingMagic**](BookingsApi.md#rescheduleBookingMagic) | **PATCH** /bookings/{id}/reschedule-magic | Reschedule a booking via magic link
[**updateBooking**](BookingsApi.md#updateBooking) | **PUT** /bookings/{id} | Update a booking
[**updateBookingStatus**](BookingsApi.md#updateBookingStatus) | **PATCH** /bookings/{id}/status | Update booking status


# **cancelBookingAuth**
> BookingResponse cancelBookingAuth()


### Example


```typescript
import { createConfiguration, BookingsApi } from '';
import type { BookingsApiCancelBookingAuthRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BookingsApi(configuration);

const request: BookingsApiCancelBookingAuthRequest = {
    // Booking ID
  id: 1,
};

const data = await apiInstance.cancelBookingAuth(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] | Booking ID | defaults to undefined


### Return type

**BookingResponse**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Booking cancelled |  -  |
**401** | Unauthorized |  -  |
**404** | Booking not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **cancelBookingMagic**
> BookingResponse cancelBookingMagic()


### Example


```typescript
import { createConfiguration, BookingsApi } from '';
import type { BookingsApiCancelBookingMagicRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BookingsApi(configuration);

const request: BookingsApiCancelBookingMagicRequest = {
    // Booking ID
  id: 1,
    // Magic link token
  token: "token_example",
};

const data = await apiInstance.cancelBookingMagic(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] | Booking ID | defaults to undefined
 **token** | [**string**] | Magic link token | defaults to undefined


### Return type

**BookingResponse**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Booking cancelled |  -  |
**401** | Invalid token |  -  |
**404** | Booking not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **checkBookingAvailability**
> AvailabilityResponse checkBookingAvailability(checkAvailabilityRequest)


### Example


```typescript
import { createConfiguration, BookingsApi } from '';
import type { BookingsApiCheckBookingAvailabilityRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BookingsApi(configuration);

const request: BookingsApiCheckBookingAvailabilityRequest = {
  
  checkAvailabilityRequest: {
    date: new Date('1970-01-01').toISOString().split('T')[0];,
    serviceId: 1,
  },
};

const data = await apiInstance.checkBookingAvailability(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **checkAvailabilityRequest** | **CheckAvailabilityRequest**|  |


### Return type

**AvailabilityResponse**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Availability check result |  -  |
**400** | Invalid request |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **completeBooking**
> BookingResponse completeBooking()


### Example


```typescript
import { createConfiguration, BookingsApi } from '';
import type { BookingsApiCompleteBookingRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BookingsApi(configuration);

const request: BookingsApiCompleteBookingRequest = {
    // Booking ID
  id: 1,
};

const data = await apiInstance.completeBooking(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] | Booking ID | defaults to undefined


### Return type

**BookingResponse**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Booking completed |  -  |
**404** | Booking not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **confirmBooking**
> BookingResponse confirmBooking()


### Example


```typescript
import { createConfiguration, BookingsApi } from '';
import type { BookingsApiConfirmBookingRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BookingsApi(configuration);

const request: BookingsApiConfirmBookingRequest = {
    // Booking ID
  id: 1,
};

const data = await apiInstance.confirmBooking(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] | Booking ID | defaults to undefined


### Return type

**BookingResponse**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Booking confirmed |  -  |
**404** | Booking not found |  -  |
**409** | Booking cannot be confirmed |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **createBooking**
> MagicLinkResponse createBooking(createBookingRequest)


### Example


```typescript
import { createConfiguration, BookingsApi } from '';
import type { BookingsApiCreateBookingRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BookingsApi(configuration);

const request: BookingsApiCreateBookingRequest = {
  
  createBookingRequest: {
    addons: [
      {
        currency: "currency_example",
        description: "description_example",
        id: "id_example",
        isAvailable: true,
        name: "name_example",
        price: 1,
        requiresQuote: true,
      },
    ],
    bookingDate: new Date('1970-01-01').toISOString().split('T')[0];,
    bookingTime: "bookingTime_example",
    currency: "currency_example",
    frontendUrl: "frontendUrl_example",
    guestEmail: "guestEmail_example",
    guestName: "guestName_example",
    guestPhone: "guestPhone_example",
    notes: "notes_example",
    priceCents: 1,
    serviceId: 1,
    staffId: 1,
    userId: 1,
  },
};

const data = await apiInstance.createBooking(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createBookingRequest** | **CreateBookingRequest**|  |


### Return type

**MagicLinkResponse**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Booking created |  -  |
**400** | Invalid request |  -  |
**409** | Time slot already booked |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteBooking**
> any deleteBooking()


### Example


```typescript
import { createConfiguration, BookingsApi } from '';
import type { BookingsApiDeleteBookingRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BookingsApi(configuration);

const request: BookingsApiDeleteBookingRequest = {
    // Booking ID
  id: 1,
};

const data = await apiInstance.deleteBooking(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] | Booking ID | defaults to undefined


### Return type

**any**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Booking deleted |  -  |
**404** | Booking not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAllBookings**
> Array<BookingResponse> getAllBookings()


### Example


```typescript
import { createConfiguration, BookingsApi } from '';
import type { BookingsApiGetAllBookingsRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BookingsApi(configuration);

const request: BookingsApiGetAllBookingsRequest = {
  
  userId: 1,
  
  staffId: 1,
  
  guestEmail: "guest_email_example",
  
  serviceId: 1,
  
  status: "status_example",
  
  dateFrom: new Date('1970-01-01').toISOString().split('T')[0];,
  
  dateTo: new Date('1970-01-01').toISOString().split('T')[0];,
};

const data = await apiInstance.getAllBookings(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | [**number**] |  | (optional) defaults to undefined
 **staffId** | [**number**] |  | (optional) defaults to undefined
 **guestEmail** | [**string**] |  | (optional) defaults to undefined
 **serviceId** | [**number**] |  | (optional) defaults to undefined
 **status** | [**string**] |  | (optional) defaults to undefined
 **dateFrom** | [**string**] |  | (optional) defaults to undefined
 **dateTo** | [**string**] |  | (optional) defaults to undefined


### Return type

**Array<BookingResponse>**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Bookings found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getBookingById**
> BookingResponse getBookingById()


### Example


```typescript
import { createConfiguration, BookingsApi } from '';
import type { BookingsApiGetBookingByIdRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BookingsApi(configuration);

const request: BookingsApiGetBookingByIdRequest = {
    // Booking ID
  id: 1,
};

const data = await apiInstance.getBookingById(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] | Booking ID | defaults to undefined


### Return type

**BookingResponse**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Booking found |  -  |
**404** | Booking not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getBookingByToken**
> BookingWithDetails getBookingByToken()


### Example


```typescript
import { createConfiguration, BookingsApi } from '';
import type { BookingsApiGetBookingByTokenRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BookingsApi(configuration);

const request: BookingsApiGetBookingByTokenRequest = {
    // Magic link token
  token: "token_example",
};

const data = await apiInstance.getBookingByToken(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **token** | [**string**] | Magic link token | defaults to undefined


### Return type

**BookingWithDetails**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Booking found |  -  |
**401** | Invalid or expired token |  -  |
**404** | Booking not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getBookingWithDetails**
> BookingWithDetails getBookingWithDetails()


### Example


```typescript
import { createConfiguration, BookingsApi } from '';
import type { BookingsApiGetBookingWithDetailsRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BookingsApi(configuration);

const request: BookingsApiGetBookingWithDetailsRequest = {
    // Booking ID
  id: 1,
};

const data = await apiInstance.getBookingWithDetails(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] | Booking ID | defaults to undefined


### Return type

**BookingWithDetails**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Booking details found |  -  |
**404** | Booking not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getBookingsByDate**
> Array<BookingResponse> getBookingsByDate()


### Example


```typescript
import { createConfiguration, BookingsApi } from '';
import type { BookingsApiGetBookingsByDateRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BookingsApi(configuration);

const request: BookingsApiGetBookingsByDateRequest = {
    // Date (YYYY-MM-DD)
  date: "date_example",
};

const data = await apiInstance.getBookingsByDate(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **date** | [**string**] | Date (YYYY-MM-DD) | defaults to undefined


### Return type

**Array<BookingResponse>**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Bookings found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getBookingsByStaff**
> Array<BookingResponse> getBookingsByStaff()


### Example


```typescript
import { createConfiguration, BookingsApi } from '';
import type { BookingsApiGetBookingsByStaffRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BookingsApi(configuration);

const request: BookingsApiGetBookingsByStaffRequest = {
    // Staff user ID
  staffId: 1,
    // Start date (optional)
  dateFrom: new Date('1970-01-01').toISOString().split('T')[0];,
    // End date (optional)
  dateTo: new Date('1970-01-01').toISOString().split('T')[0];,
    // Filter by status (optional)
  status: "status_example",
};

const data = await apiInstance.getBookingsByStaff(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **staffId** | [**number**] | Staff user ID | defaults to undefined
 **dateFrom** | [**string**] | Start date | (optional) defaults to undefined
 **dateTo** | [**string**] | End date | (optional) defaults to undefined
 **status** | [**string**] | Filter by status | (optional) defaults to undefined


### Return type

**Array<BookingResponse>**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Bookings found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getBookingsByStatus**
> Array<BookingResponse> getBookingsByStatus()


### Example


```typescript
import { createConfiguration, BookingsApi } from '';
import type { BookingsApiGetBookingsByStatusRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BookingsApi(configuration);

const request: BookingsApiGetBookingsByStatusRequest = {
    // Booking status (pending, confirmed, cancelled, completed, no_show)
  status: "status_example",
};

const data = await apiInstance.getBookingsByStatus(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **status** | [**string**] | Booking status (pending, confirmed, cancelled, completed, no_show) | defaults to undefined


### Return type

**Array<BookingResponse>**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Bookings found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getBookingsByUser**
> Array<BookingResponse> getBookingsByUser()


### Example


```typescript
import { createConfiguration, BookingsApi } from '';
import type { BookingsApiGetBookingsByUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BookingsApi(configuration);

const request: BookingsApiGetBookingsByUserRequest = {
    // User ID
  userId: 1,
};

const data = await apiInstance.getBookingsByUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | [**number**] | User ID | defaults to undefined


### Return type

**Array<BookingResponse>**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Bookings found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getUpcomingBookings**
> Array<BookingResponse> getUpcomingBookings()


### Example


```typescript
import { createConfiguration, BookingsApi } from '';
import type { BookingsApiGetUpcomingBookingsRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BookingsApi(configuration);

const request: BookingsApiGetUpcomingBookingsRequest = {
    // Number of days ahead
  days: 1,
};

const data = await apiInstance.getUpcomingBookings(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **days** | [**number**] | Number of days ahead | defaults to undefined


### Return type

**Array<BookingResponse>**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Upcoming bookings found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **rescheduleBookingMagic**
> BookingResponse rescheduleBookingMagic(rescheduleMagicRequest)


### Example


```typescript
import { createConfiguration, BookingsApi } from '';
import type { BookingsApiRescheduleBookingMagicRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BookingsApi(configuration);

const request: BookingsApiRescheduleBookingMagicRequest = {
    // Booking ID
  id: 1,
  
  rescheduleMagicRequest: {
    bookingDate: new Date('1970-01-01').toISOString().split('T')[0];,
    bookingTime: "bookingTime_example",
    token: "token_example",
  },
};

const data = await apiInstance.rescheduleBookingMagic(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **rescheduleMagicRequest** | **RescheduleMagicRequest**|  |
 **id** | [**number**] | Booking ID | defaults to undefined


### Return type

**BookingResponse**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Booking rescheduled |  -  |
**401** | Invalid token |  -  |
**404** | Booking not found |  -  |
**409** | Time slot already booked |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **updateBooking**
> BookingResponse updateBooking(updateBooking)


### Example


```typescript
import { createConfiguration, BookingsApi } from '';
import type { BookingsApiUpdateBookingRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BookingsApi(configuration);

const request: BookingsApiUpdateBookingRequest = {
    // Booking ID
  id: 1,
  
  updateBooking: {
    addons: "addons_example",
    bookingDate: new Date('1970-01-01').toISOString().split('T')[0];,
    bookingTime: "bookingTime_example",
    calendarEventId: "calendarEventId_example",
    calendarSynced: true,
    calendarSyncedAt: new Date('1970-01-01T00:00:00.00Z'),
    currency: "currency_example",
    durationMinutes: 1,
    guestEmail: "guestEmail_example",
    guestName: "guestName_example",
    guestPhone: "guestPhone_example",
    notes: "notes_example",
    priceCents: 1,
    serviceId: 1,
    staffId: 1,
    status: "status_example",
    userId: 1,
  },
};

const data = await apiInstance.updateBooking(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateBooking** | **UpdateBooking**|  |
 **id** | [**number**] | Booking ID | defaults to undefined


### Return type

**BookingResponse**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Booking updated |  -  |
**404** | Booking not found |  -  |
**409** | Time slot already booked |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **updateBookingStatus**
> BookingResponse updateBookingStatus(updateStatusRequest)


### Example


```typescript
import { createConfiguration, BookingsApi } from '';
import type { BookingsApiUpdateBookingStatusRequest } from '';

const configuration = createConfiguration();
const apiInstance = new BookingsApi(configuration);

const request: BookingsApiUpdateBookingStatusRequest = {
    // Booking ID
  id: 1,
  
  updateStatusRequest: {
    status: "status_example",
  },
};

const data = await apiInstance.updateBookingStatus(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateStatusRequest** | **UpdateStatusRequest**|  |
 **id** | [**number**] | Booking ID | defaults to undefined


### Return type

**BookingResponse**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Status updated |  -  |
**404** | Booking not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


