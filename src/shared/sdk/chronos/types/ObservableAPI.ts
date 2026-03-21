import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions, mergeConfiguration } from '../configuration'
import type { Middleware } from '../middleware';
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
import { Availability } from '../models/Availability';
import { AvailabilityCheckResponse } from '../models/AvailabilityCheckResponse';
import { AvailabilityResponse } from '../models/AvailabilityResponse';
import { AvailabilitySlot } from '../models/AvailabilitySlot';
import { Booking } from '../models/Booking';
import { BookingResponse } from '../models/BookingResponse';
import { BookingWithDetails } from '../models/BookingWithDetails';
import { BulkAvailabilityRequest } from '../models/BulkAvailabilityRequest';
import { BulkServiceRequest } from '../models/BulkServiceRequest';
import { BulkServiceResponse } from '../models/BulkServiceResponse';
import { Category } from '../models/Category';
import { CategoryWithServices } from '../models/CategoryWithServices';
import { ChangePasswordRequest } from '../models/ChangePasswordRequest';
import { CheckAvailabilityRequest } from '../models/CheckAvailabilityRequest';
import { CheckSubdomainRequest } from '../models/CheckSubdomainRequest';
import { CheckSubdomainResponse } from '../models/CheckSubdomainResponse';
import { CreateBookingRequest } from '../models/CreateBookingRequest';
import { CreateNewAvailabilityRequest } from '../models/CreateNewAvailabilityRequest';
import { CreateNewCategoryRequest } from '../models/CreateNewCategoryRequest';
import { CreateNewServiceRequest } from '../models/CreateNewServiceRequest';
import { CreateNewUserRequest } from '../models/CreateNewUserRequest';
import { GenerateSlotsRequest } from '../models/GenerateSlotsRequest';
import { LoginRequest } from '../models/LoginRequest';
import { LoginResponse } from '../models/LoginResponse';
import { MagicLinkResponse } from '../models/MagicLinkResponse';
import { NewBooking } from '../models/NewBooking';
import { NewCategory } from '../models/NewCategory';
import { NewService } from '../models/NewService';
import { NewTenant } from '../models/NewTenant';
import { NewUser } from '../models/NewUser';
import { PopularService } from '../models/PopularService';
import { PriceRange } from '../models/PriceRange';
import { RegisterTenantRequest } from '../models/RegisterTenantRequest';
import { RegisterTenantResponse } from '../models/RegisterTenantResponse';
import { ReorderCategoriesRequest } from '../models/ReorderCategoriesRequest';
import { RescheduleMagicRequest } from '../models/RescheduleMagicRequest';
import { Service } from '../models/Service';
import { ServiceAddon } from '../models/ServiceAddon';
import { ServiceResponse } from '../models/ServiceResponse';
import { ServiceStatsResponse } from '../models/ServiceStatsResponse';
import { Tenant } from '../models/Tenant';
import { UpdateAvailability } from '../models/UpdateAvailability';
import { UpdateBooking } from '../models/UpdateBooking';
import { UpdateCategory } from '../models/UpdateCategory';
import { UpdateService } from '../models/UpdateService';
import { UpdateServiceRequest } from '../models/UpdateServiceRequest';
import { UpdateStatusRequest } from '../models/UpdateStatusRequest';
import { UpdateTenant } from '../models/UpdateTenant';
import { UpdateUser } from '../models/UpdateUser';
import { User } from '../models/User';
import { UserResponse } from '../models/UserResponse';

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class ObservableAuthApi {
    private requestFactory: AuthApiRequestFactory;
    private responseProcessor: AuthApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new AuthApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new AuthApiResponseProcessor();
    }

    /**
     * Get current user profile
     */
    public getCurrentUserWithHttpInfo(_options?: ConfigurationOptions): Observable<HttpInfo<UserResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getCurrentUser(_config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getCurrentUserWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get current user profile
     */
    public getCurrentUser(_options?: ConfigurationOptions): Observable<UserResponse> {
        return this.getCurrentUserWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<UserResponse>) => apiResponse.data));
    }

    /**
     * Login to the system
     * @param loginRequest
     */
    public loginWithHttpInfo(loginRequest: LoginRequest, _options?: ConfigurationOptions): Observable<HttpInfo<LoginResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.login(loginRequest, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.loginWithHttpInfo(rsp)));
            }));
    }

    /**
     * Login to the system
     * @param loginRequest
     */
    public login(loginRequest: LoginRequest, _options?: ConfigurationOptions): Observable<LoginResponse> {
        return this.loginWithHttpInfo(loginRequest, _options).pipe(map((apiResponse: HttpInfo<LoginResponse>) => apiResponse.data));
    }

}

