export * from '../models/Availability';
export * from '../models/AvailabilityCheckResponse';
export * from '../models/AvailabilityResponse';
export * from '../models/AvailabilitySlot';
export * from '../models/Booking';
export * from '../models/BookingResponse';
export * from '../models/BookingWithDetails';
export * from '../models/BulkAvailabilityRequest';
export * from '../models/BulkServiceRequest';
export * from '../models/BulkServiceResponse';
export * from '../models/Category';
export * from '../models/CategoryWithServices';
export * from '../models/ChangePasswordRequest';
export * from '../models/CheckAvailabilityRequest';
export * from '../models/CheckSubdomainRequest';
export * from '../models/CheckSubdomainResponse';
export * from '../models/CreateBookingRequest';
export * from '../models/CreateNewAvailabilityRequest';
export * from '../models/CreateNewCategoryRequest';
export * from '../models/CreateNewServiceRequest';
export * from '../models/CreateNewUserRequest';
export * from '../models/GenerateSlotsRequest';
export * from '../models/LoginRequest';
export * from '../models/LoginResponse';
export * from '../models/MagicLinkResponse';
export * from '../models/NewBooking';
export * from '../models/NewCategory';
export * from '../models/NewService';
export * from '../models/NewTenant';
export * from '../models/NewUser';
export * from '../models/PopularService';
export * from '../models/PriceRange';
export * from '../models/RegisterTenantRequest';
export * from '../models/RegisterTenantResponse';
export * from '../models/ReorderCategoriesRequest';
export * from '../models/RescheduleMagicRequest';
export * from '../models/Service';
export * from '../models/ServiceAddon';
export * from '../models/ServiceResponse';
export * from '../models/ServiceStatsResponse';
export * from '../models/Tenant';
export * from '../models/UpdateAvailability';
export * from '../models/UpdateBooking';
export * from '../models/UpdateCategory';
export * from '../models/UpdateService';
export * from '../models/UpdateServiceRequest';
export * from '../models/UpdateStatusRequest';
export * from '../models/UpdateTenant';
export * from '../models/UpdateUser';
export * from '../models/User';
export * from '../models/UserResponse';

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

/* tslint:disable:no-unused-variable */
let primitives = [
                    "string",
                    "boolean",
                    "double",
                    "integer",
                    "long",
                    "float",
                    "number",
                    "any"
                 ];

let enumsMap: Set<string> = new Set<string>([
]);

let typeMap: {[index: string]: any} = {
    "Availability": Availability,
    "AvailabilityCheckResponse": AvailabilityCheckResponse,
    "AvailabilityResponse": AvailabilityResponse,
    "AvailabilitySlot": AvailabilitySlot,
    "Booking": Booking,
    "BookingResponse": BookingResponse,
    "BookingWithDetails": BookingWithDetails,
    "BulkAvailabilityRequest": BulkAvailabilityRequest,
    "BulkServiceRequest": BulkServiceRequest,
    "BulkServiceResponse": BulkServiceResponse,
    "Category": Category,
    "CategoryWithServices": CategoryWithServices,
    "ChangePasswordRequest": ChangePasswordRequest,
    "CheckAvailabilityRequest": CheckAvailabilityRequest,
    "CheckSubdomainRequest": CheckSubdomainRequest,
    "CheckSubdomainResponse": CheckSubdomainResponse,
    "CreateBookingRequest": CreateBookingRequest,
    "CreateNewAvailabilityRequest": CreateNewAvailabilityRequest,
    "CreateNewCategoryRequest": CreateNewCategoryRequest,
    "CreateNewServiceRequest": CreateNewServiceRequest,
    "CreateNewUserRequest": CreateNewUserRequest,
    "GenerateSlotsRequest": GenerateSlotsRequest,
    "LoginRequest": LoginRequest,
    "LoginResponse": LoginResponse,
    "MagicLinkResponse": MagicLinkResponse,
    "NewBooking": NewBooking,
    "NewCategory": NewCategory,
    "NewService": NewService,
    "NewTenant": NewTenant,
    "NewUser": NewUser,
    "PopularService": PopularService,
    "PriceRange": PriceRange,
    "RegisterTenantRequest": RegisterTenantRequest,
    "RegisterTenantResponse": RegisterTenantResponse,
    "ReorderCategoriesRequest": ReorderCategoriesRequest,
    "RescheduleMagicRequest": RescheduleMagicRequest,
    "Service": Service,
    "ServiceAddon": ServiceAddon,
    "ServiceResponse": ServiceResponse,
    "ServiceStatsResponse": ServiceStatsResponse,
    "Tenant": Tenant,
    "UpdateAvailability": UpdateAvailability,
    "UpdateBooking": UpdateBooking,
    "UpdateCategory": UpdateCategory,
    "UpdateService": UpdateService,
    "UpdateServiceRequest": UpdateServiceRequest,
    "UpdateStatusRequest": UpdateStatusRequest,
    "UpdateTenant": UpdateTenant,
    "UpdateUser": UpdateUser,
    "User": User,
    "UserResponse": UserResponse,
}

