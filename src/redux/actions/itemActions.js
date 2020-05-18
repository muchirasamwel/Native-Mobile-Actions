import * as type from "../constants/action-types"
import * as itemApi from "../../api/dataApi";

// export function addItem(payload) {
//     return { type: type.ADD_ITEM, payload }
// };
export function loadItemsSuccess(items) {
    return {type: type.FETCH_ITEMS, items}
};

export function fetchItems() {
    return function (dispatch) {
        return itemApi.getItems().then(items => {
            dispatch(loadItemsSuccess(items));
        })
            // .catch(error => {
            //     alert(error.message);
            // });
    }
}

export function addItem(photo,body) {
    return function (dispatch) {
        return itemApi.addItem(photo,body).then((resp) => {
            alert('response' + resp)
            // let item=resp.item;
            //  dispatch({ type: type.ADD_ITEM, item });
        }).catch(error => {
            throw error;
        });
    }
}

export function deleteItem(id) {
    return function (dispatch) {
        return itemApi.deleteItem(id).then(response => {
            dispatch({type: type.DELETE_ITEM, id});
        }).catch(error => {
            //throw error;
        });
    }
}

