import axios from 'axios'
import {handleResponse, handleError} from './apiUtils'
import {Platform} from "react-native";

const config={
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
    }
}
export async function getItems() {
    return await axios
        .get(`http://192.168.0.12:8091/get-items`)
        .then(handleResponse)
        .catch(handleError);
};

export async function addItem(photo,body) {
    //console.log(photo);
    let formData=createFormData(photo,body);
    return await
        axios.post('http://192.168.0.12:8091/api/upload', formData,config)
        // fetch(`http://192.168.0.12:8091/api/upload`, {
        //     method: 'POST',
        //     headers: {'Content-Type':'multipart/form-data',Accept: 'application/json'},
        //     body: formData,
        //     mode:'cors'
        // })
        .then((resp) => {
            console.log('response')
            return resp;
        })
        .catch(error => {
            throw error;
        });
}
const  createFormData = (photo, body) => {
    const data = new FormData();
    data.append("image", {
        name: photo.fileName,
        type: photo.type,
        // uri: photo.uri.replace("content://","file://")
        uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });

    Object.keys(body).forEach(key => {
        data.append(key, body[key]);
    });

    return data;
};
export async function deleteItem(id) {
    return await axios
        .delete(`http://192.168.0.12:8091/delete-item/?id=` + id)
        .then(handleResponse)
        .catch(handleError);
}

