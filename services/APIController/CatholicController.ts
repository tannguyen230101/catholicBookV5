// import { Catholic, Config } from "../../constants/config";
import { HttpPostWithoutToken } from "../HttpNoToken";
import { CatholicDTO } from "../../commons/DTOs/CatholicDTO";
import { Catholic, Config } from "../../constants/config";
import { HttpGetData, HttpPostData } from "../HttpWithToken";
import { checkNetwork } from "@/hooks/NetworkManager";

export const CatholicController = {
    create: async (dtoCatholic: CatholicDTO): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + Catholic.create;
        try {
            const response = await HttpPostData(url, dtoCatholic);

            if (!response) console.log("Không nhận được phản hồi từ server");

            console.debug("--- Catholic Data Response: ", response);
            return response;
        } catch (error) {
            console.log("-- Lỗi Khi Tạo Catholic: ", error);
        }
    },

    update: async (dtoCatholic: CatholicDTO): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + Catholic.update;
        try {
            const response = await HttpPostWithoutToken(url, dtoCatholic);

            if (!response) console.log("Không nhận được phản hồi từ server");

            console.debug("--- Catholic Data Response: ", response);
            return response;
        } catch (error) {
            console.log("-- Lỗi Khi Cập Nhật Catholic: ", error);
            // throw error; // Ném lỗi để phía gọi API xử lý
        }
    },

    getById: async (idCatholic: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + Catholic.getById + `?idCatholic=${idCatholic}`;
        try {
            const response = await HttpGetData(url);
            console.log("response", response);
            return response;
        } catch (error) {
            console.log("Lỗi khi tải Catholic By Id:", error);
        }
    },

    getByBookId: async (idCatholicBook: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + Catholic.getByBookId + `?idCatholicBook=${idCatholicBook}`;
        try {
            const response = await HttpGetData(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi tải Catholics By BookId: ", error);
        }
    },

    delete: async (idCatholic: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + Catholic.delete + `?idCatholic=${idCatholic}`;
        try {
            const objDelete = {
                idCatholic
            };
            let response = await HttpPostWithoutToken(url, objDelete);
            console.log("-- Đã cập nhật Is deleted: ", response);
            return response;
        } catch (error) {
            console.log("Lỗi khi xoá Catholic:", error);
        }
    },
};