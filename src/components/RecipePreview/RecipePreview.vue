<template>
  <div class="all">
    <b-card class="b-card-all" header-class="recipe-preview-header-class" text-variant="light" no-body :header="recipe.title" header-bg-variant="success">
      <b-row no-gutters>
        <b-col style="object-fit: cover;" md="6" class="recipe-img">
          <transition name="fade" v-if="recipe.personal">
            <router-link :to="{ name: 'personalRecipe', params: { recipeId: recipe.id } }">
              <b-card-img class="img" :src="recipe.image"></b-card-img>
            </router-link>
          </transition>
          <transition name="page" mode="out-in" v-else>
            <router-link :to="{ name: 'recipe', params: { recipeId: recipe.id } }">
              <b-card-img class="img" :src="recipe.image"></b-card-img>
            </router-link>
          </transition>
          <p class="recipe-img-descriptor">Click on the image to find out more</p>
        </b-col>
        <b-col class="recipe-card-body" md="6">
          <b-card-body>
            <b-card-title class="img-list">
              <b-row>
                <b-col>
                  <img v-b-tooltip.hover="'Ready Time'" src="../../assets/timer.png"> {{ recipe.ready_in_minutes }} minutes
                </b-col>
                <b-col>
                  <img v-b-tooltip.hover="'Likes'" src="../../assets/like.png"> {{ recipe.popularity }} Likes
                </b-col>
              </b-row>
            </b-card-title>
            <b-card-text class="icons">
              <h4 style="font-family: 'Timmana', sans-serif;" v-if="recipe.vegetarian||recipe.vegan||recipe.gluten_free" class="mt-5">Good to Know:</h4>
              <ul class="mt-3 img-list">
                <li v-if="recipe.vegetarian">
                  <img v-b-tooltip.hover="'Vegetarian'" src="../../assets/broccoli.png" alt="">
                </li>
                <li v-if="recipe.vegan">
                  <img v-b-tooltip.hover="'Vegan'" src="../../assets/vegan.png" alt="">
                </li>
                <li v-if="recipe.gluten_free">
                  <img v-b-tooltip.hover="'Gluten Free'" src="../../assets/gluten-free.png" alt="">
                </li>
              </ul>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
      <b-card-footer class="recipe-preview-footer icons" v-if="this.$root.store.username&&!recipe.personal">
          <b-row class="img-list">
            <b-col class="text-center" md="6">
              <img v-b-tooltip.hover="'Saved'" class="favorite-clickable" v-if="recipe.favorite" @click="removeFromFavorite()" src="../../assets/star-fill.png">
              <img v-b-tooltip.hover="'Save To Favorites'" class="favorite-clickable" v-else @click="addToFavorite()" src="../../assets/star.png">
            </b-col>
            <b-col class="text-center" md="6">
              <img v-if="recipe.watched" v-b-tooltip.hover="'Watched'" src="../../assets/tap.png" alt="">
            </b-col>
          </b-row>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods: {
    async addToFavorite () {
      try{
        // const response = await this.axios.post(
        //   "http://localhost:5001/users/addFavoriteRecipe",
        //   {
        //     recipeID: this.recipe.id
        //   },
        //   {withCredentials: true}
        // );

        const response = await this.axios.post(
          "https://famrecipe-backend.herokuapp.com/users/addFavoriteRecipe",
          {
            recipeID: this.recipe.id
          },
          {withCredentials: true}
        );

        if (response.status == 200){
          this.recipe.favorite=true;
        }
        else{
          this.$router.push("/");
        }
      } catch(error){
        console.log(error);
      }
    },
    async removeFromFavorite () {
      try{
        // const response = await this.axios.delete(
        //   `http://localhost:5001/users/removeFavoriteRecipe/recipeID/${this.recipe.id}`,
        //   {withCredentials: true}
        // );

        const response = await this.axios.delete(
          `https://famrecipe-backend.herokuapp.com/users/removeFavoriteRecipe/recipeID/${this.recipe.id}`,
          {withCredentials: true}
        );

        if (response.status == 200){
          this.recipe.favorite = false;
          this.$emit('removed_from_favorites', this.recipe.id)
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
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&family=Open+Sans+Condensed:ital,wght@1,300&display=swap&family=Timmana&display=swap');

.recipe-img {
  position: relative;
  overflow: hidden;
}

.recipe-img .img {
  transition: transform .5s ease;
}

.recipe-img-descriptor {
  position: absolute;
  bottom: 0;
  padding: 0;
  margin: 0;
  color: white;
  visibility: hidden;
  background: black;
  opacity: 0;
  transition: opacity .5s, visibility .5s;
}

.recipe-card-body{
  background-color: rgba(52, 58, 64, 1);
}

.recipe-img:hover .recipe-img-descriptor {
  visibility: visible;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 1;
}

.recipe-img:hover .img{
  transform: scale(1.1);
}

.recipe-preview-header-class {
  font-family: 'Open Sans Condensed', sans-serif;
  padding: 0px;
  font-size: 20px;
  overflow: hidden;
  white-space:nowrap;
  text-overflow: ellipsis;
}

.recipe-preview-footer{
  padding: 2px;
}

.img-list .row .col img {
  width: 35px;
  height: 35px;
}

.icons .img-list img {
  width: 25px;
  height: 25px;
}

.icons .img-list li img {
  width: 35px;
  height: 35px;
}

.icons ul {
  display: flex;
  flex-wrap: wrap;
}

.icons ul li {
  list-style: none;
  flex-basis: 33.333333%;
}

.favorite-clickable{
  cursor: pointer;
}

.card-title{
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
}
</style>
