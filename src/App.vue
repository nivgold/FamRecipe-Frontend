<template>
  <div id="app">
    <b-navbar id="navbar-all" toggleable="lg" type="dark" variant="success">
      <b-navbar-brand>FamRecipe </b-navbar-brand>
      <b-navbar-nav class="links">
        <b-nav-item class="ml-5" :to="{ name: 'main'}" :active="this.$route.name=='main'">Home</b-nav-item>
        <b-nav-item class="ml-5" :to="{ name: 'search' }" :active="this.$route.name=='search'">Search</b-nav-item>
        <b-nav-item class="ml-5" :to="{ name: 'about' }" :active="this.$route.name=='about'">About</b-nav-item>
        <b-nav-item-dropdown class="ml-5" v-if="$root.store.username" right>
          <template v-slot:button-content>
            <b-avatar size="sm" :src="$root.store.image"></b-avatar>
          </template>
          <b-dropdown-item>
            <b-nav-item :to="{ name: 'profile'}"><span class="text-dark"><b-icon-person-circle></b-icon-person-circle> Profile</span></b-nav-item>
          </b-dropdown-item>
          <b-dropdown-item>
            <b-nav-item @click="Logout"><span class="text-dark"><b-icon-power></b-icon-power> Logout</span></b-nav-item>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav v-if="!this.$root.store.username" class="ml-auto">
        <b-nav-text style="margin-right: 50px">
          Hello Guest!
        </b-nav-text>
        <b-nav-item class="ml-5 mr-3" :to="{ name: 'register' }">Register</b-nav-item>
        <b-nav-item class="ml-5" :to="{ name: 'login' }">Login</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-else class="ml-auto">
        <b-nav-item-dropdown text="Personal" right>
          <b-dropdown-item>
            <b-nav-item :to="{ name: 'favoriteRecipes' }"><span class="text-dark"><b-icon-star-fill></b-icon-star-fill> Favorite Recipes</span></b-nav-item>
          </b-dropdown-item>
          <b-dropdown-item>
            <b-nav-item :to="{ name: 'familyRecipes' }"><span class="text-dark"><b-icon-people-fill></b-icon-people-fill> Family Recipes</span></b-nav-item>
          </b-dropdown-item>
          <b-dropdown-item>
            <b-nav-item :to="{ name: 'personalRecipes' }"><span class="text-dark"><b-icon-person-fill></b-icon-person-fill> Personal Recipes</span></b-nav-item>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <transition name="page" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    async Logout() {
      await this.$root.store.logout();
      this.$root.toast("Logout", "Logged Out", "success");

      this.$router.replace("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Prata&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Galada&display=swap');

html, body {
    margin: 0;
    height: 100%;
}

#app{
  background-image: url("assets/bg-view-2.jpg");
  background-repeat: repeat-y;
  background-size: auto;
  background-position: top;
  margin: 0;
  min-height: 100%;
  height: auto;
}

.title {
  font-family: 'Prata', serif;
  font-size: 100px;
}

.container {
  margin-top: 2%;
  background-color: rgba($color: #ffffff, $alpha: 0.8);
  min-width: 50%;
  border-radius: 25px;
}

#navbar-all {
  height: 85px;
}

.navbar .navbar-brand {
  font-family: 'Galada', cursive;
  padding: 0px;
  padding-top: 10px;
  margin-bottom: 0;
  border: 0 0 0 0;
  font-size: 60px;
}

.navbar-nav{
  margin-top: 5px;
  font-size: 30px;
}

.navbar .navbar-nav .nav-item:hover {
  padding: 0;
  background-color: rgba($color: #ffffff, $alpha: 0.1);
  border-radius: 25px;
}

.links{
  margin-left: 2%;
  // font-weight: bold;
}

.page-enter-active, .page-leave-active {
  transition: opacity 0.1s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
