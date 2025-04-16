// import { HttpGetDataWithoutToken, HttpPostWithoutToken } from '../HttpNoToken';
import { CatholicBook, Config } from '../../constants/config';
import { CatholicBookDTO } from '../../commons/DTOs/CatholicBookDTO';
import { HttpGetData, HttpPostData } from '../HttpWithToken';
import { checkNetwork } from '@/hooks/NetworkManager';

export const CatholicBookController = {
    create: async (dtoCatholicBook: CatholicBookDTO): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CatholicBook.create;
        try {
            const response = await HttpPostData(url, dtoCatholicBook);

            if (!response) console.log("Không nhận được phản hồi từ server");

            console.debug("---  Book Data Response: ", response);
            return response;
        } catch (error) {
            console.log("-- Lỗi Khi Tạo CatholicBook: ", error);
        }
    },

    getById: async (idCatholicBook: string): Promise<any> => {
        if (!checkNetwork()) {
            console.log('Không có kết nối mạng!');
            return;
        }
        const url = Config.server + CatholicBook.getById + `?idCatholicBook=${idCatholicBook}`;
        try {

            const response = await HttpGetData(url);

            return response;
        } catch (error) {
            console.log("Lỗi khi tải CatholicBook By Id:", error);
        }
    },
}
