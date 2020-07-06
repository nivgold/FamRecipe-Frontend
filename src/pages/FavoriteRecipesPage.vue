<template>
    <div v-if="can_load">
        <div v-if="favoriteRecipes.length!=0" class="container">
            <h1 class="title text-center">Your Favorite Recipes</h1>
            <RecipePreviewList 
            v-on:removed_from_favorites="remove_recipe_from_favorites"
            :recipes=favoriteRecipes
            title=""
            class="center"></RecipePreviewList>
        </div>
        <div v-else class="container">
            <h1 class="title text-center">You Have No Favorite Recipes! <br>...</h1> 
        </div>
    </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreview/RecipePreviewList"
export default {
    components: {
        RecipePreviewList
    },
    data() {
        return {
            favoriteRecipes: [],
            can_load: false
        }
    },
    async mounted () {
        await this.getPersonalRecipes();
        this.can_load = true;
    },
    methods: {
        remove_recipe_from_favorites (id) {
            for (var i=0; i< this.favoriteRecipes.length; i++){
                var current_favorite = this.favoriteRecipes[i];
                if (current_favorite.id==id){
                    this.favoriteRecipes.splice(i, 1);
                    break;
                }
            }
        },
        async getPersonalRecipes() {
            try {
                const response = await this.axios.get(
                    "http://localhost:5001/users/favoriteRecipes",
                    {withCredentials: true}
                );

                if (response.status==204){
                    // not content
                    return;
                }

                const recipes = response.data;


                this.favoriteRecipes = [];

                let recipes_id = recipes.map((x) => {
                    const id = parseInt(Object.keys(x)[0]);
                    return id;
                });

                // getting the user information
                const recipes_user_info_response = await this.axios.get(
                    `http://localhost:5001/users/recipesInfo/${JSON.stringify(recipes_id).replace(/ /g,'')}`,
                    {withCredentials: true}
                );
                let recipes_user_info = recipes_user_info_response.data;

                recipes.map((x) => {
                    const id = parseInt(Object.keys(x)[0]);
                    this.favoriteRecipes.push(Object.assign({}, {id: id}, x[id], {watched: recipes_user_info[id].watched}, {favorite: recipes_user_info[id].favorite}));
                });

            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
  min-width: 50%;
  min-height: 500px
}
</style>