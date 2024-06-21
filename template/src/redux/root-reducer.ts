import { combineReducers } from "redux";
import loginReducers from "./reducers/auth/login";
const rootReducers = combineReducers({
  login: loginReducers,
});
export type RootState = ReturnType<typeof rootReducers>;
export default rootReducers;
