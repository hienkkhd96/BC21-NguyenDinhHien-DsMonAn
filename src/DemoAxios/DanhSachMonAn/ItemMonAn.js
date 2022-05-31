import { message } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { capNhatDanhSachMonAnAction } from "../redux_monAn/action/monAn.action";
import { CHINH_SUA_MON_AN } from "../redux_monAn/constant/monAn.constant";
import { monAnServ } from "../service/monAn.service";

class ItemMonAn extends Component {
  handleXoaMonAn = (id) => {
    this.props.id = id;
    monAnServ
      .xoaMonAn(id)
      .then((res) => {
        return monAnServ.layDanhSach();
      })
      .then((res) => {
        this.props.capNhatDanhSachMonAn(res.data);
        message.success("Xoá món ăn thành công");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSuaMonAn = (id) => {
    monAnServ
      .layThongtinMonAn(id)
      .then((res) => {
        this.props.capNhatFoodEdit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let { id, name, price, img, description } = this.props.monAn;
    return (
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{price}</td>
        <td>{img}</td>
        <td>{description}</td>

        <td className="d-flex">
          <button
            onClick={() => {
              this.handleSuaMonAn(id);
            }}
            className="btn btn-warning mr-2"
          >
            Sửa
          </button>
          <button
            onClick={() => {
              this.handleXoaMonAn(id);
            }}
            className="btn btn-danger"
          >
            Xoá
          </button>
        </td>
      </tr>
    );
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    capNhatDanhSachMonAn: (danhSach) => {
      dispatch(capNhatDanhSachMonAnAction(danhSach));
    },

    capNhatFoodEdit: (monAn) => {
      dispatch({
        type: CHINH_SUA_MON_AN,
        payload: monAn,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(ItemMonAn);
