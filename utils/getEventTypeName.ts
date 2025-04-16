import { EventTypeDTO } from "@/commons/DTOs/EventTypeDTO";
import { EventTypeController } from "@/services/APIController/EventTypeController";

export async function getEventTypeName(idEventType: string): Promise<string | undefined> {
    try {
        // Gọi API để lấy thông tin chi tiết của nhà thờ
        const eventTypeData: EventTypeDTO = await EventTypeController.getById(idEventType);

        // Kiểm tra xem địa chỉ có tồn tại không
        if (eventTypeData && eventTypeData.name) {
            return eventTypeData.name;
        } else {
            console.warn(`Không tìm thấy EventTypeName by: ${idEventType}`);
        }
    } catch (error) {
        console.log(`Lỗi khi lấy EventTypeName: ${error}`);
    }
}