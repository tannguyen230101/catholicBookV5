// 12. CongregationActivity
// Task<StatusCode> Create(CongregationActivityDTO dtoCongregationActivity)
// Task<StatusCode> Update(CongregationActivityDTO dtoCongregationActivity)
// Task<StatusCode> Delete(Guid idCongregationActivity)
// Task<CongregationActivityDTO?> GetById(Guid idCongregationActivity)
// Task<CongregationActivityDTO[]> GetAll()
// Task<CongregationActivityDTO[]> GetByCongregationId(Guid idCongregation) : Lấy danh sách Hoạt động thuộc 1 Hội đoàn

import { Config, CongregationActivity } from "../../constants/config";
import { HttpGetDataWithoutToken, HttpPostWithoutToken } from "../HttpNoToken";
import { CongregationActivityDTO } from "../../commons/DTOs/CongregationActivityDTO ";
import { checkNetwork } from "@/hooks/NetworkManager";


export const CongregationActivityController = {
    create: async (dtoCongregationActivity: CongregationActivityDTO): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CongregationActivity.create;
        try {
            const response = await HttpPostWithoutToken(url, dtoCongregationActivity);
            return response;
        } catch (error) {
            console.log("Lỗi khi tạo CongregationActivity: ", error);
        }
    },

    update: async (dtoCongregationActivity: CongregationActivityDTO): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CongregationActivity.update;
        try {
            const response = await HttpPostWithoutToken(url, dtoCongregationActivity);
            return response;
        } catch (error) {
            console.log("Lỗi khi cập nhật CongregationActivity: ", error);
        }
    },

    delete: async (idCongregationActivity: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CongregationActivity.delete;
        try {
            const payLoad = {
                idCongregationActivity
            }
            const response = await HttpPostWithoutToken(url, payLoad);
            return response;
        } catch (error) {
            console.log("Lỗi khi xoá CongregationActivity: ", error);
        }
    },

    getById: async (idCongregationActivity: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CongregationActivity.getById + `?idCongregationActivity=${idCongregationActivity}`;
        try {
            const response = await HttpGetDataWithoutToken(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy CongregationActivity By Id: ", error);
        }
    },

    getAll: async (): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CongregationActivity.getAll;
        try {
            const response = await HttpGetDataWithoutToken(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy CongregationActivity: ", error);

        }
    },

    getByCongregationId: async (idCongregation: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CongregationActivity.getByCongregationId + `?idCongregation=${idCongregation}`;
        try {
            const response = await HttpGetDataWithoutToken(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy theo idCongregation: ", error);

        }
    },
}