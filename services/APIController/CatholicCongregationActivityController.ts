// 14. CatholicCongregationActivity
// Task<StatusCode> Create(CatholicCongregationActivityDTO dtoCatholicCongregationActivity)
// Task<StatusCode> Update(CatholicCongregationActivityDTO dtoCatholicCongregationActivity)
// Task<StatusCode> Delete(Guid idCatholicCongregationActivity)
// Task<CatholicCongregationActivityDTO?> GetById(Guid idCatholicCongregationActivity)
// Task<CatholicCongregationActivityDTO[]> GetAll()
// Task<CatholicCongregationActivityDTO[]> GetByCatholicId(Guid idCatholic) : Lấy danh sách hoạt động mà 1 người tham gia

import { CatholicCongregationActivityDTO } from "../../commons/DTOs/CatholicCongregationActivityDTO";
import { HttpGetDataWithoutToken, HttpPostWithoutToken } from "../HttpNoToken";
import { CatholicCongregationActivity, Config } from "../../constants/config";
import { checkNetwork } from "@/hooks/NetworkManager";
import { HttpGetData, HttpPostData } from "../HttpWithToken";

export const CatholicCongregationActivityController = {
    create: async (dtoCatholicCongregationActivity: CatholicCongregationActivityDTO): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CatholicCongregationActivity.create;
        try {
            const response = await HttpPostData(url, dtoCatholicCongregationActivity);
            return response;
        } catch (error) {
            console.log("Lỗi khi tạo CatholicCongregationActivity: ", error);
        }
    },

    update: async (dtoCatholicCongregationActivity: CatholicCongregationActivityDTO): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CatholicCongregationActivity.update;
        try {
            const response = await HttpPostWithoutToken(url, dtoCatholicCongregationActivity);
            return response;
        } catch (error) {
            console.log("Lỗi khi cập nhật CatholicCongregationActivity: ", error);
        }
    },

    delete: async (idCatholicCongregationActivity: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CatholicCongregationActivity.delete;
        try {
            const payLoad = {
                idCatholicCongregationActivity
            }
            const response = await HttpPostWithoutToken(url, payLoad);
            return response;
        } catch (error) {
            console.log("Lỗi khi xoá CatholicCongregationActivity: ", error);
        }
    },

    getById: async (idCatholicCongregationActivity: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CatholicCongregationActivity.getById + `?idCatholicCongregationActivity=${idCatholicCongregationActivity}`;
        try {
            const response = await HttpGetDataWithoutToken(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy CatholicCongregationActivity By Id: ", error);
        }
    },

    getAll: async (): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CatholicCongregationActivity.getAll;
        try {
            const response = await HttpGetData(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy CatholicCongregationActivity: ", error);

        }
    },

    getByCatholicId: async (idCatholic: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CatholicCongregationActivity.getByCatholicId + `?idCatholic=${idCatholic}`;
        try {
            const response = await HttpGetData(url);
            return response;
        } catch (error) {
            console.log("Lỗi Khi lấy CatholicCongregationActivity by idCatholic: ", error);
        }
    }
}