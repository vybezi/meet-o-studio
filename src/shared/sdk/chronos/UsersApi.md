# .UsersApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**changeUserPassword**](UsersApi.md#changeUserPassword) | **POST** /users/{id}/change-password | Change user password
[**createUser**](UsersApi.md#createUser) | **POST** /users | Create a new user
[**deleteUser**](UsersApi.md#deleteUser) | **DELETE** /users/{id} | Delete a user by ID
[**getAllUsers**](UsersApi.md#getAllUsers) | **GET** /users | Get all users
[**getUserByEmail**](UsersApi.md#getUserByEmail) | **GET** /users/email/{email} | Find user by email
[**getUserById**](UsersApi.md#getUserById) | **GET** /users/{id} | Get a user by ID
[**getUsersByRole**](UsersApi.md#getUsersByRole) | **GET** /users/role/{role} | Find users by role
[**updateUser**](UsersApi.md#updateUser) | **PUT** /users/{id} | Update a user by ID


# **changeUserPassword**
> User changeUserPassword(changePasswordRequest)


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiChangeUserPasswordRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiChangeUserPasswordRequest = {
    // User ID
  id: 1,
  
  changePasswordRequest: {
    newPassword: "newPassword_example",
  },
};

const data = await apiInstance.changeUserPassword(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **changePasswordRequest** | **ChangePasswordRequest**|  |
 **id** | [**number**] | User ID | defaults to undefined


### Return type

**User**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Password changed |  -  |
**404** | User not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **createUser**
> User createUser(createNewUserRequest)


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiCreateUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiCreateUserRequest = {
  
  createNewUserRequest: {
    email: "email_example",
    name: "name_example",
    passwordHash: "passwordHash_example",
    phone: "phone_example",
    role: "role_example",
  },
};

const data = await apiInstance.createUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createNewUserRequest** | **CreateNewUserRequest**|  |


### Return type

**User**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | User created |  -  |
**409** | Email already exists |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteUser**
> any deleteUser()


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiDeleteUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiDeleteUserRequest = {
    // User ID
  id: 1,
};

const data = await apiInstance.deleteUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] | User ID | defaults to undefined


### Return type

**any**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | User deleted |  -  |
**404** | User not found |  -  |
**409** | Cannot delete user with existing bookings |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAllUsers**
> Array<User> getAllUsers()


### Example


```typescript
import { createConfiguration, UsersApi } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request = {};

const data = await apiInstance.getAllUsers(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<User>**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Users found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getUserByEmail**
> User getUserByEmail()


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiGetUserByEmailRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiGetUserByEmailRequest = {
    // User email
  email: "email_example",
};

const data = await apiInstance.getUserByEmail(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **email** | [**string**] | User email | defaults to undefined


### Return type

**User**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | User found |  -  |
**404** | User not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getUserById**
> User getUserById()


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiGetUserByIdRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiGetUserByIdRequest = {
    // User ID
  id: 1,
};

const data = await apiInstance.getUserById(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] | User ID | defaults to undefined


### Return type

**User**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | User found |  -  |
**404** | User not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getUsersByRole**
> Array<User> getUsersByRole()


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiGetUsersByRoleRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiGetUsersByRoleRequest = {
    // User role (client, admin, staff)
  role: "role_example",
};

const data = await apiInstance.getUsersByRole(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **role** | [**string**] | User role (client, admin, staff) | defaults to undefined


### Return type

**Array<User>**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Users found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **updateUser**
> User updateUser(updateUser)


### Example


```typescript
import { createConfiguration, UsersApi } from '';
import type { UsersApiUpdateUserRequest } from '';

const configuration = createConfiguration();
const apiInstance = new UsersApi(configuration);

const request: UsersApiUpdateUserRequest = {
    // User ID
  id: 1,
  
  updateUser: {
    email: "email_example",
    name: "name_example",
    phone: "phone_example",
    role: "role_example",
  },
};

const data = await apiInstance.updateUser(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateUser** | **UpdateUser**|  |
 **id** | [**number**] | User ID | defaults to undefined


### Return type

**User**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | User updated |  -  |
**404** | User not found |  -  |
**409** | Email already exists |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


