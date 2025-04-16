// 15. ChurchEvent
// Task<StatusCode> Create(ChurchEventDTO dtoChurchEvent)
// Task<StatusCode> Update(ChurchEventDTO dtoChurchEvent)
// Task<StatusCode> Delete(Guid idChurchEvent)
// Task<ChurchEventDTO> GetById(Guid idChurchEvent)
// Task<ChurchEventDTO[]> GetAll()
// Task<ChurchEventDTO[]> GetByChurchId(Guid idChurch) : Lấy danh sách các sự kiện mà 1 nhà thờ tổ chức

import { ChurchEventDTO } from "../../commons/DTOs/ChurchEventDTO";
import { HttpGetDataWithoutToken, HttpPostWithoutToken } from "../HttpNoToken";
import { ChurchEvent, Config } from "../../constants/config";
import { checkNetwork } from "@/hooks/NetworkManager";

export const ChurchEventController = {
    create: async (dtoChurchEvent: ChurchEventDTO): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + ChurchEvent.create;
        try {
            const response = await HttpPostWithoutToken(url, dtoChurchEvent);
            return response;
        } catch (error) {
            console.log("Lỗi khi tạo ChurchEvent: ", error);
        }
    },

    update: async (dtoChurchEvent: ChurchEventDTO): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + ChurchEvent.update;
        try {
            const response = await HttpPostWithoutToken(url, dtoChurchEvent);
            return response;
        } catch (error) {
            console.log("Lỗi khi cập nhật ChurchEvent: ", error);
        }
    },

    delete: async (idChurchEvent: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + ChurchEvent.delete;
        try {
            const payLoad = {
                idChurchEvent
            }
            const response = await HttpPostWithoutToken(url, payLoad);
            return response;
        } catch (error) {
            console.log("Lỗi khi xoá ChurchEvent: ", error);
        }
    },

    getById: async (idChurchEvent: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + ChurchEvent.getById + `?idChurchEvent=${idChurchEvent}`;
        try {
            const response = await HttpGetDataWithoutToken(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy ChurchEvent By Id: ", error);
        }
    },

    getAll: async (): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + ChurchEvent.getAll;
        try {
            const response = await HttpGetDataWithoutToken(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy ChurchEvent: ", error);

        }
    },

    getByChurchId: async (idChurch: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + ChurchEvent.getByChurchId + `?idChurch=${idChurch}`;
        try {
            const response = await HttpGetDataWithoutToken(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy ChurchEvent By Id: ", error);
        }
    },
}