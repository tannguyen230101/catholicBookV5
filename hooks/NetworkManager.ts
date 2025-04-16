// networkManager.ts
import NetInfo, { NetInfoState, NetInfoSubscription } from '@react-native-community/netinfo';

// Định nghĩa interface cho callback
type NetworkCallback = (isConnected: boolean) => void;

// Singleton class để quản lý network state
class NetworkManager {
  private static instance: NetworkManager;
  private isConnected: boolean = false;
  private subscribers: NetworkCallback[] = [];
  private unsubscribe: NetInfoSubscription | null = null;

  private constructor() {
    // Khởi tạo lắng nghe trạng thái mạng
    this.initializeNetworkListener();
  }

  // Lấy instance duy nhất
  public static getInstance(): NetworkManager {
    if (!NetworkManager.instance) {
      NetworkManager.instance = new NetworkManager();
    }
    return NetworkManager.instance;
  }

  // Khởi tạo listener
  private initializeNetworkListener() {
    // Lấy trạng thái ban đầu
    NetInfo.fetch().then((state: NetInfoState) => {
      this.isConnected = state.isConnected ?? false;
      this.notifySubscribers();
    });

    // Lắng nghe thay đổi trạng thái mạng
    this.unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      this.isConnected = state.isConnected ?? false;
      this.notifySubscribers();
    });
  }

  // Thông báo cho các subscriber
  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.isConnected));
  }

  // Đăng ký theo dõi trạng thái mạng
  public subscribe(callback: NetworkCallback): () => void {
    this.subscribers.push(callback);
    // Gọi callback ngay lập tức với trạng thái hiện tại
    callback(this.isConnected);

    // Trả về hàm unsubscribe
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  // Kiểm tra trạng thái mạng hiện tại
  public isNetworkConnected(): boolean {
    return this.isConnected;
  }

  // Hủy listener khi không cần nữa (tuỳ chọn)
  public cleanup() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
    this.subscribers = [];
  }
}

// Tạo global instance
const networkManager = NetworkManager.getInstance();

// Export các hàm global
export const subscribeToNetwork = (callback: NetworkCallback) => networkManager.subscribe(callback);
export const checkNetwork = () => networkManager.isNetworkConnected();
export const cleanupNetwork = () => networkManager.cleanup();