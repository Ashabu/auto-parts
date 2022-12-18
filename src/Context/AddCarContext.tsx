import React, { createContext, ReactNode, useCallback, useContext, useMemo, useReducer } from 'react';
import { IgGtLinkageTargetsResponse } from '../Api/types';



type AddCarState = {
    vehiclesByCarMaker?: {
        id?: number,
        name?: string,
        count?: number
    }[];
    selectedCarMaker?: {
        id?: number,
        name?: string,
        count?: number
    };
    vehiclesByCarModel?: {
        id?: number,
        name?: string,
        count?: number
    }[];
    selectedCarModel?: {
        id?: number,
        name?: string,
        count?: number
    }[];
    vehiclesByModelSeries?: IgGtLinkageTargetsResponse["linkageTargets"];
    selectedModelSeries?: {
        description?: string,
        linkageTargetId?: number,
        linkageTargetType?: string
    }
};

type Dispatch = React.Dispatch<Partial<AddCarState>>


const initialAddCarState: AddCarState = {
selectedCarMaker:{},
selectedCarModel:[],
selectedModelSeries:{},
vehiclesByCarMaker: [],
vehiclesByCarModel:[],
vehiclesByModelSeries: []
}
const StateContext = createContext<AddCarState>(initialAddCarState);

const DispatchContext = createContext<React.Dispatch<Partial<AddCarState>>>(
    () => { }
);





export const AddCarProvider = (
    { children }: { children: ReactNode }) => {
    const [addCarState, setAddCarState] = useReducer(
        (state: AddCarState, newState: Partial<AddCarState>) => ({
            ...state,
            ...newState,
        }),
        initialAddCarState
    );

    const memoizedDispatch = useCallback(
        (value: Partial<AddCarState>) => {
            setAddCarState(value);
        }, []);

    const memoizedValue = useMemo(
        () => ({
            ...addCarState
        }),
        [addCarState]
    );

    return (
        <StateContext.Provider value={memoizedValue}>
            <DispatchContext.Provider value={memoizedDispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};


export const useAddCar = () => useContext(StateContext)
export const useAddCarDispatch: () => Dispatch = () => useContext(DispatchContext)