import React, { Component } from "react";
import { connect } from "react-redux";
import ItemMonAn from "./ItemMonAn";

class DanhSachMonAn extends Component {
  render() {
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Hình ảnh</th>
            <th>Mô tả</th>
            <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {this.props.danhSach?.map((monAn,) => {
              return <ItemMonAn monAn={monAn} key={monAn.id} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    danhSach: state.danhSachMonAn,
  };
};
export default connect(mapStateToProps)(DanhSachMonAn);
