import { create } from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDTO } from "../DTOs/UserDTO";
import { HttpPostWithoutToken } from "@/services/HttpNoToken";
import { Config } from "@/constants/config";
import { LoginDTO } from "../DTOs/LoginDTO";
import { Constants } from "@/constants/appConstant";

export const AssessorUserProfile = create((set: any) => ({
    user: null,
    id: Constants.emptyGuid,
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    idBook: "",
    avatar: null,
    displayName: null,

    register: async (dtoUser: UserDTO) => {
        set({ isLoading: true });
        try {
            const url = Config.server + "Authentication/Register";

            const response = await HttpPostWithoutToken(url, dtoUser);
            console.log("res: ", response);
    
            // Validate response and store idReturn
            if (response && response.code === 1 && response.idReturn) {
                set({ user: dtoUser, id: response.idReturn });
    
                // Ensure idReturn is valid before saving to AsyncStorage
                if (response.idReturn) {
                    await AsyncStorage.setItem("id", response.idReturn);
                }
    
                return { success: true };
            } else {
                return { success: false, error: response?.message || "Đăng ký không thành công" };
            }
        } catch (error) {
            console.log("Registration Error:", error);
            return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" };
        } finally {
            set({ isLoading: false });
        }
    },

    confirmEmail: async (dtoUser: UserDTO) => {
        set({ isLoading: true });
        try {
            const url = Config.server + "Authentication/ConfirmEmail";
    
            const response = await HttpPostWithoutToken(url, dtoUser);
            console.log("Confirm Email Response:", response);
    
            // Validate response
            if (response && response.code === 1) {
                set({ user: dtoUser });
                return { success: true };
            } else {
                return { success: false, error: response?.message || "Email confirmation failed" };
            }
        } catch (error) {
            console.log("Confirm Email Error:", error);
            return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" };
        } finally {
            set({ isLoading: false });
        }
    },

    setIdBook: (idBook: string) => {
        set({ idBook })
    },

    setUserId: (id: string) => {
        set({ id })
    },

    login: async (dtoLogin: LoginDTO) => {
        set({ isLoading: true });
        try {
            const url = Config.server + "Authentication/Login";

            const response = await HttpPostWithoutToken(url, dtoLogin);
            console.log("Register respone: ", response);

            if (!response || !response.accessToken) {
                return { success: false, error: response?.displayName || "Invalid login response" };
            }

            await AsyncStorage.setItem("accessToken", response.accessToken);
            await AsyncStorage.setItem("user", JSON.stringify(response));
            await AsyncStorage.setItem("id", response.id);
            if (response.id && response.id !== "") {
                console.log("User ID:", response.id);
                set({ user: response, accessToken: response.accessToken, id: response.id });
            } else {
                set({ user: response, accessToken: response.accessToken });
            }
            return { success: true };
        } catch (error: any) {
            console.log("Login Error:", error);
            return { success: false, error: error };
        } finally {
            set({ isLoading: false });
        }
    },

    checkAuth: async () => {
        try {
            const accessToken = await AsyncStorage.getItem("accessToken");
            const userJson = await AsyncStorage.getItem("user");
            // Parse user data if it exists
            const user = userJson ? JSON.parse(userJson) : null;
            // Validate accessToken and user before setting state
            if (accessToken && user) {
                set({ accessToken, user });
            } else {
                // Clear state if no valid data is found
                set({ accessToken: null, user: null });
            }
        } catch (error) {
            console.log("Check Auth Error:", error);
        }
    },

    logout: async () => {
        try {
            await AsyncStorage.removeItem("accessToken");
            await AsyncStorage.removeItem("user");
            // Clear state after successful removal
            set({ accessToken: null, user: null });
        } catch (error) {
            console.log("Logout Error:", error);
        }
    },
}));