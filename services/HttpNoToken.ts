import { TextNote } from "../constants/statusCode";
import { ResponeStatusEnum } from "@/enums/statusCode.enum";

/**  
 * Fetch data from the provided URL without authentication token
 * @param {string} url - The API endpoint to fetch data from.
 * @param {number} [timeout=15000] - Optional timeout in millisecond (default is 15,000ms).
 * @return {Promise<any>} - A promise that resolve with the fetched data or rejects with an error.
**/
export const HttpGetDataWithoutToken = async (url: string, timeout: number = 10000): Promise<any> => {
    console.log("📌 Fetching URL:", url);

    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => {
        controller.abort();
    }, timeout);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            signal,
        });

        clearTimeout(timeoutId);

        return new Promise((resolve, reject) => {
            processRequestResponse(response, resolve, reject);
        });
    } catch (error: any) {
        // Đảm bảo timeout không chạy tiếp
        clearTimeout(timeoutId);

        if (error.name === "AbortError") {
            console.log("❌ Request timeout:", error);
            return Promise.reject({ code: ResponeStatusEnum.timeOut, message: TextNote.timeOut });
        } else {
            console.log("❌ Lỗi khi gọi API:", error);
            return Promise.reject(error);
        }
    }
};

interface PostParams {
    [key: string]: any;
};

/**
 * Send a POST request without authentication token.
 * @param {string} url - The API endpoint to send data to.
 * @param {PostParams} objParameter - The data payload to be sent in the request body.
 * @returns {Promise<any>} - A promise that resolves with the server response or rejects with an error.
 */
export const HttpPostWithoutToken = (url: string, objParameter: PostParams): Promise<any> => {
    return new Promise((resolve, reject) => {
        console.log('0. HttpPostWithoutToken Parameter: ', objParameter);

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objParameter),
        };

        fetch(url, requestOptions)
            .then(async (response: Response) => {
                await processRequestResponse(response, resolve, reject);
                console.log('1. HttpPostWithoutToken Request response: ', response.ok);
            })
            .catch((error: Error) => {
                console.log('2. HttpPostWithoutToken Request Error: ', error);
                reject(error);
            });
    });
};

/**
 * Process and handle API responses.
 * @param {Response} response - The HTTP response object.
 * @param {(value: any) => void} resolve - Callback function to handle successful responses.
 * @param {(reason: any) => void} reject - Callback function to handle errors.
 * @returns {Promise<void>} - A promise that processes the response.
 */
const processRequestResponse = async (
    response: Response,
    resolve: (value: any) => void,
    reject: (reason: any) => void
): Promise<void> => {
    // console.log('📥 ProcessResponse Begin', response);
    console.log('📥 ProcessResponse Begin');

    try {
        const responseText = await response.text(); // Đọc toàn bộ phản hồi dưới dạng text
        // console.log("📌 Raw Response:", responseText);

        // Kiểm tra nếu response OK
        if (response.ok) {
            const jsonResponse = JSON.parse(responseText);
            // console.log('✅ ProcessResponse OK', jsonResponse);
            console.log('✅ ProcessResponse OK');
            resolve(jsonResponse);
            return;
        }

        // Nếu HTTP status là 400 (Bad Request), log nội dung chi tiết hơn
        if (response.status === 400) {
            console.warn('⚠️ ProcessResponse 400 - Bad Request');
            try {
                const errorData = JSON.parse(responseText);
                reject(errorData);
            } catch (parseError) {
                reject({ message: "Lỗi khi phân tích phản hồi 400", raw: parseError });
            }
            return;
        }

        // Xử lý lỗi từ 401 đến 500+
        console.log(`❌ HTTP Error ${response.status}`, responseText);
        reject({
            status: response.status,
            message: `Lỗi từ server: ${response.status}`,
            raw: responseText
        });
    } catch (error) {
        console.log("❌ Lỗi khi xử lý phản hồi từ server:", error);
        reject({ message: "Lỗi xử lý phản hồi", rawError: error });
    }
};

