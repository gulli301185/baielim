import { IAdministrator, ILoginRequest, IUserState } from '@/shared/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IUserState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{
        token: ILoginRequest;
        userInfo: IAdministrator;
      }>
    ) => {
      const { token, userInfo } = action.payload;

      state.token = token;
      state.user = userInfo;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state) => {
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  selectors: {
    userToken: (state): ILoginRequest | null => state.token,
    userInfo: (state): IAdministrator | null => state.user,
    authLoading: (state): boolean => state.loading,
  },
});

export const { loginFailure, loginStart, loginSuccess, logOut, setToken } =
  userSlice.actions;
export const { userInfo, authLoading, userToken } = userSlice.selectors;
export default userSlice.reducer;
