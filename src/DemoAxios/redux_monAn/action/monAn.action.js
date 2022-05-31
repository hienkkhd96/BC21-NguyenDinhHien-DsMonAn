import { CAP_NHAT_DANH_SACH } from "../constant/monAn.constant";

export const capNhatDanhSachMonAnAction = (value) => {
  return {
    type: CAP_NHAT_DANH_SACH,
    payload: value,
  };
};
