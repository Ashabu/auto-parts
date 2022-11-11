import create from 'zustand';
import {IGetMainCategoriesResponse} from '../Api/types';

interface IVehicleStore {
    savedVehicles: any[],
    saveVehicle: (vehicle: any) => void,
    removeVehicle: (id: number) => void,
    setActiveVehicle: (id: number) => void,
};

interface ICategoriesStore {
    categories:IGetMainCategoriesResponse["data"]["array"];
    setCategories: (categories: any) => void;
}

export const vehicleStore = create<IVehicleStore>(set => ({
    savedVehicles: [],
    saveVehicle: (vehicle: any) =>
        set(state => {
            let tempVehicles = state.savedVehicles.map(el => {
                el.currentSelected = false;
                return el;
            });
            return {
                savedVehicles: [vehicle, ...tempVehicles]
            };
        }),
    removeVehicle: (id: number) =>
        set(state => {
            let tempVehicles = state.savedVehicles.filter((el: any) => el.vehicleModelSeriesId !== id);
            const isInactive = (el: any) => el.currentSelected == false;
            try {
                if (tempVehicles.every(isInactive)) {
                    tempVehicles[0].currentSelected = true;
                };
            } catch (_) {
                tempVehicles = [];
            };
            return {
                savedVehicles: tempVehicles
            };
        }),
    setActiveVehicle: (id: number) =>
        set(state => {
            let tempActiveCar = state.savedVehicles.filter(el => el.vehicleModelSeriesId == id)[0];
            console.log(tempActiveCar)
            tempActiveCar.currentSelected = true;
            let tempInactiveCars = state.savedVehicles.filter(el => el.vehicleModelSeriesId !== id);
            tempInactiveCars.forEach(v => {v.currentSelected = false; return v});
            // let tempVehicles = state.savedVehicles.map(el => {
            //     if (el.vehicleModelSeriesId == id) {
            //         el.currentSelected = true;
            //     } else {
            //         el.currentSelected = false;
            //     };
            //     return el;
            // });
            return {
                savedVehicles: [tempActiveCar, ...tempInactiveCars]
            };
        })
}));

export const useCategoriesStore = create<ICategoriesStore>(set => ({
    categories: [],
    setCategories: (categories: ICategoriesStore["categories"]) => set(({ categories: categories }))
}))