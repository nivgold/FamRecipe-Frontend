<template>
  <b-overlay :show="overlay_show">
    <div class="container">
      <h1 class="mb-5 text-center title">Search a Recipe</h1>
      <b-row align-h="center">
        <SearchForm @search-pressed="handlerSubmit"></SearchForm>
      </b-row>


      <div style="min-width: 100%; max-width: 100%; width: 100%;" class="container results" v-if="search_pressed">
        <div v-if="recipes.length!=0">
          <h1 class="mt-5 text-center">Results</h1>
          <SearchResults
            :recipes="recipes"
          ></SearchResults>
        </div>
        <div v-else>
          <h1 class="mt-5 text-center">No Results Found.</h1>
        </div>
      </div>

    </div>
  </b-overlay>
</template>

<script>
// import RecipePreviewList from "../components/RecipePreview/RecipePreviewList";
import SearchForm from "../components/Search/SearchForm";
import SearchResults from "../components/Search/SearchResults"
export default {
  data() {
    return {
      recipes: [],
      search_pressed: false,
      overlay_show: false,
    };
  },
  components: {
    SearchForm,
    SearchResults
    // RecipePreviewList
  },
  methods: {
    async handlerSubmit(query, selected_number, selected_cuisines, selected_diets, selected_intolerances) {
      try {
        // save the query in the last searched query
        this.$root.store.last_search = query;

        let query_paramas = {
          text: query,
          quantity: selected_number,
        };

        if (selected_cuisines.length!=0) query_paramas.cuisine = selected_cuisines.join(",");

        if (selected_diets.length!=0) query_paramas.diet = selected_diets.join(",");

        if (selected_intolerances.length!=0) query_paramas.intolerance = selected_intolerances.join(",");

        this.search_pressed = false;
        this.overlay_show = true;
        const response = await this.axios.get(
          "http://localhost:5001/recipes/search",
          {
            params: query_paramas
          }
        );

        const recipes = response.data;

        this.recipes = [];

        let recipes_ids = recipes.map((x) => {
          const id = parseInt(Object.keys(x)[0]);
          return id;
        }); 



        if (this.$root.store.username){
          const recipes_user_info_response = await this.axios.get(
            `http://localhost:5001/users/recipesInfo/${JSON.stringify(recipes_ids).replace(/ /g,'')}`,
            {withCredentials: true}
          );

          let recipes_user_info = recipes_user_info_response.data;

          recipes.map((x) => {
            const id = parseInt(Object.keys(x)[0]);
            this.recipes.push(Object.assign({}, {id: id}, x[id], {watched: recipes_user_info[id].watched}, {favorite: recipes_user_info[id].favorite}))
          });
        }
        else {
          recipes.map((x) => {
            const id = parseInt(Object.keys(x)[0]);
            recipes_ids.push(id);
            this.recipes.push(Object.assign({}, {id: id}, x[id]));
          });
        }
        
      } catch (error) {
        console.log(error);
      }
      this.search_pressed = true;
      this.overlay_show = false;
    }
  }
};
</script>

<style lang="scss" scoped>

.container {
  min-width: 50%;
  min-height: 500px
}

.results{
  background-color: transparent;
}

</style>

