# .CategoriesApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createCategory**](CategoriesApi.md#createCategory) | **POST** /categories | Create a new service category
[**deleteCategory**](CategoriesApi.md#deleteCategory) | **DELETE** /categories/{id} | Delete category
[**getAllCategories**](CategoriesApi.md#getAllCategories) | **GET** /categories | Get all categories
[**getCategoriesWithServices**](CategoriesApi.md#getCategoriesWithServices) | **GET** /categories/with-services | Get all categories with their services
[**getCategoryById**](CategoriesApi.md#getCategoryById) | **GET** /categories/{id} | Get category by ID
[**getUncategorizedServices**](CategoriesApi.md#getUncategorizedServices) | **GET** /categories/uncategorized | Get services without a category
[**reorderCategories**](CategoriesApi.md#reorderCategories) | **POST** /categories/reorder | Reorder categories
[**updateCategory**](CategoriesApi.md#updateCategory) | **PUT** /categories/{id} | Update category


# **createCategory**
> Category createCategory(createNewCategoryRequest)


### Example


```typescript
import { createConfiguration, CategoriesApi } from '';
import type { CategoriesApiCreateCategoryRequest } from '';

const configuration = createConfiguration();
const apiInstance = new CategoriesApi(configuration);

const request: CategoriesApiCreateCategoryRequest = {
  
  createNewCategoryRequest: {
    color: "color_example",
    description: "description_example",
    displayOrder: 1,
    isActive: true,
    name: "name_example",
  },
};

const data = await apiInstance.createCategory(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createNewCategoryRequest** | **CreateNewCategoryRequest**|  |


### Return type

**Category**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Category created |  -  |
**409** | Category name already exists |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteCategory**
> any deleteCategory()


### Example


```typescript
import { createConfiguration, CategoriesApi } from '';
import type { CategoriesApiDeleteCategoryRequest } from '';

const configuration = createConfiguration();
const apiInstance = new CategoriesApi(configuration);

const request: CategoriesApiDeleteCategoryRequest = {
    // Category ID
  id: 1,
};

const data = await apiInstance.deleteCategory(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] | Category ID | defaults to undefined


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
**200** | Category deleted |  -  |
**404** | Category not found |  -  |
**409** | Cannot delete category with services |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getAllCategories**
> Array<Category> getAllCategories()


### Example


```typescript
import { createConfiguration, CategoriesApi } from '';

const configuration = createConfiguration();
const apiInstance = new CategoriesApi(configuration);

const request = {};

const data = await apiInstance.getAllCategories(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<Category>**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Categories found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getCategoriesWithServices**
> Array<CategoryWithServices> getCategoriesWithServices()


### Example


```typescript
import { createConfiguration, CategoriesApi } from '';

const configuration = createConfiguration();
const apiInstance = new CategoriesApi(configuration);

const request = {};

const data = await apiInstance.getCategoriesWithServices(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<CategoryWithServices>**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Categories with services found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getCategoryById**
> Category getCategoryById()


### Example


```typescript
import { createConfiguration, CategoriesApi } from '';
import type { CategoriesApiGetCategoryByIdRequest } from '';

const configuration = createConfiguration();
const apiInstance = new CategoriesApi(configuration);

const request: CategoriesApiGetCategoryByIdRequest = {
    // Category ID
  id: 1,
};

const data = await apiInstance.getCategoryById(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**number**] | Category ID | defaults to undefined


### Return type

**Category**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Category found |  -  |
**404** | Category not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getUncategorizedServices**
> Array<Service> getUncategorizedServices()


### Example


```typescript
import { createConfiguration, CategoriesApi } from '';

const configuration = createConfiguration();
const apiInstance = new CategoriesApi(configuration);

const request = {};

const data = await apiInstance.getUncategorizedServices(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters
This endpoint does not need any parameter.


### Return type

**Array<Service>**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Uncategorized services found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **reorderCategories**
> any reorderCategories(reorderCategoriesRequest)


### Example


```typescript
import { createConfiguration, CategoriesApi } from '';
import type { CategoriesApiReorderCategoriesRequest } from '';

const configuration = createConfiguration();
const apiInstance = new CategoriesApi(configuration);

const request: CategoriesApiReorderCategoriesRequest = {
  
  reorderCategoriesRequest: {
    categoryIds: [
      1,
    ],
  },
};

const data = await apiInstance.reorderCategories(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **reorderCategoriesRequest** | **ReorderCategoriesRequest**|  |


### Return type

**any**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Categories reordered |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **updateCategory**
> Category updateCategory(updateCategory)


### Example


```typescript
import { createConfiguration, CategoriesApi } from '';
import type { CategoriesApiUpdateCategoryRequest } from '';

const configuration = createConfiguration();
const apiInstance = new CategoriesApi(configuration);

const request: CategoriesApiUpdateCategoryRequest = {
    // Category ID
  id: 1,
  
  updateCategory: {
    color: "color_example",
    description: "description_example",
    displayOrder: 1,
    isActive: true,
    name: "name_example",
  },
};

const data = await apiInstance.updateCategory(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateCategory** | **UpdateCategory**|  |
 **id** | [**number**] | Category ID | defaults to undefined


### Return type

**Category**

### Authorization

[tenant_id](README.md#tenant_id)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Category updated |  -  |
**404** | Category not found |  -  |
**409** | Category name already exists |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


