import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/index';
import {connect} from 'react-redux';

class ProductActionPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            chkbStatus: false
        }
    }

    componentDidMount(){
        var {match} = this.props;
        if(match){
            var id = match.params.id;
            this.props.getProductRequest(id);
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.itemEditing){
            var {itemEditing} = nextProps;
            this.setState({
                id: itemEditing.id,
                txtName: itemEditing.name,
                txtPrice: itemEditing.price,
                chkbStatus: itemEditing.status
            });
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    }

    onSave = (e) => {
        e.preventDefault();
        var {id, txtName, txtPrice, chkbStatus} = this.state;
        var {history} = this.props;
        var product = {
            id: id,
            name: txtName,
            price: txtPrice,
            status: chkbStatus
        }
        if(id){
            this.props.updateProductRequest(product);
        }else{
            this.props.addProductRequest(product);
        }
        history.goBack();
    }

    render() {
        var {txtName, txtPrice, chkbStatus} = this.state;
        return (
            <div className="product-action-page">
                <form onSubmit={this.onSave}>
                    <div className="form-group">
                        <label>Tên sản phẩm: </label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="txtName"
                            value={txtName}
                            onChange={this.onChange}    
                        />
                    </div>
                    <div className="form-group">
                        <label>Giá</label>
                        <input 
                            type="number" 
                            className="form-control"
                            name="txtPrice"
                            value={txtPrice}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái: </label>
                        
                        <div className="checkbox">
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="chkbStatus"
                                    value={chkbStatus}
                                    onChange={this.onChange}
                                    checked={chkbStatus}
                                />
                                Còn hàng
                            </label>
                        </div>
                        
                    </div>
                    <Link to="/product-list" className="btn btn-danger">
                        Trở lại    
                    </Link>&nbsp;
                    <button type="submit" className="btn btn-primary">Lưu lại</button>
                </form>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        addProductRequest: (product) => {
            dispatch(actions.addProductRequest(product));
        },
        getProductRequest: (id) => {
            dispatch(actions.getProductRequest(id));
        },
        updateProductRequest: (product) => {
            dispatch(actions.updateProductRequest(product));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);
