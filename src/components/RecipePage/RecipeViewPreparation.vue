<template>
  <div id="container">
      <b-card no-body class="overflow-hidden">
            <b-row no-gutters>
                <b-col md="9">
                    <b-card-body title="Instructions">
                        <ol>
                            <li v-for="s in instructions" :key="s.number">
                                {{ s.step }}
                            </li>
                        </ol>
                    </b-card-body>
                </b-col>
                <b-col md="3">
                    <b-card-body title="Ingredients">
                        <ul>
                            <li v-for="(r, index) in ingredients" :key="index">
                                {{ r.amount }} {{r.unit}} {{r.name}}
                            </li>
                        </ul>   
                    </b-card-body>
                </b-col>
            </b-row>
      </b-card>
  </div>
</template>

<script>
export default {
    props: {
        ingredients: {
            type: Array,
            required: true
        },
        instructions: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>

</style>