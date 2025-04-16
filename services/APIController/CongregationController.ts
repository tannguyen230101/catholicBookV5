// 11. Congregation
// Task<StatusCode> Create(CongregationDTO dtoCongregation)
// Task<StatusCode> Update(CongregationDTO dtoCongregation)
// Task<StatusCode> Delete(Guid idCongregation)
// Task<CongregationDTO?> GetById(Guid idCongregation)
// Task<CongregationDTO[]> GetAll()

import { checkNetwork } from "@/hooks/NetworkManager";
import { CongregationDTO } from "../../commons/DTOs/CongregationDTO";
import { Config, Congregation } from "../../constants/config";
import { HttpGetDataWithoutToken, HttpPostWithoutToken } from "../HttpNoToken";
import { HttpGetData, HttpPostData } from "../HttpWithToken";

export const CongregationController = {
    create: async (dtoCongregation: CongregationDTO): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + Congregation.create;
        try {
            const response = await HttpPostData(url, dtoCongregation);
            return response;
        } catch (error) {
            console.log("Lỗi khi tạo Congregation: ", error);
        }
    },

    update: async (dtoCongregation: CongregationDTO): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + Congregation.update;
        try {
            const response = await HttpPostData(url, dtoCongregation);
            return response;
        } catch (error) {
            console.log("Lỗi khi cập nhật Congregation: ", error);
        }
    },

    delete: async (idCongregation: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + Congregation.delete;
        try {
            const payLoad = {
                idCongregation
            }
            const response = await HttpPostData(url, payLoad);
            return response;
        } catch (error) {
            console.log("Lỗi khi xoá Congregation: ", error);
        }
    },

    getById: async (idCongregation: string): Promise<any> => {
        const url = Config.server + Congregation.getById + `?idCongregation=${idCongregation}`;
        try {
            const response = await HttpGetData(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy Congregation By Id: ", error);
        }
    },

    getAll: async (): Promise<any> => {
        const url = Config.server + Congregation.getAll;
        try {
            const response = await HttpGetData(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy Congregation: ", error);

        }
    },
}