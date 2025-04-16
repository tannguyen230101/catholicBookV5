export const formatDateToDDMMYYYY = (date: Date | string | null | undefined): string => {
    if (!date) {
        throw new Error("Invalid date: date is null or undefined");
    }

    // Chuyển đổi thành đối tượng Date nếu đầu vào là chuỗi
    const parsedDate = date instanceof Date ? date : new Date(date);

    if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date: unable to parse date");
    }

    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const year = parsedDate.getFullYear();

    return `${day}-${month}-${year}`;
};