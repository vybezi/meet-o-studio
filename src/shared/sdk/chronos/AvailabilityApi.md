# .AvailabilityApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**checkTimeSlot**](AvailabilityApi.md#checkTimeSlot) | **GET** /availability/check | Check if a staff member is available at a specific time
[**createAvailability**](AvailabilityApi.md#createAvailability) | **POST** /availability | Create a new availability slot
[**createBulkAvailability**](AvailabilityApi.md#createBulkAvailability) | **POST** /availability/bulk | Create multiple availability slots at once
[**deleteAvailability**](AvailabilityApi.md#deleteAvailability) | **DELETE** /availability/{id} | Delete an availability slot
[**deleteAvailabilityByDate**](AvailabilityApi.md#deleteAvailabilityByDate) | **DELETE** /availability/date/{staff_id}/{date} | Delete all availability for a specific date
[**generateAvailableSlots**](AvailabilityApi.md#generateAvailableSlots) | **POST** /availability/generate-slots | Generate available time slots for a specific date and service
[**getAllAvailability**](AvailabilityApi.md#getAllAvailability) | **GET** /availability | Get all availability slots with optional filtering
[**getAvailabilityByDate**](AvailabilityApi.md#getAvailabilityByDate) | **GET** /availability/date/{date} | Get availability for a specific date
[**getAvailabilityByDay**](AvailabilityApi.md#getAvailabilityByDay) | **GET** /availability/day/{day} | Get availability by day of week
[**getAvailabilityById**](AvailabilityApi.md#getAvailabilityById) | **GET** /availability/{id} | Get an availability slot by ID
[**getAvailabilityByStaff**](AvailabilityApi.md#getAvailabilityByStaff) | **GET** /availability/staff/{staff_id} | Get availability by staff ID
[**getRecurringAvailabilityByStaff**](AvailabilityApi.md#getRecurringAvailabilityByStaff) | **GET** /availability/staff/{staff_id}/recurring | Get recurring availability by staff ID
[**getSpecificAvailabilityByStaff**](AvailabilityApi.md#getSpecificAvailabilityByStaff) | **GET** /availability/staff/{staff_id}/specific | Get specific date availability by staff ID
[**updateAvailability**](AvailabilityApi.md#updateAvailability) | **PUT** /availability/{id} | Update an availability slot


# **checkTimeSlot**
> AvailabilityCheckResponse checkTimeSlot()


### Example


```typescript
import { createConfiguration, AvailabilityApi } from '';
import type { AvailabilityApiCheckTimeSlotRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AvailabilityApi(configuration);

const request: AvailabilityApiCheckTimeSlotRequest = {
    // Staff user ID
  staffId: 1,
    // Date (YYYY-MM-DD)
  date: "date_example",
    // Time (HH:MM)
  time: "time_example",
    // Duration in minutes
  duration: 1,
};

const data = await apiInstance.checkTimeSlot(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **staffId** | [**number**] | Staff user ID | defaults to undefined
 **date** | [**string**] | Date (YYYY-MM-DD) | defaults to undefined
 **time** | [**string**] | Time (HH:MM) | defaults to undefined
 **duration** | [**number**] | Duration in minutes | defaults to undefined


### Return type

**AvailabilityCheckResponse**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Availability check result |  -  |
**400** | Invalid parameters |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **createAvailability**
> Availability createAvailability(createNewAvailabilityRequest)


### Example


```typescript
import { createConfiguration, AvailabilityApi } from '';
import type { AvailabilityApiCreateAvailabilityRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AvailabilityApi(configuration);

const request: AvailabilityApiCreateAvailabilityRequest = {
  
  createNewAvailabilityRequest: {
    dayOfWeek: 1,
    endTime: "endTime_example",
    isRecurring: true,
    specificDate: new Date('1970-01-01').toISOString().split('T')[0];,
    staffId: 1,
    startTime: "startTime_example",
  },
};

const data = await apiInstance.createAvailability(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createNewAvailabilityRequest** | **CreateNewAvailabilityRequest**|  |


### Return type

**Availability**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Availability created |  -  |
**400** | Invalid request |  -  |
**409** | Overlapping availability |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **createBulkAvailability**
> Array<Availability> createBulkAvailability(bulkAvailabilityRequest)


### Example


```typescript
import { createConfiguration, AvailabilityApi } from '';
import type { AvailabilityApiCreateBulkAvailabilityRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AvailabilityApi(configuration);

const request: AvailabilityApiCreateBulkAvailabilityRequest = {
  
  bulkAvailabilityRequest: [
    {
      dayOfWeek: 1,
      endTime: "endTime_example",
      isRecurring: true,
      specificDate: new Date('1970-01-01').toISOString().split('T')[0];,
      staffId: 1,
      startTime: "startTime_example",
    },
  ],
};

const data = await apiInstance.createBulkAvailability(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **bulkAvailabilityRequest** | **Array<BulkAvailabilityRequest>**|  |


### Return type

**Array<Availability>**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Availability slots created |  -  |
**400** | Invalid request |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteAvailability**
> any deleteAvailability()


### Example


```typescript
import { createConfiguration, AvailabilityApi } from '';
import type { AvailabilityApiDeleteAvailabilityRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AvailabilityApi(configuration);

const request: AvailabilityApiDeleteAvailabilityRequest = {
    // Availability ID
  id: 1,
};

const data = await apiInstance.deleteAvailability(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] | Availability ID | defaults to undefined


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
**200** | Availability deleted |  -  |
**404** | Availability not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteAvailabilityByDate**
> any deleteAvailabilityByDate()


### Example


```typescript
import { createConfiguration, AvailabilityApi } from '';
import type { AvailabilityApiDeleteAvailabilityByDateRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AvailabilityApi(configuration);

const request: AvailabilityApiDeleteAvailabilityByDateRequest = {
    // Staff user ID
  staffId: 1,
    // Date (YYYY-MM-DD)
  date: "date_example",
};

const data = await apiInstance.deleteAvailabilityByDate(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **staffId** | [**number**] | Staff user ID | defaults to undefined
 **date** | [**string**] | Date (YYYY-MM-DD) | defaults to undefined


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
**200** | Availability deleted |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **generateAvailableSlots**
> Array<string> generateAvailableSlots(generateSlotsRequest)


### Example


```typescript
import { createConfiguration, AvailabilityApi } from '';
import type { AvailabilityApiGenerateAvailableSlotsRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AvailabilityApi(configuration);

const request: AvailabilityApiGenerateAvailableSlotsRequest = {
  
  generateSlotsRequest: {
    date: new Date('1970-01-01').toISOString().split('T')[0];,
    serviceDuration: 1,
    staffId: 1,
  },
};

const data = await apiInstance.generateAvailableSlots(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **generateSlotsRequest** | **GenerateSlotsRequest**|  |


### Return type

**Array<string>**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Available slots generated |  -  |
**400** | Invalid request |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAllAvailability**
> Array<Availability> getAllAvailability()


### Example


```typescript
import { createConfiguration, AvailabilityApi } from '';
import type { AvailabilityApiGetAllAvailabilityRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AvailabilityApi(configuration);

const request: AvailabilityApiGetAllAvailabilityRequest = {
  
  staffId: 1,
  
  date: new Date('1970-01-01').toISOString().split('T')[0];,
  
  recurring: true,
  
  dayOfWeek: 1,
};

const data = await apiInstance.getAllAvailability(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **staffId** | [**number**] |  | (optional) defaults to undefined
 **date** | [**string**] |  | (optional) defaults to undefined
 **recurring** | [**boolean**] |  | (optional) defaults to undefined
 **dayOfWeek** | [**number**] |  | (optional) defaults to undefined


### Return type

**Array<Availability>**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Availability slots found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAvailabilityByDate**
> Array<Availability> getAvailabilityByDate()


### Example


```typescript
import { createConfiguration, AvailabilityApi } from '';
import type { AvailabilityApiGetAvailabilityByDateRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AvailabilityApi(configuration);

const request: AvailabilityApiGetAvailabilityByDateRequest = {
    // Date (YYYY-MM-DD)
  date: "date_example",
};

const data = await apiInstance.getAvailabilityByDate(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **date** | [**string**] | Date (YYYY-MM-DD) | defaults to undefined


### Return type

**Array<Availability>**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Availability found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAvailabilityByDay**
> Array<Availability> getAvailabilityByDay()


### Example


```typescript
import { createConfiguration, AvailabilityApi } from '';
import type { AvailabilityApiGetAvailabilityByDayRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AvailabilityApi(configuration);

const request: AvailabilityApiGetAvailabilityByDayRequest = {
    // Day of week (0=Sunday, 1=Monday, ..., 6=Saturday)
  day: 1,
};

const data = await apiInstance.getAvailabilityByDay(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **day** | [**number**] | Day of week (0&#x3D;Sunday, 1&#x3D;Monday, ..., 6&#x3D;Saturday) | defaults to undefined


### Return type

**Array<Availability>**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Availability found |  -  |
**400** | Invalid day of week |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAvailabilityById**
> Availability getAvailabilityById()


### Example


```typescript
import { createConfiguration, AvailabilityApi } from '';
import type { AvailabilityApiGetAvailabilityByIdRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AvailabilityApi(configuration);

const request: AvailabilityApiGetAvailabilityByIdRequest = {
    // Availability ID
  id: 1,
};

const data = await apiInstance.getAvailabilityById(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] | Availability ID | defaults to undefined


### Return type

**Availability**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Availability found |  -  |
**404** | Availability not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAvailabilityByStaff**
> Array<Availability> getAvailabilityByStaff()


### Example


```typescript
import { createConfiguration, AvailabilityApi } from '';
import type { AvailabilityApiGetAvailabilityByStaffRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AvailabilityApi(configuration);

const request: AvailabilityApiGetAvailabilityByStaffRequest = {
    // Staff user ID
  staffId: 1,
};

const data = await apiInstance.getAvailabilityByStaff(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **staffId** | [**number**] | Staff user ID | defaults to undefined


### Return type

**Array<Availability>**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Availability found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getRecurringAvailabilityByStaff**
> Array<Availability> getRecurringAvailabilityByStaff()


### Example


```typescript
import { createConfiguration, AvailabilityApi } from '';
import type { AvailabilityApiGetRecurringAvailabilityByStaffRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AvailabilityApi(configuration);

const request: AvailabilityApiGetRecurringAvailabilityByStaffRequest = {
    // Staff user ID
  staffId: 1,
};

const data = await apiInstance.getRecurringAvailabilityByStaff(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **staffId** | [**number**] | Staff user ID | defaults to undefined


### Return type

**Array<Availability>**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Recurring availability found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getSpecificAvailabilityByStaff**
> Array<Availability> getSpecificAvailabilityByStaff()


### Example


```typescript
import { createConfiguration, AvailabilityApi } from '';
import type { AvailabilityApiGetSpecificAvailabilityByStaffRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AvailabilityApi(configuration);

const request: AvailabilityApiGetSpecificAvailabilityByStaffRequest = {
    // Staff user ID
  staffId: 1,
};

const data = await apiInstance.getSpecificAvailabilityByStaff(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **staffId** | [**number**] | Staff user ID | defaults to undefined


### Return type

**Array<Availability>**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Specific date availability found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **updateAvailability**
> Availability updateAvailability(updateAvailability)


### Example


```typescript
import { createConfiguration, AvailabilityApi } from '';
import type { AvailabilityApiUpdateAvailabilityRequest } from '';

const configuration = createConfiguration();
const apiInstance = new AvailabilityApi(configuration);

const request: AvailabilityApiUpdateAvailabilityRequest = {
    // Availability ID
  id: 1,
  
  updateAvailability: {
    dayOfWeek: 1,
    endTime: "endTime_example",
    isRecurring: true,
    specificDate: new Date('1970-01-01').toISOString().split('T')[0];,
    startTime: "startTime_example",
  },
};

const data = await apiInstance.updateAvailability(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateAvailability** | **UpdateAvailability**|  |
 **id** | [**number**] | Availability ID | defaults to undefined


### Return type

**Availability**

### Authorization

[tenant_id](README.md#tenant_id), [api_key](README.md#api_key)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Availability updated |  -  |
**404** | Availability not found |  -  |
**409** | Overlapping availability |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


