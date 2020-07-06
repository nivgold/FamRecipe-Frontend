<template>
  <div class="container">
    <h1 class="title text-center">Register</h1>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >Register failed: {{ form.submitError }}</b-alert>
    <b-form class="mt-5" @submit.prevent="onRegister" @reset.prevent="onReset">
      <!-- username -->
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
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

      <!-- firstName -->
      <b-form-group
        id="input-group-firstName"
        label-cols-sm="3"
        label="First name:"
        label-for="firstName"
      >
        <b-form-input
          id="firstName"
          v-model="$v.form.firstName.$model"
          type="text"
          :state="validateState('firstName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.firstName.required">First name is required</b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.firstName.length"
        >First name can not be less than 2 characters</b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.firstName.alpha">firstName alpha</b-form-invalid-feedback>
      </b-form-group>

      <!-- lastName -->
      <b-form-group
        id="input-group-lastName"
        label-cols-sm="3"
        label="Last name:"
        label-for="lastName"
      >
        <b-form-input
          id="lastName"
          v-model="$v.form.lastName.$model"
          type="text"
          :state="validateState('lastName')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.lastName.required">Last name is required</b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.lastName.length"
        >Last name can not be less than 2 characters</b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.lastName.alpha">lastName alpha</b-form-invalid-feedback>
      </b-form-group>

      <!-- country -->
      <b-form-group id="input-group-country" label-cols-sm="3" label="Country:" label-for="country">
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>Country is required</b-form-invalid-feedback>
      </b-form-group>

      <!-- email -->
      <b-form-group id="input-group-email" label-cols-sm="3" label="Email:" label-for="email">
        <b-form-input id="email" v-model="$v.form.email.$model" type="email" :state="validateState('email')"></b-form-input>
        <b-form-invalid-feedback>
          <div v-if="!$v.form.email.required">Email is required.</div>
          <div v-if="!$v.form.email.email">Should be in the form of mail</div>
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- password -->
      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
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

      <!-- confirm password -->
      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback
          v-if="!$v.form.confirmedPassword.required"
        >Password confirmation is required</b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >The confirmed password is not equal to the original password</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-image"
        label-cols-sm="3"
        label="Image:"
        label-for="image"
      >
        <b-form-input
          id="image"
          type="text"
          v-model="$v.form.image.$model"
          :state="validateState('image')"
        ></b-form-input>
        <b-form-invalid-feedback>
          <div v-if="!$v.form.image.required">Image is required</div>
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button type="submit" variant="primary" style="width:250px;" class="ml-5 w-75">Register</b-button>
      <div class="text-center mt-2">
        You have an account already?
        <router-link to="login">Log in here</router-link>
      </div>
    </b-form>
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  helpers,
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";

const one_number_check = helpers.regex('alpha', /^[\d\D]*[\d]+[\d\D]*$/);
const one_special_symbol_check = helpers.regex('alpha', /^[\d\D]*[^a-zA-Z0-9]+[\d\D]*$/);

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        image: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
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
      firstName: {
        required,
        length: u => minLength(2)(u),
        alpha
      },
      lastName: {
        required,
        length: u => minLength(2)(u),
        alpha
      },
      country: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(10),
        one_number_check,
        one_special_symbol_check
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      image: {
        required
      }
    }
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      let response;
      try {
        // response = await this.axios.post(
        //   "http://localhost:5001/register",
        //   {
        //     username: this.form.username,
        //     password: this.form.password,
        //     first_name: this.form.firstName,
        //     last_name: this.form.lastName,
        //     country: this.form.country,
        //     email: this.form.email,
        //     image: this.form.image
        //   }
        // );

        response = await this.axios.post(
          "https://famrecipe-backend.herokuapp.com/register",
          {
            username: this.form.username,
            password: this.form.password,
            first_name: this.form.firstName,
            last_name: this.form.lastName,
            country: this.form.country,
            email: this.form.email,
            image: this.form.image
          }
        );

        this.$router.push("/login");
        // console.log(response);
      } catch (err) {
        if (err.response.status==422){
          this.onReset();
          this.form.submitError = "Username is alraedy in use.";
        }
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 600px;
  min-width: 600px;
}
</style>
