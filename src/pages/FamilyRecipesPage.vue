<template>
    <div v-if="can_load">
        <div v-if="familyRecipes.length!=0" class="container">
            <h1 class="title text-center">Family Recipes</h1>
            <FamilyRecipesList
            :familyRecipes=familyRecipes
            title=""
            class="FamilyRecipes center" />
        </div>
        <div v-else class="container">
            <h1 class="title text-center">You Have No Family Recipes! <br>...</h1> 
        </div>
    </div>
</template>

<script>
import FamilyRecipesList from "../components/Family/FamilyRecipesList"
export default {
    components: {
        FamilyRecipesList
    },
    data() {
        return {
            familyRecipes: [],
            can_load: false
        }
    },
    async mounted (){
        await this.getFamilyRecipes();
        this.can_load = true;
    },
    methods: {
        async getFamilyRecipes(){
            try {
                // const response = await this.axios.get(
                //     "http://localhost:5001/users/familyRecipes",
                //     {withCredentials: true}
                // );

                const response = await this.axios.get(
                    "https://famrecipe-backend.herokuapp.com/users/familyRecipes",
                    {withCredentials: true}
                );


                const recipes = response.data;
                this.familyRecipes = [];
                this.familyRecipes.push(...recipes);
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
  min-height: 500px;
}

.list {
    background-color: transparent;
}
</style>