import { AvailabilityApiRequestFactory, AvailabilityApiResponseProcessor} from "../apis/AvailabilityApi";
export class ObservableAvailabilityApi {
    private requestFactory: AvailabilityApiRequestFactory;
    private responseProcessor: AvailabilityApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: AvailabilityApiRequestFactory,
        responseProcessor?: AvailabilityApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new AvailabilityApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new AvailabilityApiResponseProcessor();
    }

    /**
     * Check if a staff member is available at a specific time
     * @param staffId Staff user ID
     * @param date Date (YYYY-MM-DD)
     * @param time Time (HH:MM)
     * @param duration Duration in minutes
     */
    public checkTimeSlotWithHttpInfo(staffId: number, date: string, time: string, duration: number, _options?: ConfigurationOptions): Observable<HttpInfo<AvailabilityCheckResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.checkTimeSlot(staffId, date, time, duration, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.checkTimeSlotWithHttpInfo(rsp)));
            }));
    }

    /**
     * Check if a staff member is available at a specific time
     * @param staffId Staff user ID
     * @param date Date (YYYY-MM-DD)
     * @param time Time (HH:MM)
     * @param duration Duration in minutes
     */
    public checkTimeSlot(staffId: number, date: string, time: string, duration: number, _options?: ConfigurationOptions): Observable<AvailabilityCheckResponse> {
        return this.checkTimeSlotWithHttpInfo(staffId, date, time, duration, _options).pipe(map((apiResponse: HttpInfo<AvailabilityCheckResponse>) => apiResponse.data));
    }

    /**
     * Create a new availability slot
     * @param createNewAvailabilityRequest
     */
    public createAvailabilityWithHttpInfo(createNewAvailabilityRequest: CreateNewAvailabilityRequest, _options?: ConfigurationOptions): Observable<HttpInfo<Availability>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.createAvailability(createNewAvailabilityRequest, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createAvailabilityWithHttpInfo(rsp)));
            }));
    }

    /**
     * Create a new availability slot
     * @param createNewAvailabilityRequest
     */
    public createAvailability(createNewAvailabilityRequest: CreateNewAvailabilityRequest, _options?: ConfigurationOptions): Observable<Availability> {
        return this.createAvailabilityWithHttpInfo(createNewAvailabilityRequest, _options).pipe(map((apiResponse: HttpInfo<Availability>) => apiResponse.data));
    }

    /**
     * Create multiple availability slots at once
     * @param bulkAvailabilityRequest
     */
    public createBulkAvailabilityWithHttpInfo(bulkAvailabilityRequest: Array<BulkAvailabilityRequest>, _options?: ConfigurationOptions): Observable<HttpInfo<Array<Availability>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.createBulkAvailability(bulkAvailabilityRequest, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createBulkAvailabilityWithHttpInfo(rsp)));
            }));
    }

    /**
     * Create multiple availability slots at once
     * @param bulkAvailabilityRequest
     */
    public createBulkAvailability(bulkAvailabilityRequest: Array<BulkAvailabilityRequest>, _options?: ConfigurationOptions): Observable<Array<Availability>> {
        return this.createBulkAvailabilityWithHttpInfo(bulkAvailabilityRequest, _options).pipe(map((apiResponse: HttpInfo<Array<Availability>>) => apiResponse.data));
    }

    /**
     * Delete an availability slot
     * @param id Availability ID
     */
    public deleteAvailabilityWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<any>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.deleteAvailability(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deleteAvailabilityWithHttpInfo(rsp)));
            }));
    }

    /**
     * Delete an availability slot
     * @param id Availability ID
     */
    public deleteAvailability(id: number, _options?: ConfigurationOptions): Observable<any> {
        return this.deleteAvailabilityWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Delete all availability for a specific date
     * @param staffId Staff user ID
     * @param date Date (YYYY-MM-DD)
     */
    public deleteAvailabilityByDateWithHttpInfo(staffId: number, date: string, _options?: ConfigurationOptions): Observable<HttpInfo<any>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.deleteAvailabilityByDate(staffId, date, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deleteAvailabilityByDateWithHttpInfo(rsp)));
            }));
    }

    /**
     * Delete all availability for a specific date
     * @param staffId Staff user ID
     * @param date Date (YYYY-MM-DD)
     */
    public deleteAvailabilityByDate(staffId: number, date: string, _options?: ConfigurationOptions): Observable<any> {
        return this.deleteAvailabilityByDateWithHttpInfo(staffId, date, _options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Generate available time slots for a specific date and service
     * @param generateSlotsRequest
     */
    public generateAvailableSlotsWithHttpInfo(generateSlotsRequest: GenerateSlotsRequest, _options?: ConfigurationOptions): Observable<HttpInfo<Array<string>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.generateAvailableSlots(generateSlotsRequest, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.generateAvailableSlotsWithHttpInfo(rsp)));
            }));
    }

    /**
     * Generate available time slots for a specific date and service
     * @param generateSlotsRequest
     */
    public generateAvailableSlots(generateSlotsRequest: GenerateSlotsRequest, _options?: ConfigurationOptions): Observable<Array<string>> {
        return this.generateAvailableSlotsWithHttpInfo(generateSlotsRequest, _options).pipe(map((apiResponse: HttpInfo<Array<string>>) => apiResponse.data));
    }

    /**
     * Get all availability slots with optional filtering
     * @param [staffId]
     * @param [date]
     * @param [recurring]
     * @param [dayOfWeek]
     */
    public getAllAvailabilityWithHttpInfo(staffId?: number, date?: string, recurring?: boolean, dayOfWeek?: number, _options?: ConfigurationOptions): Observable<HttpInfo<Array<Availability>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getAllAvailability(staffId, date, recurring, dayOfWeek, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getAllAvailabilityWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get all availability slots with optional filtering
     * @param [staffId]
     * @param [date]
     * @param [recurring]
     * @param [dayOfWeek]
     */
    public getAllAvailability(staffId?: number, date?: string, recurring?: boolean, dayOfWeek?: number, _options?: ConfigurationOptions): Observable<Array<Availability>> {
        return this.getAllAvailabilityWithHttpInfo(staffId, date, recurring, dayOfWeek, _options).pipe(map((apiResponse: HttpInfo<Array<Availability>>) => apiResponse.data));
    }

    /**
     * Get availability for a specific date
     * @param date Date (YYYY-MM-DD)
     */
    public getAvailabilityByDateWithHttpInfo(date: string, _options?: ConfigurationOptions): Observable<HttpInfo<Array<Availability>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getAvailabilityByDate(date, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getAvailabilityByDateWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get availability for a specific date
     * @param date Date (YYYY-MM-DD)
     */
    public getAvailabilityByDate(date: string, _options?: ConfigurationOptions): Observable<Array<Availability>> {
        return this.getAvailabilityByDateWithHttpInfo(date, _options).pipe(map((apiResponse: HttpInfo<Array<Availability>>) => apiResponse.data));
    }

    /**
     * Get availability by day of week
     * @param day Day of week (0&#x3D;Sunday, 1&#x3D;Monday, ..., 6&#x3D;Saturday)
     */
    public getAvailabilityByDayWithHttpInfo(day: number, _options?: ConfigurationOptions): Observable<HttpInfo<Array<Availability>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getAvailabilityByDay(day, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getAvailabilityByDayWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get availability by day of week
     * @param day Day of week (0&#x3D;Sunday, 1&#x3D;Monday, ..., 6&#x3D;Saturday)
     */
    public getAvailabilityByDay(day: number, _options?: ConfigurationOptions): Observable<Array<Availability>> {
        return this.getAvailabilityByDayWithHttpInfo(day, _options).pipe(map((apiResponse: HttpInfo<Array<Availability>>) => apiResponse.data));
    }

    /**
     * Get an availability slot by ID
     * @param id Availability ID
     */
    public getAvailabilityByIdWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<Availability>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getAvailabilityById(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getAvailabilityByIdWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get an availability slot by ID
     * @param id Availability ID
     */
    public getAvailabilityById(id: number, _options?: ConfigurationOptions): Observable<Availability> {
        return this.getAvailabilityByIdWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<Availability>) => apiResponse.data));
    }

    /**
     * Get availability by staff ID
     * @param staffId Staff user ID
     */
    public getAvailabilityByStaffWithHttpInfo(staffId: number, _options?: ConfigurationOptions): Observable<HttpInfo<Array<Availability>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getAvailabilityByStaff(staffId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getAvailabilityByStaffWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get availability by staff ID
     * @param staffId Staff user ID
     */
    public getAvailabilityByStaff(staffId: number, _options?: ConfigurationOptions): Observable<Array<Availability>> {
        return this.getAvailabilityByStaffWithHttpInfo(staffId, _options).pipe(map((apiResponse: HttpInfo<Array<Availability>>) => apiResponse.data));
    }

    /**
     * Get recurring availability by staff ID
     * @param staffId Staff user ID
     */
    public getRecurringAvailabilityByStaffWithHttpInfo(staffId: number, _options?: ConfigurationOptions): Observable<HttpInfo<Array<Availability>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getRecurringAvailabilityByStaff(staffId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getRecurringAvailabilityByStaffWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get recurring availability by staff ID
     * @param staffId Staff user ID
     */
    public getRecurringAvailabilityByStaff(staffId: number, _options?: ConfigurationOptions): Observable<Array<Availability>> {
        return this.getRecurringAvailabilityByStaffWithHttpInfo(staffId, _options).pipe(map((apiResponse: HttpInfo<Array<Availability>>) => apiResponse.data));
    }

    /**
     * Get specific date availability by staff ID
     * @param staffId Staff user ID
     */
    public getSpecificAvailabilityByStaffWithHttpInfo(staffId: number, _options?: ConfigurationOptions): Observable<HttpInfo<Array<Availability>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getSpecificAvailabilityByStaff(staffId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getSpecificAvailabilityByStaffWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get specific date availability by staff ID
     * @param staffId Staff user ID
     */
    public getSpecificAvailabilityByStaff(staffId: number, _options?: ConfigurationOptions): Observable<Array<Availability>> {
        return this.getSpecificAvailabilityByStaffWithHttpInfo(staffId, _options).pipe(map((apiResponse: HttpInfo<Array<Availability>>) => apiResponse.data));
    }

    /**
     * Update an availability slot
     * @param id Availability ID
     * @param updateAvailability
     */
    public updateAvailabilityWithHttpInfo(id: number, updateAvailability: UpdateAvailability, _options?: ConfigurationOptions): Observable<HttpInfo<Availability>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.updateAvailability(id, updateAvailability, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.updateAvailabilityWithHttpInfo(rsp)));
            }));
    }

    /**
     * Update an availability slot
     * @param id Availability ID
     * @param updateAvailability
     */
    public updateAvailability(id: number, updateAvailability: UpdateAvailability, _options?: ConfigurationOptions): Observable<Availability> {
        return this.updateAvailabilityWithHttpInfo(id, updateAvailability, _options).pipe(map((apiResponse: HttpInfo<Availability>) => apiResponse.data));
    }

}

