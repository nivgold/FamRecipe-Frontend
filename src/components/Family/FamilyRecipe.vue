<template>
    <b-card style="min-width: 100%" no-body>
      <b-row no-gutters>
        <b-col md="6" class="recipe-img">
          <b-card-img width="300" height="300" :src="familyRecipe.image"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body>
            <b-card-text class="icons">
              <ul class="mt-5 img-list">
                <li>
                  <img v-b-tooltip.hover="'Owner'" src="../../assets/owner.png"> {{familyRecipe.owner}}
                </li>
                <li class="mt-5">
                  <img v-b-tooltip.hover="'Usually At'" src="../../assets/timing.png"> {{familyRecipe.timing}}
                </li>
                <li></li>
              </ul>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
      <b-card-footer>
        <b-row no-gutters>
          <b-col md="9">
            <b-card-body title="Instructions">
              {{familyRecipe.instructions}}
            </b-card-body>
          </b-col>
          <b-col md="3">
            <b-card-body title="Ingredients">
              <ul>
                <li v-for="(r, index) in familyRecipe.ingredients" :key="index">
                    {{ r.amount }} {{r.unit}} {{r.name}}
                </li>
              </ul>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card-footer>
    </b-card>
</template>

<script>
export default {
    data() {
        return {
          
        };
    },
    props : {
        familyRecipe: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>

.recipe-img {
  position: relative;
}

.icons ul {
  display: flex;
  flex-wrap: wrap;
}

.icons ul li {
  list-style: none;
  flex-basis: 100%;
}

.icons .img-list li img {
  width: 35px;
  height: 35px;
}
</style>