type MimeTypeDescriptor = {
    type: string;
    subtype: string;
    subtypeTokens: string[];
};

/**
 * Every mime-type consists of a type, subtype, and optional parameters.
 * The subtype can be composite, including information about the content format.
 * For example: `application/json-patch+json`, `application/merge-patch+json`.
 *
 * This helper transforms a string mime-type into an internal representation.
 * This simplifies the implementation of predicates that in turn define common rules for parsing or stringifying
 * the payload.
 */
const parseMimeType = (mimeType: string): MimeTypeDescriptor => {
    const [type = '', subtype = ''] = mimeType.split('/');
    return {
        type,
        subtype,
        subtypeTokens: subtype.split('+'),
    };
};

type MimeTypePredicate = (mimeType: string) => boolean;

// This factory creates a predicate function that checks a string mime-type against defined rules.
const mimeTypePredicateFactory = (predicate: (descriptor: MimeTypeDescriptor) => boolean): MimeTypePredicate => (mimeType) => predicate(parseMimeType(mimeType));

// Use this factory when you need to define a simple predicate based only on type and, if applicable, subtype.
const mimeTypeSimplePredicateFactory = (type: string, subtype?: string): MimeTypePredicate => mimeTypePredicateFactory((descriptor) => {
    if (descriptor.type !== type) return false;
    if (subtype != null && descriptor.subtype !== subtype) return false;
    return true;
});

// Creating a set of named predicates that will help us determine how to handle different mime-types
const isTextLikeMimeType = mimeTypeSimplePredicateFactory('text');
const isJsonMimeType = mimeTypeSimplePredicateFactory('application', 'json');
const isJsonLikeMimeType = mimeTypePredicateFactory((descriptor) => descriptor.type === 'application' && descriptor.subtypeTokens.some((item) => item === 'json'));
const isOctetStreamMimeType = mimeTypeSimplePredicateFactory('application', 'octet-stream');
const isFormUrlencodedMimeType = mimeTypeSimplePredicateFactory('application', 'x-www-form-urlencoded');

// Defining a list of mime-types in the order of prioritization for handling.
const supportedMimeTypePredicatesWithPriority: MimeTypePredicate[] = [
    isJsonMimeType,
    isJsonLikeMimeType,
    isTextLikeMimeType,
    isOctetStreamMimeType,
    isFormUrlencodedMimeType,
];

const nullableSuffix = " | null";
const optionalSuffix = " | undefined";
const arrayPrefix = "Array<";
const arraySuffix = ">";
const mapPrefix = "{ [key: string]: ";
const mapSuffix = "; }";

export class ObjectSerializer {
    public static findCorrectType(data: any, expectedType: string) {
        if (data == undefined) {
            return expectedType;
        } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        } else if (expectedType === "Date") {
            return expectedType;
        } else {
            if (enumsMap.has(expectedType)) {
                return expectedType;
            }

            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }

