import { DioceseDTO } from "../../commons/DTOs/DioceseDTO";
import { Config, Diocese } from "../../constants/config";
import { HttpGetDataWithoutToken, HttpPostWithoutToken } from "../HttpNoToken";

export const DioceseController = {
    create: async (dtoDiocese: DioceseDTO) : Promise<any> => {
        const url = Config.server + Diocese.create;
        try {
            const response = await HttpPostWithoutToken(url, dtoDiocese);
            return response;
        } catch (error) {
            console.log("Lỗi khi tạo Diocese: ", error);
        }
    },

    update: async (dtoDiocese: DioceseDTO) : Promise<any> => {
        const url = Config.server + Diocese.update;
        try {
            const response = await HttpPostWithoutToken(url, dtoDiocese);
            return response;
        } catch (error) {
            console.log("Lỗi khi cập nhật Diocese: ", error);
        }
    },

    delete: async (idDiocese: string) : Promise<any> => {
        const url = Config.server + Diocese.delete;
        try {
            const payLoad = {
                idDiocese
            }
            const response = await HttpPostWithoutToken(url, payLoad);
            return response;
        } catch (error) {
            console.log("Lỗi khi xoá Diocese: ", error);
        }
    },

    getById: async (idDiocese: string) : Promise<any> => {
        const url = Config.server + Diocese.getById + `?idDiocese=${idDiocese}`;
        try {
            const response = await HttpGetDataWithoutToken(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy Diocese by Id: ", error);
        }
    },

    getAll: async () : Promise<any> => {
        const url = Config.server + Diocese.getAll;
        try {
            const response = await HttpGetDataWithoutToken(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy Diocese: ", error);
        }
    },
}