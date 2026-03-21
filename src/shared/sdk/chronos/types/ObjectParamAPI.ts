import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions } from '../configuration'
import type { Middleware } from '../middleware';

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

import { ObservableAuthApi } from "./ObservableAPI";
import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";

export interface AuthApiGetCurrentUserRequest {
}

export interface AuthApiLoginRequest {
    /**
     * 
     * @type LoginRequest
     * @memberof AuthApilogin
     */
    loginRequest: LoginRequest
}

export class ObjectAuthApi {
    private api: ObservableAuthApi

    public constructor(configuration: Configuration, requestFactory?: AuthApiRequestFactory, responseProcessor?: AuthApiResponseProcessor) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get current user profile
     * @param param the request object
     */
    public getCurrentUserWithHttpInfo(param: AuthApiGetCurrentUserRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<UserResponse>> {
        return this.api.getCurrentUserWithHttpInfo( options).toPromise();
    }

    /**
     * Get current user profile
     * @param param the request object
     */
    public getCurrentUser(param: AuthApiGetCurrentUserRequest = {}, options?: ConfigurationOptions): Promise<UserResponse> {
        return this.api.getCurrentUser( options).toPromise();
    }

    /**
     * Login to the system
     * @param param the request object
     */
    public loginWithHttpInfo(param: AuthApiLoginRequest, options?: ConfigurationOptions): Promise<HttpInfo<LoginResponse>> {
        return this.api.loginWithHttpInfo(param.loginRequest,  options).toPromise();
    }

    /**
     * Login to the system
     * @param param the request object
     */
    public login(param: AuthApiLoginRequest, options?: ConfigurationOptions): Promise<LoginResponse> {
        return this.api.login(param.loginRequest,  options).toPromise();
    }

}

import { ObservableAvailabilityApi } from "./ObservableAPI";
import { AvailabilityApiRequestFactory, AvailabilityApiResponseProcessor} from "../apis/AvailabilityApi";

export interface AvailabilityApiCheckTimeSlotRequest {
    /**
     * Staff user ID
     * Defaults to: undefined
     * @type number
     * @memberof AvailabilityApicheckTimeSlot
     */
    staffId: number
    /**
     * Date (YYYY-MM-DD)
     * Defaults to: undefined
     * @type string
     * @memberof AvailabilityApicheckTimeSlot
     */
    date: string
    /**
     * Time (HH:MM)
     * Defaults to: undefined
     * @type string
     * @memberof AvailabilityApicheckTimeSlot
     */
    time: string
    /**
     * Duration in minutes
     * Defaults to: undefined
     * @type number
     * @memberof AvailabilityApicheckTimeSlot
     */
    duration: number
}

export interface AvailabilityApiCreateAvailabilityRequest {
    /**
     * 
     * @type CreateNewAvailabilityRequest
     * @memberof AvailabilityApicreateAvailability
     */
    createNewAvailabilityRequest: CreateNewAvailabilityRequest
}

export interface AvailabilityApiCreateBulkAvailabilityRequest {
    /**
     * 
     * @type Array&lt;BulkAvailabilityRequest&gt;
     * @memberof AvailabilityApicreateBulkAvailability
     */
    bulkAvailabilityRequest: Array<BulkAvailabilityRequest>
}

export interface AvailabilityApiDeleteAvailabilityRequest {
    /**
     * Availability ID
     * Defaults to: undefined
     * @type number
     * @memberof AvailabilityApideleteAvailability
     */
    id: number
}

export interface AvailabilityApiDeleteAvailabilityByDateRequest {
    /**
     * Staff user ID
     * Defaults to: undefined
     * @type number
     * @memberof AvailabilityApideleteAvailabilityByDate
     */
    staffId: number
    /**
     * Date (YYYY-MM-DD)
     * Defaults to: undefined
     * @type string
     * @memberof AvailabilityApideleteAvailabilityByDate
     */
    date: string
}

export interface AvailabilityApiGenerateAvailableSlotsRequest {
    /**
     * 
     * @type GenerateSlotsRequest
     * @memberof AvailabilityApigenerateAvailableSlots
     */
    generateSlotsRequest: GenerateSlotsRequest
}

export interface AvailabilityApiGetAllAvailabilityRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof AvailabilityApigetAllAvailability
     */
    staffId?: number
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof AvailabilityApigetAllAvailability
     */
    date?: string
    /**
     * 
     * Defaults to: undefined
     * @type boolean
     * @memberof AvailabilityApigetAllAvailability
     */
    recurring?: boolean
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof AvailabilityApigetAllAvailability
     */
    dayOfWeek?: number
}

export interface AvailabilityApiGetAvailabilityByDateRequest {
    /**
     * Date (YYYY-MM-DD)
     * Defaults to: undefined
     * @type string
     * @memberof AvailabilityApigetAvailabilityByDate
     */
    date: string
}

export interface AvailabilityApiGetAvailabilityByDayRequest {
    /**
     * Day of week (0&#x3D;Sunday, 1&#x3D;Monday, ..., 6&#x3D;Saturday)
     * Defaults to: undefined
     * @type number
     * @memberof AvailabilityApigetAvailabilityByDay
     */
    day: number
}

export interface AvailabilityApiGetAvailabilityByIdRequest {
    /**
     * Availability ID
     * Defaults to: undefined
     * @type number
     * @memberof AvailabilityApigetAvailabilityById
     */
    id: number
}

export interface AvailabilityApiGetAvailabilityByStaffRequest {
    /**
     * Staff user ID
     * Defaults to: undefined
     * @type number
     * @memberof AvailabilityApigetAvailabilityByStaff
     */
    staffId: number
}

export interface AvailabilityApiGetRecurringAvailabilityByStaffRequest {
    /**
     * Staff user ID
     * Defaults to: undefined
     * @type number
     * @memberof AvailabilityApigetRecurringAvailabilityByStaff
     */
    staffId: number
}

export interface AvailabilityApiGetSpecificAvailabilityByStaffRequest {
    /**
     * Staff user ID
     * Defaults to: undefined
     * @type number
     * @memberof AvailabilityApigetSpecificAvailabilityByStaff
     */
    staffId: number
}

export interface AvailabilityApiUpdateAvailabilityRequest {
    /**
     * Availability ID
     * Defaults to: undefined
     * @type number
     * @memberof AvailabilityApiupdateAvailability
     */
    id: number
    /**
     * 
     * @type UpdateAvailability
     * @memberof AvailabilityApiupdateAvailability
     */
    updateAvailability: UpdateAvailability
}

export class ObjectAvailabilityApi {
    private api: ObservableAvailabilityApi

