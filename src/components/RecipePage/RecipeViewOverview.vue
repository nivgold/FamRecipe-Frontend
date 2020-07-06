<template>
  <b-card bg-variant="dark" text-variant="light" no-body class="overflow-hidden">
        <b-row no-gutters>
          <b-col md="6">
              <b-card-img :src="recipe.image"></b-card-img>
          </b-col>
            <b-col md="6">
                <b-card-body :title="recipe.title">
                    <b-card-text>
                        <div id="img-list2">
                            <b-row v-if="recipe.favorite||recipe.watched">
                                <b-col v-if="recipe.watched">
                                    <img src="../../assets/tap.png" alt=""> Already Watched
                                </b-col>
                                <b-col v-if="recipe.favorite">
                                    <img src="../../assets/star-fill.png"> Saved In Favorites
                                </b-col>
                            </b-row>
                            <b-row class="mt-4" v-if="recipe.vegetarian||recipe.vegan">
                                <b-col v-if="recipe.vegetarian">
                                    <img src="../../assets/broccoli.png" alt=""> Vegetarian
                                </b-col>
                                <b-col v-if="recipe.vegan">
                                    <img src="../../assets/vegan.png" alt=""> Vegan
                                </b-col>
                            </b-row>
                            <b-row class="mt-4">
                                <b-col>
                                    <img src="../../assets/servings.png" alt=""> {{this.recipe.meals}} Meals
                                </b-col>
                                <b-col v-if="recipe.gluten_free">
                                    <img src="../../assets/gluten-free.png" alt=""> Gluten Free
                                </b-col>
                            </b-row>
                        </div>
                    </b-card-text>
                </b-card-body>
            </b-col>
        </b-row>
        <b-row>
            <b-col v-if="this.$root.store.username&&!recipe.personal">
                <b-button @click="addToFavorite()" class="w-50 text-center my-1" v-if="!this.recipe.favorite" block variant="outline-success" size="lg">Save To Favorite <b-icon-star-fill></b-icon-star-fill></b-button>
                <b-button @click="removeFromFavorite()" class="w-50 text-center my-1" v-else block variant="danger" size="lg"><b-icon-x-square></b-icon-x-square> Remove From Favorite</b-button>
            </b-col>
        </b-row>
  </b-card>
</template>

<script>
export default {
    props: {
        recipe_id: {
            type: Number,
            required: true
        },
        recipe: {
            type: Object,
            required: true
        }
    },
    mounted () {
        
    },
    methods: {
        async addToFavorite () {
            try{
                const response = await this.axios.post(
                "http://localhost:5001/users/addFavoriteRecipe",
                    {
                        recipeID: this.recipe_id
                    },
                    {withCredentials: true}
                );
                
                if (response.status == 200){
                    this.recipe.favorite=true;
                }
                else{
                    this.$router.replace("main");
                }
            } catch(error){
                console.log(error);
            }
        },
        async removeFromFavorite () {
            try{
                const response = await this.axios.delete(
                    `http://localhost:5001/users/removeFavoriteRecipe/recipeID/${this.recipe_id}`,
                    {withCredentials: true}
                );

                if (response.status == 200){
                    this.recipe.favorite = false;
                }
                else if (response.status == 404){
                    this.$router.replace("/NotFound")
                }
                else{
                    this.$router.replace("main");
                }
            } catch(error){
                console.log(error);
            }
        }
    }
}
</script>

<style>
#img-list2{
    margin-top: 15%;
    padding: 0;
    overflow: hidden;
    list-style-type: none;
    left: 5%;
    enable-background: 0;
    z-index: 2;
}
#img-list2 img{
    width: 50px;
    height: 50px;
}
</style>