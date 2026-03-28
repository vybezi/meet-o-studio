# .CalendarApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**disconnectCalendar**](CalendarApi.md#disconnectCalendar) | **POST** /calendar/disconnect | Disconnect Google Calendar
[**getCalendarStatus**](CalendarApi.md#getCalendarStatus) | **GET** /calendar/status | Check if Google Calendar is connected
[**getCalendarUsersHandler**](CalendarApi.md#getCalendarUsersHandler) | **GET** /calendar/users | Get all users with calendar connections (admin only)
[**getGoogleAuthUrl**](CalendarApi.md#getGoogleAuthUrl) | **GET** /calendar/auth/google | Get Google Calendar authorization URL
[**handleGoogleOAuthCallback**](CalendarApi.md#handleGoogleOAuthCallback) | **GET** /calendar/auth/google/callback | Handle Google OAuth callback
[**refreshCalendarTokenHandler**](CalendarApi.md#refreshCalendarTokenHandler) | **POST** /calendar/refresh | Refresh Google Calendar token


# **disconnectCalendar**
> CalendarConnectionResponse disconnectCalendar()


### Example


```typescript
import { createConfiguration, CalendarApi } from '';

const configuration = createConfiguration();
const apiInstance = new CalendarApi(configuration);

const request = {};

const data = await apiInstance.disconnectCalendar(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**CalendarConnectionResponse**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Calendar disconnected successfully |  -  |
**404** | No calendar connection found |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getCalendarStatus**
> CalendarConnectionStatus getCalendarStatus()


### Example


```typescript
import { createConfiguration, CalendarApi } from '';

const configuration = createConfiguration();
const apiInstance = new CalendarApi(configuration);

const request = {};

const data = await apiInstance.getCalendarStatus(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**CalendarConnectionStatus**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Calendar connection status |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getCalendarUsersHandler**
> Array<CalendarUser> getCalendarUsersHandler()


### Example


```typescript
import { createConfiguration, CalendarApi } from '';

const configuration = createConfiguration();
const apiInstance = new CalendarApi(configuration);

const request = {};

const data = await apiInstance.getCalendarUsersHandler(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<CalendarUser>**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | List of users with calendar connections |  -  |
**403** | Admin access required |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getGoogleAuthUrl**
> GoogleAuthUrl getGoogleAuthUrl()


### Example


```typescript
import { createConfiguration, CalendarApi } from '';
import type { CalendarApiGetGoogleAuthUrlRequest } from '';

const configuration = createConfiguration();
const apiInstance = new CalendarApi(configuration);

const request: CalendarApiGetGoogleAuthUrlRequest = {
    // Frontend URL to redirect back to after OAuth
  redirectUri: "redirect_uri_example",
};

const data = await apiInstance.getGoogleAuthUrl(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **redirectUri** | [**string**] | Frontend URL to redirect back to after OAuth | defaults to undefined


### Return type

**GoogleAuthUrl**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Authorization URL |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **handleGoogleOAuthCallback**
> handleGoogleOAuthCallback()


### Example


```typescript
import { createConfiguration, CalendarApi } from '';
import type { CalendarApiHandleGoogleOAuthCallbackRequest } from '';

const configuration = createConfiguration();
const apiInstance = new CalendarApi(configuration);

const request: CalendarApiHandleGoogleOAuthCallbackRequest = {
    // Authorization code
  code: "code_example",
    // State parameter with user, tenant, and redirect info
  state: "state_example",
    // Granted scopes
  scope: "scope_example",
};

const data = await apiInstance.handleGoogleOAuthCallback(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **code** | [**string**] | Authorization code | defaults to undefined
 **state** | [**string**] | State parameter with user, tenant, and redirect info | defaults to undefined
 **scope** | [**string**] | Granted scopes | defaults to undefined


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**302** | Redirect to frontend |  -  |
**400** | Invalid code or state |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **refreshCalendarTokenHandler**
> CalendarTokenRefreshResponse refreshCalendarTokenHandler()


### Example


```typescript
import { createConfiguration, CalendarApi } from '';

const configuration = createConfiguration();
const apiInstance = new CalendarApi(configuration);

const request = {};

const data = await apiInstance.refreshCalendarTokenHandler(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**CalendarTokenRefreshResponse**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Token refreshed successfully |  -  |
**404** | No calendar connection found |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