            // Check the discriminator
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            } else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    let mapping = typeMap[expectedType].mapping;
                    if (mapping != undefined && mapping[discriminatorType]) {
                        return mapping[discriminatorType]; // use the type given in the discriminator
                    } else if(typeMap[discriminatorType]) {
                        return discriminatorType;
                    } else {
                        return expectedType; // discriminator did not map to a type
                    }
                } else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }

    public static serialize(data: any, type: string, format: string): any {
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.endsWith(nullableSuffix)) {
            let subType: string = type.slice(0, -nullableSuffix.length); // Type | null => Type
            return ObjectSerializer.serialize(data, subType, format);
        } else if (type.endsWith(optionalSuffix)) {
            let subType: string = type.slice(0, -optionalSuffix.length); // Type | undefined => Type
            return ObjectSerializer.serialize(data, subType, format);
        } else if (type.startsWith(arrayPrefix)) {
            let subType: string = type.slice(arrayPrefix.length, -arraySuffix.length); // Array<Type> => Type
            let transformedData: any[] = [];
            for (let date of data) {
                transformedData.push(ObjectSerializer.serialize(date, subType, format));
            }
            return transformedData;
        } else if (type.startsWith(mapPrefix)) {
            let subType: string = type.slice(mapPrefix.length, -mapSuffix.length); // { [key: string]: Type; } => Type
            let transformedData: { [key: string]: any } = {};
            for (let key in data) {
                transformedData[key] = ObjectSerializer.serialize(
                    data[key],
                    subType,
                    format,
                );
            }
            return transformedData;
        } else if (type === "Date") {
            if (format == "date") {
                let month = data.getMonth()+1
                month = month < 10 ? "0" + month.toString() : month.toString()
                let day = data.getDate();
                day = day < 10 ? "0" + day.toString() : day.toString();

                return data.getFullYear() + "-" + month + "-" + day;
            } else {
                return data.toISOString();
            }
        } else {
            if (enumsMap.has(type)) {
                return data;
            }
            if (!typeMap[type]) { // in case we dont know the type
                return data;
            }

            // Get the actual type of this object
            type = this.findCorrectType(data, type);

            // get the map for the correct type.
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance: {[index: string]: any} = {};
            for (let attributeType of attributeTypes) {
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type, attributeType.format);
            }
            return instance;
        }
    }

    public static deserialize(data: any, type: string, format: string): any {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.endsWith(nullableSuffix)) {
            let subType: string = type.slice(0, -nullableSuffix.length); // Type | null => Type
            return ObjectSerializer.deserialize(data, subType, format);
        } else if (type.endsWith(optionalSuffix)) {
            let subType: string = type.slice(0, -optionalSuffix.length); // Type | undefined => Type
            return ObjectSerializer.deserialize(data, subType, format);
        } else if (type.startsWith(arrayPrefix)) {
            let subType: string = type.slice(arrayPrefix.length, -arraySuffix.length); // Array<Type> => Type
            let transformedData: any[] = [];
            for (let date of data) {
                transformedData.push(ObjectSerializer.deserialize(date, subType, format));
            }
            return transformedData;
        } else if (type.startsWith(mapPrefix)) {
            let subType: string = type.slice(mapPrefix.length, -mapSuffix.length); // { [key: string]: Type; } => Type
            let transformedData: { [key: string]: any } = {};
            for (let key in data) {
                transformedData[key] = ObjectSerializer.deserialize(
                    data[key],
                    subType,
                    format,
                );
            }
            return transformedData;
        } else if (type === "Date") {
            return new Date(data);
        } else {
            if (enumsMap.has(type)) {// is Enum
                return data;
            }

            if (!typeMap[type]) { // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let attributeType of attributeTypes) {
                let value = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type, attributeType.format);
                if (value !== undefined) {
                    instance[attributeType.name] = value;
                }
            }
            return instance;
        }
    }


    /**
     * Normalize media type
     *
     * We currently do not handle any media types attributes, i.e. anything
     * after a semicolon. All content is assumed to be UTF-8 compatible.
     */
    public static normalizeMediaType(mediaType: string | undefined): string | undefined {
        if (mediaType === undefined) {
            return undefined;
        }
        return (mediaType.split(";")[0] ?? '').trim().toLowerCase();
    }

    /**
     * From a list of possible media types, choose the one we can handle best.
     *
     * The order of the given media types does not have any impact on the choice
     * made.
     */
    public static getPreferredMediaType(mediaTypes: Array<string>): string {
        /** According to OAS 3 we should default to json */
        if (mediaTypes.length === 0) {
            return "application/json";
        }

        const normalMediaTypes = mediaTypes.map(ObjectSerializer.normalizeMediaType);

        for (const predicate of supportedMimeTypePredicatesWithPriority) {
            for (const mediaType of normalMediaTypes) {
                if (mediaType != null && predicate(mediaType)) {
                    return mediaType;
                }
            }
        }

        throw new Error("None of the given media types are supported: " + mediaTypes.join(", "));
    }

    /**
     * Convert data to a string according the given media type
     */
    public static stringify(data: any, mediaType: string): string {
        if (isTextLikeMimeType(mediaType)) {
            return String(data);
        }

        if (isJsonLikeMimeType(mediaType)) {
            return JSON.stringify(data);
        }

        throw new Error("The mediaType " + mediaType + " is not supported by ObjectSerializer.stringify.");
    }

    /**
     * Parse data from a string according to the given media type
     */
    public static parse(rawData: string, mediaType: string | undefined) {
        if (mediaType === undefined) {
            throw new Error("Cannot parse content. No Content-Type defined.");
        }

        if (isTextLikeMimeType(mediaType)) {
            return rawData;
        }

        if (isJsonLikeMimeType(mediaType)) {
            return JSON.parse(rawData);
        }

        throw new Error("The mediaType " + mediaType + " is not supported by ObjectSerializer.parse.");
    }
}
