import { genderEnum } from "@/enums/gender.enum";

export interface CatholicDTO {
    id: string,
    fullName: string,
    gender: genderEnum,
    dateOfBirth: Date,
    placeOfBirth: string,
    feastDay: string,
    position?: number,
    bookNumber?: string,
    churchId?: string,
    church?: "",
    saintId?: string,
    saintName?: "",
    ethnicMinorityId?: string,
    ethnicMinorityName?: string,
}