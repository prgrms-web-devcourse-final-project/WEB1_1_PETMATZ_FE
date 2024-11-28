import { create } from 'zustand';

interface TitleStore {
    title: string | null;
    setTitle: (title: string) => void;
}

const useTitleStore = create<TitleStore>((set) => ({
    title: null,
    setTitle: (title) => set({ title }),
}));

export default useTitleStore;
