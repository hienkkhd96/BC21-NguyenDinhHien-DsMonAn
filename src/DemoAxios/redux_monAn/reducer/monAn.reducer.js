import { cloneDeep } from "../../utils";
import {
  CAP_NHAT_DANH_SACH,
  CHINH_SUA_MON_AN
} from "../constant/monAn.constant";

let initialState = {
  danhSachMonAn: [],

  foodEdit: null,
};

export const monAnReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAP_NHAT_DANH_SACH: {
      state.danhSachMonAn = action.payload;
      return { ...state };
    }
    case CHINH_SUA_MON_AN: {
      state.foodEdit = cloneDeep(action.payload);

      return { ...state };
    }
    default:
      return state;
  }
};
