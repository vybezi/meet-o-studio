# .TenantsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**checkSubdomain**](TenantsApi.md#checkSubdomain) | **POST** /public/tenants/check-subdomain | Check if a subdomain is available
[**deleteTenant**](TenantsApi.md#deleteTenant) | **DELETE** /tenants/{id} | Delete tenant
[**getAllTenants**](TenantsApi.md#getAllTenants) | **GET** /tenants | Get all tenants (admin only)
[**getTenantById**](TenantsApi.md#getTenantById) | **GET** /tenants/{id} | Get tenant by ID
[**registerTenant**](TenantsApi.md#registerTenant) | **POST** /public/tenants/register | Register a new tenant
[**toggleTenantStatus**](TenantsApi.md#toggleTenantStatus) | **PATCH** /tenants/{id}/toggle-status | Activate/deactivate tenant
[**updateTenant**](TenantsApi.md#updateTenant) | **PUT** /tenants/{id} | Update tenant


# **checkSubdomain**
> CheckSubdomainResponse checkSubdomain(checkSubdomainRequest)


### Example


```typescript
import { createConfiguration, TenantsApi } from '';
import type { TenantsApiCheckSubdomainRequest } from '';

const configuration = createConfiguration();
const apiInstance = new TenantsApi(configuration);

const request: TenantsApiCheckSubdomainRequest = {
  
  checkSubdomainRequest: {
    subdomain: "subdomain_example",
  },
};

const data = await apiInstance.checkSubdomain(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **checkSubdomainRequest** | **CheckSubdomainRequest**|  |


### Return type

**CheckSubdomainResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Subdomain availability checked |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteTenant**
> any deleteTenant()


### Example


```typescript
import { createConfiguration, TenantsApi } from '';
import type { TenantsApiDeleteTenantRequest } from '';

const configuration = createConfiguration();
const apiInstance = new TenantsApi(configuration);

const request: TenantsApiDeleteTenantRequest = {
    // Tenant ID
  id: 1,
};

const data = await apiInstance.deleteTenant(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] | Tenant ID | defaults to undefined


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Tenant deleted |  -  |
**404** | Tenant not found |  -  |
**409** | Cannot delete tenant with existing data |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAllTenants**
> Array<Tenant> getAllTenants()


### Example


```typescript
import { createConfiguration, TenantsApi } from '';

const configuration = createConfiguration();
const apiInstance = new TenantsApi(configuration);

const request = {};

const data = await apiInstance.getAllTenants(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<Tenant>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Tenants found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getTenantById**
> Tenant getTenantById()


### Example


```typescript
import { createConfiguration, TenantsApi } from '';
import type { TenantsApiGetTenantByIdRequest } from '';

const configuration = createConfiguration();
const apiInstance = new TenantsApi(configuration);

const request: TenantsApiGetTenantByIdRequest = {
    // Tenant ID
  id: 1,
};

const data = await apiInstance.getTenantById(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] | Tenant ID | defaults to undefined


### Return type

**Tenant**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Tenant found |  -  |
**404** | Tenant not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **registerTenant**
> RegisterTenantResponse registerTenant(registerTenantRequest)


### Example


```typescript
import { createConfiguration, TenantsApi } from '';
import type { TenantsApiRegisterTenantRequest } from '';

const configuration = createConfiguration();
const apiInstance = new TenantsApi(configuration);

const request: TenantsApiRegisterTenantRequest = {
  
  registerTenantRequest: {
    businessName: "businessName_example",
    businessType: "businessType_example",
    currency: "currency_example",
    email: "email_example",
    password: "password_example",
    phone: "phone_example",
    subdomain: "subdomain_example",
    timezone: "timezone_example",
  },
};

const data = await apiInstance.registerTenant(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **registerTenantRequest** | **RegisterTenantRequest**|  |


### Return type

**RegisterTenantResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Tenant created successfully |  -  |
**400** | Invalid input |  -  |
**409** | Subdomain already taken |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **toggleTenantStatus**
> Tenant toggleTenantStatus()


### Example


```typescript
import { createConfiguration, TenantsApi } from '';
import type { TenantsApiToggleTenantStatusRequest } from '';

const configuration = createConfiguration();
const apiInstance = new TenantsApi(configuration);

const request: TenantsApiToggleTenantStatusRequest = {
    // Tenant ID
  id: 1,
};

const data = await apiInstance.toggleTenantStatus(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] | Tenant ID | defaults to undefined


### Return type

**Tenant**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Tenant status toggled |  -  |
**404** | Tenant not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **updateTenant**
> Tenant updateTenant(updateTenant)


### Example


```typescript
import { createConfiguration, TenantsApi } from '';
import type { TenantsApiUpdateTenantRequest } from '';

const configuration = createConfiguration();
const apiInstance = new TenantsApi(configuration);

const request: TenantsApiUpdateTenantRequest = {
    // Tenant ID
  id: 1,
  
  updateTenant: {
    address: "address_example",
    businessType: "businessType_example",
    email: "email_example",
    isActive: true,
    logoUrl: "logoUrl_example",
    name: "name_example",
    phone: "phone_example",
    primaryColor: "primaryColor_example",
    settings: "settings_example",
    subdomain: "subdomain_example",
  },
};

const data = await apiInstance.updateTenant(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateTenant** | **UpdateTenant**|  |
 **id** | [**number**] | Tenant ID | defaults to undefined


### Return type

**Tenant**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Tenant updated |  -  |
**404** | Tenant not found |  -  |
**409** | Subdomain already taken |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


