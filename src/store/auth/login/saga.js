import { call, put, takeEvery } from "redux-saga/effects";
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { apiError, loginSuccess } from "./actions";
import { adminLogin, logout } from "../../../api/apiBackend";
import { setAuthToken, setAuthUser } from "../../../helpers/authHelper";

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(adminLogin, {
      email: user.email,
      password: user.password,
    });

    if (response.status === "fail") {
      throw new Error(response.message);
    }

    setAuthToken(response.token);
    setAuthUser(response.data);

    yield put(loginSuccess(response));

    history("/dashboard");
  } catch (error) {
    yield put(apiError(error.message));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    logout();
    history("/login");
  } catch (error) {
    yield put(apiError(error.message));
  }
}

export function* loginSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default loginSaga;
