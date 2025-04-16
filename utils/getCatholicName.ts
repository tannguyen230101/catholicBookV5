import { CatholicController } from "@/services/APIController/CatholicController";

export const getCatholicName = async (catholicId: string): Promise<string | null> => {
    let name;
    const catholicData = await CatholicController.getById(catholicId);

    if (catholicData && catholicData.fullName) {
        name = catholicData.fullName;
    }

    return name;
}