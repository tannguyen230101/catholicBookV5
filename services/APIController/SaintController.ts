// Task<StatusCode> Create(SaintDTO dtoSaint);
// Task<StatusCode> Update(SaintDTO dtoSaint);
// Task<StatusCode> Delete(Guid idSaint);
// Task<SaintDTO?> GetById(Guid idSaint);
// Task<SaintDTO[]> GetAll();

import { SaintDTO } from "../../commons/DTOs/SaintDTO";
import { Config, Saint } from "../../constants/config";
import { HttpGetDataWithoutToken, HttpPostWithoutToken } from "../HttpNoToken";

export const SaintController = {
    create: async (dtoSaint: SaintDTO) : Promise<any> => {
        const url = Config.server + Saint.create;
        try {
            const response = await HttpPostWithoutToken(url, dtoSaint);
            return response;
        } catch (error) {
            console.log("Lỗi khi tạo Saint: ", error);
        }
    },

    update: async (dtoSaint: SaintDTO) : Promise<any> => {
        const url = Config.server + Saint.update;
        try {
            const response = await HttpPostWithoutToken(url, dtoSaint);
            return response;
        } catch (error) {
            console.log("Lỗi khi cập nhật Saint: ", error);
        }
    },

    delete: async (idSaint: string) : Promise<any> => {
        const url = Config.server + Saint.delete;
        try {
            const payLoad = {
                idSaint
            }
            const response = await HttpPostWithoutToken(url, payLoad);
            return response;
        } catch (error) {
            console.log("Lỗi khi xoá Saint: ", error);
        }
    },

    getById: async (idSaint: string) : Promise<any> => {
        const url = Config.server + Saint.getById + `?idSaint=${idSaint}`;
        try {
            const response = await HttpGetDataWithoutToken(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy Saint By Id: ", error);
        }
    },

    getAll: async () : Promise<any> => {
        const url = Config.server + Saint.getAll;
        try {
            const response = await HttpGetDataWithoutToken(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy Saint: ", error);
            
        }
    },
}