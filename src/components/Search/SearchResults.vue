<template>
    <div>
        <b-row class="mt-5" align-h="center">
            <span style="margin-top: 2px; margin-right: 5px">Sort by:</span> <b-dropdown size="sm" split-variant="outline-primary" variant="primary" split :text="selected_sort">
              <b-dropdown-item @click="selected_sort='Ready Time'" :active="selected_sort=='Ready Time'">Ready Time</b-dropdown-item>
              <b-dropdown-item @click="selected_sort='Popularity'" :active="selected_sort=='Popularity'">Popularity</b-dropdown-item>
            </b-dropdown>
        </b-row>
        <transition name="fade">
        <RecipePreviewList v-if="selected_sort=='Ready Time'" :recipes="sort_by_time" title="" class="center"/>
        </transition>
        <transition name="fade">
        <RecipePreviewList v-if="selected_sort=='Popularity'" :recipes="sort_by_popularity" title="" class="center"/>
        </transition>
    </div>
</template>

<script>
import RecipePreviewList from "../RecipePreview/RecipePreviewList"
export default {
    components: {
        RecipePreviewList
    },
    props: {
        recipes: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            selected_sort: 'Ready Time'
        }
    },
    computed: {
        sort_by_time () {
            let time_sorted = JSON.parse(JSON.stringify(this.recipes));
            time_sorted.sort((a,b) => a.ready_in_minutes > b.ready_in_minutes ? 1 : -1);
            return time_sorted;
        },
        sort_by_popularity () {
            let popularity_sorted = JSON.parse(JSON.stringify(this.recipes));
            popularity_sorted.sort((a,b) => a.popularity > b.popularity ? -1 : 1);
            return popularity_sorted;
        }
    },
}
</script>

<style>

</style>