import { BookingsApiRequestFactory, BookingsApiResponseProcessor} from "../apis/BookingsApi";
export class ObservableBookingsApi {
    private requestFactory: BookingsApiRequestFactory;
    private responseProcessor: BookingsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: BookingsApiRequestFactory,
        responseProcessor?: BookingsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new BookingsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new BookingsApiResponseProcessor();
    }

    /**
     * Cancel a booking (authenticated)
     * @param id Booking ID
     */
    public cancelBookingAuthWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<BookingResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.cancelBookingAuth(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.cancelBookingAuthWithHttpInfo(rsp)));
            }));
    }

    /**
     * Cancel a booking (authenticated)
     * @param id Booking ID
     */
    public cancelBookingAuth(id: number, _options?: ConfigurationOptions): Observable<BookingResponse> {
        return this.cancelBookingAuthWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<BookingResponse>) => apiResponse.data));
    }

    /**
     * Cancel a booking via magic link
     * @param id Booking ID
     * @param token Magic link token
     */
    public cancelBookingMagicWithHttpInfo(id: number, token: string, _options?: ConfigurationOptions): Observable<HttpInfo<BookingResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.cancelBookingMagic(id, token, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.cancelBookingMagicWithHttpInfo(rsp)));
            }));
    }

    /**
     * Cancel a booking via magic link
     * @param id Booking ID
     * @param token Magic link token
     */
    public cancelBookingMagic(id: number, token: string, _options?: ConfigurationOptions): Observable<BookingResponse> {
        return this.cancelBookingMagicWithHttpInfo(id, token, _options).pipe(map((apiResponse: HttpInfo<BookingResponse>) => apiResponse.data));
    }

    /**
     * Check if a time slot is available
     * @param checkAvailabilityRequest
     */
    public checkBookingAvailabilityWithHttpInfo(checkAvailabilityRequest: CheckAvailabilityRequest, _options?: ConfigurationOptions): Observable<HttpInfo<AvailabilityResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.checkBookingAvailability(checkAvailabilityRequest, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.checkBookingAvailabilityWithHttpInfo(rsp)));
            }));
    }

    /**
     * Check if a time slot is available
     * @param checkAvailabilityRequest
     */
    public checkBookingAvailability(checkAvailabilityRequest: CheckAvailabilityRequest, _options?: ConfigurationOptions): Observable<AvailabilityResponse> {
        return this.checkBookingAvailabilityWithHttpInfo(checkAvailabilityRequest, _options).pipe(map((apiResponse: HttpInfo<AvailabilityResponse>) => apiResponse.data));
    }

    /**
     * Mark a booking as completed
     * @param id Booking ID
     */
    public completeBookingWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<BookingResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.completeBooking(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.completeBookingWithHttpInfo(rsp)));
            }));
    }

    /**
     * Mark a booking as completed
     * @param id Booking ID
     */
    public completeBooking(id: number, _options?: ConfigurationOptions): Observable<BookingResponse> {
        return this.completeBookingWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<BookingResponse>) => apiResponse.data));
    }

    /**
     * Confirm a booking
     * @param id Booking ID
     */
    public confirmBookingWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<BookingResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.confirmBooking(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.confirmBookingWithHttpInfo(rsp)));
            }));
    }

    /**
     * Confirm a booking
     * @param id Booking ID
     */
    public confirmBooking(id: number, _options?: ConfigurationOptions): Observable<BookingResponse> {
        return this.confirmBookingWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<BookingResponse>) => apiResponse.data));
    }

    /**
     * Create a new booking
     * @param createBookingRequest
     */
    public createBookingWithHttpInfo(createBookingRequest: CreateBookingRequest, _options?: ConfigurationOptions): Observable<HttpInfo<MagicLinkResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.createBooking(createBookingRequest, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createBookingWithHttpInfo(rsp)));
            }));
    }

    /**
     * Create a new booking
     * @param createBookingRequest
     */
    public createBooking(createBookingRequest: CreateBookingRequest, _options?: ConfigurationOptions): Observable<MagicLinkResponse> {
        return this.createBookingWithHttpInfo(createBookingRequest, _options).pipe(map((apiResponse: HttpInfo<MagicLinkResponse>) => apiResponse.data));
    }

    /**
     * Delete a booking
     * @param id Booking ID
     */
    public deleteBookingWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<any>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.deleteBooking(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deleteBookingWithHttpInfo(rsp)));
            }));
    }

    /**
     * Delete a booking
     * @param id Booking ID
     */
    public deleteBooking(id: number, _options?: ConfigurationOptions): Observable<any> {
        return this.deleteBookingWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Get all bookings with optional filtering
     * @param [userId]
     * @param [staffId]
     * @param [guestEmail]
     * @param [serviceId]
     * @param [status]
     * @param [dateFrom]
     * @param [dateTo]
     */
    public getAllBookingsWithHttpInfo(userId?: number, staffId?: number, guestEmail?: string, serviceId?: number, status?: string, dateFrom?: string, dateTo?: string, _options?: ConfigurationOptions): Observable<HttpInfo<Array<BookingResponse>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getAllBookings(userId, staffId, guestEmail, serviceId, status, dateFrom, dateTo, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getAllBookingsWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get all bookings with optional filtering
     * @param [userId]
     * @param [staffId]
     * @param [guestEmail]
     * @param [serviceId]
     * @param [status]
     * @param [dateFrom]
     * @param [dateTo]
     */
    public getAllBookings(userId?: number, staffId?: number, guestEmail?: string, serviceId?: number, status?: string, dateFrom?: string, dateTo?: string, _options?: ConfigurationOptions): Observable<Array<BookingResponse>> {
        return this.getAllBookingsWithHttpInfo(userId, staffId, guestEmail, serviceId, status, dateFrom, dateTo, _options).pipe(map((apiResponse: HttpInfo<Array<BookingResponse>>) => apiResponse.data));
    }

    /**
     * Get a booking by ID
     * @param id Booking ID
     */
    public getBookingByIdWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<BookingResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getBookingById(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getBookingByIdWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get a booking by ID
     * @param id Booking ID
     */
    public getBookingById(id: number, _options?: ConfigurationOptions): Observable<BookingResponse> {
        return this.getBookingByIdWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<BookingResponse>) => apiResponse.data));
    }

    /**
     * Get booking by magic link token
     * @param token Magic link token
     */
    public getBookingByTokenWithHttpInfo(token: string, _options?: ConfigurationOptions): Observable<HttpInfo<BookingWithDetails>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getBookingByToken(token, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getBookingByTokenWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get booking by magic link token
     * @param token Magic link token
     */
    public getBookingByToken(token: string, _options?: ConfigurationOptions): Observable<BookingWithDetails> {
        return this.getBookingByTokenWithHttpInfo(token, _options).pipe(map((apiResponse: HttpInfo<BookingWithDetails>) => apiResponse.data));
    }

    /**
     * Get a booking with user and service details
     * @param id Booking ID
     */
    public getBookingWithDetailsWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<BookingWithDetails>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getBookingWithDetails(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getBookingWithDetailsWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get a booking with user and service details
     * @param id Booking ID
     */
    public getBookingWithDetails(id: number, _options?: ConfigurationOptions): Observable<BookingWithDetails> {
        return this.getBookingWithDetailsWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<BookingWithDetails>) => apiResponse.data));
    }

    /**
     * Get bookings by date
     * @param date Date (YYYY-MM-DD)
     */
    public getBookingsByDateWithHttpInfo(date: string, _options?: ConfigurationOptions): Observable<HttpInfo<Array<BookingResponse>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getBookingsByDate(date, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getBookingsByDateWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get bookings by date
     * @param date Date (YYYY-MM-DD)
     */
    public getBookingsByDate(date: string, _options?: ConfigurationOptions): Observable<Array<BookingResponse>> {
        return this.getBookingsByDateWithHttpInfo(date, _options).pipe(map((apiResponse: HttpInfo<Array<BookingResponse>>) => apiResponse.data));
    }

    /**
     * Get bookings by staff ID
     * @param staffId Staff user ID
     * @param [dateFrom] Start date
     * @param [dateTo] End date
     * @param [status] Filter by status
     */
    public getBookingsByStaffWithHttpInfo(staffId: number, dateFrom?: string, dateTo?: string, status?: string, _options?: ConfigurationOptions): Observable<HttpInfo<Array<BookingResponse>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getBookingsByStaff(staffId, dateFrom, dateTo, status, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getBookingsByStaffWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get bookings by staff ID
     * @param staffId Staff user ID
     * @param [dateFrom] Start date
     * @param [dateTo] End date
     * @param [status] Filter by status
     */
    public getBookingsByStaff(staffId: number, dateFrom?: string, dateTo?: string, status?: string, _options?: ConfigurationOptions): Observable<Array<BookingResponse>> {
        return this.getBookingsByStaffWithHttpInfo(staffId, dateFrom, dateTo, status, _options).pipe(map((apiResponse: HttpInfo<Array<BookingResponse>>) => apiResponse.data));
    }

    /**
     * Get bookings by status
     * @param status Booking status (pending, confirmed, cancelled, completed, no_show)
     */
    public getBookingsByStatusWithHttpInfo(status: string, _options?: ConfigurationOptions): Observable<HttpInfo<Array<BookingResponse>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getBookingsByStatus(status, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getBookingsByStatusWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get bookings by status
     * @param status Booking status (pending, confirmed, cancelled, completed, no_show)
     */
    public getBookingsByStatus(status: string, _options?: ConfigurationOptions): Observable<Array<BookingResponse>> {
        return this.getBookingsByStatusWithHttpInfo(status, _options).pipe(map((apiResponse: HttpInfo<Array<BookingResponse>>) => apiResponse.data));
    }

    /**
     * Get bookings by user ID
     * @param userId User ID
     */
    public getBookingsByUserWithHttpInfo(userId: number, _options?: ConfigurationOptions): Observable<HttpInfo<Array<BookingResponse>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getBookingsByUser(userId, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getBookingsByUserWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get bookings by user ID
     * @param userId User ID
     */
    public getBookingsByUser(userId: number, _options?: ConfigurationOptions): Observable<Array<BookingResponse>> {
        return this.getBookingsByUserWithHttpInfo(userId, _options).pipe(map((apiResponse: HttpInfo<Array<BookingResponse>>) => apiResponse.data));
    }

    /**
     * Get upcoming bookings
     * @param days Number of days ahead
     */
    public getUpcomingBookingsWithHttpInfo(days: number, _options?: ConfigurationOptions): Observable<HttpInfo<Array<BookingResponse>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getUpcomingBookings(days, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getUpcomingBookingsWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get upcoming bookings
     * @param days Number of days ahead
     */
    public getUpcomingBookings(days: number, _options?: ConfigurationOptions): Observable<Array<BookingResponse>> {
        return this.getUpcomingBookingsWithHttpInfo(days, _options).pipe(map((apiResponse: HttpInfo<Array<BookingResponse>>) => apiResponse.data));
    }

    /**
     * Reschedule a booking via magic link
     * @param id Booking ID
     * @param rescheduleMagicRequest
     */
    public rescheduleBookingMagicWithHttpInfo(id: number, rescheduleMagicRequest: RescheduleMagicRequest, _options?: ConfigurationOptions): Observable<HttpInfo<BookingResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.rescheduleBookingMagic(id, rescheduleMagicRequest, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.rescheduleBookingMagicWithHttpInfo(rsp)));
            }));
    }

    /**
     * Reschedule a booking via magic link
     * @param id Booking ID
     * @param rescheduleMagicRequest
     */
    public rescheduleBookingMagic(id: number, rescheduleMagicRequest: RescheduleMagicRequest, _options?: ConfigurationOptions): Observable<BookingResponse> {
        return this.rescheduleBookingMagicWithHttpInfo(id, rescheduleMagicRequest, _options).pipe(map((apiResponse: HttpInfo<BookingResponse>) => apiResponse.data));
    }

    /**
     * Update a booking
     * @param id Booking ID
     * @param updateBooking
     */
    public updateBookingWithHttpInfo(id: number, updateBooking: UpdateBooking, _options?: ConfigurationOptions): Observable<HttpInfo<BookingResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.updateBooking(id, updateBooking, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.updateBookingWithHttpInfo(rsp)));
            }));
    }

    /**
     * Update a booking
     * @param id Booking ID
     * @param updateBooking
     */
    public updateBooking(id: number, updateBooking: UpdateBooking, _options?: ConfigurationOptions): Observable<BookingResponse> {
        return this.updateBookingWithHttpInfo(id, updateBooking, _options).pipe(map((apiResponse: HttpInfo<BookingResponse>) => apiResponse.data));
    }

    /**
     * Update booking status
     * @param id Booking ID
     * @param updateStatusRequest
     */
    public updateBookingStatusWithHttpInfo(id: number, updateStatusRequest: UpdateStatusRequest, _options?: ConfigurationOptions): Observable<HttpInfo<BookingResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.updateBookingStatus(id, updateStatusRequest, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.updateBookingStatusWithHttpInfo(rsp)));
            }));
    }

    /**
     * Update booking status
     * @param id Booking ID
     * @param updateStatusRequest
     */
    public updateBookingStatus(id: number, updateStatusRequest: UpdateStatusRequest, _options?: ConfigurationOptions): Observable<BookingResponse> {
        return this.updateBookingStatusWithHttpInfo(id, updateStatusRequest, _options).pipe(map((apiResponse: HttpInfo<BookingResponse>) => apiResponse.data));
    }

}

