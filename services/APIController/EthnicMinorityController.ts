// 10. EthnicMinority
// Task<StatusCode> Create(EthnicMinorityDTO dtoEthnicMinority)
// Task<StatusCode> Update(EthnicMinorityDTO dtoEthnicMinority)
// Task<StatusCode> Delete(Guid idEthnicMinority)
// Task<EthnicMinorityDTO?> GetById(Guid idEthnicMinority)
// Task<EthnicMinorityDTO[]> GetAll()

import { EthnicMinorityDTO } from "../../commons/DTOs/EthnicMinorityDTO";
import { Config, EthnicMinority } from "../../constants/config";
import { HttpGetDataWithoutToken, HttpPostWithoutToken } from "../HttpNoToken";

export const EthnicMinorityController = {
    create: async (dtoEthnicMinority: EthnicMinorityDTO) : Promise<any> => {
        const url = Config.server + EthnicMinority.create;
        try {
            const response = await HttpPostWithoutToken(url, dtoEthnicMinority);
            return response;
        } catch (error) {
            console.log("Lỗi khi tạo EthnicMinority: ", error);
        }
    },

    update: async (dtoEthnicMinority: EthnicMinorityDTO) : Promise<any> => {
        const url = Config.server + EthnicMinority.update;
        try {
            const response = await HttpPostWithoutToken(url, dtoEthnicMinority);
            return response;
        } catch (error) {
            console.log("Lỗi khi cập nhật EthnicMinority: ", error);
        }
    },

    delete: async (idEthnicMinority: string) : Promise<any> => {
        const url = Config.server + EthnicMinority.delete;
        try {
            const payLoad = {
                idEthnicMinority
            }
            const response = await HttpPostWithoutToken(url, payLoad);
            return response;
        } catch (error) {
            console.log("Lỗi khi xoá EthnicMinority: ", error);
        }
    },

    getById: async (idEthnicMinority: string) : Promise<any> => {
        const url = Config.server + EthnicMinority.getById + `?idEthnicMinority=${idEthnicMinority}`;
        try {
            const response = await HttpGetDataWithoutToken(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy EthnicMinority By Id: ", error);
        }
    },

    getAll: async () : Promise<any> => {
        const url = Config.server + EthnicMinority.getAll;
        try {
            const response = await HttpGetDataWithoutToken(url);
            return response;
        } catch (error) {
            console.log("Lỗi khi lấy EthnicMinority: ", error);
            
        }
    },
}