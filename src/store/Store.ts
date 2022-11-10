import create from 'zustand';

interface IVehicleStore {
    savedVehicles: any[],
    saveVehicle: (vehicle: any) => void,
    removeVehicle: (id: number) => void,
};

interface ICategoriesStore {
    categories: {
        assemblyGroupNodeId: number,
        assemblyGroupName:string,
        assemblyGroupType: string,
        parentNodeId: number,
        count: number
        }[]
}

export const vehicleStore = create<IVehicleStore>(set => ({
    savedVehicles: [],
    saveVehicle: (vehicle: any) => set(state => ({savedVehicles: [vehicle, ...state.savedVehicles]})),
    removeVehicle: (id: number) => set(state=> ({savedVehicles: state.savedVehicles.filter((el: any) => el.id !== id)}))  
}));

export const useCategoriesStore = create<ICategoriesStore>(set => ({
    categories: [],
    setCategories: (categories: ICategoriesStore["categories"]) => set(({categories: categories}))
}))