import * as Types from '../constants/ActionTypes';

var initialState = [];

var findIndex = (products, id) => {
    for(var i=0; i < products.length; i++){
        if(products[i].id === id) return i;
    }
    return -1;
}

const products = (state = initialState, action) => {
    var index = -1;
    var {id, product} = action;
    switch(action.type){
        case Types.FETCH_PRODUCTS:
            state = action.products;
            return [...state];
        case Types.DELETE_PRODUCT:
            index = findIndex(state, id);
            state.splice(index, 1);
            return [...state];
        case Types.ADD_PRODUCT:
            state.push(action.product);
            return [...state];
        case Types.UPDATE_PRODUCT:
            index = findIndex(state, product.id);
            state[index] = product;
            return [...state];
        default: return [...state];
    }
}

export default products;
