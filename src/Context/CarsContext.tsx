import React, { createContext, ReactNode, useCallback, useContext, useMemo, useReducer } from 'react';



type SavedCarState = {
    savedCars: {
        axleBodyTypes?: [],
        beginYearMonth?: string,
        bodyStyle?: string,
        bodyStyleKey?: number,
        capacityCC?: number,
        capacityLiters?: number,
        cylinders?: number,
        description?: string,
        driveType?: string,
        driveTypeKey?: number,
        endYearMonth?: string,
        engineType?: string,
        engineTypeKey?: number,
        engines?: { code?: string, id?: number }[],
        fuelMixtureFormationType?: string,
        fuelMixtureFormationTypeKey?: number,
        fuelType?: string,
        fuelTypeKey?: number,
        horsePowerFrom?: number,
        horsePowerTo?: number,
        kbaNumbers?: string[],
        kiloWattsFrom?: number,
        kiloWattsTo?: number,
        linkageTargetId?: number,
        linkageTargetType?: string,
        mfrId?: number,
        mfrName?: number,
        mfrShortName?: number,
        rmiTypeId?: number,
        subLinkageTargetType?: string,
        valves?: number,
        vehicleImages?: string[],
        vehicleModelSeriesId?: number,
        vehicleModelSeriesName?: string,
        vehiclesInOperation?: [],
        isSelected?: boolean
    }[]
};

type Dispatch = React.Dispatch<Partial<SavedCarState>>


const initialSavedCarState: SavedCarState = {
    savedCars: []
}
const StateContext = createContext<SavedCarState>(initialSavedCarState);

const DispatchContext = createContext<React.Dispatch<Partial<SavedCarState>>>(
    () => { }
);





export const CarsProvider = (
    { children }: { children: ReactNode }) => {
    const [carState, setCarState] = useReducer(
        (state: SavedCarState, newState: Partial<SavedCarState>) => ({
            ...state,
            ...newState,
        }),
        initialSavedCarState
    );

    const memoizedDispatch = useCallback(
        (value: Partial<SavedCarState>) => {
            setCarState(value);
        }, []);

    const memoizedValue = useMemo(
        () => ({
            ...carState
        }),
        [carState]
    );

    return (
        <StateContext.Provider value={memoizedValue}>
            <DispatchContext.Provider value={memoizedDispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};


export const useCar = () => useContext(StateContext)
export const useCarDispatch: () => Dispatch = () => useContext(DispatchContext)