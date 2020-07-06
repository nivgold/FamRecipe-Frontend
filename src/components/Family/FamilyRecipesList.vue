<template>
    <b-container>
        <h3>
            {{ title }}
            <slot></slot>
        </h3>
        <b-col>
            <b-row class="justify-content-md-center" v-for="r in familyRecipes" :key="r.id">
                <FamilyRecipe class="mb-5" :familyRecipe="r" />
            </b-row>
        </b-col>
    </b-container>
</template>

<script>
import FamilyRecipe from "./FamilyRecipe"
export default {
    name: "FamiyltRecipesList",
    components: {
        FamilyRecipe
    },
    props: {
        title: {
            type: String,
            required: true
        },
        familyRecipes: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: transparent;
}
</style>
