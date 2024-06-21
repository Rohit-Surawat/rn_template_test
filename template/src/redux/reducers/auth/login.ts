import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface LoginUser {
  email: string;
  name: string;
}
interface LoginState {
  loginUser: LoginUser;
  isLoggedIn: boolean;
}

const initLoginState: LoginUser = {
  email: '',
  name: '',
};

const initialState: LoginState = {
    loginUser: initLoginState,
    isLoggedIn: false,
};



export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginUser>) => {
      state.loginUser = action.payload;
      state.isLoggedIn = true;
    },
    loginFail: state => {
      state.loginUser = initLoginState;
      state.isLoggedIn = false;
    },
    logoutUser: state => {
      state.isLoggedIn = false;
    }
  },
});

export const {
  loginSuccess,
  loginFail,
  logoutUser,
} = loginSlice.actions;

export const onLoginUser = (): any => async (dispatch: Function) => {
  try {

  } catch (e) { }
};

export const onUserLogout = (): any => async (dispatch: Function) => {
  dispatch(logoutUser());
};
export default loginSlice.reducer;
