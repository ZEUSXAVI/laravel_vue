<script setup>

</script>


<template>
  <h1>Bienvenido</h1>

  <!--PARA QUE SEA REACTIVO Y NO RECARGUE LA PAGINA-->
  <router-link to="/">INICIO</router-link> |
  <router-link to="/servicios">SERVICIOS</router-link> |
  <router-link to="/login">LOGIN</router-link> 

  <!-- PARA MOSTRAR LAS RUTAS-->
  <router-view></router-view>
</template>

<style scoped>

</style>
