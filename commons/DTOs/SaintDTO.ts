import { genderEnum } from "../../enums/genderEnum";

export interface SaintDTO {
    id?: string,
    name: string,
    avatar?: string,
    description?: string,
    gender: genderEnum,
    position: number,
}

// "id": "57772ac2-3de7-43c6-bec7-bdf6a6f26e29",
//         "name": "Peter",
//         "avatar": null,
//         "description": null,
//         "gender": null,
//         "position": 1