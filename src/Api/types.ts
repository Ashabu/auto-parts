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

export interface IGetArticlesData {
    getArticles: {
        articleCountry?: string,
        provider?: number,
        lang?: string,
        perPage?: number,
        page?: number,
        linkageTargetType?: string,
        linkageTargetId?: number,
        assemblyGroupNodeIds?: number
        assemblyGroupFacetOptions?: {
            enabled?: boolean,
            assemblyGroupType?: string,
            includeCompleteTree?: boolean
        }
        includeAll?: boolean,
        includeOEMNumbers?: boolean
    }
}

export interface IGetArticlesResponse {
    totalMatchingArticles: number,
    maxAllowedPage: number,
    articles?: {
        dataSupplierId: number,
        articleNumber: number,
        mfrId: number,
        mfrName: string,
        misc: {
            articleStatusId: number,
            articleStatusDescription: string,
            articleStatusValidFromDate: number,
            quantityPerPackage: number,
            quantityPerPartPerPackage: number,
            isSelfServicePacking: boolean,
            hasMandatoryMaterialCertification: boolean,
            isRemanufacturedPart: boolean,
            isAccessory: boolean
        },
        genericArticles:
        {
            genericArticleId: number,
            genericArticleDescription: string,
            legacyArticleId: number
        }[],
        articleText: any[],
        gtins: any[],
        tradeNumbers: any[],
        oemNumbers:
        {
            articleNumber: number,
            mfrId: number,
            mfrName: string
        }[],
        replacesArticles: any[],
        replacedByArticles: any[],
        articleCriteria: any[],
        linkages:
        {
            linkageTargetTypeId: number,
            linkageTargetId: number,
            legacyArticleLinkId: number,
            genericArticleId: number,
            genericArticleDescription: string,
            linkageCriteria:
            {
                criteriaId: number,
                criteriaDescription: string,
                criteriaType: string,
                rawValue: number,
                formattedValue: string,
                immediateDisplay: true,
                isMandatory: boolean,
                isInterval: boolean
            }[],
            linkageText: any[]
        }[],
        partsList: any[],
        hasPartsListParent: boolean,
        accessoryList: any[],
        hasAccessoryListParent: boolean,
        pdfs: any[],
        images: any[],
        comparableNumbers: any[],
        links: any[],
        totalLinkages: number,
        prices: any[],
        articleLogisticsCriteria: any[]
    }[],
    status: number,
    assemblyGroupFacets: {
        total: number,
        counts: {
            assemblyGroupNodeId: number,
            assemblyGroupName: string,
            assemblyGroupType: string,
            parentNodeId: number,
            count: number
        }[],
    }
}

export interface IGetMainCategoriesResponse {
    data: {
        array: {
            assemblyGroupName: string,
            assemblyGroupNodeId: number,
            hasChilds: boolean
        }[],
    },
    status: number,

  
}