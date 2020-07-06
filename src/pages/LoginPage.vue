<template>
  <div class="container">
    <h1 class="title text-center">Login</h1>
    <b-alert
      class="mt-2"
      v-if="form.loginStatus"
      variant="warning"
      dismissible
      show
    >Login failed: {{ form.submitError }}</b-alert>
    <b-form class="mt-5" @submit.prevent="onLogin">
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>
          <div v-if="!$v.form.username.required">Username is required</div>
          <div v-if="!$v.form.username.minLength">Username should be at least {{$v.form.username.$params.minLength.min}} letters</div>
          <div v-if="!$v.form.username.maxLength">Username should be maximum {{$v.form.username.$params.maxLength.max}} letters</div>
          <div v-if="!$v.form.username.alpha">Username should contains letters only</div>
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>
          <div class="error" v-if="!$v.form.password.required">Password is required</div>
          <div class="error" v-if="!$v.form.password.minLength">Password should be at least {{$v.form.password.$params.minLength.min}} letters</div>
          <div class="error" v-if="!$v.form.password.maxLength">Password should be maximum {{$v.form.password.$params.maxLength.max}} letters</div>
          <div class="error" v-if="!$v.form.password.one_number_check">Password should have at least one number</div>
          <div class="error" v-if="!$v.form.password.one_special_symbol_check">Password should have at least one special symbol</div>
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mt-4 mx-auto w-100"
      >Login</b-button>
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register">Register in here</router-link>
      </div>
    </b-form>
  </div>
</template>

<script>
import { required, minLength, maxLength, alpha, helpers } from "vuelidate/lib/validators";

const one_number_check = helpers.regex('alpha', /^[\d\D]*[\d]+[\d\D]*$/);
const one_special_symbol_check = helpers.regex('alpha', /^[\d\D]*[^a-zA-Z0-9]+[\d\D]*$/);

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        loginStatus: undefined,
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(8),
        alpha
      },
      password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(10),
        one_number_check,
        one_special_symbol_check
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const response = await this.axios.post(
          "http://localhost:5001/login",
          {
            username: this.form.username,
            password: this.form.password
          },
          { withCredentials: true }
        );

        const profile_response = await this.axios.get(
          "http://localhost:5001/users/personalDetails",
          {withCredentials: true}
        )

        
        this.$root.store.login(this.form.username, profile_response.data.image);
        
        

        // redirecting to home page
        this.$router.replace("/");
      } catch (err) {
        // console.log(err.response);
        this.form.loginStatus = true;
        this.form.username= "";
        this.form.password = "";
        this.$v.form.$reset();
        this.form.submitError = "Username or Password are incorrect.";
      }
    },
    onLogin() {
      // console.log("login method called");
      this.form.loginStatus = false;
      
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");

      this.Login();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
  min-width: 500px;
}
</style>