import { CategoriesApiRequestFactory, CategoriesApiResponseProcessor} from "../apis/CategoriesApi";
export class ObservableCategoriesApi {
    private requestFactory: CategoriesApiRequestFactory;
    private responseProcessor: CategoriesApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: CategoriesApiRequestFactory,
        responseProcessor?: CategoriesApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new CategoriesApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new CategoriesApiResponseProcessor();
    }

    /**
     * Create a new service category
     * @param createNewCategoryRequest
     */
    public createCategoryWithHttpInfo(createNewCategoryRequest: CreateNewCategoryRequest, _options?: ConfigurationOptions): Observable<HttpInfo<Category>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.createCategory(createNewCategoryRequest, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createCategoryWithHttpInfo(rsp)));
            }));
    }

    /**
     * Create a new service category
     * @param createNewCategoryRequest
     */
    public createCategory(createNewCategoryRequest: CreateNewCategoryRequest, _options?: ConfigurationOptions): Observable<Category> {
        return this.createCategoryWithHttpInfo(createNewCategoryRequest, _options).pipe(map((apiResponse: HttpInfo<Category>) => apiResponse.data));
    }

    /**
     * Delete category
     * @param id Category ID
     */
    public deleteCategoryWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<any>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.deleteCategory(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deleteCategoryWithHttpInfo(rsp)));
            }));
    }

    /**
     * Delete category
     * @param id Category ID
     */
    public deleteCategory(id: number, _options?: ConfigurationOptions): Observable<any> {
        return this.deleteCategoryWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Get all categories
     */
    public getAllCategoriesWithHttpInfo(_options?: ConfigurationOptions): Observable<HttpInfo<Array<Category>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getAllCategories(_config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getAllCategoriesWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get all categories
     */
    public getAllCategories(_options?: ConfigurationOptions): Observable<Array<Category>> {
        return this.getAllCategoriesWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<Array<Category>>) => apiResponse.data));
    }

    /**
     * Get all categories with their services
     */
    public getCategoriesWithServicesWithHttpInfo(_options?: ConfigurationOptions): Observable<HttpInfo<Array<CategoryWithServices>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getCategoriesWithServices(_config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getCategoriesWithServicesWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get all categories with their services
     */
    public getCategoriesWithServices(_options?: ConfigurationOptions): Observable<Array<CategoryWithServices>> {
        return this.getCategoriesWithServicesWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<Array<CategoryWithServices>>) => apiResponse.data));
    }

    /**
     * Get category by ID
     * @param id Category ID
     */
    public getCategoryByIdWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<Category>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getCategoryById(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getCategoryByIdWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get category by ID
     * @param id Category ID
     */
    public getCategoryById(id: number, _options?: ConfigurationOptions): Observable<Category> {
        return this.getCategoryByIdWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<Category>) => apiResponse.data));
    }

    /**
     * Get services without a category
     */
    public getUncategorizedServicesWithHttpInfo(_options?: ConfigurationOptions): Observable<HttpInfo<Array<Service>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getUncategorizedServices(_config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getUncategorizedServicesWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get services without a category
     */
    public getUncategorizedServices(_options?: ConfigurationOptions): Observable<Array<Service>> {
        return this.getUncategorizedServicesWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<Array<Service>>) => apiResponse.data));
    }

    /**
     * Reorder categories
     * @param reorderCategoriesRequest
     */
    public reorderCategoriesWithHttpInfo(reorderCategoriesRequest: ReorderCategoriesRequest, _options?: ConfigurationOptions): Observable<HttpInfo<any>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.reorderCategories(reorderCategoriesRequest, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.reorderCategoriesWithHttpInfo(rsp)));
            }));
    }

    /**
     * Reorder categories
     * @param reorderCategoriesRequest
     */
    public reorderCategories(reorderCategoriesRequest: ReorderCategoriesRequest, _options?: ConfigurationOptions): Observable<any> {
        return this.reorderCategoriesWithHttpInfo(reorderCategoriesRequest, _options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Update category
     * @param id Category ID
     * @param updateCategory
     */
    public updateCategoryWithHttpInfo(id: number, updateCategory: UpdateCategory, _options?: ConfigurationOptions): Observable<HttpInfo<Category>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.updateCategory(id, updateCategory, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.updateCategoryWithHttpInfo(rsp)));
            }));
    }

    /**
     * Update category
     * @param id Category ID
     * @param updateCategory
     */
    public updateCategory(id: number, updateCategory: UpdateCategory, _options?: ConfigurationOptions): Observable<Category> {
        return this.updateCategoryWithHttpInfo(id, updateCategory, _options).pipe(map((apiResponse: HttpInfo<Category>) => apiResponse.data));
    }

}

