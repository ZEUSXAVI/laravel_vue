import { Api } from "./ApiService";

export default {

    // CRUD para la gesion de usuarios

    index: () => {
        return Api().get('/usuario');
    },

    store: (data) => {  
        return Api().post('/usuario', data);
    },
    show: (id) => {
        return Api().get(`/usuario/${id}`);
    },


    update: (id, data) => {
        return Api().put(`/usuario/${id}`, data);
    },

    destroy: (id) => {
        return Api().delete(`/usuario/${id}`); 
    },

    

}