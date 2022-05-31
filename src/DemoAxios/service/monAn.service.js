import axios from "axios";
import { BASE_URL } from "../configURL";

export let monAnServ = {
  layDanhSach: () => {
    return axios({
      url: BASE_URL,
      method: "GET",
    });
  },
  themMonAn: (monAn) => {
    return axios({
      url: BASE_URL,
      method: "POST",
      data: monAn,
    });
  },

  xoaMonAn: (idMonAn) => {
    return axios({
      url: `${BASE_URL}/${idMonAn}`,
      method: "DELETE",
    });
  },
  suaMonAn: (idMonAn,monAn) => {
    return axios({
      url: `${BASE_URL}/${idMonAn}`,
      method: "PUT",
      data:monAn
    });
  },
  layThongtinMonAn: (idMonAn) => {
    return axios({
      url: `${BASE_URL}/${idMonAn}`,
      method: "GET",
    });
  },
};