import { ServicesApiRequestFactory, ServicesApiResponseProcessor} from "../apis/ServicesApi";
export class ObservableServicesApi {
    private requestFactory: ServicesApiRequestFactory;
    private responseProcessor: ServicesApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: ServicesApiRequestFactory,
        responseProcessor?: ServicesApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new ServicesApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new ServicesApiResponseProcessor();
    }

    /**
     * Delete all inactive services
     */
    public cleanupInactiveServicesWithHttpInfo(_options?: ConfigurationOptions): Observable<HttpInfo<any>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.cleanupInactiveServices(_config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.cleanupInactiveServicesWithHttpInfo(rsp)));
            }));
    }

    /**
     * Delete all inactive services
     */
    public cleanupInactiveServices(_options?: ConfigurationOptions): Observable<any> {
        return this.cleanupInactiveServicesWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Create multiple services at once
     * @param bulkServiceRequest
     */
    public createBulkServicesWithHttpInfo(bulkServiceRequest: BulkServiceRequest, _options?: ConfigurationOptions): Observable<HttpInfo<BulkServiceResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.createBulkServices(bulkServiceRequest, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createBulkServicesWithHttpInfo(rsp)));
            }));
    }

    /**
     * Create multiple services at once
     * @param bulkServiceRequest
     */
    public createBulkServices(bulkServiceRequest: BulkServiceRequest, _options?: ConfigurationOptions): Observable<BulkServiceResponse> {
        return this.createBulkServicesWithHttpInfo(bulkServiceRequest, _options).pipe(map((apiResponse: HttpInfo<BulkServiceResponse>) => apiResponse.data));
    }

    /**
     * Create a new service
     * @param createNewServiceRequest
     */
    public createServiceWithHttpInfo(createNewServiceRequest: CreateNewServiceRequest, _options?: ConfigurationOptions): Observable<HttpInfo<ServiceResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.createService(createNewServiceRequest, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createServiceWithHttpInfo(rsp)));
            }));
    }

    /**
     * Create a new service
     * @param createNewServiceRequest
     */
    public createService(createNewServiceRequest: CreateNewServiceRequest, _options?: ConfigurationOptions): Observable<ServiceResponse> {
        return this.createServiceWithHttpInfo(createNewServiceRequest, _options).pipe(map((apiResponse: HttpInfo<ServiceResponse>) => apiResponse.data));
    }

    /**
     * Delete a service
     * @param id Service ID
     */
    public deleteServiceWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<any>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.deleteService(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deleteServiceWithHttpInfo(rsp)));
            }));
    }

    /**
     * Delete a service
     * @param id Service ID
     */
    public deleteService(id: number, _options?: ConfigurationOptions): Observable<any> {
        return this.deleteServiceWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Get all active services
     */
    public getActiveServicesWithHttpInfo(_options?: ConfigurationOptions): Observable<HttpInfo<Array<ServiceResponse>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getActiveServices(_config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getActiveServicesWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get all active services
     */
    public getActiveServices(_options?: ConfigurationOptions): Observable<Array<ServiceResponse>> {
        return this.getActiveServicesWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<Array<ServiceResponse>>) => apiResponse.data));
    }

    /**
     * Get all services with optional filtering
     * @param [activeOnly]
     * @param [minDuration]
     * @param [maxDuration]
     * @param [minPrice]
     * @param [maxPrice]
     * @param [search]
     */
    public getAllServicesWithHttpInfo(activeOnly?: boolean, minDuration?: number, maxDuration?: number, minPrice?: number, maxPrice?: number, search?: string, _options?: ConfigurationOptions): Observable<HttpInfo<Array<ServiceResponse>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getAllServices(activeOnly, minDuration, maxDuration, minPrice, maxPrice, search, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getAllServicesWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get all services with optional filtering
     * @param [activeOnly]
     * @param [minDuration]
     * @param [maxDuration]
     * @param [minPrice]
     * @param [maxPrice]
     * @param [search]
     */
    public getAllServices(activeOnly?: boolean, minDuration?: number, maxDuration?: number, minPrice?: number, maxPrice?: number, search?: string, _options?: ConfigurationOptions): Observable<Array<ServiceResponse>> {
        return this.getAllServicesWithHttpInfo(activeOnly, minDuration, maxDuration, minPrice, maxPrice, search, _options).pipe(map((apiResponse: HttpInfo<Array<ServiceResponse>>) => apiResponse.data));
    }

    /**
     * Get a service by ID
     * @param id Service ID
     */
    public getServiceByIdWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<ServiceResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getServiceById(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getServiceByIdWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get a service by ID
     * @param id Service ID
     */
    public getServiceById(id: number, _options?: ConfigurationOptions): Observable<ServiceResponse> {
        return this.getServiceByIdWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<ServiceResponse>) => apiResponse.data));
    }

    /**
     * Find service by exact name
     * @param name Service name
     */
    public getServiceByNameWithHttpInfo(name: string, _options?: ConfigurationOptions): Observable<HttpInfo<ServiceResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getServiceByName(name, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getServiceByNameWithHttpInfo(rsp)));
            }));
    }

    /**
     * Find service by exact name
     * @param name Service name
     */
    public getServiceByName(name: string, _options?: ConfigurationOptions): Observable<ServiceResponse> {
        return this.getServiceByNameWithHttpInfo(name, _options).pipe(map((apiResponse: HttpInfo<ServiceResponse>) => apiResponse.data));
    }

    /**
     * Get service statistics
     */
    public getServiceStatsWithHttpInfo(_options?: ConfigurationOptions): Observable<HttpInfo<ServiceStatsResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getServiceStats(_config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getServiceStatsWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get service statistics
     */
    public getServiceStats(_options?: ConfigurationOptions): Observable<ServiceStatsResponse> {
        return this.getServiceStatsWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<ServiceStatsResponse>) => apiResponse.data));
    }

    /**
     * Find services by duration range
     * @param min Minimum duration in minutes
     * @param max Maximum duration in minutes
     */
    public getServicesByDurationWithHttpInfo(min: number, max: number, _options?: ConfigurationOptions): Observable<HttpInfo<Array<ServiceResponse>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getServicesByDuration(min, max, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getServicesByDurationWithHttpInfo(rsp)));
            }));
    }

    /**
     * Find services by duration range
     * @param min Minimum duration in minutes
     * @param max Maximum duration in minutes
     */
    public getServicesByDuration(min: number, max: number, _options?: ConfigurationOptions): Observable<Array<ServiceResponse>> {
        return this.getServicesByDurationWithHttpInfo(min, max, _options).pipe(map((apiResponse: HttpInfo<Array<ServiceResponse>>) => apiResponse.data));
    }

    /**
     * Find services by price range
     * @param min Minimum price in cents
     * @param max Maximum price in cents
     */
    public getServicesByPriceWithHttpInfo(min: number, max: number, _options?: ConfigurationOptions): Observable<HttpInfo<Array<ServiceResponse>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getServicesByPrice(min, max, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getServicesByPriceWithHttpInfo(rsp)));
            }));
    }

    /**
     * Find services by price range
     * @param min Minimum price in cents
     * @param max Maximum price in cents
     */
    public getServicesByPrice(min: number, max: number, _options?: ConfigurationOptions): Observable<Array<ServiceResponse>> {
        return this.getServicesByPriceWithHttpInfo(min, max, _options).pipe(map((apiResponse: HttpInfo<Array<ServiceResponse>>) => apiResponse.data));
    }

    /**
     * Search services by name or description
     * @param term Search term
     */
    public searchServicesWithHttpInfo(term: string, _options?: ConfigurationOptions): Observable<HttpInfo<Array<ServiceResponse>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.searchServices(term, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.searchServicesWithHttpInfo(rsp)));
            }));
    }

    /**
     * Search services by name or description
     * @param term Search term
     */
    public searchServices(term: string, _options?: ConfigurationOptions): Observable<Array<ServiceResponse>> {
        return this.searchServicesWithHttpInfo(term, _options).pipe(map((apiResponse: HttpInfo<Array<ServiceResponse>>) => apiResponse.data));
    }

    /**
     * Toggle service active status
     * @param id Service ID
     */
    public toggleServiceStatusWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<ServiceResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.toggleServiceStatus(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.toggleServiceStatusWithHttpInfo(rsp)));
            }));
    }

    /**
     * Toggle service active status
     * @param id Service ID
     */
    public toggleServiceStatus(id: number, _options?: ConfigurationOptions): Observable<ServiceResponse> {
        return this.toggleServiceStatusWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<ServiceResponse>) => apiResponse.data));
    }

    /**
     * Update a service
     * @param id Service ID
     * @param updateServiceRequest
     */
    public updateServiceWithHttpInfo(id: number, updateServiceRequest: UpdateServiceRequest, _options?: ConfigurationOptions): Observable<HttpInfo<ServiceResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.updateService(id, updateServiceRequest, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.updateServiceWithHttpInfo(rsp)));
            }));
    }

    /**
     * Update a service
     * @param id Service ID
     * @param updateServiceRequest
     */
    public updateService(id: number, updateServiceRequest: UpdateServiceRequest, _options?: ConfigurationOptions): Observable<ServiceResponse> {
        return this.updateServiceWithHttpInfo(id, updateServiceRequest, _options).pipe(map((apiResponse: HttpInfo<ServiceResponse>) => apiResponse.data));
    }

}

