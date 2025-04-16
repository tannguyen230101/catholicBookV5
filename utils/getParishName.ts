import { ParishDTO } from "@/commons/DTOs/ParishDTO";
import { ParishController } from "@/services/APIController/ParishController";

export async function getParishName(idParish: string): Promise<string | null> {
    try {
      // Gọi API để lấy thông tin chi tiết của nhà thờ
      const parishDetail: ParishDTO = await ParishController.getById(idParish);
  
      // Kiểm tra xem địa chỉ có tồn tại không
      if (parishDetail && parishDetail.name) {
        return parishDetail.name;
      } else {
        console.warn(`Không tìm thấy địa chỉ cho nhà thờ có ID: ${idParish}`);
        return null;
      }
    } catch (error) {
      console.error(`Lỗi khi lấy địa chỉ nhà thờ: ${error}`);
      return null;
    }
  }