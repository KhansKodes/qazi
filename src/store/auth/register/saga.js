import { takeEvery, fork, put, all, call } from "redux-saga/effects";

//Account Redux states
import { REGISTER_USER } from "./actionTypes";
import { registerUserSuccessful, registerUserFailed } from "./actions";

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  try {
    // if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
    //   const response = yield call(
    //     fireBaseBackend.registerUser,
    //     user.email,
    //     user.password
    //   );
    //   yield put(registerUserSuccessful(response));
    // } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
    //   const response = yield call(postJwtRegister, "/post-jwt-register", user);
    //   yield put(registerUserSuccessful(response));
    // } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
    //   const response = yield call(postFakeRegister, user);
    //   yield put(registerUserSuccessful(response));
    // }
  } catch (error) {
    console.log("There was an error registering: ", error);
    yield put(registerUserFailed(error));
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser);
}

function* accountSaga() {
  yield all([fork(watchUserRegister)]);
}

export default accountSaga;