import { TenantsApiRequestFactory, TenantsApiResponseProcessor} from "../apis/TenantsApi";
export class ObservableTenantsApi {
    private requestFactory: TenantsApiRequestFactory;
    private responseProcessor: TenantsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: TenantsApiRequestFactory,
        responseProcessor?: TenantsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new TenantsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new TenantsApiResponseProcessor();
    }

    /**
     * Check if a subdomain is available
     * @param checkSubdomainRequest
     */
    public checkSubdomainWithHttpInfo(checkSubdomainRequest: CheckSubdomainRequest, _options?: ConfigurationOptions): Observable<HttpInfo<CheckSubdomainResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.checkSubdomain(checkSubdomainRequest, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.checkSubdomainWithHttpInfo(rsp)));
            }));
    }

    /**
     * Check if a subdomain is available
     * @param checkSubdomainRequest
     */
    public checkSubdomain(checkSubdomainRequest: CheckSubdomainRequest, _options?: ConfigurationOptions): Observable<CheckSubdomainResponse> {
        return this.checkSubdomainWithHttpInfo(checkSubdomainRequest, _options).pipe(map((apiResponse: HttpInfo<CheckSubdomainResponse>) => apiResponse.data));
    }

    /**
     * Delete tenant
     * @param id Tenant ID
     */
    public deleteTenantWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<any>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.deleteTenant(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deleteTenantWithHttpInfo(rsp)));
            }));
    }

    /**
     * Delete tenant
     * @param id Tenant ID
     */
    public deleteTenant(id: number, _options?: ConfigurationOptions): Observable<any> {
        return this.deleteTenantWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Get all tenants (admin only)
     */
    public getAllTenantsWithHttpInfo(_options?: ConfigurationOptions): Observable<HttpInfo<Array<Tenant>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getAllTenants(_config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getAllTenantsWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get all tenants (admin only)
     */
    public getAllTenants(_options?: ConfigurationOptions): Observable<Array<Tenant>> {
        return this.getAllTenantsWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<Array<Tenant>>) => apiResponse.data));
    }

    /**
     * Get tenant by ID
     * @param id Tenant ID
     */
    public getTenantByIdWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<Tenant>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getTenantById(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getTenantByIdWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get tenant by ID
     * @param id Tenant ID
     */
    public getTenantById(id: number, _options?: ConfigurationOptions): Observable<Tenant> {
        return this.getTenantByIdWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<Tenant>) => apiResponse.data));
    }

    /**
     * Register a new tenant
     * @param registerTenantRequest
     */
    public registerTenantWithHttpInfo(registerTenantRequest: RegisterTenantRequest, _options?: ConfigurationOptions): Observable<HttpInfo<RegisterTenantResponse>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.registerTenant(registerTenantRequest, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.registerTenantWithHttpInfo(rsp)));
            }));
    }

    /**
     * Register a new tenant
     * @param registerTenantRequest
     */
    public registerTenant(registerTenantRequest: RegisterTenantRequest, _options?: ConfigurationOptions): Observable<RegisterTenantResponse> {
        return this.registerTenantWithHttpInfo(registerTenantRequest, _options).pipe(map((apiResponse: HttpInfo<RegisterTenantResponse>) => apiResponse.data));
    }

    /**
     * Activate/deactivate tenant
     * @param id Tenant ID
     */
    public toggleTenantStatusWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<Tenant>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.toggleTenantStatus(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.toggleTenantStatusWithHttpInfo(rsp)));
            }));
    }

    /**
     * Activate/deactivate tenant
     * @param id Tenant ID
     */
    public toggleTenantStatus(id: number, _options?: ConfigurationOptions): Observable<Tenant> {
        return this.toggleTenantStatusWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<Tenant>) => apiResponse.data));
    }

    /**
     * Update tenant
     * @param id Tenant ID
     * @param updateTenant
     */
    public updateTenantWithHttpInfo(id: number, updateTenant: UpdateTenant, _options?: ConfigurationOptions): Observable<HttpInfo<Tenant>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.updateTenant(id, updateTenant, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.updateTenantWithHttpInfo(rsp)));
            }));
    }

    /**
     * Update tenant
     * @param id Tenant ID
     * @param updateTenant
     */
    public updateTenant(id: number, updateTenant: UpdateTenant, _options?: ConfigurationOptions): Observable<Tenant> {
        return this.updateTenantWithHttpInfo(id, updateTenant, _options).pipe(map((apiResponse: HttpInfo<Tenant>) => apiResponse.data));
    }

}

