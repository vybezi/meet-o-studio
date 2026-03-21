import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, PromiseConfigurationOptions, wrapOptions } from '../configuration'
import { PromiseMiddleware, Middleware, PromiseMiddlewareWrapper } from '../middleware';

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
import { ObservableAuthApi } from './ObservableAPI';

import { AuthApiRequestFactory, AuthApiResponseProcessor} from "../apis/AuthApi";
export class PromiseAuthApi {
    private api: ObservableAuthApi

    public constructor(
        configuration: Configuration,
        requestFactory?: AuthApiRequestFactory,
        responseProcessor?: AuthApiResponseProcessor
    ) {
        this.api = new ObservableAuthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get current user profile
     */
    public getCurrentUserWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<UserResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getCurrentUserWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Get current user profile
     */
    public getCurrentUser(_options?: PromiseConfigurationOptions): Promise<UserResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getCurrentUser(observableOptions);
        return result.toPromise();
    }

    /**
     * Login to the system
     * @param loginRequest
     */
    public loginWithHttpInfo(loginRequest: LoginRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<LoginResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.loginWithHttpInfo(loginRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Login to the system
     * @param loginRequest
     */
    public login(loginRequest: LoginRequest, _options?: PromiseConfigurationOptions): Promise<LoginResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.login(loginRequest, observableOptions);
        return result.toPromise();
    }


}



import { ObservableAvailabilityApi } from './ObservableAPI';

import { AvailabilityApiRequestFactory, AvailabilityApiResponseProcessor} from "../apis/AvailabilityApi";
export class PromiseAvailabilityApi {
    private api: ObservableAvailabilityApi

