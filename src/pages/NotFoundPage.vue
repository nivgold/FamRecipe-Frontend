<template>
  <div class="container">
    <h1 style="font-size: 100px" class="title text-center">404 - Not Found</h1>
    <h4 class="text-center">ooops...</h4>
    <b-row class="mt-5" align-h="center">
      <img src="../assets/404_Image.png">
    </b-row>
    <b-row class="mt-5" align-h="center">
      <router-link :to="{ name: 'main'}" tag="button" exact>Go Back Home</router-link>
    </b-row>
  </div>
</template>


<style scoped>

.container {
  background-color: white;
  border-radius: 25px;
}

</style>