import { message } from "antd";
import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { capNhatDanhSachMonAnAction } from "../redux_monAn/action/monAn.action";
import { monAnServ } from "../service/monAn.service";

class FormMonAn extends Component {
  state = {
    id:"",
    name: "",
    img: "",
    description: "",
    price: "",
  };

  constructor(props) {
    super(props);

    this.priceRef = createRef();

    this.formRef = createRef();
  }

  handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    this.priceRef.current.focus();
  }
  // sẽ được chạy khi được nhận props mới
  // static getDerivedStateFromProps(nextProps) {
  // }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.foodEdit) {
      this.setState({
        ...nextProps.foodEdit,
      });
    }
  }
  handleThemMon = () => {
    monAnServ
      .themMonAn(this.state)
      .then((res) => {
        return monAnServ.layDanhSach();
      })
      .then((res) => {
        this.props.capNhatDanhSachMonAn(res.data);
        message.success("Thêm món ăn thành công");
        this.formRef.current.reset();
      })
      .catch((err) => {
        message.error("Thêm món ăn thất bại");
      });
  };
  handleSuaMonAn = (e) => {
    e.preventDefault()
    let monAn = {
      name:this.props.foodEdit.name,
      price:this.props.foodEdit.price,
      img:this.props.foodEdit.img,
      description:this.props.foodEdit.description,
    }
    monAnServ
    .suaMonAn(this.props.foodEdit.id,monAn)
      .then((res) => {
        console.log(res);
        return monAnServ.layDanhSach();
      })
      .catch((err) => {
        message.error("Sửa món ăn thất bại");
      });
  }
  render() {
    return (
      <div className="container py-5 text-left">
        <form ref={this.formRef}>
          <div className="form-group">
            <label htmlFor="name">Tên món</label>
            <input
              value={this.state.name}
              type="text"
              className="form-control"
              name="name"
              id="name"
              aria-describedby="helpId"
              placeholder="Tên món ăn"
              onChange={(event) => {
                this.handleOnChange(event);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Giá món</label>
            <input
              value={this.state.price}
              ref={this.priceRef}
              type="text"
              className="form-control"
              name="price"
              id="price"
              aria-describedby="helpId"
              placeholder="Giá"
              onChange={(event) => {
                this.handleOnChange(event);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="img">Hình ảnh</label>
            <input
              type="text"
              value={this.state.img}
              className="form-control"
              name="img"
              id="img"
              aria-describedby="helpId"
              placeholder="Hình ảnh"
              onChange={(event) => {
                this.handleOnChange(event);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Mô tả</label>
            <input
              type="text"
              value={this.state.description}
              className="form-control"
              name="description"
              id="description"
              aria-describedby="helpId"
              placeholder="Mô tả"
              onChange={(event) => {
                this.handleOnChange(event);
              }}
            />
          </div>
          <button
            onClick={() => {
              let valuePrice = this.priceRef.current.value;
              console.log(valuePrice);
              this.handleThemMon();
            }}
            type="button"
            className="btn btn-warning"
          >
            Thêm món
          </button>

          <button className="btn btn-success" onClick={(e) => this.handleSuaMonAn(e)}>Cập nhật</button>
        </form>
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
let mapStateToProps = (state) => {
  return {
    foodEdit: state.foodEdit,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormMonAn);
