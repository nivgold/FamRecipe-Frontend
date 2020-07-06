<template>
  <div v-if="can_load" class="container profile">
      <b-row align-v="center">
          <b-col md="6">
              <b-img thumbnail style="max-height: 500px; max-width: 500px" rounded :src="profile.image"></b-img>
          </b-col>
          <b-col md="6">
              <ProfileDetails
                :first_name="profile.first_name"
                :last_name="profile.last_name"
                :email="profile.email"
                :country="profile.country"
              ></ProfileDetails>
          </b-col>
      </b-row>
  </div>
</template>

<script>
import ProfileDetails from "../components/ProfilePage/ProfileDetails"
export default {
    components: {
        ProfileDetails
    },
    data () {
        return {
            profile: undefined,
            can_load: false
        }
    },
    async mounted () {
        await this.getPersonalDetails();
        this.can_load = true;
    },
    methods: {
        async getPersonalDetails() {
            try{
                const response = await this.axios.get(
                    "http://localhost:5001/users/personalDetails",
                    {withCredentials: true}
                )

                this.profile = response.data;
            }catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.profile-details {
    background-color: rgba($color: #ffffff, $alpha: 0.95);
}

.profile-details span {
    margin-left: 20px;
}

span {
    margin-bottom: 10px;
}

.profile {
    background-color: rgba(52, 58, 64, 0.8);
    min-width: 50%;
}

</style>