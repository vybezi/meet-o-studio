# .ServicesApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**cleanupInactiveServices**](ServicesApi.md#cleanupInactiveServices) | **DELETE** /services/cleanup | Delete all inactive services
[**createBulkServices**](ServicesApi.md#createBulkServices) | **POST** /services/bulk | Create multiple services at once
[**createService**](ServicesApi.md#createService) | **POST** /services | Create a new service
[**deleteService**](ServicesApi.md#deleteService) | **DELETE** /services/{id} | Delete a service
[**getActiveServices**](ServicesApi.md#getActiveServices) | **GET** /services/active | Get all active services
[**getAllServices**](ServicesApi.md#getAllServices) | **GET** /services | Get all services with optional filtering
[**getServiceById**](ServicesApi.md#getServiceById) | **GET** /services/{id} | Get a service by ID
[**getServiceByName**](ServicesApi.md#getServiceByName) | **GET** /services/name/{name} | Find service by exact name
[**getServiceStats**](ServicesApi.md#getServiceStats) | **GET** /services/stats | Get service statistics
[**getServicesByDuration**](ServicesApi.md#getServicesByDuration) | **GET** /services/duration/{min}/{max} | Find services by duration range
[**getServicesByPrice**](ServicesApi.md#getServicesByPrice) | **GET** /services/price/{min}/{max} | Find services by price range
[**searchServices**](ServicesApi.md#searchServices) | **GET** /services/search/{term} | Search services by name or description
[**toggleServiceStatus**](ServicesApi.md#toggleServiceStatus) | **PATCH** /services/{id}/toggle | Toggle service active status
[**updateService**](ServicesApi.md#updateService) | **PUT** /services/{id} | Update a service


# **cleanupInactiveServices**
> any cleanupInactiveServices()


### Example


```typescript
import { createConfiguration, ServicesApi } from '';

const configuration = createConfiguration();
const apiInstance = new ServicesApi(configuration);

const request = {};

const data = await apiInstance.cleanupInactiveServices(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


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
**200** | Inactive services deleted |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **createBulkServices**
> BulkServiceResponse createBulkServices(bulkServiceRequest)


### Example


```typescript
import { createConfiguration, ServicesApi } from '';
import type { ServicesApiCreateBulkServicesRequest } from '';

const configuration = createConfiguration();
const apiInstance = new ServicesApi(configuration);

const request: ServicesApiCreateBulkServicesRequest = {
  
  bulkServiceRequest: {
    services: [
      {
        addons: "addons_example",
        categoryId: 1,
        color: "color_example",
        currency: "currency_example",
        description: "description_example",
        durationMinutes: 1,
        imageUrl: "imageUrl_example",
        isActive: true,
        name: "name_example",
        priceCents: 1,
        tenantId: 1,
      },
    ],
  },
};

const data = await apiInstance.createBulkServices(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **bulkServiceRequest** | **BulkServiceRequest**|  |


### Return type

**BulkServiceResponse**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Services created |  -  |
**400** | Invalid request |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **createService**
> ServiceResponse createService(createNewServiceRequest)


### Example


```typescript
import { createConfiguration, ServicesApi } from '';
import type { ServicesApiCreateServiceRequest } from '';

const configuration = createConfiguration();
const apiInstance = new ServicesApi(configuration);

const request: ServicesApiCreateServiceRequest = {
  
  createNewServiceRequest: {
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
    categoryId: 1,
    color: "color_example",
    currency: "currency_example",
    description: "description_example",
    durationMinutes: 1,
    imageUrl: "imageUrl_example",
    isActive: true,
    name: "name_example",
    priceCents: 1,
  },
};

const data = await apiInstance.createService(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createNewServiceRequest** | **CreateNewServiceRequest**|  |


### Return type

**ServiceResponse**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Service created |  -  |
**400** | Invalid request |  -  |
**409** | Service with this name already exists |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteService**
> any deleteService()


### Example


```typescript
import { createConfiguration, ServicesApi } from '';
import type { ServicesApiDeleteServiceRequest } from '';

const configuration = createConfiguration();
const apiInstance = new ServicesApi(configuration);

const request: ServicesApiDeleteServiceRequest = {
    // Service ID
  id: 1,
};

const data = await apiInstance.deleteService(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] | Service ID | defaults to undefined


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
**200** | Service deleted |  -  |
**404** | Service not found |  -  |
**409** | Cannot delete service with existing bookings |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getActiveServices**
> Array<ServiceResponse> getActiveServices()


### Example


```typescript
import { createConfiguration, ServicesApi } from '';

const configuration = createConfiguration();
const apiInstance = new ServicesApi(configuration);

const request = {};

const data = await apiInstance.getActiveServices(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<ServiceResponse>**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Active services found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAllServices**
> Array<ServiceResponse> getAllServices()


### Example


```typescript
import { createConfiguration, ServicesApi } from '';
import type { ServicesApiGetAllServicesRequest } from '';

const configuration = createConfiguration();
const apiInstance = new ServicesApi(configuration);

const request: ServicesApiGetAllServicesRequest = {
  
  activeOnly: true,
  
  minDuration: 1,
  
  maxDuration: 1,
  
  minPrice: 1,
  
  maxPrice: 1,
  
  search: "search_example",
};

const data = await apiInstance.getAllServices(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activeOnly** | [**boolean**] |  | (optional) defaults to undefined
 **minDuration** | [**number**] |  | (optional) defaults to undefined
 **maxDuration** | [**number**] |  | (optional) defaults to undefined
 **minPrice** | [**number**] |  | (optional) defaults to undefined
 **maxPrice** | [**number**] |  | (optional) defaults to undefined
 **search** | [**string**] |  | (optional) defaults to undefined


### Return type

**Array<ServiceResponse>**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Services found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getServiceById**
> ServiceResponse getServiceById()


### Example


```typescript
import { createConfiguration, ServicesApi } from '';
import type { ServicesApiGetServiceByIdRequest } from '';

const configuration = createConfiguration();
const apiInstance = new ServicesApi(configuration);

const request: ServicesApiGetServiceByIdRequest = {
    // Service ID
  id: 1,
};

const data = await apiInstance.getServiceById(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] | Service ID | defaults to undefined


### Return type

**ServiceResponse**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Service found |  -  |
**404** | Service not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getServiceByName**
> ServiceResponse getServiceByName()


### Example


```typescript
import { createConfiguration, ServicesApi } from '';
import type { ServicesApiGetServiceByNameRequest } from '';

const configuration = createConfiguration();
const apiInstance = new ServicesApi(configuration);

const request: ServicesApiGetServiceByNameRequest = {
    // Service name
  name: "name_example",
};

const data = await apiInstance.getServiceByName(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | [**string**] | Service name | defaults to undefined


### Return type

**ServiceResponse**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Service found |  -  |
**404** | Service not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getServiceStats**
> ServiceStatsResponse getServiceStats()


### Example


```typescript
import { createConfiguration, ServicesApi } from '';

const configuration = createConfiguration();
const apiInstance = new ServicesApi(configuration);

const request = {};

const data = await apiInstance.getServiceStats(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**ServiceStatsResponse**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Statistics found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getServicesByDuration**
> Array<ServiceResponse> getServicesByDuration()


### Example


```typescript
import { createConfiguration, ServicesApi } from '';
import type { ServicesApiGetServicesByDurationRequest } from '';

const configuration = createConfiguration();
const apiInstance = new ServicesApi(configuration);

const request: ServicesApiGetServicesByDurationRequest = {
    // Minimum duration in minutes
  min: 1,
    // Maximum duration in minutes
  max: 1,
};

const data = await apiInstance.getServicesByDuration(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **min** | [**number**] | Minimum duration in minutes | defaults to undefined
 **max** | [**number**] | Maximum duration in minutes | defaults to undefined


### Return type

**Array<ServiceResponse>**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Services found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getServicesByPrice**
> Array<ServiceResponse> getServicesByPrice()


### Example


```typescript
import { createConfiguration, ServicesApi } from '';
import type { ServicesApiGetServicesByPriceRequest } from '';

const configuration = createConfiguration();
const apiInstance = new ServicesApi(configuration);

const request: ServicesApiGetServicesByPriceRequest = {
    // Minimum price in cents
  min: 1,
    // Maximum price in cents
  max: 1,
};

const data = await apiInstance.getServicesByPrice(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **min** | [**number**] | Minimum price in cents | defaults to undefined
 **max** | [**number**] | Maximum price in cents | defaults to undefined


### Return type

**Array<ServiceResponse>**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Services found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **searchServices**
> Array<ServiceResponse> searchServices()


### Example


```typescript
import { createConfiguration, ServicesApi } from '';
import type { ServicesApiSearchServicesRequest } from '';

const configuration = createConfiguration();
const apiInstance = new ServicesApi(configuration);

const request: ServicesApiSearchServicesRequest = {
    // Search term
  term: "term_example",
};

const data = await apiInstance.searchServices(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **term** | [**string**] | Search term | defaults to undefined


### Return type

**Array<ServiceResponse>**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Search results |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **toggleServiceStatus**
> ServiceResponse toggleServiceStatus()


### Example


```typescript
import { createConfiguration, ServicesApi } from '';
import type { ServicesApiToggleServiceStatusRequest } from '';

const configuration = createConfiguration();
const apiInstance = new ServicesApi(configuration);

const request: ServicesApiToggleServiceStatusRequest = {
    // Service ID
  id: 1,
};

const data = await apiInstance.toggleServiceStatus(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] | Service ID | defaults to undefined


### Return type

**ServiceResponse**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Service status toggled |  -  |
**404** | Service not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **updateService**
> ServiceResponse updateService(updateServiceRequest)


### Example


```typescript
import { createConfiguration, ServicesApi } from '';
import type { ServicesApiUpdateServiceRequest } from '';

const configuration = createConfiguration();
const apiInstance = new ServicesApi(configuration);

const request: ServicesApiUpdateServiceRequest = {
    // Service ID
  id: 1,
  
  updateServiceRequest: {
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
    categoryId: 1,
    color: "color_example",
    currency: "currency_example",
    description: "description_example",
    durationMinutes: 1,
    imageUrl: "imageUrl_example",
    isActive: true,
    name: "name_example",
    priceCents: 1,
  },
};

const data = await apiInstance.updateService(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateServiceRequest** | **UpdateServiceRequest**|  |
 **id** | [**number**] | Service ID | defaults to undefined


### Return type

**ServiceResponse**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Service updated |  -  |
**404** | Service not found |  -  |
**409** | Service with this name already exists |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


