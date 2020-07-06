<template>
  <div class="container">
    <b-form>
        <!-- First Name -->
        <b-form-group
            label="First Name"
            label-cols-sm="3"
        >
            <b-form-input
                type="text"
                :value="first_name"
                disabled
            ></b-form-input>
        </b-form-group>

        <!-- Last Name -->
        <b-form-group
        label="Last Name"
        label-cols-sm="3"
        >
            <b-form-input
                type="text"
                :value="last_name"
                disabled
            ></b-form-input>
        </b-form-group>

        <!-- Email -->
        <b-form-group
            label="Email"
            label-cols-sm="3"
        >
            <b-form-input
                type="text"
                :value="email"
                disabled
            ></b-form-input>
        </b-form-group>
        
        <!-- Country -->
        <b-form-group
            label="Country"
            label-cols-sm="3"
        >
            <b-form-input
                type="text"
                :value="country"
                disabled
            ></b-form-input>
        </b-form-group>
    </b-form>
</div>
</template>

<script>
export default {
    props: {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required:true
        },
        email: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>

</style>