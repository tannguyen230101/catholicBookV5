// 13. ChurchCongregationActivity
// Task<StatusCode> Create(ChurchCongregationActivityDTO dtoChurchCongregationActivity)
// Task<StatusCode> Update(ChurchCongregationActivityDTO dtoChurchCongregationActivity)
// Task<StatusCode> Delete(Guid idChurchCongregationActivity)
// Task<ChurchCongregationActivityDTO?> GetById(Guid idChurchCongregationActivity)
// Task<ChurchCongregationActivityDTO[]> GetAll()
// Task<ChurchCongregationActivityDTO[]> GetByChurchId(Guid idChurch) : Lấy danh sách hoạt động của 1 Nhà thờ

import { checkNetwork } from "@/hooks/NetworkManager";
import { ChurchCongregationActivityDTO } from "../../commons/DTOs/ChurchCongregationActivityDTO";
import { ChurchCongregationActivity, Config } from "../../constants/config";
import { HttpGetDataWithoutToken, HttpPostWithoutToken } from "../HttpNoToken";

export const ChurchCongregationActivityController = {

    create: async (dtoChurchCongregationActivity: ChurchCongregationActivityDTO): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + ChurchCongregationActivity.create;
        try {
            const response = await HttpPostWithoutToken(url, dtoChurchCongregationActivity);
            return response;
        } catch (error) {
            console.log("Lỗi Khi tạo ChurchCongregationActivity: ", error);
        }
    },

    update: async (dtoChurchCongregationActivity: ChurchCongregationActivityDTO): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + ChurchCongregationActivity.update;
        try {
            const response = await HttpPostWithoutToken(url, dtoChurchCongregationActivity);
            return response;
        } catch (error) {
            console.log("Lỗi Khi cập nhật ChurchCongregationActivity: ", error);
        }
    },

    delete: async (idChurchCongregationActivity: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + ChurchCongregationActivity.delete;
        try {
            const payLoad = {
                idChurchCongregationActivity
            }
            const response = await HttpPostWithoutToken(url, payLoad);
            return response;
        } catch (error) {
            console.log("Lỗi khi xoá ChurchCongregationActivity: ", error);
        }
    },

    getById: async (idChurchCongregationActivity: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + ChurchCongregationActivity.getById + `?idChurchCongregationActivity=${idChurchCongregationActivity}`;
        try {
            const response = await HttpGetDataWithoutToken(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy ChurchCongregationActivity By Id: ", error);
        }
    },

    getAll: async (): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + ChurchCongregationActivity.getAll;
        try {
            const response = await HttpGetDataWithoutToken(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy ChurchCongregationActivity: ", error);
        }
    },

    getByChurchId: async (idChurch: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + ChurchCongregationActivity.getByChurchId + `?idChurch=${idChurch}`;
        try {
            const response = await HttpGetDataWithoutToken(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy ChurchCongregationActivity By idChurch: ", error);
        }
    },
}
