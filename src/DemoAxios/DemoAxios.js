import React, { Component } from "react";
import { connect } from "react-redux";
import DanhSachMonAn from "./DanhSachMonAn/DanhSachMonAn";
import FormMonAn from "./FormMonAn/FormMonAn";
import { capNhatDanhSachMonAnAction } from "./redux_monAn/action/monAn.action";
import { monAnServ } from "./service/monAn.service";

class DemoAxios extends Component {
  componentDidMount() {
    monAnServ
      .layDanhSach()
      .then((res) => {
        this.props.capNhatDanhSachMonAn(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="">
        <FormMonAn />
        <DanhSachMonAn />
      </div>
    );
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    capNhatDanhSachMonAn: (danhSach) => {
      dispatch(capNhatDanhSachMonAnAction(danhSach));
    },
  };
};
export default connect(null, mapDispatchToProps)(DemoAxios);
