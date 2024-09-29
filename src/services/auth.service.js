import { Api } from "./ApiService";

export default {
    login: (data) => {
        return Api().post('/v1/auth/login', data);
    },
    register: (data) => {
        return Api().post('/v1/auth/register', data);
    },
    logout: () => {
        return Api().post('/v1/auth/logout');
    },
    perfil: () => {
        return Api().get('/v1/auth/profile');
    }
}