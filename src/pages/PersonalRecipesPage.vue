<template>
    <div v-if="can_load">
        <div v-if="personalRecipes.length!=0" class="container">
            <h1 class="title text-center">Personal Recipes</h1>
            <RecipePreviewList 
                :recipes=personalRecipes
                title=""
                class="center">
            </RecipePreviewList>
        </div>
        <div v-else class="container">
            <h1 class="title text-center">You Have No Personal Recipes! <br>...</h1> 
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
            personalRecipes: [],
            can_load: false
        }
    },
    async mounted () {
        await this.getPersonalRecipes();
        this.can_load = true;
    },
    methods: {
        async getPersonalRecipes() {
            try {
                const response = await this.axios.get(
                    "http://localhost:5001/users/personalRecipes",
                    {withCredentials: true}
                );

                const recipes = response.data;

                let recipes_id = recipes.map((x) => {
                    return x.id;
                });
                
                this.personalRecipes = [];
                
                // getting the user information
                const recipes_user_info_response = await this.axios.get(
                    `http://localhost:5001/users/recipesInfo/${JSON.stringify(recipes_id).replace(/ /g,'')}`,
                    {withCredentials: true}
                );

                let recipes_user_info = recipes_user_info_response.data;

                recipes.map((x) => {
                    const id = x.id;
                    this.personalRecipes.push(Object.assign({}, x, {watched: recipes_user_info[id].watched}, {favorite: recipes_user_info[id].favorite}, {personal: true}));
                });

            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>