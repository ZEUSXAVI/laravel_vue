<template>
    <h1>usuario admin</h1>
    {{ user }}
    <div>

        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" v-model="user.name">
        {{ errors.name }}
        <br>
        <label for="correo">Correo</label>
        <input type="text" id="correo" name="correo" v-model="user.email">
        {{ errors.email }}
        <br>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" v-model="user.password">
        {{ errors.password }}
        <br>
        <button @click="createUser()">{{user.id ? 'Actualizar' : 'Crear'}}</button>

        <button @click="cancelar()">Cancelar</button>

    </div>

    <div>
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                        <button @click="editUser(user)">Editar</button>
                        <button @click="deleteUser(user)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script setup>

import { onMounted, ref } from 'vue';
import authService from "../../services/auth.service";

import usuario from '../../services/usuario.service';
import Swal from 'sweetalert2'

const user = ref({ name: "", email: "", password: "" });

const users = ref([]);

const errors = ref({});

onMounted(() => {
    obtenerUsuarios();
});

async function obtenerUsuarios() {
    const { data } = await usuario.index()
    console.log(data);

    users.value = data;

}

async function createUser() {
    try {
        if (user.value.id) {
            await usuario.update(user.value.id, user.value)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Actualizado con exito",
                showConfirmButton: false,
                timer: 1500
            });
        } else {

            await usuario.store(user.value)
            obtenerUsuarios();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Creado con exito",
                showConfirmButton: false,
                timer: 1500
            });
        }
    } catch (error) {
        if (error.response.data.errors) {
            errors.value = error.response.data.errors
        } else {
            alert("Algo salio mal");
        }
    }

}

async function editUser(usuario) {
    console.log(usuario);
    user.value = usuario;

}

async function deleteUser(user) {
    console.log(user);

    if (confirm("¿Desea eliminar este usuario?")) {
        await usuario.destroy(user.id);
        obtenerUsuarios();
    }

}

function cancelar() {
    user.value = { name: "", email: "", password: "" };
}
</script>