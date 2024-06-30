import { create } from "zustand"

type ModalType = "reset-password" | "delete-account"

interface ModalStore {
    isOpen: boolean,
    type: ModalType | null,
    handleOpen: (type: ModalType) => void,
    handleClose: () => void,
}

export const useModal = create<ModalStore>((set) => ({
    isOpen: false,
    type: null,
    handleOpen: (type) => set({
        isOpen: true,
        type,
    }),
    handleClose: () => set({
        isOpen: false,
        type: null,
    }),
}))