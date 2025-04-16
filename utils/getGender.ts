import { genderData } from "@/data/gender.data";
import { genderEnum } from "@/enums/gender.enum";

export const getGenderNameById = (id: genderEnum) => {
    const gender = genderData.find((item) => item.id === id);
    return gender ? gender.name : "Không xác định";
};