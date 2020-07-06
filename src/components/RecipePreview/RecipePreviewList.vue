<template>
  <b-container>
    <h3>
      {{ title }}
      <slot></slot>
    </h3>
    <b-col>
      <b-row class="justify-content-md-center" v-for="r in recipes" :key="r.id">
        <RecipePreview v-on:removed_from_favorites="on_remove_from_favorite" class="mb-5" :recipe="r" />
      </b-row>
    </b-col>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  methods: {
    on_remove_from_favorite (id) {
      this.$emit('removed_from_favorites', id)
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    recipes: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>

h3 {
  font-family: 'Days One', sans-serif;
  font-size: 60px;
}
.container {
  background-color: transparent;
}

</style>
