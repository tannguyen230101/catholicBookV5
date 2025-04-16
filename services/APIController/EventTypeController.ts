import { EventTypeDTO } from "../../commons/DTOs/EventTypeDTO";
import { Config, EventType } from "../../constants/config";
import { HttpGetDataWithoutToken, HttpPostWithoutToken } from "../HttpNoToken";

export const EventTypeController = {
    create: async (dtoEventType: EventTypeDTO) : Promise<any> => {
        const url = Config.server + EventType.create;
        try {
            const response = await HttpPostWithoutToken(url, dtoEventType);

            if (!response) console.log("Không nhận được phản hồi từ server");

            console.debug("--- EventType Data Response: ", response);
            return response;
        } catch (error) {
            console.log("-- Lỗi Khi Tạo EventType: ", error);
        }
    },

    update: async (dtoEventType: EventTypeDTO): Promise<any> => {
        const url = Config.server + EventType.update;
        try {
            const response = await HttpPostWithoutToken(url, dtoEventType);

            if (!response) console.log("Không nhận được phản hồi từ server");

            console.debug("--- EventType Data Response: ", response);
            return response;
        } catch (error) {
            console.log("-- Lỗi Khi Cập Nhật EventType: ", error);
        }
    },

    delete: async (idEventType: string) : Promise<any> => {
        const url = Config.server + EventType.delete + `?idEventType=${idEventType}`;
        try {
            const objDelete = {
                idEventType
            };
            let response = await HttpPostWithoutToken(url, objDelete);
            console.log("-- Đã cập nhật Is deleted: ", response);
            return response;
        } catch (error) {
            console.log("Lỗi khi xoá EventType:", error);
        }
    }, 

    getById: async (idEventType: string) : Promise<any> => {
        const url = Config.server + EventType.getById + `?idEventType=${idEventType}`;

        try {
            const response = await HttpGetDataWithoutToken(url);

            return response;
        } catch (error) {
            console.log("Lỗi khi tải EventType By Id:", error);
        }
    },

    getAll: async () : Promise<any> => {
        const url = Config.server + EventType.getAll;
        try {
            const response = await HttpGetDataWithoutToken(url);

            return response;
        } catch (error) {
            console.log("Lỗi khi tải EventType:", error);
        }
    }
}