# .AuthApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getCurrentUser**](AuthApi.md#getCurrentUser) | **GET** /auth/me | Get current user profile
[**login**](AuthApi.md#login) | **POST** /auth/login | Login to the system


# **getCurrentUser**
> UserResponse getCurrentUser()


### Example


```typescript
import { createConfiguration, AuthApi } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request = {};

const data = await apiInstance.getCurrentUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**UserResponse**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | User profile |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **login**
> LoginResponse login(loginRequest)


### Example


```typescript
import { createConfiguration, AuthApi } from '';
import type { AuthApiLoginRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AuthApi(configuration);

const request: AuthApiLoginRequest = {
  
  loginRequest: {
    email: "email_example",
    password: "password_example",
  },
};

const data = await apiInstance.login(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **loginRequest** | **LoginRequest**|  |


### Return type

**LoginResponse**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Login successful |  -  |
**401** | Invalid credentials |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