import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";
export class ObservableUsersApi {
    private requestFactory: UsersApiRequestFactory;
    private responseProcessor: UsersApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: UsersApiRequestFactory,
        responseProcessor?: UsersApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new UsersApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new UsersApiResponseProcessor();
    }

    /**
     * Change user password
     * @param id User ID
     * @param changePasswordRequest
     */
    public changeUserPasswordWithHttpInfo(id: number, changePasswordRequest: ChangePasswordRequest, _options?: ConfigurationOptions): Observable<HttpInfo<User>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.changeUserPassword(id, changePasswordRequest, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.changeUserPasswordWithHttpInfo(rsp)));
            }));
    }

    /**
     * Change user password
     * @param id User ID
     * @param changePasswordRequest
     */
    public changeUserPassword(id: number, changePasswordRequest: ChangePasswordRequest, _options?: ConfigurationOptions): Observable<User> {
        return this.changeUserPasswordWithHttpInfo(id, changePasswordRequest, _options).pipe(map((apiResponse: HttpInfo<User>) => apiResponse.data));
    }

    /**
     * Create a new user
     * @param createNewUserRequest
     */
    public createUserWithHttpInfo(createNewUserRequest: CreateNewUserRequest, _options?: ConfigurationOptions): Observable<HttpInfo<User>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.createUser(createNewUserRequest, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createUserWithHttpInfo(rsp)));
            }));
    }

    /**
     * Create a new user
     * @param createNewUserRequest
     */
    public createUser(createNewUserRequest: CreateNewUserRequest, _options?: ConfigurationOptions): Observable<User> {
        return this.createUserWithHttpInfo(createNewUserRequest, _options).pipe(map((apiResponse: HttpInfo<User>) => apiResponse.data));
    }

    /**
     * Delete a user by ID
     * @param id User ID
     */
    public deleteUserWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<any>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.deleteUser(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deleteUserWithHttpInfo(rsp)));
            }));
    }

    /**
     * Delete a user by ID
     * @param id User ID
     */
    public deleteUser(id: number, _options?: ConfigurationOptions): Observable<any> {
        return this.deleteUserWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<any>) => apiResponse.data));
    }

    /**
     * Get all users
     */
    public getAllUsersWithHttpInfo(_options?: ConfigurationOptions): Observable<HttpInfo<Array<User>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getAllUsers(_config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getAllUsersWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get all users
     */
    public getAllUsers(_options?: ConfigurationOptions): Observable<Array<User>> {
        return this.getAllUsersWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<Array<User>>) => apiResponse.data));
    }

    /**
     * Find user by email
     * @param email User email
     */
    public getUserByEmailWithHttpInfo(email: string, _options?: ConfigurationOptions): Observable<HttpInfo<User>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getUserByEmail(email, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getUserByEmailWithHttpInfo(rsp)));
            }));
    }

    /**
     * Find user by email
     * @param email User email
     */
    public getUserByEmail(email: string, _options?: ConfigurationOptions): Observable<User> {
        return this.getUserByEmailWithHttpInfo(email, _options).pipe(map((apiResponse: HttpInfo<User>) => apiResponse.data));
    }

    /**
     * Get a user by ID
     * @param id User ID
     */
    public getUserByIdWithHttpInfo(id: number, _options?: ConfigurationOptions): Observable<HttpInfo<User>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getUserById(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getUserByIdWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get a user by ID
     * @param id User ID
     */
    public getUserById(id: number, _options?: ConfigurationOptions): Observable<User> {
        return this.getUserByIdWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<User>) => apiResponse.data));
    }

    /**
     * Find users by role
     * @param role User role (client, admin, staff)
     */
    public getUsersByRoleWithHttpInfo(role: string, _options?: ConfigurationOptions): Observable<HttpInfo<Array<User>>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getUsersByRole(role, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getUsersByRoleWithHttpInfo(rsp)));
            }));
    }

    /**
     * Find users by role
     * @param role User role (client, admin, staff)
     */
    public getUsersByRole(role: string, _options?: ConfigurationOptions): Observable<Array<User>> {
        return this.getUsersByRoleWithHttpInfo(role, _options).pipe(map((apiResponse: HttpInfo<Array<User>>) => apiResponse.data));
    }

    /**
     * Update a user by ID
     * @param id User ID
     * @param updateUser
     */
    public updateUserWithHttpInfo(id: number, updateUser: UpdateUser, _options?: ConfigurationOptions): Observable<HttpInfo<User>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.updateUser(id, updateUser, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.updateUserWithHttpInfo(rsp)));
            }));
    }

    /**
     * Update a user by ID
     * @param id User ID
     * @param updateUser
     */
    public updateUser(id: number, updateUser: UpdateUser, _options?: ConfigurationOptions): Observable<User> {
        return this.updateUserWithHttpInfo(id, updateUser, _options).pipe(map((apiResponse: HttpInfo<User>) => apiResponse.data));
    }

}
