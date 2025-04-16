import { Config, Parish } from "../../constants/config";
import { ParishDTO } from "../../commons/DTOs/ParishDTO";
import { HttpGetData, HttpPostData } from "../HttpWithToken";

export const ParishController = {
    create: async (dtoParish: ParishDTO) : Promise<any> => {
        const url = Config.server + Parish.create;
        try {
            const response = await HttpPostData(url, dtoParish);
            return response;
        } catch (error) {
            console.log("Lỗi khi tải Parish: ", error);
        }
    },

    update: async (dtoParish: ParishDTO) : Promise<any> => {
        const url = Config.server + Parish.update;
        try {
            const response = await HttpPostData(url, dtoParish);
            return response;
        } catch (error) {
            console.log("Lỗi khi cập nhật Parish: ", error);
        }
    },

    delete: async (idParish: string) : Promise<any> => {
        const url = Config.server + Parish.delete;
        try {
            const payLoad = {
                idParish
            }
            const response = await HttpPostData(url, payLoad);
            return response;
        } catch (error) {
            console.log("Lỗi khi xoá Parish: ", error);
        }
    },

    getAll: async (): Promise<any> => {
        try {
            const url = Config.server + Parish.getAll;
            // console.log("-- url", url);
            const response = await HttpGetData(url);
            
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy Parish: ", error);
        }
    },

    getById: async (idParish: string) : Promise<any> => {
        try {
            const url = Config.server + Parish.getById + `?idParish=${idParish}`;

            const response = await HttpGetData(url);
            // console.log("-- Event Type Data: ", eventTypeData);
            return response;
        } catch (error) {
            console.log("Lỗi khi tải Parish By Id:", error);
        }
    },

    getByDeaneryId: async (idDeanery: string) : Promise<any> => {
        const url = Config.server + Parish.getByDeaneryId + `?idDeanery=${idDeanery}`;
        try {
            const response = await HttpGetData(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi tải Parish By idDeanery:", error);
        }
    }, 
}