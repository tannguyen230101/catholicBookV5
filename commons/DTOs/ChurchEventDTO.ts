export interface ChurchEventDTO {
    id: string,
    position: number,
    dateOfEvent?: string,
    isDeleted: boolean,
    churchId?: string,
    eventTypeId?: string,
    eventType: string,
}

// "church": "Nhà thờ Đức Bà", 
// "churchId": "1457c983-2155-4602-9b76-da1ab9899024", 
// "dateOfEvent": "2023-01-01T00:00:00", 
// "eventType": "Lễ Hôn Phối", 
// "eventTypeId": "57772ac2-3de7-43c6-bec7-bdf6a6f26e29", 
// "id": "93d32f32-4e4a-42d7-a759-b790c3dc376c", 
// "isDeleted": false, 
// "position": 1