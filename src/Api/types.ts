export interface IWPressError {
    response: {
        code: string,
        message: string,
        data: {
            status: number,
            json_error_code?: number,
            json_error_message?: string
        }

    }
}

export interface IFinaAuthResponse {
    ex: null | any,
    token: string
}

export interface IGetProductsResponse {
    products: {
        id?: number,
        group_id?: number,
        web_group_id?: number,
        unit_id?: number,
        code?: string,
        name?: string,
        name_eng?: null,
        name_rus?: null,
        comment?: string,
        partnumber?: string,
        weight?: string,
        volume?: string,
        vat?: string,
        order_id?: string,
        min_quantity?: null | number,
        add_fields?: [
            {
                field: string,
                value: string
            },
            {
                field: string,
                value: string
            },
            {
                field: string,
                value: string
            },
            {
                field: string,
                value: string
            },
            {
                field: string,
                value: string
            },
            {
                field: string,
                value: string
            },
            {
                field: string,
                value: string
            },
            {
                field: string,
                value: string
            },
            {
                field: string,
                value: string | number
            },
            {
                field: string,
                value: string
            },
            {
                field: string,
                value: string
            },
            {
                field: string,
                value: string
            }
        ]
    }[]
}

export interface ISignUpRequest {
    username: string,
    user_login: string,
    user_email: string,
    email: string,
    display_name: string,
    first_name: string,
    last_name: string,
    password: string,
    user_pass: string
}

export interface ISignUpResponse {
    cookie: string,
    user_id: number
}

export interface ISignInRequest {
    username: string,
    password: string,

}

export interface ISignInResponse {
    cookie: string,
    cookie_name: string,
    user: {
        id: 17,
        username: string,
        nicename: string,
        email: string,
        url?: string,
        registered: string,
        displayname: string,
        firstname: string,
        lastname: string,
        nickname: string,
        description: string,
        capabilities: {
            subscriber: boolean
        },
        role: string[],
        shipping: string | null,
        billing: string | null,
        avatar: string
        dokan_enable_selling: string
    }
}



export interface IGetVehiclesByVinResponse {
    data: {
        matchingManufacturers?: {
            manuId: number,
            manuName: string
        }[],
        matchingModels?: {
            array: {
                manuId: number,
                modelId: number,
                modelName: string
            }[]
        },
        matchingVehicles?: {
            array: {
                manuId: number,
                modelId: number,
                carId: number,
                vehicleTypeDescription: string,
                carName: string
            }[]
        },
        matchingVehiclesCount?: number,
        dataSource?: [
            {
                dataSourceKey: string
            }
        ]
    },
    status: number
}

export interface IgGtLinkageTargetsRequest {
    getLinkageTargets: {
        provider: number,
        linkageTargetCountry: string,
        lang: string,
        linkageTargetType: string,
        mfrIds?: number,
        vehicleModelSeriesIds?: number,
        perPage: number,
        page: number,
        includeVehicleModelSeriesFacets?: boolean,
        includeMfrFacets?: boolean
    }
}

export interface IgGtLinkageTargetsResponse {
    total: number,
    linkageTargets?: {
        linkageTargetId: number,
        linkageTargetType: string,
        subLinkageTargetType: string,
        description: number,
        mfrId: number,
        mfrName: string,
        mfrShortName: string,
        vehicleModelSeriesId: number,
        vehicleModelSeriesName: string,
        beginYearMonth: string,
        endYearMonth: string,
        rmiTypeId: number,
        vehicleImages: [
            {
                imageURL50: string,
                imageURL100: string,
                imageURL200: string,
                imageURL400: string,
                imageURL800: string
            }
        ],
        kbaNumbers: string[],
        fuelMixtureFormationTypeKey: number,
        fuelMixtureFormationType: string,
        driveTypeKey: number,
        driveType: string,
        bodyStyleKey: number,
        bodyStyle: string,
        valves: number,
        fuelTypeKey: number,
        fuelType: string,
        engineTypeKey: number,
        engineType: string,
        horsePowerFrom: number,
        horsePowerTo: number,
        kiloWattsFrom: number,
        kiloWattsTo: number,
        cylinders: number,
        capacityCC: number,
        capacityLiters: number,
        engines:
        {
            id: number,
            code: string
        }[]
        ,
        vehiclesInOperation: any[]
    }[] | any[],
    mfrFacets?: {
        total: number,
        counts:
        {
            id: number,
            name: string,
            count: number
        }[],
    },
    vehicleModelSeriesFacets?: {
        total: number,
        counts:
        {
            id: number,
            name: string,
            count: number
        }[],
    }
    status: number
};