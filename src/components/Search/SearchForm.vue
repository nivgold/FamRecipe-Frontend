<template>
    <b-form inline @submit.prevent="search()">
        <b-input-group>
        <b-input-group-prepend>
            <b-dropdown v-b-tooltip.hover="'Cuisine'" ref="dropdown" variant="info">
            <template slot="button-content"><img width="30px" height="30px" src="../../assets/servings.png"></template>
            <b-dropdown-form>
                <b-form-checkbox-group 
                id="checkbox-group-cusines"
                v-model="selected_cuisines"
                :options="cuisines_options"
                name="flavour-1"
                ></b-form-checkbox-group>
            </b-dropdown-form>
            </b-dropdown>
        </b-input-group-prepend>
        <b-input-group-prepend>
            <b-dropdown v-b-tooltip.hover="'Diet'" ref="dropdown" variant="info">
            <template slot="button-content"><img width="30px" height="30px" src="../../assets/diet.png"></template>
            <b-dropdown-form>
                <b-form-checkbox-group
                id="checkbox-group-diets"
                v-model="selected_diets"
                :options="diets_options"
                name="flavour-2"
                ></b-form-checkbox-group>
            </b-dropdown-form>
            </b-dropdown>
        </b-input-group-prepend>
        <b-input-group-prepend>
            <b-dropdown v-b-tooltip.hover="'Intolerance'" ref="dropdown" variant="info">
            <template slot="button-content"><img width="30px" height="30px" src="../../assets/intolerance.png"></template>
            <b-dropdown-form>
                <b-form-checkbox-group
                id="checkbox-group-intolerances"
                v-model="selected_intolerances"
                :options="intolerances_options"
                name="flavour-3"
                ></b-form-checkbox-group>
            </b-dropdown-form>
            </b-dropdown>
        </b-input-group-prepend>

        <b-form-input id="form-query-input" autocomplete="off" v-model="query" placeholder="What would you like to eat..." list="last_search-datalist"></b-form-input>
        <datalist id="last_search-datalist">
            <option> {{this.$root.store.last_search}} </option>
        </datalist>

        <b-input-group-append>
            <b-button type="submit" variant="outline-success" class="input-group-text">SEARCH</b-button>
        </b-input-group-append>
        
        <template v-slot:append>
            <b-dropdown v-b-tooltip.hover="'Number of Results'" variant="secondary">
            <template slot="button-content"><b-icon-filter></b-icon-filter></template>
            <b-dropdown-item :active="selected_number==5" @click="selected_number=5">5</b-dropdown-item>
            <b-dropdown-item :active="selected_number==10" @click="selected_number=10">10</b-dropdown-item>
            <b-dropdown-item :active="selected_number==15" @click="selected_number=15">15</b-dropdown-item>
            </b-dropdown>
        </template>
        </b-input-group>
    </b-form>
</template>

<script>
export default {
    data () {
        return {
            query: "",
            selected_number: 5,
            cuisines_options: [
                'African','American','British','Cajun','Caribbean','Chinese','Eastern European','European',
                'French','German','Greek','Indian','Irish','Italian','Japanese','Jewish','Korean','Latin American',
                'Mediterranean','Mexican','Middle Eastern','Nordic','Southern','Spanish','Thai','Vietnamese',
            ],
            selected_cuisines: [],
            diets_options: [
                'Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian', 'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo',
                'Primal', 'Whole30',
            ],
            selected_diets: [],
            intolerances_options: [
                'Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat',
            ],
            selected_intolerances: []
        }
    },
    methods: {
        search () {
            this.$emit('search-pressed', this.query, this.selected_number, this.selected_cuisines, this.selected_diets, this.selected_intolerances);
        }
    }
}
</script>

<style>
#form-query-input {
  width: 500px;
  text-overflow: ellipsis;
  display: inline-block;
  color: #20455e;
  font-size: 14px;
  outline: 0;
  transition: border 0.1s ease;
  resize: none;
  border: 1px solid #b6c1cd;
  min-height: 50px;
}
</style>