import * as Types from '../constants/ActionTypes';
import callApi from '../utils/apiCaller';

export const fetchProductsRequest = () => {
    return (dispatch) => {
        return callApi('products', 'GET', null).then(res => {
            dispatch(fetchProducts(res.data));
        });
    };
}

export const fetchProducts = (products) => {
    return {
        type: Types.FETCH_PRODUCTS,
        products
    }
}

export const deleteProductRequest = (id) => {
    return (dispatch) => {
        return callApi(`products/${id}`, 'DELETE', null).then(res => {
            dispatch(deleteProduct(id));
        });
    }
}

export const deleteProduct = (id) => {
    return {
        type: Types.DELETE_PRODUCT,
        id
    }
}

export const addProductRequest = (product) => {
    return dispatch => {
        return callApi('products', 'POST', product).then(res => {
            dispatch(addProduct(res.data));
        });
    }
}

export const addProduct = (product) => {
    return {
        type: Types.ADD_PRODUCT,
        product
    }
}

export const getProductRequest = (id) => {
    return dispatch => {
        return callApi(`products/${id}`, 'GET', null).then(res => {
            dispatch(getProduct(res.data));
        });
    }
}

export const getProduct = (product) => {
    return {
        type: Types.EDIT_PRODUCT,
        product
    }
}

export const updateProductRequest = (product) => {
    return dispatch => {
        return callApi(`products/${product.id}`, 'PUT', product).then(res => {
            dispatch(updateProduct(res.data));
        });
    }
}

export const updateProduct = (product) => {
    return {
        type: Types.UPDATE_PRODUCT,
        product
    }
}
