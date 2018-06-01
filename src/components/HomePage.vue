<template>
  <div>
    <div v-if="otpVerified">
        <confirmation-page/>
    </div>
    <div v-else-if="loggedIn">
      <otp-page/>
    </div>
    <div v-else>
      <welcome-page/>
    </div>
  </div>
</template>

<script>
 import WelcomePage from './WelcomePage';
 import OtpPage from './OtpPage';
 import ConfirmationPage from './ConfirmationPage'
 export default {
   name: 'HomePage',
   components: {WelcomePage,OtpPage,ConfirmationPage},
   computed: {
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
     otpVerified: function() {
         return this.$store.getters.otpVerified;
     },
   },
 }
</script>

<style scoped>
</style>