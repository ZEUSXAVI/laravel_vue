// Para la navegación entre rutas
import { createRouter, createWebHistory } from "vue-router";

//importamos las vistas rutas

import Inicio from "../views/web/Inicio.vue";
import Login from "../views/auth/Login.vue";
import Servicios from "../views/web/Servicio.vue";

import Perfil from "../views/admin/Perfil.vue";

import Usuario from "../views/admin/Usuario.vue";

import NotFound from "../views/errors/NotFound.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "inicio",
            component: Inicio,
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                redirectIfAuth: true
            }
        },

        {
            path: "/servicios",
            name: "servicios",
            component: Servicios,
        },
        {
            path: "/admin/perfil",
            name: "admin-perfil",
            component:  Perfil,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/admin/usuario",
            name: "admin-usuario",
            component: Usuario,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/:pathMatch(.*)*",
            component: NotFound
        }
    ],
});

// MIDDLEWARDS
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem("access_token");
    if (to.meta.requiresAuth) {
        if (!token) {
            return next({name: "login"});
        }
        return next();
    }

    if(to.meta.redirectIfAuth && token) {
        return next({name: "admin-usuario"});
    }

    return next();
});

export default router;