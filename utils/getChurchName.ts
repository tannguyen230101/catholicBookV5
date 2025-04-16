import { ChurchDTO } from "@/commons/DTOs/ChurchDTO";
import { ChurchControllerAPI } from "@/services/APIController/ChurchController";

export async function getChurchName(idChurch: string): Promise<string | null> {
    try {
        // Gọi API để lấy thông tin chi tiết của nhà thờ
        const churchDetails: ChurchDTO = await ChurchControllerAPI.getById(idChurch);

        if (churchDetails && churchDetails.name) {
            return churchDetails.name;
        } else {
            console.warn(`Không tìm thấy tên cho nhà thờ có ID: ${idChurch}`);
            return null;
        }
    } catch (error) {
        console.log(`Lỗi khi lấy tên nhà thờ: ${error}`);
        return null;
    }
};