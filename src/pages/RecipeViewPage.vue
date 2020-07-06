<template>
  <div v-if="recipe">
    <b-container>
      <b-row align-h="center">
        <recipe-view-overview style="min-width: 100%; max-width: 100%"
          :recipe_id="parseInt(this.$route.params.recipeId)"
          :recipe="recipe">
        </recipe-view-overview>
      </b-row>
      <b-row align-h="center">
        <recipe-view-preparation style="min-width: 100%; max-width: 100%"
          :ingredients="recipe.ingredients"
          :instructions="recipe.instructions">
        </recipe-view-preparation>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import RecipeViewOverview from "../components/RecipePage/RecipeViewOverview"
import RecipeViewPreparation from "../components/RecipePage/RecipeViewPreparation"
export default {
  components: {
    "recipe-view-overview": RecipeViewOverview,
    "recipe-view-preparation": RecipeViewPreparation
  },
  data() {
    return {
      recipe: undefined
    };
  },
  mounted() {
    const route_name = this.$route.name;
    if(route_name=='recipe'){
      this.spooncularRecipe();
    }
    else{
      this.personalRecipe();
    }
  },
  methods: {
    async spooncularRecipe () {
      try {
        let response;

        try {
          response = await this.axios.get(`http://localhost:5001/recipes/recipeID/${this.$route.params.recipeId}`);

          if (response.status !== 200) this.$router.replace("/NotFound");
        } catch (error) {
          console.log("error.response.status", error.response.status);
          this.$router.replace("/NotFound");
          return;
        }

        if (this.$root.store.username){
          // calling recipe info if the user authenticated
          const recipe_info_response = await this.axios.get(
            `http://localhost:5001/users/recipesInfo/[${this.$route.params.recipeId}]`,
            {withCredentials: true}
          )

          let recipe_info = recipe_info_response.data;
          const id = Object.keys(recipe_info)[0];

          this.recipe = Object.assign({}, response.data, recipe_info[id]);

          // add the recipe to the watched user's recipes
          const add_watched_recipes_respond = await this.axios.post(
            "http://localhost:5001/users/addWatchedRecipe",
            {
              recipeID: this.$route.params.recipeId
            },
            {withCredentials: true}
          );
        }
        else{
          this.recipe = response.data;
        }
        
      } catch (error) {
        console.log(error);
      }
    },
    async personalRecipe () {
      try{
        let response;
        try{
            response = await this.axios.get(
              `http://localhost:5001/users/personalRecipe/recipeID/${this.$route.params.recipeId}`,
              {withCredentials: true}
            );

            if (response.status!=200) this.$router.replace("/NotFound");
        } catch(error){
          console.log(error);
          this.$router.replace("/NotFound");
          return;
        }

        this.recipe = response.data;
        this.recipe.personal = true;
        
      } catch(error){
        cnosole.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.container {
  margin-top: 0;
}

</style>
