import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authApi, type IVerify2FALoginOtp, type IVerifyEnableDisableTwoFactor, type loginPayload} from "@/api/auth.ts";
import {storage} from "@/lib/storage.ts";
import {getAxiosErrorMessage} from "@/lib/api.error.ts";

export interface IRole {
    id: string
    name: string
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUser {
    id: string
    email: string
    fullName: string
    phone: string
    status?: string;
    profile_image: string
    avatarName: string
    twoFactorEnabled?: boolean;
    twoFactorSecret?: boolean;
    password?: string
    roles?: IRole;
    userType?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type AsyncStatus = 'idle' | 'pending' | 'succeeded' | 'failed'
export type USER_TYPE = "CUSTOMER" | "SELLER" | "PLATFORM_ADMIN" | "DELIVERY_AGENT"

export interface AuthState {
    user: IUser,
    accessToken: string | null,
    refreshToken: string | null,
    userType: USER_TYPE,
    status: AsyncStatus,
    error: string | null,
    isLoading?: boolean,

    twoFactorToken: string | null,
    requiresTwoFactor: boolean
}

const initialState: AuthState= {
    user: null,
    accessToken: storage.getAccessToken(),
    refreshToken: storage.getRefreshToken(),
    userType: 'PLATFORM_ADMIN',
    status: "idle",
    error: null,
    isLoading: false,
    twoFactorToken: null,
    requiresTwoFactor: false,
}

export const fetchLogin = createAsyncThunk('auth/login',
    async (payload: loginPayload, { rejectWithValue }) => {
        try {
            const tokens = await authApi.login(payload);
            storage.setToken(tokens.accessToken, tokens.refreshToken)

            return tokens
        } catch (error) {
            return rejectWithValue(getAxiosErrorMessage(error, "Could not sign in"))
        }
    }
)

export const fetchMe = createAsyncThunk('auth/me',
    async (_, { rejectWithValue }) => {
        try {
            return await authApi.me()
        } catch (error) {
            return rejectWithValue(getAxiosErrorMessage(error, "Could not fetch"))
        }
    }
)

export const logoutUser = createAsyncThunk('auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const data = await authApi.logout();
            return data
        } catch (error) {
            return rejectWithValue(getAxiosErrorMessage(error, "Failed to fetch"))
        }
    }
)

export const updateCurrentUser = createAsyncThunk('auth/updateCurrentUser',
    async (payload: Partial<IUser>, { rejectWithValue }) => {
        try {
            const data = await authApi.updateCurrentUser(payload);
            return data
        } catch (error) {
            return rejectWithValue(getAxiosErrorMessage(error, "Failed to update"))
        }
    }
)

export const changePassword = createAsyncThunk('auth/changePassword',
    async (payload: Partial<IUser>, { rejectWithValue }) => {
        try {
            const data = await authApi.changePassword(payload);
            return data
        } catch (error) {
            return rejectWithValue(getAxiosErrorMessage(error, "Failed to update"))
        }
    }
)

export const twoFactorGenerateOtp = createAsyncThunk('auth/twoFactorGenerateOtp',
    async (_, { rejectWithValue }) => {
        try {
            const data = await authApi.twoFactorGenerateOtp()
            return data
        } catch (error) {
            return rejectWithValue(getAxiosErrorMessage(error, "Failed to generate otp"))
        }
    }
)

export const verifyEnableDisableTwoFactor = createAsyncThunk('auth/verify-enableDisableTwoFactor',
    async (payload: IVerifyEnableDisableTwoFactor, { rejectWithValue }) => {
        try {
            const data = await authApi.verifyEnableDisableTwoFactor(payload)
            return data
        } catch (error) {
            return rejectWithValue(getAxiosErrorMessage(error, "Failed to enable or disable two factor"))
        }
    }
)

export const verify2FALoginOtp = createAsyncThunk('auth/Verify2FALoginOtp',
    async (payload: IVerify2FALoginOtp, { rejectWithValue }) => {
        try {
            const tokens = await authApi.verify2FALoginOtp(payload);
            storage.setToken(tokens.accessToken, tokens.refreshToken)
            return tokens
        } catch (error) {
            return rejectWithValue(getAxiosErrorMessage(error, "Could not sign in"))
        }
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuthError(state) {
            state.error = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.status = 'pending'
                state.error = null;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.accessToken = action?.payload?.accessToken
                state.refreshToken = action?.payload?.refreshToken
                state.userType = action?.payload?.userType

                state.requiresTwoFactor = action?.payload?.requiresTwoFactor
                state.twoFactorToken = action?.payload?.twoFactorToken
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action?.payload as string
                state.accessToken = null;
                state.refreshToken = null;
                state.userType = 'PLATFORM_ADMIN'
            })

        /* Current User Details */
            .addCase(fetchMe.pending, (state) => {
                state.status = 'pending'
                state.user = null
            })
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.user = {
                    ...action.payload,
                    avatarName: `${action.payload?.fullName?.split(' ')?.[0]?.[0] ?? ""}${action.payload?.fullName?.split(' ')?.[1]?.[0] ?? ""}`
                }

            })
            .addCase(fetchMe.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload as string
                state.user = null
            })

            /* Logout User */
            .addCase(logoutUser.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.status = 'idle'
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.error = null;

                storage.clear()

            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = null
            })

            /* Enable and Disable Two Factor Update */
            .addCase(verifyEnableDisableTwoFactor.pending, (state) => {
                state.isLoading = true
            })
            .addCase(verifyEnableDisableTwoFactor.fulfilled, (state, action) => {
                state.isLoading = false
                const user = (action?.payload as any)?.data
                state.user = {
                    ...state.user,
                    twoFactorEnabled: user?.twoFactorEnabled
                }
            })
            .addCase(verifyEnableDisableTwoFactor.rejected, (state) => {
                state.isLoading = false
            })

            /* Update Current User Details */
            .addCase(updateCurrentUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false
                const user = (action?.payload as any)?.data
                state.user = {
                    ...state.user,
                    fullName: user?.fullName,
                    email: user?.email,
                    phone: user?.phone,
                    avatarName: `${user?.fullName?.split(' ')?.[0]?.[0] ?? ""}${user?.fullName?.split(' ')?.[1]?.[0] ?? ""}`
                }

            })
            .addCase(updateCurrentUser.rejected, (state) => {
                state.isLoading = false
            })

            /* 2FA OTP Login Verify */
            .addCase(verify2FALoginOtp.pending, (state) => {
                state.status = 'pending'
                state.error = null;
            })
            .addCase(verify2FALoginOtp.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.accessToken = action?.payload?.accessToken
                state.refreshToken = action?.payload?.refreshToken
                state.userType = action?.payload?.userType

                state.requiresTwoFactor = action?.payload?.requiresTwoFactor
                state.twoFactorToken = action?.payload?.twoFactorToken
            })
            .addCase(verify2FALoginOtp.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action?.payload as string
                state.accessToken = null;
                state.refreshToken = null;
                state.userType = 'PLATFORM_ADMIN'
            })

    }
})

export default authSlice.reducer


