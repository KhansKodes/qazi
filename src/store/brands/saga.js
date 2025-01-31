import { call, put, takeEvery } from "redux-saga/effects";
import {
  GET_BRANDS,
  CREATE_BRAND,
  UPDATE_BRAND,
  DELETE_BRAND,
} from "./actionTypes";
import {
  getBrandsSuccess,
  getBrandsFail,
  createBrandSuccess,
  createBrandFail,
  updateBrandSuccess,
  updateBrandFail,
  deleteBrandSuccess,
  deleteBrandFail,
} from "./actions";
import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../../api/apiBackend";

function* fetchBrands() {
  try {
    const response = yield call(getBrands);
    yield put(getBrandsSuccess(response));
  } catch (error) {
    yield put(getBrandsFail(error));
  }
}

function* onCreateBrand({ payload: { data, history } }) {
  try {
    const response = yield call(createBrand, data);
    yield put(createBrandSuccess(response));
    history("/brands");
  } catch (error) {
    yield put(createBrandFail(error));
  }
}

function* onUpdateBrand({ payload: { id, data, history } }) {
  try {
    const response = yield call(updateBrand, id, data);
    yield put(updateBrandSuccess(response));
    history("/brands");
  } catch (error) {
    yield put(updateBrandFail(error));
  }
}

function* onDeleteBrand({ payload: { id, history } }) {
  try {
    yield call(deleteBrand, id);
    yield put(deleteBrandSuccess(id));
    history("/brands");
  } catch (error) {
    yield put(deleteBrandFail(error));
  }
}

function* brandsSaga() {
  yield takeEvery(GET_BRANDS, fetchBrands);
  yield takeEvery(CREATE_BRAND, onCreateBrand);
  yield takeEvery(UPDATE_BRAND, onUpdateBrand);
  yield takeEvery(DELETE_BRAND, onDeleteBrand);
}

export default brandsSaga;
