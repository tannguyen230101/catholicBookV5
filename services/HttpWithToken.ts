import { TextNote } from "@/constants/statusCode";
import { ResponeStatusEnum, StatusCodeEnum } from "@/enums/statusCode.enum";
import { AssessorUserProfile } from "@/commons/zustand/useAuthStore";
import { checkNetwork } from "@/hooks/NetworkManager";

export const HttpGetData = (url: string) => {
  const { accessToken } = AssessorUserProfile.getState();

  return new Promise((resolve, reject) => {
    // checkNetworkConnection().then(isConnected => {
    if (!checkNetwork()) {
      reject({ code: StatusCodeEnum.noNetwork, message: TextNote.noNetWork });
      return;
    }

    if (!accessToken) {
      reject({ code: ResponeStatusEnum.unAuthenticated, message: TextNote.noToken });
      return;
    }

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(async response => {
        await processRequestResponse(response, resolve, reject);
      })
      .catch(error => {
        console.log('HttpGetData Request Error:', error);
        reject({ code: StatusCodeEnum.timeOut, message: TextNote.timeOut });
      });
  });
  // });
};
/**
 * Gửi dữ liệu lên (kèm Token)
 * @param url đường dẫn url
 * @param data object dữ liệu chưa được chuyển chuỗi json
 */

interface PostParams {
  [key: string]: any;
};

export const HttpPostData = (url: string, data: PostParams) => {
  const { accessToken } = AssessorUserProfile.getState();

  return new Promise((resolve, reject) => {
    // Kiểm tra mạng trước
    // const isConnected = checkNetworkConnection();
    if (!checkNetwork()) {
      throw {
        code: StatusCodeEnum.noNetwork,
        message: TextNote.noNetWork
      };
    }
    //??? === Nếu chưa có Token hoặc Token không hợp lệ phải lấy lại Token mới đúng ===???//
    if (!accessToken) {
      reject({ code: ResponeStatusEnum.unAuthenticated, message: TextNote.unauthenticated });
    } else {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${accessToken}`);

      var jsonData = JSON.stringify(data);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: jsonData,
        // redirect: 'follow',
      };

      fetch(url, requestOptions)
        .then(async response => {
          await processRequestResponse(response, resolve, reject);
        })
        .catch(error => {
          console.log('Post Request Error: ');
          //TODO: Phải xử lý thêm kết quả trả về ngay tại đây ===//
          reject(error);
        });
    }
  });
};

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
    if (!responseText) {
      console.warn("⚠️ Empty response body");
      reject({ code: response.status, message: "Empty response body" });
      return;
    }
    // Kiểm tra nếu response OK
    if (response.ok) {
      const jsonResponse = JSON.parse(responseText);
      console.log('✅ ProcessResponse OK', jsonResponse);
      // console.log('✅ ProcessResponse OK');
      resolve(jsonResponse);
      return;
    }

    switch (response.status) {
      case ResponeStatusEnum.badRequest:
        console.log('HttpGetDataWithoutToken Bad Request');
        reject({ code: ResponeStatusEnum.badRequest, message: 'BadRequest' });
        break;
      case ResponeStatusEnum.unAuthenticated:
        console.log('HttpGetDataWithoutToken Da co thiet bi khac dang nhap');
        reject({ code: ResponeStatusEnum.unAuthenticated, message: 'UnAuthenticated' });
        break;
      //=== Không có Token thì không cần Expired nha ===//
      case ResponeStatusEnum.expired:
        console.log('HttpGetDataWithoutToken Hết thời hạn sử dụng. Hãy gia hạn thêm thời gian!');
        reject({ code: ResponeStatusEnum.expired, message: 'ExpiredAccount' });
        break;
      case ResponeStatusEnum.timeOut:
        reject({ code: ResponeStatusEnum.timeOut, message: 'RequestTimeOut' });
        break;
      default:
        break;
    }

    // // Xử lý lỗi từ 401 đến 500+
    // console.error(`❌ HTTP Error ${response.status}`, responseText);
    // reject({
    //   status: response.status,
    //   message: `Lỗi từ server: ${response.status}`,
    //   raw: responseText
    // });
  } catch (error) {
    console.log("❌ Lỗi khi xử lý phản hồi từ server:", error);
    reject({ message: "Lỗi xử lý phản hồi", rawError: error });
  }
};