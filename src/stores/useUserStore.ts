import { IUser } from '@/types/user';
import { create } from 'zustand';

interface IUserStore {
    user: IUser | null;
    setUser: (user: IUser) => void;
    clearUser: () => void;
}

const useUserStore = create<IUserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));

export default useUserStore;
