import { churchLevelEnum } from "../../enums/churchLevelEnum";

export interface ChurchDTO {
    id: string,
    address?: string,
    description?: string,
    establishedOn?: string,
    name: string,
    level: churchLevelEnum,
    patronName: string,
    // thuộc giáo xứ nào
    parishId: string,
    position: number,
    representative?: string,
    parishName?: string 
}

// "id": "1457c983-2155-4602-9b76-da1ab9899024",
//     "address": "Quận 2",
//     "description": "updating",
//     "establishedOn": "1974-01-30",
//     "name": "Nhà thờ Bắc Hà",
//     "parishId": "08705099-fd23-4bf7-9770-6ae7a81aa71a",
//     "position": 1,
//     "representative": "Thanh PHong",
//     "level": 1,
//     "parishName": "ddd", 
//     "patronName": "ggggg",