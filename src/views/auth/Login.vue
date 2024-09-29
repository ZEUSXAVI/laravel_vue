<template>
    <h1>Login</h1>

    <PRE>{{ usuario }}</PRE>

    <form @submit.prevent="ingresar()">

        <label for="email">Email</label>
        <input type="text" id="email" name="email" v-model="usuario.email">
        {{ errors.email }}
        <br>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" v-model="usuario.password">
        {{ errors.password }}
        <br>
        <button type="submit">INGRESAR</button>
    </form>

</template>

<script setup>

import axios from "axios";
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import authService from "../../services/auth.service";

const router = useRouter();

const usuario = ref({});

const errors = ref({email: "",
password: ""}); // estamos creando un json vacio


async function ingresar() {

    try {
        console.log("Ingresando");
        console.log(usuario.value);

        //const { data } = await axios.post("http://127.0.0.1:8000/api/v1/auth/login", usuario.value)
        //console.log(data);

        const { data } = await authService.login(usuario.value);
        localStorage.setItem("access_token", data.access_token);

        router.push({ name: "admin-usuario" });
        console.log(data);
    } catch (error) {
        //console.log(error.response.data);
        console.log(error);
        
        if (error.response.data.errors) {
            errors.value = error.response.data.errors
        } else {
            alert("Credenciales incorrectas");    
        }
    }
}

</script>