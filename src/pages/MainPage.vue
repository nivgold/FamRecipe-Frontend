<template>
  <div v-if="can_load" class="container">
    <h1 class="title text-center">Home</h1>
    <b-row>
      <b-col class="mb-5" lg="6">
        <transition name="fade">
          <RecipePreviewList  :recipes=randomRecipes title="Explore These Recipes" class="center"/>
        </transition>
        <b-button v-if="randomRecipes.length!=0" style="margin-left: 35%" class="w-25" variant="primary" @click="getRandomRecipres()">More</b-button>
      </b-col>
      <b-col lg="6">
        <RecipePreviewList v-if="this.$root.store.username" title="Last Watched Recipes" :recipes=lastWatchedRecipes class="center"></RecipePreviewList>
        <LoginPage v-else style="min-width: 500px; max-width: 500px"></LoginPage>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreview/RecipePreviewList";
import LoginPage from "./LoginPage"
export default {
  data() {
    return {
      randomRecipes: [],
      lastWatchedRecipes: [],
      can_load: false
    }
  },
  async mounted () {
    if(this.$root.store.username){
      try{
        await Promise.all([this.getRandomRecipres(), this.getLastWatchedRecipes()]);
      } catch(error){
        this.$root.store.logout();
      }
    }
    else {
      await this.getRandomRecipres();
    }

    this.can_load = true;
  },
  components: {
    RecipePreviewList,
    LoginPage
  },
  methods: {
    async getRandomRecipres() {
      // const response = await this.axios.get(
      //   "http://localhost:5001/recipes/random/number/3"
      // );

      // const random_recipes = response.data;

      const response = await this.axios.get(
        "https://famrecipe-backend.herokuapp.com/recipes/random/number/3"
      );

      const random_recipes = response.data;

      

      this.randomRecipes = [];       

      if (!this.$root.store.username){
        // the user is authenticated
        this.randomRecipes.push(...random_recipes);
      }
      else{
        // it is a guest

        let random_recipes_ids = random_recipes.map((x) => {
          return x.id;
        });
        const random_recipes_user_info_response = await this.axios.get(
          `http://localhost:5001/users/recipesInfo/${JSON.stringify(random_recipes_ids).replace(/ /g,'')}`,
          {withCredentials: true}
        );
        let random_recipes_user_info = random_recipes_user_info_response.data;
        random_recipes.map((x) => {
          const id = x.id;
          this.randomRecipes.push(Object.assign({}, x, {watched: random_recipes_user_info[id].watched}, {favorite: random_recipes_user_info[id].favorite}));
        });
      }
        
    },
    async getLastWatchedRecipes() {
      // Last Watched Recipes
      const last_reviewed_response = await this.axios.get(
        "http://localhost:5001/users/lastWatchedRecipes",
        {withCredentials: true}
      );

      this.lastWatchedRecipes = [];

      if(last_reviewed_response.status!=204){
        const last_reviewed_recipes = last_reviewed_response.data.slice(0,3);
        let last_reviewed_recipes_ids = last_reviewed_recipes.map((x) => {
          return parseInt(Object.keys(x)[0]);
        });

        const last_reviewed_user_info_response = await this.axios.get(
          `http://localhost:5001/users/recipesInfo/${JSON.stringify(last_reviewed_recipes_ids).replace(/ /g,'')}`,
          {withCredentials: true}
        );
        let last_reviewed_user_info = last_reviewed_user_info_response.data;

        last_reviewed_recipes.map((x) => {
          const id = parseInt(Object.keys(x)[0]);
          this.lastWatchedRecipes.push(Object.assign({}, {id: id}, x[id], {watched: last_reviewed_user_info[id].watched}, {favorite: last_reviewed_user_info[id].favorite}));
        });
      }
    }
  }
};
</script>

<style scoped>

html, body {
    margin: 0;
    height: 100%;
}

.container {
  min-width: 90%;
}

</style>