    public constructor(configuration: Configuration, requestFactory?: AvailabilityApiRequestFactory, responseProcessor?: AvailabilityApiResponseProcessor) {
        this.api = new ObservableAvailabilityApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Check if a staff member is available at a specific time
     * @param param the request object
     */
    public checkTimeSlotWithHttpInfo(param: AvailabilityApiCheckTimeSlotRequest, options?: ConfigurationOptions): Promise<HttpInfo<AvailabilityCheckResponse>> {
        return this.api.checkTimeSlotWithHttpInfo(param.staffId, param.date, param.time, param.duration,  options).toPromise();
    }

    /**
     * Check if a staff member is available at a specific time
     * @param param the request object
     */
    public checkTimeSlot(param: AvailabilityApiCheckTimeSlotRequest, options?: ConfigurationOptions): Promise<AvailabilityCheckResponse> {
        return this.api.checkTimeSlot(param.staffId, param.date, param.time, param.duration,  options).toPromise();
    }

    /**
     * Create a new availability slot
     * @param param the request object
     */
    public createAvailabilityWithHttpInfo(param: AvailabilityApiCreateAvailabilityRequest, options?: ConfigurationOptions): Promise<HttpInfo<Availability>> {
        return this.api.createAvailabilityWithHttpInfo(param.createNewAvailabilityRequest,  options).toPromise();
    }

    /**
     * Create a new availability slot
     * @param param the request object
     */
    public createAvailability(param: AvailabilityApiCreateAvailabilityRequest, options?: ConfigurationOptions): Promise<Availability> {
        return this.api.createAvailability(param.createNewAvailabilityRequest,  options).toPromise();
    }

    /**
     * Create multiple availability slots at once
     * @param param the request object
     */
    public createBulkAvailabilityWithHttpInfo(param: AvailabilityApiCreateBulkAvailabilityRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<Availability>>> {
        return this.api.createBulkAvailabilityWithHttpInfo(param.bulkAvailabilityRequest,  options).toPromise();
    }

    /**
     * Create multiple availability slots at once
     * @param param the request object
     */
    public createBulkAvailability(param: AvailabilityApiCreateBulkAvailabilityRequest, options?: ConfigurationOptions): Promise<Array<Availability>> {
        return this.api.createBulkAvailability(param.bulkAvailabilityRequest,  options).toPromise();
    }

    /**
     * Delete an availability slot
     * @param param the request object
     */
    public deleteAvailabilityWithHttpInfo(param: AvailabilityApiDeleteAvailabilityRequest, options?: ConfigurationOptions): Promise<HttpInfo<any>> {
        return this.api.deleteAvailabilityWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Delete an availability slot
     * @param param the request object
     */
    public deleteAvailability(param: AvailabilityApiDeleteAvailabilityRequest, options?: ConfigurationOptions): Promise<any> {
        return this.api.deleteAvailability(param.id,  options).toPromise();
    }

    /**
     * Delete all availability for a specific date
     * @param param the request object
     */
    public deleteAvailabilityByDateWithHttpInfo(param: AvailabilityApiDeleteAvailabilityByDateRequest, options?: ConfigurationOptions): Promise<HttpInfo<any>> {
        return this.api.deleteAvailabilityByDateWithHttpInfo(param.staffId, param.date,  options).toPromise();
    }

    /**
     * Delete all availability for a specific date
     * @param param the request object
     */
    public deleteAvailabilityByDate(param: AvailabilityApiDeleteAvailabilityByDateRequest, options?: ConfigurationOptions): Promise<any> {
        return this.api.deleteAvailabilityByDate(param.staffId, param.date,  options).toPromise();
    }

    /**
     * Generate available time slots for a specific date and service
     * @param param the request object
     */
    public generateAvailableSlotsWithHttpInfo(param: AvailabilityApiGenerateAvailableSlotsRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<string>>> {
        return this.api.generateAvailableSlotsWithHttpInfo(param.generateSlotsRequest,  options).toPromise();
    }

    /**
     * Generate available time slots for a specific date and service
     * @param param the request object
     */
    public generateAvailableSlots(param: AvailabilityApiGenerateAvailableSlotsRequest, options?: ConfigurationOptions): Promise<Array<string>> {
        return this.api.generateAvailableSlots(param.generateSlotsRequest,  options).toPromise();
    }

    /**
     * Get all availability slots with optional filtering
     * @param param the request object
     */
    public getAllAvailabilityWithHttpInfo(param: AvailabilityApiGetAllAvailabilityRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<Availability>>> {
        return this.api.getAllAvailabilityWithHttpInfo(param.staffId, param.date, param.recurring, param.dayOfWeek,  options).toPromise();
    }

    /**
     * Get all availability slots with optional filtering
     * @param param the request object
     */
    public getAllAvailability(param: AvailabilityApiGetAllAvailabilityRequest = {}, options?: ConfigurationOptions): Promise<Array<Availability>> {
        return this.api.getAllAvailability(param.staffId, param.date, param.recurring, param.dayOfWeek,  options).toPromise();
    }

    /**
     * Get availability for a specific date
     * @param param the request object
     */
    public getAvailabilityByDateWithHttpInfo(param: AvailabilityApiGetAvailabilityByDateRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<Availability>>> {
        return this.api.getAvailabilityByDateWithHttpInfo(param.date,  options).toPromise();
    }

    /**
     * Get availability for a specific date
     * @param param the request object
     */
    public getAvailabilityByDate(param: AvailabilityApiGetAvailabilityByDateRequest, options?: ConfigurationOptions): Promise<Array<Availability>> {
        return this.api.getAvailabilityByDate(param.date,  options).toPromise();
    }

    /**
     * Get availability by day of week
     * @param param the request object
     */
    public getAvailabilityByDayWithHttpInfo(param: AvailabilityApiGetAvailabilityByDayRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<Availability>>> {
        return this.api.getAvailabilityByDayWithHttpInfo(param.day,  options).toPromise();
    }

    /**
     * Get availability by day of week
     * @param param the request object
     */
    public getAvailabilityByDay(param: AvailabilityApiGetAvailabilityByDayRequest, options?: ConfigurationOptions): Promise<Array<Availability>> {
        return this.api.getAvailabilityByDay(param.day,  options).toPromise();
    }

    /**
     * Get an availability slot by ID
     * @param param the request object
     */
    public getAvailabilityByIdWithHttpInfo(param: AvailabilityApiGetAvailabilityByIdRequest, options?: ConfigurationOptions): Promise<HttpInfo<Availability>> {
        return this.api.getAvailabilityByIdWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Get an availability slot by ID
     * @param param the request object
     */
    public getAvailabilityById(param: AvailabilityApiGetAvailabilityByIdRequest, options?: ConfigurationOptions): Promise<Availability> {
        return this.api.getAvailabilityById(param.id,  options).toPromise();
    }

    /**
     * Get availability by staff ID
     * @param param the request object
     */
    public getAvailabilityByStaffWithHttpInfo(param: AvailabilityApiGetAvailabilityByStaffRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<Availability>>> {
        return this.api.getAvailabilityByStaffWithHttpInfo(param.staffId,  options).toPromise();
    }

    /**
     * Get availability by staff ID
     * @param param the request object
     */
    public getAvailabilityByStaff(param: AvailabilityApiGetAvailabilityByStaffRequest, options?: ConfigurationOptions): Promise<Array<Availability>> {
        return this.api.getAvailabilityByStaff(param.staffId,  options).toPromise();
    }

    /**
     * Get recurring availability by staff ID
     * @param param the request object
     */
    public getRecurringAvailabilityByStaffWithHttpInfo(param: AvailabilityApiGetRecurringAvailabilityByStaffRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<Availability>>> {
        return this.api.getRecurringAvailabilityByStaffWithHttpInfo(param.staffId,  options).toPromise();
    }

    /**
     * Get recurring availability by staff ID
     * @param param the request object
     */
    public getRecurringAvailabilityByStaff(param: AvailabilityApiGetRecurringAvailabilityByStaffRequest, options?: ConfigurationOptions): Promise<Array<Availability>> {
        return this.api.getRecurringAvailabilityByStaff(param.staffId,  options).toPromise();
    }

    /**
     * Get specific date availability by staff ID
     * @param param the request object
     */
    public getSpecificAvailabilityByStaffWithHttpInfo(param: AvailabilityApiGetSpecificAvailabilityByStaffRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<Availability>>> {
        return this.api.getSpecificAvailabilityByStaffWithHttpInfo(param.staffId,  options).toPromise();
    }

    /**
     * Get specific date availability by staff ID
     * @param param the request object
     */
    public getSpecificAvailabilityByStaff(param: AvailabilityApiGetSpecificAvailabilityByStaffRequest, options?: ConfigurationOptions): Promise<Array<Availability>> {
        return this.api.getSpecificAvailabilityByStaff(param.staffId,  options).toPromise();
    }

    /**
     * Update an availability slot
     * @param param the request object
     */
    public updateAvailabilityWithHttpInfo(param: AvailabilityApiUpdateAvailabilityRequest, options?: ConfigurationOptions): Promise<HttpInfo<Availability>> {
        return this.api.updateAvailabilityWithHttpInfo(param.id, param.updateAvailability,  options).toPromise();
    }

    /**
     * Update an availability slot
     * @param param the request object
     */
    public updateAvailability(param: AvailabilityApiUpdateAvailabilityRequest, options?: ConfigurationOptions): Promise<Availability> {
        return this.api.updateAvailability(param.id, param.updateAvailability,  options).toPromise();
    }

}

import { ObservableBookingsApi } from "./ObservableAPI";
import { BookingsApiRequestFactory, BookingsApiResponseProcessor} from "../apis/BookingsApi";

export interface BookingsApiCancelBookingAuthRequest {
    /**
     * Booking ID
     * Defaults to: undefined
     * @type number
     * @memberof BookingsApicancelBookingAuth
     */
    id: number
}

export interface BookingsApiCancelBookingMagicRequest {
    /**
     * Booking ID
     * Defaults to: undefined
     * @type number
     * @memberof BookingsApicancelBookingMagic
     */
    id: number
    /**
     * Magic link token
     * Defaults to: undefined
     * @type string
     * @memberof BookingsApicancelBookingMagic
     */
    token: string
}

export interface BookingsApiCheckBookingAvailabilityRequest {
    /**
     * 
     * @type CheckAvailabilityRequest
     * @memberof BookingsApicheckBookingAvailability
     */
    checkAvailabilityRequest: CheckAvailabilityRequest
}

export interface BookingsApiCompleteBookingRequest {
    /**
     * Booking ID
     * Defaults to: undefined
     * @type number
     * @memberof BookingsApicompleteBooking
     */
    id: number
}

export interface BookingsApiConfirmBookingRequest {
    /**
     * Booking ID
     * Defaults to: undefined
     * @type number
     * @memberof BookingsApiconfirmBooking
     */
    id: number
}

export interface BookingsApiCreateBookingRequest {
    /**
     * 
     * @type CreateBookingRequest
     * @memberof BookingsApicreateBooking
     */
    createBookingRequest: CreateBookingRequest
}

export interface BookingsApiDeleteBookingRequest {
    /**
     * Booking ID
     * Defaults to: undefined
     * @type number
     * @memberof BookingsApideleteBooking
     */
    id: number
}

export interface BookingsApiGetAllBookingsRequest {
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof BookingsApigetAllBookings
     */
    userId?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof BookingsApigetAllBookings
     */
    staffId?: number
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof BookingsApigetAllBookings
     */
    guestEmail?: string
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof BookingsApigetAllBookings
     */
    serviceId?: number
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof BookingsApigetAllBookings
     */
    status?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof BookingsApigetAllBookings
     */
    dateFrom?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof BookingsApigetAllBookings
     */
    dateTo?: string
}

export interface BookingsApiGetBookingByIdRequest {
    /**
     * Booking ID
     * Defaults to: undefined
     * @type number
     * @memberof BookingsApigetBookingById
     */
    id: number
}

export interface BookingsApiGetBookingByTokenRequest {
    /**
     * Magic link token
     * Defaults to: undefined
     * @type string
     * @memberof BookingsApigetBookingByToken
     */
    token: string
}

export interface BookingsApiGetBookingWithDetailsRequest {
    /**
     * Booking ID
     * Defaults to: undefined
     * @type number
     * @memberof BookingsApigetBookingWithDetails
     */
    id: number
}

export interface BookingsApiGetBookingsByDateRequest {
    /**
     * Date (YYYY-MM-DD)
     * Defaults to: undefined
     * @type string
     * @memberof BookingsApigetBookingsByDate
     */
    date: string
}

export interface BookingsApiGetBookingsByStaffRequest {
    /**
     * Staff user ID
     * Defaults to: undefined
     * @type number
     * @memberof BookingsApigetBookingsByStaff
     */
    staffId: number
    /**
     * Start date
     * Defaults to: undefined
     * @type string
     * @memberof BookingsApigetBookingsByStaff
     */
    dateFrom?: string
    /**
     * End date
     * Defaults to: undefined
     * @type string
     * @memberof BookingsApigetBookingsByStaff
     */
    dateTo?: string
    /**
     * Filter by status
     * Defaults to: undefined
     * @type string
     * @memberof BookingsApigetBookingsByStaff
     */
    status?: string
}

export interface BookingsApiGetBookingsByStatusRequest {
    /**
     * Booking status (pending, confirmed, cancelled, completed, no_show)
     * Defaults to: undefined
     * @type string
     * @memberof BookingsApigetBookingsByStatus
     */
    status: string
}

export interface BookingsApiGetBookingsByUserRequest {
    /**
     * User ID
     * Defaults to: undefined
     * @type number
     * @memberof BookingsApigetBookingsByUser
     */
    userId: number
}

export interface BookingsApiGetUpcomingBookingsRequest {
    /**
     * Number of days ahead
     * Defaults to: undefined
     * @type number
     * @memberof BookingsApigetUpcomingBookings
     */
    days: number
}

export interface BookingsApiRescheduleBookingMagicRequest {
    /**
     * Booking ID
     * Defaults to: undefined
     * @type number
     * @memberof BookingsApirescheduleBookingMagic
     */
    id: number
    /**
     * 
     * @type RescheduleMagicRequest
     * @memberof BookingsApirescheduleBookingMagic
     */
    rescheduleMagicRequest: RescheduleMagicRequest
}

export interface BookingsApiUpdateBookingRequest {
    /**
     * Booking ID
     * Defaults to: undefined
     * @type number
     * @memberof BookingsApiupdateBooking
     */
    id: number
    /**
     * 
     * @type UpdateBooking
     * @memberof BookingsApiupdateBooking
     */
    updateBooking: UpdateBooking
}

export interface BookingsApiUpdateBookingStatusRequest {
    /**
     * Booking ID
     * Defaults to: undefined
     * @type number
     * @memberof BookingsApiupdateBookingStatus
     */
    id: number
    /**
     * 
     * @type UpdateStatusRequest
     * @memberof BookingsApiupdateBookingStatus
     */
    updateStatusRequest: UpdateStatusRequest
}

export class ObjectBookingsApi {
    private api: ObservableBookingsApi

    public constructor(configuration: Configuration, requestFactory?: BookingsApiRequestFactory, responseProcessor?: BookingsApiResponseProcessor) {
        this.api = new ObservableBookingsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Cancel a booking (authenticated)
     * @param param the request object
     */
    public cancelBookingAuthWithHttpInfo(param: BookingsApiCancelBookingAuthRequest, options?: ConfigurationOptions): Promise<HttpInfo<BookingResponse>> {
        return this.api.cancelBookingAuthWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Cancel a booking (authenticated)
     * @param param the request object
     */
    public cancelBookingAuth(param: BookingsApiCancelBookingAuthRequest, options?: ConfigurationOptions): Promise<BookingResponse> {
        return this.api.cancelBookingAuth(param.id,  options).toPromise();
    }

    /**
     * Cancel a booking via magic link
     * @param param the request object
     */
    public cancelBookingMagicWithHttpInfo(param: BookingsApiCancelBookingMagicRequest, options?: ConfigurationOptions): Promise<HttpInfo<BookingResponse>> {
        return this.api.cancelBookingMagicWithHttpInfo(param.id, param.token,  options).toPromise();
    }

    /**
     * Cancel a booking via magic link
     * @param param the request object
     */
    public cancelBookingMagic(param: BookingsApiCancelBookingMagicRequest, options?: ConfigurationOptions): Promise<BookingResponse> {
        return this.api.cancelBookingMagic(param.id, param.token,  options).toPromise();
    }

    /**
     * Check if a time slot is available
     * @param param the request object
     */
    public checkBookingAvailabilityWithHttpInfo(param: BookingsApiCheckBookingAvailabilityRequest, options?: ConfigurationOptions): Promise<HttpInfo<AvailabilityResponse>> {
        return this.api.checkBookingAvailabilityWithHttpInfo(param.checkAvailabilityRequest,  options).toPromise();
    }

    /**
     * Check if a time slot is available
     * @param param the request object
     */
    public checkBookingAvailability(param: BookingsApiCheckBookingAvailabilityRequest, options?: ConfigurationOptions): Promise<AvailabilityResponse> {
        return this.api.checkBookingAvailability(param.checkAvailabilityRequest,  options).toPromise();
    }

    /**
     * Mark a booking as completed
     * @param param the request object
     */
    public completeBookingWithHttpInfo(param: BookingsApiCompleteBookingRequest, options?: ConfigurationOptions): Promise<HttpInfo<BookingResponse>> {
        return this.api.completeBookingWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Mark a booking as completed
     * @param param the request object
     */
    public completeBooking(param: BookingsApiCompleteBookingRequest, options?: ConfigurationOptions): Promise<BookingResponse> {
        return this.api.completeBooking(param.id,  options).toPromise();
    }

    /**
     * Confirm a booking
     * @param param the request object
     */
    public confirmBookingWithHttpInfo(param: BookingsApiConfirmBookingRequest, options?: ConfigurationOptions): Promise<HttpInfo<BookingResponse>> {
        return this.api.confirmBookingWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Confirm a booking
     * @param param the request object
     */
    public confirmBooking(param: BookingsApiConfirmBookingRequest, options?: ConfigurationOptions): Promise<BookingResponse> {
        return this.api.confirmBooking(param.id,  options).toPromise();
    }

    /**
     * Create a new booking
     * @param param the request object
     */
    public createBookingWithHttpInfo(param: BookingsApiCreateBookingRequest, options?: ConfigurationOptions): Promise<HttpInfo<MagicLinkResponse>> {
        return this.api.createBookingWithHttpInfo(param.createBookingRequest,  options).toPromise();
    }

    /**
     * Create a new booking
     * @param param the request object
     */
    public createBooking(param: BookingsApiCreateBookingRequest, options?: ConfigurationOptions): Promise<MagicLinkResponse> {
        return this.api.createBooking(param.createBookingRequest,  options).toPromise();
    }

    /**
     * Delete a booking
     * @param param the request object
     */
    public deleteBookingWithHttpInfo(param: BookingsApiDeleteBookingRequest, options?: ConfigurationOptions): Promise<HttpInfo<any>> {
        return this.api.deleteBookingWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Delete a booking
     * @param param the request object
     */
    public deleteBooking(param: BookingsApiDeleteBookingRequest, options?: ConfigurationOptions): Promise<any> {
        return this.api.deleteBooking(param.id,  options).toPromise();
    }

    /**
     * Get all bookings with optional filtering
     * @param param the request object
     */
    public getAllBookingsWithHttpInfo(param: BookingsApiGetAllBookingsRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<BookingResponse>>> {
        return this.api.getAllBookingsWithHttpInfo(param.userId, param.staffId, param.guestEmail, param.serviceId, param.status, param.dateFrom, param.dateTo,  options).toPromise();
    }

    /**
     * Get all bookings with optional filtering
     * @param param the request object
     */
    public getAllBookings(param: BookingsApiGetAllBookingsRequest = {}, options?: ConfigurationOptions): Promise<Array<BookingResponse>> {
        return this.api.getAllBookings(param.userId, param.staffId, param.guestEmail, param.serviceId, param.status, param.dateFrom, param.dateTo,  options).toPromise();
    }

    /**
     * Get a booking by ID
     * @param param the request object
     */
    public getBookingByIdWithHttpInfo(param: BookingsApiGetBookingByIdRequest, options?: ConfigurationOptions): Promise<HttpInfo<BookingResponse>> {
        return this.api.getBookingByIdWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Get a booking by ID
     * @param param the request object
     */
    public getBookingById(param: BookingsApiGetBookingByIdRequest, options?: ConfigurationOptions): Promise<BookingResponse> {
        return this.api.getBookingById(param.id,  options).toPromise();
    }

    /**
     * Get booking by magic link token
     * @param param the request object
     */
    public getBookingByTokenWithHttpInfo(param: BookingsApiGetBookingByTokenRequest, options?: ConfigurationOptions): Promise<HttpInfo<BookingWithDetails>> {
        return this.api.getBookingByTokenWithHttpInfo(param.token,  options).toPromise();
    }

    /**
     * Get booking by magic link token
     * @param param the request object
     */
    public getBookingByToken(param: BookingsApiGetBookingByTokenRequest, options?: ConfigurationOptions): Promise<BookingWithDetails> {
        return this.api.getBookingByToken(param.token,  options).toPromise();
    }

    /**
     * Get a booking with user and service details
     * @param param the request object
     */
    public getBookingWithDetailsWithHttpInfo(param: BookingsApiGetBookingWithDetailsRequest, options?: ConfigurationOptions): Promise<HttpInfo<BookingWithDetails>> {
        return this.api.getBookingWithDetailsWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Get a booking with user and service details
     * @param param the request object
     */
    public getBookingWithDetails(param: BookingsApiGetBookingWithDetailsRequest, options?: ConfigurationOptions): Promise<BookingWithDetails> {
        return this.api.getBookingWithDetails(param.id,  options).toPromise();
    }

    /**
     * Get bookings by date
     * @param param the request object
     */
    public getBookingsByDateWithHttpInfo(param: BookingsApiGetBookingsByDateRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<BookingResponse>>> {
        return this.api.getBookingsByDateWithHttpInfo(param.date,  options).toPromise();
    }

    /**
     * Get bookings by date
     * @param param the request object
     */
    public getBookingsByDate(param: BookingsApiGetBookingsByDateRequest, options?: ConfigurationOptions): Promise<Array<BookingResponse>> {
        return this.api.getBookingsByDate(param.date,  options).toPromise();
    }

    /**
     * Get bookings by staff ID
     * @param param the request object
     */
    public getBookingsByStaffWithHttpInfo(param: BookingsApiGetBookingsByStaffRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<BookingResponse>>> {
        return this.api.getBookingsByStaffWithHttpInfo(param.staffId, param.dateFrom, param.dateTo, param.status,  options).toPromise();
    }

    /**
     * Get bookings by staff ID
     * @param param the request object
     */
    public getBookingsByStaff(param: BookingsApiGetBookingsByStaffRequest, options?: ConfigurationOptions): Promise<Array<BookingResponse>> {
        return this.api.getBookingsByStaff(param.staffId, param.dateFrom, param.dateTo, param.status,  options).toPromise();
    }

    /**
     * Get bookings by status
     * @param param the request object
     */
    public getBookingsByStatusWithHttpInfo(param: BookingsApiGetBookingsByStatusRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<BookingResponse>>> {
        return this.api.getBookingsByStatusWithHttpInfo(param.status,  options).toPromise();
    }

    /**
     * Get bookings by status
     * @param param the request object
     */
    public getBookingsByStatus(param: BookingsApiGetBookingsByStatusRequest, options?: ConfigurationOptions): Promise<Array<BookingResponse>> {
        return this.api.getBookingsByStatus(param.status,  options).toPromise();
    }

    /**
     * Get bookings by user ID
     * @param param the request object
     */
    public getBookingsByUserWithHttpInfo(param: BookingsApiGetBookingsByUserRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<BookingResponse>>> {
        return this.api.getBookingsByUserWithHttpInfo(param.userId,  options).toPromise();
    }

    /**
     * Get bookings by user ID
     * @param param the request object
     */
    public getBookingsByUser(param: BookingsApiGetBookingsByUserRequest, options?: ConfigurationOptions): Promise<Array<BookingResponse>> {
        return this.api.getBookingsByUser(param.userId,  options).toPromise();
    }

    /**
     * Get upcoming bookings
     * @param param the request object
     */
    public getUpcomingBookingsWithHttpInfo(param: BookingsApiGetUpcomingBookingsRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<BookingResponse>>> {
        return this.api.getUpcomingBookingsWithHttpInfo(param.days,  options).toPromise();
    }

    /**
     * Get upcoming bookings
     * @param param the request object
     */
    public getUpcomingBookings(param: BookingsApiGetUpcomingBookingsRequest, options?: ConfigurationOptions): Promise<Array<BookingResponse>> {
        return this.api.getUpcomingBookings(param.days,  options).toPromise();
    }

    /**
     * Reschedule a booking via magic link
     * @param param the request object
     */
    public rescheduleBookingMagicWithHttpInfo(param: BookingsApiRescheduleBookingMagicRequest, options?: ConfigurationOptions): Promise<HttpInfo<BookingResponse>> {
        return this.api.rescheduleBookingMagicWithHttpInfo(param.id, param.rescheduleMagicRequest,  options).toPromise();
    }

    /**
     * Reschedule a booking via magic link
     * @param param the request object
     */
    public rescheduleBookingMagic(param: BookingsApiRescheduleBookingMagicRequest, options?: ConfigurationOptions): Promise<BookingResponse> {
        return this.api.rescheduleBookingMagic(param.id, param.rescheduleMagicRequest,  options).toPromise();
    }

    /**
     * Update a booking
     * @param param the request object
     */
    public updateBookingWithHttpInfo(param: BookingsApiUpdateBookingRequest, options?: ConfigurationOptions): Promise<HttpInfo<BookingResponse>> {
        return this.api.updateBookingWithHttpInfo(param.id, param.updateBooking,  options).toPromise();
    }

    /**
     * Update a booking
     * @param param the request object
     */
    public updateBooking(param: BookingsApiUpdateBookingRequest, options?: ConfigurationOptions): Promise<BookingResponse> {
        return this.api.updateBooking(param.id, param.updateBooking,  options).toPromise();
    }

    /**
     * Update booking status
     * @param param the request object
     */
    public updateBookingStatusWithHttpInfo(param: BookingsApiUpdateBookingStatusRequest, options?: ConfigurationOptions): Promise<HttpInfo<BookingResponse>> {
        return this.api.updateBookingStatusWithHttpInfo(param.id, param.updateStatusRequest,  options).toPromise();
    }

    /**
     * Update booking status
     * @param param the request object
     */
    public updateBookingStatus(param: BookingsApiUpdateBookingStatusRequest, options?: ConfigurationOptions): Promise<BookingResponse> {
        return this.api.updateBookingStatus(param.id, param.updateStatusRequest,  options).toPromise();
    }

}

import { ObservableCategoriesApi } from "./ObservableAPI";
import { CategoriesApiRequestFactory, CategoriesApiResponseProcessor} from "../apis/CategoriesApi";

export interface CategoriesApiCreateCategoryRequest {
    /**
     * 
     * @type CreateNewCategoryRequest
     * @memberof CategoriesApicreateCategory
     */
    createNewCategoryRequest: CreateNewCategoryRequest
}

export interface CategoriesApiDeleteCategoryRequest {
    /**
     * Category ID
     * Defaults to: undefined
     * @type number
     * @memberof CategoriesApideleteCategory
     */
    id: number
}

export interface CategoriesApiGetAllCategoriesRequest {
}

export interface CategoriesApiGetCategoriesWithServicesRequest {
}

export interface CategoriesApiGetCategoryByIdRequest {
    /**
     * Category ID
     * Defaults to: undefined
     * @type number
     * @memberof CategoriesApigetCategoryById
     */
    id: number
}

export interface CategoriesApiGetUncategorizedServicesRequest {
}

export interface CategoriesApiReorderCategoriesRequest {
    /**
     * 
     * @type ReorderCategoriesRequest
     * @memberof CategoriesApireorderCategories
     */
    reorderCategoriesRequest: ReorderCategoriesRequest
}

export interface CategoriesApiUpdateCategoryRequest {
    /**
     * Category ID
     * Defaults to: undefined
     * @type number
     * @memberof CategoriesApiupdateCategory
     */
    id: number
    /**
     * 
     * @type UpdateCategory
     * @memberof CategoriesApiupdateCategory
     */
    updateCategory: UpdateCategory
}

export class ObjectCategoriesApi {
    private api: ObservableCategoriesApi

    public constructor(configuration: Configuration, requestFactory?: CategoriesApiRequestFactory, responseProcessor?: CategoriesApiResponseProcessor) {
        this.api = new ObservableCategoriesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create a new service category
     * @param param the request object
     */
    public createCategoryWithHttpInfo(param: CategoriesApiCreateCategoryRequest, options?: ConfigurationOptions): Promise<HttpInfo<Category>> {
        return this.api.createCategoryWithHttpInfo(param.createNewCategoryRequest,  options).toPromise();
    }

    /**
     * Create a new service category
     * @param param the request object
     */
    public createCategory(param: CategoriesApiCreateCategoryRequest, options?: ConfigurationOptions): Promise<Category> {
        return this.api.createCategory(param.createNewCategoryRequest,  options).toPromise();
    }

    /**
     * Delete category
     * @param param the request object
     */
    public deleteCategoryWithHttpInfo(param: CategoriesApiDeleteCategoryRequest, options?: ConfigurationOptions): Promise<HttpInfo<any>> {
        return this.api.deleteCategoryWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Delete category
     * @param param the request object
     */
    public deleteCategory(param: CategoriesApiDeleteCategoryRequest, options?: ConfigurationOptions): Promise<any> {
        return this.api.deleteCategory(param.id,  options).toPromise();
    }

    /**
     * Get all categories
     * @param param the request object
     */
    public getAllCategoriesWithHttpInfo(param: CategoriesApiGetAllCategoriesRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<Category>>> {
        return this.api.getAllCategoriesWithHttpInfo( options).toPromise();
    }

    /**
     * Get all categories
     * @param param the request object
     */
    public getAllCategories(param: CategoriesApiGetAllCategoriesRequest = {}, options?: ConfigurationOptions): Promise<Array<Category>> {
        return this.api.getAllCategories( options).toPromise();
    }

    /**
     * Get all categories with their services
     * @param param the request object
     */
    public getCategoriesWithServicesWithHttpInfo(param: CategoriesApiGetCategoriesWithServicesRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<CategoryWithServices>>> {
        return this.api.getCategoriesWithServicesWithHttpInfo( options).toPromise();
    }

    /**
     * Get all categories with their services
     * @param param the request object
     */
    public getCategoriesWithServices(param: CategoriesApiGetCategoriesWithServicesRequest = {}, options?: ConfigurationOptions): Promise<Array<CategoryWithServices>> {
        return this.api.getCategoriesWithServices( options).toPromise();
    }

    /**
     * Get category by ID
     * @param param the request object
     */
    public getCategoryByIdWithHttpInfo(param: CategoriesApiGetCategoryByIdRequest, options?: ConfigurationOptions): Promise<HttpInfo<Category>> {
        return this.api.getCategoryByIdWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Get category by ID
     * @param param the request object
     */
    public getCategoryById(param: CategoriesApiGetCategoryByIdRequest, options?: ConfigurationOptions): Promise<Category> {
        return this.api.getCategoryById(param.id,  options).toPromise();
    }

    /**
     * Get services without a category
     * @param param the request object
     */
    public getUncategorizedServicesWithHttpInfo(param: CategoriesApiGetUncategorizedServicesRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<Service>>> {
        return this.api.getUncategorizedServicesWithHttpInfo( options).toPromise();
    }

    /**
     * Get services without a category
     * @param param the request object
     */
    public getUncategorizedServices(param: CategoriesApiGetUncategorizedServicesRequest = {}, options?: ConfigurationOptions): Promise<Array<Service>> {
        return this.api.getUncategorizedServices( options).toPromise();
    }

    /**
     * Reorder categories
     * @param param the request object
     */
    public reorderCategoriesWithHttpInfo(param: CategoriesApiReorderCategoriesRequest, options?: ConfigurationOptions): Promise<HttpInfo<any>> {
        return this.api.reorderCategoriesWithHttpInfo(param.reorderCategoriesRequest,  options).toPromise();
    }

    /**
     * Reorder categories
     * @param param the request object
     */
    public reorderCategories(param: CategoriesApiReorderCategoriesRequest, options?: ConfigurationOptions): Promise<any> {
        return this.api.reorderCategories(param.reorderCategoriesRequest,  options).toPromise();
    }

    /**
     * Update category
     * @param param the request object
     */
    public updateCategoryWithHttpInfo(param: CategoriesApiUpdateCategoryRequest, options?: ConfigurationOptions): Promise<HttpInfo<Category>> {
        return this.api.updateCategoryWithHttpInfo(param.id, param.updateCategory,  options).toPromise();
    }

    /**
     * Update category
     * @param param the request object
     */
    public updateCategory(param: CategoriesApiUpdateCategoryRequest, options?: ConfigurationOptions): Promise<Category> {
        return this.api.updateCategory(param.id, param.updateCategory,  options).toPromise();
    }

}

import { ObservableServicesApi } from "./ObservableAPI";
import { ServicesApiRequestFactory, ServicesApiResponseProcessor} from "../apis/ServicesApi";

export interface ServicesApiCleanupInactiveServicesRequest {
}

export interface ServicesApiCreateBulkServicesRequest {
    /**
     * 
     * @type BulkServiceRequest
     * @memberof ServicesApicreateBulkServices
     */
    bulkServiceRequest: BulkServiceRequest
}

export interface ServicesApiCreateServiceRequest {
    /**
     * 
     * @type CreateNewServiceRequest
     * @memberof ServicesApicreateService
     */
    createNewServiceRequest: CreateNewServiceRequest
}

export interface ServicesApiDeleteServiceRequest {
    /**
     * Service ID
     * Defaults to: undefined
     * @type number
     * @memberof ServicesApideleteService
     */
    id: number
}

export interface ServicesApiGetActiveServicesRequest {
}

export interface ServicesApiGetAllServicesRequest {
    /**
     * 
     * Defaults to: undefined
     * @type boolean
     * @memberof ServicesApigetAllServices
     */
    activeOnly?: boolean
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof ServicesApigetAllServices
     */
    minDuration?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof ServicesApigetAllServices
     */
    maxDuration?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof ServicesApigetAllServices
     */
    minPrice?: number
    /**
     * 
     * Defaults to: undefined
     * @type number
     * @memberof ServicesApigetAllServices
     */
    maxPrice?: number
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof ServicesApigetAllServices
     */
    search?: string
}

export interface ServicesApiGetServiceByIdRequest {
    /**
     * Service ID
     * Defaults to: undefined
     * @type number
     * @memberof ServicesApigetServiceById
     */
    id: number
}

export interface ServicesApiGetServiceByNameRequest {
    /**
     * Service name
     * Defaults to: undefined
     * @type string
     * @memberof ServicesApigetServiceByName
     */
    name: string
}

export interface ServicesApiGetServiceStatsRequest {
}

export interface ServicesApiGetServicesByDurationRequest {
    /**
     * Minimum duration in minutes
     * Defaults to: undefined
     * @type number
     * @memberof ServicesApigetServicesByDuration
     */
    min: number
    /**
     * Maximum duration in minutes
     * Defaults to: undefined
     * @type number
     * @memberof ServicesApigetServicesByDuration
     */
    max: number
}

export interface ServicesApiGetServicesByPriceRequest {
    /**
     * Minimum price in cents
     * Defaults to: undefined
     * @type number
     * @memberof ServicesApigetServicesByPrice
     */
    min: number
    /**
     * Maximum price in cents
     * Defaults to: undefined
     * @type number
     * @memberof ServicesApigetServicesByPrice
     */
    max: number
}

export interface ServicesApiSearchServicesRequest {
    /**
     * Search term
     * Defaults to: undefined
     * @type string
     * @memberof ServicesApisearchServices
     */
    term: string
}

export interface ServicesApiToggleServiceStatusRequest {
    /**
     * Service ID
     * Defaults to: undefined
     * @type number
     * @memberof ServicesApitoggleServiceStatus
     */
    id: number
}

export interface ServicesApiUpdateServiceRequest {
    /**
     * Service ID
     * Defaults to: undefined
     * @type number
     * @memberof ServicesApiupdateService
     */
    id: number
    /**
     * 
     * @type UpdateServiceRequest
     * @memberof ServicesApiupdateService
     */
    updateServiceRequest: UpdateServiceRequest
}

export class ObjectServicesApi {
    private api: ObservableServicesApi

    public constructor(configuration: Configuration, requestFactory?: ServicesApiRequestFactory, responseProcessor?: ServicesApiResponseProcessor) {
        this.api = new ObservableServicesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Delete all inactive services
     * @param param the request object
     */
    public cleanupInactiveServicesWithHttpInfo(param: ServicesApiCleanupInactiveServicesRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<any>> {
        return this.api.cleanupInactiveServicesWithHttpInfo( options).toPromise();
    }

    /**
     * Delete all inactive services
     * @param param the request object
     */
    public cleanupInactiveServices(param: ServicesApiCleanupInactiveServicesRequest = {}, options?: ConfigurationOptions): Promise<any> {
        return this.api.cleanupInactiveServices( options).toPromise();
    }

    /**
     * Create multiple services at once
     * @param param the request object
     */
    public createBulkServicesWithHttpInfo(param: ServicesApiCreateBulkServicesRequest, options?: ConfigurationOptions): Promise<HttpInfo<BulkServiceResponse>> {
        return this.api.createBulkServicesWithHttpInfo(param.bulkServiceRequest,  options).toPromise();
    }

    /**
     * Create multiple services at once
     * @param param the request object
     */
    public createBulkServices(param: ServicesApiCreateBulkServicesRequest, options?: ConfigurationOptions): Promise<BulkServiceResponse> {
        return this.api.createBulkServices(param.bulkServiceRequest,  options).toPromise();
    }

    /**
     * Create a new service
     * @param param the request object
     */
    public createServiceWithHttpInfo(param: ServicesApiCreateServiceRequest, options?: ConfigurationOptions): Promise<HttpInfo<ServiceResponse>> {
        return this.api.createServiceWithHttpInfo(param.createNewServiceRequest,  options).toPromise();
    }

    /**
     * Create a new service
     * @param param the request object
     */
    public createService(param: ServicesApiCreateServiceRequest, options?: ConfigurationOptions): Promise<ServiceResponse> {
        return this.api.createService(param.createNewServiceRequest,  options).toPromise();
    }

    /**
     * Delete a service
     * @param param the request object
     */
    public deleteServiceWithHttpInfo(param: ServicesApiDeleteServiceRequest, options?: ConfigurationOptions): Promise<HttpInfo<any>> {
        return this.api.deleteServiceWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Delete a service
     * @param param the request object
     */
    public deleteService(param: ServicesApiDeleteServiceRequest, options?: ConfigurationOptions): Promise<any> {
        return this.api.deleteService(param.id,  options).toPromise();
    }

    /**
     * Get all active services
     * @param param the request object
     */
    public getActiveServicesWithHttpInfo(param: ServicesApiGetActiveServicesRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<ServiceResponse>>> {
        return this.api.getActiveServicesWithHttpInfo( options).toPromise();
    }

    /**
     * Get all active services
     * @param param the request object
     */
    public getActiveServices(param: ServicesApiGetActiveServicesRequest = {}, options?: ConfigurationOptions): Promise<Array<ServiceResponse>> {
        return this.api.getActiveServices( options).toPromise();
    }

    /**
     * Get all services with optional filtering
     * @param param the request object
     */
    public getAllServicesWithHttpInfo(param: ServicesApiGetAllServicesRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<ServiceResponse>>> {
        return this.api.getAllServicesWithHttpInfo(param.activeOnly, param.minDuration, param.maxDuration, param.minPrice, param.maxPrice, param.search,  options).toPromise();
    }

    /**
     * Get all services with optional filtering
     * @param param the request object
     */
    public getAllServices(param: ServicesApiGetAllServicesRequest = {}, options?: ConfigurationOptions): Promise<Array<ServiceResponse>> {
        return this.api.getAllServices(param.activeOnly, param.minDuration, param.maxDuration, param.minPrice, param.maxPrice, param.search,  options).toPromise();
    }

    /**
     * Get a service by ID
     * @param param the request object
     */
    public getServiceByIdWithHttpInfo(param: ServicesApiGetServiceByIdRequest, options?: ConfigurationOptions): Promise<HttpInfo<ServiceResponse>> {
        return this.api.getServiceByIdWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Get a service by ID
     * @param param the request object
     */
    public getServiceById(param: ServicesApiGetServiceByIdRequest, options?: ConfigurationOptions): Promise<ServiceResponse> {
        return this.api.getServiceById(param.id,  options).toPromise();
    }

    /**
     * Find service by exact name
     * @param param the request object
     */
    public getServiceByNameWithHttpInfo(param: ServicesApiGetServiceByNameRequest, options?: ConfigurationOptions): Promise<HttpInfo<ServiceResponse>> {
        return this.api.getServiceByNameWithHttpInfo(param.name,  options).toPromise();
    }

    /**
     * Find service by exact name
     * @param param the request object
     */
    public getServiceByName(param: ServicesApiGetServiceByNameRequest, options?: ConfigurationOptions): Promise<ServiceResponse> {
        return this.api.getServiceByName(param.name,  options).toPromise();
    }

    /**
     * Get service statistics
     * @param param the request object
     */
    public getServiceStatsWithHttpInfo(param: ServicesApiGetServiceStatsRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<ServiceStatsResponse>> {
        return this.api.getServiceStatsWithHttpInfo( options).toPromise();
    }

    /**
     * Get service statistics
     * @param param the request object
     */
    public getServiceStats(param: ServicesApiGetServiceStatsRequest = {}, options?: ConfigurationOptions): Promise<ServiceStatsResponse> {
        return this.api.getServiceStats( options).toPromise();
    }

    /**
     * Find services by duration range
     * @param param the request object
     */
    public getServicesByDurationWithHttpInfo(param: ServicesApiGetServicesByDurationRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<ServiceResponse>>> {
        return this.api.getServicesByDurationWithHttpInfo(param.min, param.max,  options).toPromise();
    }

    /**
     * Find services by duration range
     * @param param the request object
     */
    public getServicesByDuration(param: ServicesApiGetServicesByDurationRequest, options?: ConfigurationOptions): Promise<Array<ServiceResponse>> {
        return this.api.getServicesByDuration(param.min, param.max,  options).toPromise();
    }

    /**
     * Find services by price range
     * @param param the request object
     */
    public getServicesByPriceWithHttpInfo(param: ServicesApiGetServicesByPriceRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<ServiceResponse>>> {
        return this.api.getServicesByPriceWithHttpInfo(param.min, param.max,  options).toPromise();
    }

    /**
     * Find services by price range
     * @param param the request object
     */
    public getServicesByPrice(param: ServicesApiGetServicesByPriceRequest, options?: ConfigurationOptions): Promise<Array<ServiceResponse>> {
        return this.api.getServicesByPrice(param.min, param.max,  options).toPromise();
    }

    /**
     * Search services by name or description
     * @param param the request object
     */
    public searchServicesWithHttpInfo(param: ServicesApiSearchServicesRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<ServiceResponse>>> {
        return this.api.searchServicesWithHttpInfo(param.term,  options).toPromise();
    }

    /**
     * Search services by name or description
     * @param param the request object
     */
    public searchServices(param: ServicesApiSearchServicesRequest, options?: ConfigurationOptions): Promise<Array<ServiceResponse>> {
        return this.api.searchServices(param.term,  options).toPromise();
    }

    /**
     * Toggle service active status
     * @param param the request object
     */
    public toggleServiceStatusWithHttpInfo(param: ServicesApiToggleServiceStatusRequest, options?: ConfigurationOptions): Promise<HttpInfo<ServiceResponse>> {
        return this.api.toggleServiceStatusWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Toggle service active status
     * @param param the request object
     */
    public toggleServiceStatus(param: ServicesApiToggleServiceStatusRequest, options?: ConfigurationOptions): Promise<ServiceResponse> {
        return this.api.toggleServiceStatus(param.id,  options).toPromise();
    }

    /**
     * Update a service
     * @param param the request object
     */
    public updateServiceWithHttpInfo(param: ServicesApiUpdateServiceRequest, options?: ConfigurationOptions): Promise<HttpInfo<ServiceResponse>> {
        return this.api.updateServiceWithHttpInfo(param.id, param.updateServiceRequest,  options).toPromise();
    }

    /**
     * Update a service
     * @param param the request object
     */
    public updateService(param: ServicesApiUpdateServiceRequest, options?: ConfigurationOptions): Promise<ServiceResponse> {
        return this.api.updateService(param.id, param.updateServiceRequest,  options).toPromise();
    }

}

import { ObservableTenantsApi } from "./ObservableAPI";
import { TenantsApiRequestFactory, TenantsApiResponseProcessor} from "../apis/TenantsApi";

export interface TenantsApiCheckSubdomainRequest {
    /**
     * 
     * @type CheckSubdomainRequest
     * @memberof TenantsApicheckSubdomain
     */
    checkSubdomainRequest: CheckSubdomainRequest
}

export interface TenantsApiDeleteTenantRequest {
    /**
     * Tenant ID
     * Defaults to: undefined
     * @type number
     * @memberof TenantsApideleteTenant
     */
    id: number
}

export interface TenantsApiGetAllTenantsRequest {
}

export interface TenantsApiGetTenantByIdRequest {
    /**
     * Tenant ID
     * Defaults to: undefined
     * @type number
     * @memberof TenantsApigetTenantById
     */
    id: number
}

export interface TenantsApiRegisterTenantRequest {
    /**
     * 
     * @type RegisterTenantRequest
     * @memberof TenantsApiregisterTenant
     */
    registerTenantRequest: RegisterTenantRequest
}

export interface TenantsApiToggleTenantStatusRequest {
    /**
     * Tenant ID
     * Defaults to: undefined
     * @type number
     * @memberof TenantsApitoggleTenantStatus
     */
    id: number
}

export interface TenantsApiUpdateTenantRequest {
    /**
     * Tenant ID
     * Defaults to: undefined
     * @type number
     * @memberof TenantsApiupdateTenant
     */
    id: number
    /**
     * 
     * @type UpdateTenant
     * @memberof TenantsApiupdateTenant
     */
    updateTenant: UpdateTenant
}

export class ObjectTenantsApi {
    private api: ObservableTenantsApi

    public constructor(configuration: Configuration, requestFactory?: TenantsApiRequestFactory, responseProcessor?: TenantsApiResponseProcessor) {
        this.api = new ObservableTenantsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Check if a subdomain is available
     * @param param the request object
     */
    public checkSubdomainWithHttpInfo(param: TenantsApiCheckSubdomainRequest, options?: ConfigurationOptions): Promise<HttpInfo<CheckSubdomainResponse>> {
        return this.api.checkSubdomainWithHttpInfo(param.checkSubdomainRequest,  options).toPromise();
    }

    /**
     * Check if a subdomain is available
     * @param param the request object
     */
    public checkSubdomain(param: TenantsApiCheckSubdomainRequest, options?: ConfigurationOptions): Promise<CheckSubdomainResponse> {
        return this.api.checkSubdomain(param.checkSubdomainRequest,  options).toPromise();
    }

    /**
     * Delete tenant
     * @param param the request object
     */
    public deleteTenantWithHttpInfo(param: TenantsApiDeleteTenantRequest, options?: ConfigurationOptions): Promise<HttpInfo<any>> {
        return this.api.deleteTenantWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Delete tenant
     * @param param the request object
     */
    public deleteTenant(param: TenantsApiDeleteTenantRequest, options?: ConfigurationOptions): Promise<any> {
        return this.api.deleteTenant(param.id,  options).toPromise();
    }

    /**
     * Get all tenants (admin only)
     * @param param the request object
     */
    public getAllTenantsWithHttpInfo(param: TenantsApiGetAllTenantsRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<Tenant>>> {
        return this.api.getAllTenantsWithHttpInfo( options).toPromise();
    }

    /**
     * Get all tenants (admin only)
     * @param param the request object
     */
    public getAllTenants(param: TenantsApiGetAllTenantsRequest = {}, options?: ConfigurationOptions): Promise<Array<Tenant>> {
        return this.api.getAllTenants( options).toPromise();
    }

    /**
     * Get tenant by ID
     * @param param the request object
     */
    public getTenantByIdWithHttpInfo(param: TenantsApiGetTenantByIdRequest, options?: ConfigurationOptions): Promise<HttpInfo<Tenant>> {
        return this.api.getTenantByIdWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Get tenant by ID
     * @param param the request object
     */
    public getTenantById(param: TenantsApiGetTenantByIdRequest, options?: ConfigurationOptions): Promise<Tenant> {
        return this.api.getTenantById(param.id,  options).toPromise();
    }

    /**
     * Register a new tenant
     * @param param the request object
     */
    public registerTenantWithHttpInfo(param: TenantsApiRegisterTenantRequest, options?: ConfigurationOptions): Promise<HttpInfo<RegisterTenantResponse>> {
        return this.api.registerTenantWithHttpInfo(param.registerTenantRequest,  options).toPromise();
    }

    /**
     * Register a new tenant
     * @param param the request object
     */
    public registerTenant(param: TenantsApiRegisterTenantRequest, options?: ConfigurationOptions): Promise<RegisterTenantResponse> {
        return this.api.registerTenant(param.registerTenantRequest,  options).toPromise();
    }

    /**
     * Activate/deactivate tenant
     * @param param the request object
     */
    public toggleTenantStatusWithHttpInfo(param: TenantsApiToggleTenantStatusRequest, options?: ConfigurationOptions): Promise<HttpInfo<Tenant>> {
        return this.api.toggleTenantStatusWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Activate/deactivate tenant
     * @param param the request object
     */
    public toggleTenantStatus(param: TenantsApiToggleTenantStatusRequest, options?: ConfigurationOptions): Promise<Tenant> {
        return this.api.toggleTenantStatus(param.id,  options).toPromise();
    }

    /**
     * Update tenant
     * @param param the request object
     */
    public updateTenantWithHttpInfo(param: TenantsApiUpdateTenantRequest, options?: ConfigurationOptions): Promise<HttpInfo<Tenant>> {
        return this.api.updateTenantWithHttpInfo(param.id, param.updateTenant,  options).toPromise();
    }

    /**
     * Update tenant
     * @param param the request object
     */
    public updateTenant(param: TenantsApiUpdateTenantRequest, options?: ConfigurationOptions): Promise<Tenant> {
        return this.api.updateTenant(param.id, param.updateTenant,  options).toPromise();
    }

}

import { ObservableUsersApi } from "./ObservableAPI";
import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";

export interface UsersApiChangeUserPasswordRequest {
    /**
     * User ID
     * Defaults to: undefined
     * @type number
     * @memberof UsersApichangeUserPassword
     */
    id: number
    /**
     * 
     * @type ChangePasswordRequest
     * @memberof UsersApichangeUserPassword
     */
    changePasswordRequest: ChangePasswordRequest
}

export interface UsersApiCreateUserRequest {
    /**
     * 
     * @type CreateNewUserRequest
     * @memberof UsersApicreateUser
     */
    createNewUserRequest: CreateNewUserRequest
}

export interface UsersApiDeleteUserRequest {
    /**
     * User ID
     * Defaults to: undefined
     * @type number
     * @memberof UsersApideleteUser
     */
    id: number
}

export interface UsersApiGetAllUsersRequest {
}

export interface UsersApiGetUserByEmailRequest {
    /**
     * User email
     * Defaults to: undefined
     * @type string
     * @memberof UsersApigetUserByEmail
     */
    email: string
}

export interface UsersApiGetUserByIdRequest {
    /**
     * User ID
     * Defaults to: undefined
     * @type number
     * @memberof UsersApigetUserById
     */
    id: number
}

export interface UsersApiGetUsersByRoleRequest {
    /**
     * User role (client, admin, staff)
     * Defaults to: undefined
     * @type string
     * @memberof UsersApigetUsersByRole
     */
    role: string
}

export interface UsersApiUpdateUserRequest {
    /**
     * User ID
     * Defaults to: undefined
     * @type number
     * @memberof UsersApiupdateUser
     */
    id: number
    /**
     * 
     * @type UpdateUser
     * @memberof UsersApiupdateUser
     */
    updateUser: UpdateUser
}

export class ObjectUsersApi {
    private api: ObservableUsersApi

    public constructor(configuration: Configuration, requestFactory?: UsersApiRequestFactory, responseProcessor?: UsersApiResponseProcessor) {
        this.api = new ObservableUsersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Change user password
     * @param param the request object
     */
    public changeUserPasswordWithHttpInfo(param: UsersApiChangeUserPasswordRequest, options?: ConfigurationOptions): Promise<HttpInfo<User>> {
        return this.api.changeUserPasswordWithHttpInfo(param.id, param.changePasswordRequest,  options).toPromise();
    }

    /**
     * Change user password
     * @param param the request object
     */
    public changeUserPassword(param: UsersApiChangeUserPasswordRequest, options?: ConfigurationOptions): Promise<User> {
        return this.api.changeUserPassword(param.id, param.changePasswordRequest,  options).toPromise();
    }

    /**
     * Create a new user
     * @param param the request object
     */
    public createUserWithHttpInfo(param: UsersApiCreateUserRequest, options?: ConfigurationOptions): Promise<HttpInfo<User>> {
        return this.api.createUserWithHttpInfo(param.createNewUserRequest,  options).toPromise();
    }

    /**
     * Create a new user
     * @param param the request object
     */
    public createUser(param: UsersApiCreateUserRequest, options?: ConfigurationOptions): Promise<User> {
        return this.api.createUser(param.createNewUserRequest,  options).toPromise();
    }

    /**
     * Delete a user by ID
     * @param param the request object
     */
    public deleteUserWithHttpInfo(param: UsersApiDeleteUserRequest, options?: ConfigurationOptions): Promise<HttpInfo<any>> {
        return this.api.deleteUserWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Delete a user by ID
     * @param param the request object
     */
    public deleteUser(param: UsersApiDeleteUserRequest, options?: ConfigurationOptions): Promise<any> {
        return this.api.deleteUser(param.id,  options).toPromise();
    }

    /**
     * Get all users
     * @param param the request object
     */
    public getAllUsersWithHttpInfo(param: UsersApiGetAllUsersRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<Array<User>>> {
        return this.api.getAllUsersWithHttpInfo( options).toPromise();
    }

    /**
     * Get all users
     * @param param the request object
     */
    public getAllUsers(param: UsersApiGetAllUsersRequest = {}, options?: ConfigurationOptions): Promise<Array<User>> {
        return this.api.getAllUsers( options).toPromise();
    }

    /**
     * Find user by email
     * @param param the request object
     */
    public getUserByEmailWithHttpInfo(param: UsersApiGetUserByEmailRequest, options?: ConfigurationOptions): Promise<HttpInfo<User>> {
        return this.api.getUserByEmailWithHttpInfo(param.email,  options).toPromise();
    }

    /**
     * Find user by email
     * @param param the request object
     */
    public getUserByEmail(param: UsersApiGetUserByEmailRequest, options?: ConfigurationOptions): Promise<User> {
        return this.api.getUserByEmail(param.email,  options).toPromise();
    }

    /**
     * Get a user by ID
     * @param param the request object
     */
    public getUserByIdWithHttpInfo(param: UsersApiGetUserByIdRequest, options?: ConfigurationOptions): Promise<HttpInfo<User>> {
        return this.api.getUserByIdWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Get a user by ID
     * @param param the request object
     */
    public getUserById(param: UsersApiGetUserByIdRequest, options?: ConfigurationOptions): Promise<User> {
        return this.api.getUserById(param.id,  options).toPromise();
    }

    /**
     * Find users by role
     * @param param the request object
     */
    public getUsersByRoleWithHttpInfo(param: UsersApiGetUsersByRoleRequest, options?: ConfigurationOptions): Promise<HttpInfo<Array<User>>> {
        return this.api.getUsersByRoleWithHttpInfo(param.role,  options).toPromise();
    }

    /**
     * Find users by role
     * @param param the request object
     */
    public getUsersByRole(param: UsersApiGetUsersByRoleRequest, options?: ConfigurationOptions): Promise<Array<User>> {
        return this.api.getUsersByRole(param.role,  options).toPromise();
    }

    /**
     * Update a user by ID
     * @param param the request object
     */
    public updateUserWithHttpInfo(param: UsersApiUpdateUserRequest, options?: ConfigurationOptions): Promise<HttpInfo<User>> {
        return this.api.updateUserWithHttpInfo(param.id, param.updateUser,  options).toPromise();
    }

    /**
     * Update a user by ID
     * @param param the request object
     */
    public updateUser(param: UsersApiUpdateUserRequest, options?: ConfigurationOptions): Promise<User> {
        return this.api.updateUser(param.id, param.updateUser,  options).toPromise();
    }

}
