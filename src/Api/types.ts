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

export interface IGetVehiclesByVinRequest {

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

export interface IGetVehiclesByCarMakerResponse {
    data: {
        array?: {
            favorFlag: number,
            linkingTargetTypes: string,
            manuId: number,
            manuName: string
        }[],
    },
    status: number
}

export interface IGetVehiclesByCarModelResponse {
    data: {
        array?: {
        favorFlag: number, 
        modelId: number, 
        modelname: string 
       }[],
    },
status: number
}