    public constructor(
        configuration: Configuration,
        requestFactory?: AvailabilityApiRequestFactory,
        responseProcessor?: AvailabilityApiResponseProcessor
    ) {
        this.api = new ObservableAvailabilityApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Check if a staff member is available at a specific time
     * @param staffId Staff user ID
     * @param date Date (YYYY-MM-DD)
     * @param time Time (HH:MM)
     * @param duration Duration in minutes
     */
    public checkTimeSlotWithHttpInfo(staffId: number, date: string, time: string, duration: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<AvailabilityCheckResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.checkTimeSlotWithHttpInfo(staffId, date, time, duration, observableOptions);
        return result.toPromise();
    }

    /**
     * Check if a staff member is available at a specific time
     * @param staffId Staff user ID
     * @param date Date (YYYY-MM-DD)
     * @param time Time (HH:MM)
     * @param duration Duration in minutes
     */
    public checkTimeSlot(staffId: number, date: string, time: string, duration: number, _options?: PromiseConfigurationOptions): Promise<AvailabilityCheckResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.checkTimeSlot(staffId, date, time, duration, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new availability slot
     * @param createNewAvailabilityRequest
     */
    public createAvailabilityWithHttpInfo(createNewAvailabilityRequest: CreateNewAvailabilityRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Availability>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.createAvailabilityWithHttpInfo(createNewAvailabilityRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new availability slot
     * @param createNewAvailabilityRequest
     */
    public createAvailability(createNewAvailabilityRequest: CreateNewAvailabilityRequest, _options?: PromiseConfigurationOptions): Promise<Availability> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.createAvailability(createNewAvailabilityRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Create multiple availability slots at once
     * @param bulkAvailabilityRequest
     */
    public createBulkAvailabilityWithHttpInfo(bulkAvailabilityRequest: Array<BulkAvailabilityRequest>, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<Availability>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.createBulkAvailabilityWithHttpInfo(bulkAvailabilityRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Create multiple availability slots at once
     * @param bulkAvailabilityRequest
     */
    public createBulkAvailability(bulkAvailabilityRequest: Array<BulkAvailabilityRequest>, _options?: PromiseConfigurationOptions): Promise<Array<Availability>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.createBulkAvailability(bulkAvailabilityRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete an availability slot
     * @param id Availability ID
     */
    public deleteAvailabilityWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<any>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.deleteAvailabilityWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete an availability slot
     * @param id Availability ID
     */
    public deleteAvailability(id: number, _options?: PromiseConfigurationOptions): Promise<any> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.deleteAvailability(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete all availability for a specific date
     * @param staffId Staff user ID
     * @param date Date (YYYY-MM-DD)
     */
    public deleteAvailabilityByDateWithHttpInfo(staffId: number, date: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<any>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.deleteAvailabilityByDateWithHttpInfo(staffId, date, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete all availability for a specific date
     * @param staffId Staff user ID
     * @param date Date (YYYY-MM-DD)
     */
    public deleteAvailabilityByDate(staffId: number, date: string, _options?: PromiseConfigurationOptions): Promise<any> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.deleteAvailabilityByDate(staffId, date, observableOptions);
        return result.toPromise();
    }

    /**
     * Generate available time slots for a specific date and service
     * @param generateSlotsRequest
     */
    public generateAvailableSlotsWithHttpInfo(generateSlotsRequest: GenerateSlotsRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<string>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.generateAvailableSlotsWithHttpInfo(generateSlotsRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Generate available time slots for a specific date and service
     * @param generateSlotsRequest
     */
    public generateAvailableSlots(generateSlotsRequest: GenerateSlotsRequest, _options?: PromiseConfigurationOptions): Promise<Array<string>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.generateAvailableSlots(generateSlotsRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all availability slots with optional filtering
     * @param [staffId]
     * @param [date]
     * @param [recurring]
     * @param [dayOfWeek]
     */
    public getAllAvailabilityWithHttpInfo(staffId?: number, date?: string, recurring?: boolean, dayOfWeek?: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<Availability>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getAllAvailabilityWithHttpInfo(staffId, date, recurring, dayOfWeek, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all availability slots with optional filtering
     * @param [staffId]
     * @param [date]
     * @param [recurring]
     * @param [dayOfWeek]
     */
    public getAllAvailability(staffId?: number, date?: string, recurring?: boolean, dayOfWeek?: number, _options?: PromiseConfigurationOptions): Promise<Array<Availability>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getAllAvailability(staffId, date, recurring, dayOfWeek, observableOptions);
        return result.toPromise();
    }

    /**
     * Get availability for a specific date
     * @param date Date (YYYY-MM-DD)
     */
    public getAvailabilityByDateWithHttpInfo(date: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<Availability>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getAvailabilityByDateWithHttpInfo(date, observableOptions);
        return result.toPromise();
    }

    /**
     * Get availability for a specific date
     * @param date Date (YYYY-MM-DD)
     */
    public getAvailabilityByDate(date: string, _options?: PromiseConfigurationOptions): Promise<Array<Availability>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getAvailabilityByDate(date, observableOptions);
        return result.toPromise();
    }

    /**
     * Get availability by day of week
     * @param day Day of week (0&#x3D;Sunday, 1&#x3D;Monday, ..., 6&#x3D;Saturday)
     */
    public getAvailabilityByDayWithHttpInfo(day: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<Availability>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getAvailabilityByDayWithHttpInfo(day, observableOptions);
        return result.toPromise();
    }

    /**
     * Get availability by day of week
     * @param day Day of week (0&#x3D;Sunday, 1&#x3D;Monday, ..., 6&#x3D;Saturday)
     */
    public getAvailabilityByDay(day: number, _options?: PromiseConfigurationOptions): Promise<Array<Availability>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getAvailabilityByDay(day, observableOptions);
        return result.toPromise();
    }

    /**
     * Get an availability slot by ID
     * @param id Availability ID
     */
    public getAvailabilityByIdWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Availability>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getAvailabilityByIdWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Get an availability slot by ID
     * @param id Availability ID
     */
    public getAvailabilityById(id: number, _options?: PromiseConfigurationOptions): Promise<Availability> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getAvailabilityById(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Get availability by staff ID
     * @param staffId Staff user ID
     */
    public getAvailabilityByStaffWithHttpInfo(staffId: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<Availability>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getAvailabilityByStaffWithHttpInfo(staffId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get availability by staff ID
     * @param staffId Staff user ID
     */
    public getAvailabilityByStaff(staffId: number, _options?: PromiseConfigurationOptions): Promise<Array<Availability>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getAvailabilityByStaff(staffId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get recurring availability by staff ID
     * @param staffId Staff user ID
     */
    public getRecurringAvailabilityByStaffWithHttpInfo(staffId: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<Availability>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getRecurringAvailabilityByStaffWithHttpInfo(staffId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get recurring availability by staff ID
     * @param staffId Staff user ID
     */
    public getRecurringAvailabilityByStaff(staffId: number, _options?: PromiseConfigurationOptions): Promise<Array<Availability>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getRecurringAvailabilityByStaff(staffId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get specific date availability by staff ID
     * @param staffId Staff user ID
     */
    public getSpecificAvailabilityByStaffWithHttpInfo(staffId: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<Availability>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getSpecificAvailabilityByStaffWithHttpInfo(staffId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get specific date availability by staff ID
     * @param staffId Staff user ID
     */
    public getSpecificAvailabilityByStaff(staffId: number, _options?: PromiseConfigurationOptions): Promise<Array<Availability>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getSpecificAvailabilityByStaff(staffId, observableOptions);
        return result.toPromise();
    }

    /**
     * Update an availability slot
     * @param id Availability ID
     * @param updateAvailability
     */
    public updateAvailabilityWithHttpInfo(id: number, updateAvailability: UpdateAvailability, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Availability>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.updateAvailabilityWithHttpInfo(id, updateAvailability, observableOptions);
        return result.toPromise();
    }

    /**
     * Update an availability slot
     * @param id Availability ID
     * @param updateAvailability
     */
    public updateAvailability(id: number, updateAvailability: UpdateAvailability, _options?: PromiseConfigurationOptions): Promise<Availability> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.updateAvailability(id, updateAvailability, observableOptions);
        return result.toPromise();
    }


}



import { ObservableBookingsApi } from './ObservableAPI';

import { BookingsApiRequestFactory, BookingsApiResponseProcessor} from "../apis/BookingsApi";
export class PromiseBookingsApi {
    private api: ObservableBookingsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: BookingsApiRequestFactory,
        responseProcessor?: BookingsApiResponseProcessor
    ) {
        this.api = new ObservableBookingsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Cancel a booking (authenticated)
     * @param id Booking ID
     */
    public cancelBookingAuthWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<BookingResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.cancelBookingAuthWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Cancel a booking (authenticated)
     * @param id Booking ID
     */
    public cancelBookingAuth(id: number, _options?: PromiseConfigurationOptions): Promise<BookingResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.cancelBookingAuth(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Cancel a booking via magic link
     * @param id Booking ID
     * @param token Magic link token
     */
    public cancelBookingMagicWithHttpInfo(id: number, token: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<BookingResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.cancelBookingMagicWithHttpInfo(id, token, observableOptions);
        return result.toPromise();
    }

    /**
     * Cancel a booking via magic link
     * @param id Booking ID
     * @param token Magic link token
     */
    public cancelBookingMagic(id: number, token: string, _options?: PromiseConfigurationOptions): Promise<BookingResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.cancelBookingMagic(id, token, observableOptions);
        return result.toPromise();
    }

    /**
     * Check if a time slot is available
     * @param checkAvailabilityRequest
     */
    public checkBookingAvailabilityWithHttpInfo(checkAvailabilityRequest: CheckAvailabilityRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<AvailabilityResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.checkBookingAvailabilityWithHttpInfo(checkAvailabilityRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Check if a time slot is available
     * @param checkAvailabilityRequest
     */
    public checkBookingAvailability(checkAvailabilityRequest: CheckAvailabilityRequest, _options?: PromiseConfigurationOptions): Promise<AvailabilityResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.checkBookingAvailability(checkAvailabilityRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Mark a booking as completed
     * @param id Booking ID
     */
    public completeBookingWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<BookingResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.completeBookingWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Mark a booking as completed
     * @param id Booking ID
     */
    public completeBooking(id: number, _options?: PromiseConfigurationOptions): Promise<BookingResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.completeBooking(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Confirm a booking
     * @param id Booking ID
     */
    public confirmBookingWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<BookingResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.confirmBookingWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Confirm a booking
     * @param id Booking ID
     */
    public confirmBooking(id: number, _options?: PromiseConfigurationOptions): Promise<BookingResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.confirmBooking(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new booking
     * @param createBookingRequest
     */
    public createBookingWithHttpInfo(createBookingRequest: CreateBookingRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<MagicLinkResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.createBookingWithHttpInfo(createBookingRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new booking
     * @param createBookingRequest
     */
    public createBooking(createBookingRequest: CreateBookingRequest, _options?: PromiseConfigurationOptions): Promise<MagicLinkResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.createBooking(createBookingRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete a booking
     * @param id Booking ID
     */
    public deleteBookingWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<any>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.deleteBookingWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete a booking
     * @param id Booking ID
     */
    public deleteBooking(id: number, _options?: PromiseConfigurationOptions): Promise<any> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.deleteBooking(id, observableOptions);
        return result.toPromise();
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
    public getAllBookingsWithHttpInfo(userId?: number, staffId?: number, guestEmail?: string, serviceId?: number, status?: string, dateFrom?: string, dateTo?: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<BookingResponse>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getAllBookingsWithHttpInfo(userId, staffId, guestEmail, serviceId, status, dateFrom, dateTo, observableOptions);
        return result.toPromise();
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
    public getAllBookings(userId?: number, staffId?: number, guestEmail?: string, serviceId?: number, status?: string, dateFrom?: string, dateTo?: string, _options?: PromiseConfigurationOptions): Promise<Array<BookingResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getAllBookings(userId, staffId, guestEmail, serviceId, status, dateFrom, dateTo, observableOptions);
        return result.toPromise();
    }

    /**
     * Get a booking by ID
     * @param id Booking ID
     */
    public getBookingByIdWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<BookingResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getBookingByIdWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Get a booking by ID
     * @param id Booking ID
     */
    public getBookingById(id: number, _options?: PromiseConfigurationOptions): Promise<BookingResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getBookingById(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Get booking by magic link token
     * @param token Magic link token
     */
    public getBookingByTokenWithHttpInfo(token: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<BookingWithDetails>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getBookingByTokenWithHttpInfo(token, observableOptions);
        return result.toPromise();
    }

    /**
     * Get booking by magic link token
     * @param token Magic link token
     */
    public getBookingByToken(token: string, _options?: PromiseConfigurationOptions): Promise<BookingWithDetails> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getBookingByToken(token, observableOptions);
        return result.toPromise();
    }

    /**
     * Get a booking with user and service details
     * @param id Booking ID
     */
    public getBookingWithDetailsWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<BookingWithDetails>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getBookingWithDetailsWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Get a booking with user and service details
     * @param id Booking ID
     */
    public getBookingWithDetails(id: number, _options?: PromiseConfigurationOptions): Promise<BookingWithDetails> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getBookingWithDetails(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Get bookings by date
     * @param date Date (YYYY-MM-DD)
     */
    public getBookingsByDateWithHttpInfo(date: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<BookingResponse>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getBookingsByDateWithHttpInfo(date, observableOptions);
        return result.toPromise();
    }

    /**
     * Get bookings by date
     * @param date Date (YYYY-MM-DD)
     */
    public getBookingsByDate(date: string, _options?: PromiseConfigurationOptions): Promise<Array<BookingResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getBookingsByDate(date, observableOptions);
        return result.toPromise();
    }

    /**
     * Get bookings by staff ID
     * @param staffId Staff user ID
     * @param [dateFrom] Start date
     * @param [dateTo] End date
     * @param [status] Filter by status
     */
    public getBookingsByStaffWithHttpInfo(staffId: number, dateFrom?: string, dateTo?: string, status?: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<BookingResponse>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getBookingsByStaffWithHttpInfo(staffId, dateFrom, dateTo, status, observableOptions);
        return result.toPromise();
    }

    /**
     * Get bookings by staff ID
     * @param staffId Staff user ID
     * @param [dateFrom] Start date
     * @param [dateTo] End date
     * @param [status] Filter by status
     */
    public getBookingsByStaff(staffId: number, dateFrom?: string, dateTo?: string, status?: string, _options?: PromiseConfigurationOptions): Promise<Array<BookingResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getBookingsByStaff(staffId, dateFrom, dateTo, status, observableOptions);
        return result.toPromise();
    }

    /**
     * Get bookings by status
     * @param status Booking status (pending, confirmed, cancelled, completed, no_show)
     */
    public getBookingsByStatusWithHttpInfo(status: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<BookingResponse>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getBookingsByStatusWithHttpInfo(status, observableOptions);
        return result.toPromise();
    }

    /**
     * Get bookings by status
     * @param status Booking status (pending, confirmed, cancelled, completed, no_show)
     */
    public getBookingsByStatus(status: string, _options?: PromiseConfigurationOptions): Promise<Array<BookingResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getBookingsByStatus(status, observableOptions);
        return result.toPromise();
    }

    /**
     * Get bookings by user ID
     * @param userId User ID
     */
    public getBookingsByUserWithHttpInfo(userId: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<BookingResponse>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getBookingsByUserWithHttpInfo(userId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get bookings by user ID
     * @param userId User ID
     */
    public getBookingsByUser(userId: number, _options?: PromiseConfigurationOptions): Promise<Array<BookingResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getBookingsByUser(userId, observableOptions);
        return result.toPromise();
    }

    /**
     * Get upcoming bookings
     * @param days Number of days ahead
     */
    public getUpcomingBookingsWithHttpInfo(days: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<BookingResponse>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getUpcomingBookingsWithHttpInfo(days, observableOptions);
        return result.toPromise();
    }

    /**
     * Get upcoming bookings
     * @param days Number of days ahead
     */
    public getUpcomingBookings(days: number, _options?: PromiseConfigurationOptions): Promise<Array<BookingResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getUpcomingBookings(days, observableOptions);
        return result.toPromise();
    }

    /**
     * Reschedule a booking via magic link
     * @param id Booking ID
     * @param rescheduleMagicRequest
     */
    public rescheduleBookingMagicWithHttpInfo(id: number, rescheduleMagicRequest: RescheduleMagicRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<BookingResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.rescheduleBookingMagicWithHttpInfo(id, rescheduleMagicRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Reschedule a booking via magic link
     * @param id Booking ID
     * @param rescheduleMagicRequest
     */
    public rescheduleBookingMagic(id: number, rescheduleMagicRequest: RescheduleMagicRequest, _options?: PromiseConfigurationOptions): Promise<BookingResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.rescheduleBookingMagic(id, rescheduleMagicRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Update a booking
     * @param id Booking ID
     * @param updateBooking
     */
    public updateBookingWithHttpInfo(id: number, updateBooking: UpdateBooking, _options?: PromiseConfigurationOptions): Promise<HttpInfo<BookingResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.updateBookingWithHttpInfo(id, updateBooking, observableOptions);
        return result.toPromise();
    }

    /**
     * Update a booking
     * @param id Booking ID
     * @param updateBooking
     */
    public updateBooking(id: number, updateBooking: UpdateBooking, _options?: PromiseConfigurationOptions): Promise<BookingResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.updateBooking(id, updateBooking, observableOptions);
        return result.toPromise();
    }

    /**
     * Update booking status
     * @param id Booking ID
     * @param updateStatusRequest
     */
    public updateBookingStatusWithHttpInfo(id: number, updateStatusRequest: UpdateStatusRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<BookingResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.updateBookingStatusWithHttpInfo(id, updateStatusRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Update booking status
     * @param id Booking ID
     * @param updateStatusRequest
     */
    public updateBookingStatus(id: number, updateStatusRequest: UpdateStatusRequest, _options?: PromiseConfigurationOptions): Promise<BookingResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.updateBookingStatus(id, updateStatusRequest, observableOptions);
        return result.toPromise();
    }


}



import { ObservableCategoriesApi } from './ObservableAPI';

import { CategoriesApiRequestFactory, CategoriesApiResponseProcessor} from "../apis/CategoriesApi";
export class PromiseCategoriesApi {
    private api: ObservableCategoriesApi

    public constructor(
        configuration: Configuration,
        requestFactory?: CategoriesApiRequestFactory,
        responseProcessor?: CategoriesApiResponseProcessor
    ) {
        this.api = new ObservableCategoriesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create a new service category
     * @param createNewCategoryRequest
     */
    public createCategoryWithHttpInfo(createNewCategoryRequest: CreateNewCategoryRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Category>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.createCategoryWithHttpInfo(createNewCategoryRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new service category
     * @param createNewCategoryRequest
     */
    public createCategory(createNewCategoryRequest: CreateNewCategoryRequest, _options?: PromiseConfigurationOptions): Promise<Category> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.createCategory(createNewCategoryRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete category
     * @param id Category ID
     */
    public deleteCategoryWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<any>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.deleteCategoryWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete category
     * @param id Category ID
     */
    public deleteCategory(id: number, _options?: PromiseConfigurationOptions): Promise<any> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.deleteCategory(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all categories
     */
    public getAllCategoriesWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<Category>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getAllCategoriesWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Get all categories
     */
    public getAllCategories(_options?: PromiseConfigurationOptions): Promise<Array<Category>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getAllCategories(observableOptions);
        return result.toPromise();
    }

    /**
     * Get all categories with their services
     */
    public getCategoriesWithServicesWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<CategoryWithServices>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getCategoriesWithServicesWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Get all categories with their services
     */
    public getCategoriesWithServices(_options?: PromiseConfigurationOptions): Promise<Array<CategoryWithServices>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getCategoriesWithServices(observableOptions);
        return result.toPromise();
    }

    /**
     * Get category by ID
     * @param id Category ID
     */
    public getCategoryByIdWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Category>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getCategoryByIdWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Get category by ID
     * @param id Category ID
     */
    public getCategoryById(id: number, _options?: PromiseConfigurationOptions): Promise<Category> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getCategoryById(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Get services without a category
     */
    public getUncategorizedServicesWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<Service>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getUncategorizedServicesWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Get services without a category
     */
    public getUncategorizedServices(_options?: PromiseConfigurationOptions): Promise<Array<Service>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getUncategorizedServices(observableOptions);
        return result.toPromise();
    }

    /**
     * Reorder categories
     * @param reorderCategoriesRequest
     */
    public reorderCategoriesWithHttpInfo(reorderCategoriesRequest: ReorderCategoriesRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<any>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.reorderCategoriesWithHttpInfo(reorderCategoriesRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Reorder categories
     * @param reorderCategoriesRequest
     */
    public reorderCategories(reorderCategoriesRequest: ReorderCategoriesRequest, _options?: PromiseConfigurationOptions): Promise<any> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.reorderCategories(reorderCategoriesRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Update category
     * @param id Category ID
     * @param updateCategory
     */
    public updateCategoryWithHttpInfo(id: number, updateCategory: UpdateCategory, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Category>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.updateCategoryWithHttpInfo(id, updateCategory, observableOptions);
        return result.toPromise();
    }

    /**
     * Update category
     * @param id Category ID
     * @param updateCategory
     */
    public updateCategory(id: number, updateCategory: UpdateCategory, _options?: PromiseConfigurationOptions): Promise<Category> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.updateCategory(id, updateCategory, observableOptions);
        return result.toPromise();
    }


}



import { ObservableServicesApi } from './ObservableAPI';

import { ServicesApiRequestFactory, ServicesApiResponseProcessor} from "../apis/ServicesApi";
export class PromiseServicesApi {
    private api: ObservableServicesApi

    public constructor(
        configuration: Configuration,
        requestFactory?: ServicesApiRequestFactory,
        responseProcessor?: ServicesApiResponseProcessor
    ) {
        this.api = new ObservableServicesApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Delete all inactive services
     */
    public cleanupInactiveServicesWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<any>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.cleanupInactiveServicesWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Delete all inactive services
     */
    public cleanupInactiveServices(_options?: PromiseConfigurationOptions): Promise<any> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.cleanupInactiveServices(observableOptions);
        return result.toPromise();
    }

    /**
     * Create multiple services at once
     * @param bulkServiceRequest
     */
    public createBulkServicesWithHttpInfo(bulkServiceRequest: BulkServiceRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<BulkServiceResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.createBulkServicesWithHttpInfo(bulkServiceRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Create multiple services at once
     * @param bulkServiceRequest
     */
    public createBulkServices(bulkServiceRequest: BulkServiceRequest, _options?: PromiseConfigurationOptions): Promise<BulkServiceResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.createBulkServices(bulkServiceRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new service
     * @param createNewServiceRequest
     */
    public createServiceWithHttpInfo(createNewServiceRequest: CreateNewServiceRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<ServiceResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.createServiceWithHttpInfo(createNewServiceRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new service
     * @param createNewServiceRequest
     */
    public createService(createNewServiceRequest: CreateNewServiceRequest, _options?: PromiseConfigurationOptions): Promise<ServiceResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.createService(createNewServiceRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete a service
     * @param id Service ID
     */
    public deleteServiceWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<any>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.deleteServiceWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete a service
     * @param id Service ID
     */
    public deleteService(id: number, _options?: PromiseConfigurationOptions): Promise<any> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.deleteService(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all active services
     */
    public getActiveServicesWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<ServiceResponse>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getActiveServicesWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Get all active services
     */
    public getActiveServices(_options?: PromiseConfigurationOptions): Promise<Array<ServiceResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getActiveServices(observableOptions);
        return result.toPromise();
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
    public getAllServicesWithHttpInfo(activeOnly?: boolean, minDuration?: number, maxDuration?: number, minPrice?: number, maxPrice?: number, search?: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<ServiceResponse>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getAllServicesWithHttpInfo(activeOnly, minDuration, maxDuration, minPrice, maxPrice, search, observableOptions);
        return result.toPromise();
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
    public getAllServices(activeOnly?: boolean, minDuration?: number, maxDuration?: number, minPrice?: number, maxPrice?: number, search?: string, _options?: PromiseConfigurationOptions): Promise<Array<ServiceResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getAllServices(activeOnly, minDuration, maxDuration, minPrice, maxPrice, search, observableOptions);
        return result.toPromise();
    }

    /**
     * Get a service by ID
     * @param id Service ID
     */
    public getServiceByIdWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<ServiceResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getServiceByIdWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Get a service by ID
     * @param id Service ID
     */
    public getServiceById(id: number, _options?: PromiseConfigurationOptions): Promise<ServiceResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getServiceById(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Find service by exact name
     * @param name Service name
     */
    public getServiceByNameWithHttpInfo(name: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<ServiceResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getServiceByNameWithHttpInfo(name, observableOptions);
        return result.toPromise();
    }

    /**
     * Find service by exact name
     * @param name Service name
     */
    public getServiceByName(name: string, _options?: PromiseConfigurationOptions): Promise<ServiceResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getServiceByName(name, observableOptions);
        return result.toPromise();
    }

    /**
     * Get service statistics
     */
    public getServiceStatsWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<ServiceStatsResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getServiceStatsWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Get service statistics
     */
    public getServiceStats(_options?: PromiseConfigurationOptions): Promise<ServiceStatsResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getServiceStats(observableOptions);
        return result.toPromise();
    }

    /**
     * Find services by duration range
     * @param min Minimum duration in minutes
     * @param max Maximum duration in minutes
     */
    public getServicesByDurationWithHttpInfo(min: number, max: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<ServiceResponse>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getServicesByDurationWithHttpInfo(min, max, observableOptions);
        return result.toPromise();
    }

    /**
     * Find services by duration range
     * @param min Minimum duration in minutes
     * @param max Maximum duration in minutes
     */
    public getServicesByDuration(min: number, max: number, _options?: PromiseConfigurationOptions): Promise<Array<ServiceResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getServicesByDuration(min, max, observableOptions);
        return result.toPromise();
    }

    /**
     * Find services by price range
     * @param min Minimum price in cents
     * @param max Maximum price in cents
     */
    public getServicesByPriceWithHttpInfo(min: number, max: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<ServiceResponse>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getServicesByPriceWithHttpInfo(min, max, observableOptions);
        return result.toPromise();
    }

    /**
     * Find services by price range
     * @param min Minimum price in cents
     * @param max Maximum price in cents
     */
    public getServicesByPrice(min: number, max: number, _options?: PromiseConfigurationOptions): Promise<Array<ServiceResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getServicesByPrice(min, max, observableOptions);
        return result.toPromise();
    }

    /**
     * Search services by name or description
     * @param term Search term
     */
    public searchServicesWithHttpInfo(term: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<ServiceResponse>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.searchServicesWithHttpInfo(term, observableOptions);
        return result.toPromise();
    }

    /**
     * Search services by name or description
     * @param term Search term
     */
    public searchServices(term: string, _options?: PromiseConfigurationOptions): Promise<Array<ServiceResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.searchServices(term, observableOptions);
        return result.toPromise();
    }

    /**
     * Toggle service active status
     * @param id Service ID
     */
    public toggleServiceStatusWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<ServiceResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.toggleServiceStatusWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Toggle service active status
     * @param id Service ID
     */
    public toggleServiceStatus(id: number, _options?: PromiseConfigurationOptions): Promise<ServiceResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.toggleServiceStatus(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Update a service
     * @param id Service ID
     * @param updateServiceRequest
     */
    public updateServiceWithHttpInfo(id: number, updateServiceRequest: UpdateServiceRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<ServiceResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.updateServiceWithHttpInfo(id, updateServiceRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Update a service
     * @param id Service ID
     * @param updateServiceRequest
     */
    public updateService(id: number, updateServiceRequest: UpdateServiceRequest, _options?: PromiseConfigurationOptions): Promise<ServiceResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.updateService(id, updateServiceRequest, observableOptions);
        return result.toPromise();
    }


}



import { ObservableTenantsApi } from './ObservableAPI';

import { TenantsApiRequestFactory, TenantsApiResponseProcessor} from "../apis/TenantsApi";
export class PromiseTenantsApi {
    private api: ObservableTenantsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: TenantsApiRequestFactory,
        responseProcessor?: TenantsApiResponseProcessor
    ) {
        this.api = new ObservableTenantsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Check if a subdomain is available
     * @param checkSubdomainRequest
     */
    public checkSubdomainWithHttpInfo(checkSubdomainRequest: CheckSubdomainRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<CheckSubdomainResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.checkSubdomainWithHttpInfo(checkSubdomainRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Check if a subdomain is available
     * @param checkSubdomainRequest
     */
    public checkSubdomain(checkSubdomainRequest: CheckSubdomainRequest, _options?: PromiseConfigurationOptions): Promise<CheckSubdomainResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.checkSubdomain(checkSubdomainRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete tenant
     * @param id Tenant ID
     */
    public deleteTenantWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<any>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.deleteTenantWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete tenant
     * @param id Tenant ID
     */
    public deleteTenant(id: number, _options?: PromiseConfigurationOptions): Promise<any> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.deleteTenant(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all tenants (admin only)
     */
    public getAllTenantsWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<Tenant>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getAllTenantsWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Get all tenants (admin only)
     */
    public getAllTenants(_options?: PromiseConfigurationOptions): Promise<Array<Tenant>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getAllTenants(observableOptions);
        return result.toPromise();
    }

    /**
     * Get tenant by ID
     * @param id Tenant ID
     */
    public getTenantByIdWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Tenant>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getTenantByIdWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Get tenant by ID
     * @param id Tenant ID
     */
    public getTenantById(id: number, _options?: PromiseConfigurationOptions): Promise<Tenant> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getTenantById(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Register a new tenant
     * @param registerTenantRequest
     */
    public registerTenantWithHttpInfo(registerTenantRequest: RegisterTenantRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<RegisterTenantResponse>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.registerTenantWithHttpInfo(registerTenantRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Register a new tenant
     * @param registerTenantRequest
     */
    public registerTenant(registerTenantRequest: RegisterTenantRequest, _options?: PromiseConfigurationOptions): Promise<RegisterTenantResponse> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.registerTenant(registerTenantRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Activate/deactivate tenant
     * @param id Tenant ID
     */
    public toggleTenantStatusWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Tenant>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.toggleTenantStatusWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Activate/deactivate tenant
     * @param id Tenant ID
     */
    public toggleTenantStatus(id: number, _options?: PromiseConfigurationOptions): Promise<Tenant> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.toggleTenantStatus(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Update tenant
     * @param id Tenant ID
     * @param updateTenant
     */
    public updateTenantWithHttpInfo(id: number, updateTenant: UpdateTenant, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Tenant>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.updateTenantWithHttpInfo(id, updateTenant, observableOptions);
        return result.toPromise();
    }

    /**
     * Update tenant
     * @param id Tenant ID
     * @param updateTenant
     */
    public updateTenant(id: number, updateTenant: UpdateTenant, _options?: PromiseConfigurationOptions): Promise<Tenant> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.updateTenant(id, updateTenant, observableOptions);
        return result.toPromise();
    }


}



import { ObservableUsersApi } from './ObservableAPI';

import { UsersApiRequestFactory, UsersApiResponseProcessor} from "../apis/UsersApi";
export class PromiseUsersApi {
    private api: ObservableUsersApi

    public constructor(
        configuration: Configuration,
        requestFactory?: UsersApiRequestFactory,
        responseProcessor?: UsersApiResponseProcessor
    ) {
        this.api = new ObservableUsersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Change user password
     * @param id User ID
     * @param changePasswordRequest
     */
    public changeUserPasswordWithHttpInfo(id: number, changePasswordRequest: ChangePasswordRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<User>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.changeUserPasswordWithHttpInfo(id, changePasswordRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Change user password
     * @param id User ID
     * @param changePasswordRequest
     */
    public changeUserPassword(id: number, changePasswordRequest: ChangePasswordRequest, _options?: PromiseConfigurationOptions): Promise<User> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.changeUserPassword(id, changePasswordRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new user
     * @param createNewUserRequest
     */
    public createUserWithHttpInfo(createNewUserRequest: CreateNewUserRequest, _options?: PromiseConfigurationOptions): Promise<HttpInfo<User>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.createUserWithHttpInfo(createNewUserRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Create a new user
     * @param createNewUserRequest
     */
    public createUser(createNewUserRequest: CreateNewUserRequest, _options?: PromiseConfigurationOptions): Promise<User> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.createUser(createNewUserRequest, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete a user by ID
     * @param id User ID
     */
    public deleteUserWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<any>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.deleteUserWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Delete a user by ID
     * @param id User ID
     */
    public deleteUser(id: number, _options?: PromiseConfigurationOptions): Promise<any> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.deleteUser(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Get all users
     */
    public getAllUsersWithHttpInfo(_options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<User>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getAllUsersWithHttpInfo(observableOptions);
        return result.toPromise();
    }

    /**
     * Get all users
     */
    public getAllUsers(_options?: PromiseConfigurationOptions): Promise<Array<User>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getAllUsers(observableOptions);
        return result.toPromise();
    }

    /**
     * Find user by email
     * @param email User email
     */
    public getUserByEmailWithHttpInfo(email: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<User>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getUserByEmailWithHttpInfo(email, observableOptions);
        return result.toPromise();
    }

    /**
     * Find user by email
     * @param email User email
     */
    public getUserByEmail(email: string, _options?: PromiseConfigurationOptions): Promise<User> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getUserByEmail(email, observableOptions);
        return result.toPromise();
    }

    /**
     * Get a user by ID
     * @param id User ID
     */
    public getUserByIdWithHttpInfo(id: number, _options?: PromiseConfigurationOptions): Promise<HttpInfo<User>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getUserByIdWithHttpInfo(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Get a user by ID
     * @param id User ID
     */
    public getUserById(id: number, _options?: PromiseConfigurationOptions): Promise<User> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getUserById(id, observableOptions);
        return result.toPromise();
    }

    /**
     * Find users by role
     * @param role User role (client, admin, staff)
     */
    public getUsersByRoleWithHttpInfo(role: string, _options?: PromiseConfigurationOptions): Promise<HttpInfo<Array<User>>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getUsersByRoleWithHttpInfo(role, observableOptions);
        return result.toPromise();
    }

    /**
     * Find users by role
     * @param role User role (client, admin, staff)
     */
    public getUsersByRole(role: string, _options?: PromiseConfigurationOptions): Promise<Array<User>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.getUsersByRole(role, observableOptions);
        return result.toPromise();
    }

    /**
     * Update a user by ID
     * @param id User ID
     * @param updateUser
     */
    public updateUserWithHttpInfo(id: number, updateUser: UpdateUser, _options?: PromiseConfigurationOptions): Promise<HttpInfo<User>> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.updateUserWithHttpInfo(id, updateUser, observableOptions);
        return result.toPromise();
    }

    /**
     * Update a user by ID
     * @param id User ID
     * @param updateUser
     */
    public updateUser(id: number, updateUser: UpdateUser, _options?: PromiseConfigurationOptions): Promise<User> {
        const observableOptions = wrapOptions(_options);
        const result = this.api.updateUser(id, updateUser, observableOptions);
        return result.toPromise();
    }


}



