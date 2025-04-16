import { Config, Deanery } from "../../constants/config";
import { HttpGetDataWithoutToken, HttpPostWithoutToken } from "../HttpNoToken";
import { DeaneryDTO } from "../../commons/DTOs/DeaneryDTO";

export const DeaneryController = {
    create: async (dtoDeanery: DeaneryDTO) : Promise<any> => {
        const url = Config.server + Deanery.create;
        try {
            const response = await HttpPostWithoutToken(url, dtoDeanery);
            return response;
        } catch (error) {
            console.log("Lỗi khi tải Deanery: ", error);
        }
    },

    update: async (dtoDeanery: DeaneryDTO) : Promise<any> => {
        const url = Config.server + Deanery.update;
        try {
            const response = await HttpPostWithoutToken(url, dtoDeanery);
            return response;
        } catch (error) {
            console.log("Lỗi khi cập nhật Parish: ", error);
        }
    },

    delete: async (idDeanery: string) : Promise<any> => {
        const url = Config.server + Deanery.delete;
        try {
            const payLoad = {
                idDeanery
            }
            const response = await HttpPostWithoutToken(url, payLoad);
            return response;
        } catch (error) {
            console.log("Lỗi khi xoá Deanery: ", error);
        }
    },

    getById: async (idDeanery: string) : Promise<any> => {
        const url = Config.server + Deanery.getById + `?idDeanery=${idDeanery}`;
        try {
            const response = await HttpGetDataWithoutToken(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy Deanery by Id: ", error);
        }
    },

    getByDioceseId: async (idDiocese: string): Promise<any> => {
        const url = Config.server + Deanery.getByDioceseId + `?idDiocese=${idDiocese}`;
        try {
            const response = await HttpGetDataWithoutToken(url);
            
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy Deanery by idDiocese: ", error);
        }
    },
}