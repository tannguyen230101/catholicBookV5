import { CatholicEvent, Config } from '../../constants/config';
import { CatholicEventDTO } from '../../commons/DTOs/CatholicEventDTO';
import { HttpGetData, HttpPostData } from '../HttpWithToken';
import { checkNetwork } from '@/hooks/NetworkManager';

export const CatholicEventController = {
    create: async (dtoCatholicEvent: CatholicEventDTO): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CatholicEvent.create;
        try {
            const response = await HttpPostData(url, dtoCatholicEvent);

            if (!response) console.log("Không nhận được phản hồi từ server");

            console.debug("--- Catholic Event Data Response: ", response);
            return response;
        } catch (error) {
            console.log("-- Lỗi Khi Tạo Catholic Event: ", error);
        }
    },

    update: async (dtoCatholicEvent: CatholicEventDTO): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CatholicEvent.update;
        try {
            const response = await HttpPostData(url, dtoCatholicEvent);

            if (!response) console.log("Không nhận được phản hồi từ server");

            console.log("--- Catholic Event updated Data Response: ", response);
            return response;
        } catch (error) {
            console.log("-- Lỗi Khi Cập Nhật Catholic Event: ", error);
        }
    },

    getById: async (idCatholicEvent: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CatholicEvent.getById + `?idCatholicEvent=${idCatholicEvent}`;
        try {
            const response = await HttpGetData(url);
            return response;
        } catch (error) {
            console.log("-- Lỗi Khi Lấy Dữ liệu Catholic Event By Id", error);
        }
    },

    getByChurchId: async (idChurch: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CatholicEvent.getByChurchId + `?idChurch=${idChurch}`;
        try {
            const response = await HttpGetData(url);
            return response;
        } catch (error) {
            console.log("-- Lỗi Khi Lấy Dữ liệu Catholic Event By ChurchId", error);
        }
    },

    getByEventTypeId: async (idEventType: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CatholicEvent.getByEventTypeId + `?idEventType=${idEventType}`;
        try {
            const response = await HttpGetData(url);
            return response;
        } catch (error) {
            console.log("-- Lỗi Khi Lấy Dữ liệu Catholic Event By EventTypeId: ", error);
        }
    },

    getByCatholicId: async (idCatholic: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CatholicEvent.getByCatholicId + `?idCatholic=${idCatholic}`;
        try {
            const response = await HttpGetData(url);
            return response;
        } catch (error) {
            console.log("-- Lỗi Khi Lấy Dữ liệu Catholic Event By CatholicId: ", error);
        }
    },

    delete: async (idCatholicEvent: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CatholicEvent.delete + `?idCatholicEvent=${idCatholicEvent}`;
        try {
            const objDelete = {
                idCatholicEvent
            };
            let response = await HttpPostData(url, objDelete);
            console.log("-- Đã cập nhật Is deleted: ", response);
            return response;
        } catch (error) {
            console.log("Lỗi khi xoá CatholicEvent:", error);
        }
    },
};

