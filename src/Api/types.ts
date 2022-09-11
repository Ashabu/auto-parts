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
