import { create } from "zustand"

type SheetType = "edit-profile"

type SheetData = {
    name?: string,
    image?: string,
}

interface SheetStore {
    isOpen: boolean,
    type: SheetType | null,
    data: SheetData,
    handleOpen: (type: SheetType, data?: SheetData) => void,
    handleClose: () => void,
}

export const useSheet = create<SheetStore>((set) => ({
    isOpen: false,
    type: null,
    data: {},
    handleOpen: (type, data = {}) => set({
        isOpen: true,
        type,
        data,
    }),
    handleClose: () => set({
        isOpen: false,
        type: null,
        data: {},
    }),
}))