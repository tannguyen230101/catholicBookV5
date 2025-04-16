import { create } from 'zustand';
import { ChurchDTO } from '../DTOs/ChurchDTO';
import { SaintDTO } from '../DTOs/SaintDTO';
import { EthnicMinorityDTO } from '../DTOs/EthnicMinorityDTO';
import { Church, Config, EthnicMinority, EventType, Saint } from '@/constants/config';
import { EventTypeDTO } from '../DTOs/EventTypeDTO';
import { HttpGetData } from '@/services/HttpWithToken';
import { checkNetwork } from '@/hooks/NetworkManager';
// import { AssessorUserProfile } from './useAuthStore';

interface DataStore {
    churches: ChurchDTO[];
    saints: SaintDTO[];
    ethnicMinorities: EthnicMinorityDTO[];
    eventTypes: EventTypeDTO[];
    isLoading: boolean,
    fetchData: () => Promise<void>;
    fetchChurches: () => Promise<void>;
    fetchSaints: () => Promise<void>;
    fetchEthnics: () => Promise<void>;
    fetchEventTypes: () => Promise<void>;
}

const useGetData = create<DataStore>((set: any) => ({
    isLoading: false,
    churches: [],
    saints: [],
    eventTypes: [],
    ethnicMinorities: [],

    fetchData: async () => {
        set({ isLoading: true });
        // Add your data fetching logic here
        //=== Cảnh che bớt 1 hàm set lại ===//
        // set({ isLoading: false });
    },

    fetchChurches: async () => {
        set({ isLoading: true });
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        try {
            const url = Config.server + Church.getChurchList;
            const response = await HttpGetData(url);
            if (response) {
                set({ churches: response });
            }
        } catch (error) {
            console.log("Lỗi khi tải Church:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    fetchSaints: async () => {
        set({ isLoading: true });
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        try {
            const url = Config.server + Saint.getAll;
            const response = await HttpGetData(url);
            if (response) {
                set({ saints: response });
            }
        } catch (error) {
            console.log("Lỗi khi tải Saints:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    fetchEthnics: async () => {
        set({ isLoading: true });
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        try {
            const url = Config.server + EthnicMinority.getAll;
            const response = await HttpGetData(url);
            if (response) {
                set({ ethnicMinorities: response });
            }
        } catch (error) {
            console.log("Lỗi khi tải Ethics:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    fetchEventTypes: async () => {
        set({ isLoading: true });
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + EventType.getAll;
        try {
            const response = await HttpGetData(url);
            if (response) {
                set({ eventTypes: response });
            }
        } catch (error) {
            console.log("Lỗi khi tải EventType:", error);
        } finally {
            set({ isLoading: false });
        }
    },

}));

export default useGetData;