import { Church, Config } from "../../constants/config";
import { CatholicDTO } from "../../commons/DTOs/CatholicDTO";
import { checkNetwork } from "@/hooks/NetworkManager";
import { HttpGetData, HttpPostData } from "../HttpWithToken";

let churchListCache: any = null; // Lưu cache danh sách nhà thờ
let churchListPromise: Promise<any> | null = null;

export const ChurchControllerAPI = {
    create: async (dtoCatholic: CatholicDTO): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + Church.create;
        try {
            const response = await HttpPostData(url, dtoCatholic);

            if (!response) console.log("Không nhận được phản hồi từ server");

            console.debug("--- Catholic Data Response: ", response);
            return response;
        } catch (error) {
            console.log("-- Lỗi Khi Tạo Church: ", error);
            // throw error; // Ném lỗi để phía gọi API xử lý
        }
    },

    update: async (dtoCatholic: CatholicDTO): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + Church.update;
        try {
            const response = await HttpPostData(url, dtoCatholic);

            if (!response) console.log("Không nhận được phản hồi từ server");

            console.debug("--- Catholic Data Response: ", response);
            return response;
        } catch (error) {
            console.log("-- Lỗi Khi Cập Nhật Church: ", error);
            // throw error; // Ném lỗi để phía gọi API xử lý
        }
    },

    getById: async (idChurch: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + Church.getById + `?idChurch=${idChurch}`;

        try {
            const response = await HttpGetData(url);

            return response;
        } catch (error) {
            console.log("Lỗi khi tải Church by Id:", error);
            throw error;
        }
    },

    getChurchList: async (forceRefresh: boolean = false): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + Church.getChurchList;

        // Nếu đã có cache và không yêu cầu làm mới, trả về cache ngay lập tức
        if (!forceRefresh && churchListCache) {
            console.log("Dữ liệu nhà thờ lấy từ cache.");
            return Promise.resolve(churchListCache);
        }

        // Nếu API đang được gọi và chưa hoàn thành, đợi kết quả từ Promise đã có
        if (!forceRefresh && churchListPromise) {
            console.log("⏳ Đang tải danh sách nhà thờ, vui lòng chờ...");
            return churchListPromise;
        }
        try {
            console.log("Gọi API để lấy danh sách nhà thờ...");
            churchListPromise = HttpGetData(url);

            const response = await churchListPromise;

            // Lưu cache sau khi lấy dữ liệu thành công
            churchListCache = response;
            churchListPromise = null;
            return response;
        } catch (error) {
            console.log("Lỗi khi tải Church:", error);
            churchListPromise = null; // Xóa Promise nếu request lỗi để thử lại sau
        }
    },

    delete: async (idChurch: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + Church.delete + `?idChurch=${idChurch}`;
        try {
            const objDelete = {
                idChurch
            };
            let response = await HttpPostData(url, objDelete);
            console.log("-- Đã cập nhật Is deleted: ", response);
            return response;
        } catch (error) {
            console.log("Lỗi khi xoá Church:", error);
        }
    },

    clearCache: () => {
        console.log("🗑️ Xóa cache danh sách nhà thờ.");
        churchListCache = null;
        churchListPromise = null;
    },
};