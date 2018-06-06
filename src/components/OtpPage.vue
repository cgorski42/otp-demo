<template>
  <div class="column">
    <h1>Userless Demo</h1>
    <p> Please confirm your identity with the OTP that has been sent to your phone. </p>
    <!--   <form v-on:submit.prevent="register"> -->
    <form>
      <input class="narrow" v-model="otp" placeholder="One Time Password (OTP)">
      <p></p>
      <button class="alternate" type="submit" v-on:click.left="otpVerify">Sign In</button>
    </form>
    <p></p>
    <p class="error">{{registerError}}</p>
  </div>

</template>


<script>
export default {
  name: 'OtpPage',
 data(){
    return {
      phoneNumber: '',
      otp: '',
      loggedIn: '',
    }
  },
  computed: {
        phoneNumber: function() {
       return this.$store.getters.phoneNumber;
     },
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
     loginError: function() {
       return this.$store.getters.loginError;
     },
     otp: function(){
       return this.$store.getters.otp;
     },
   },
  methods: {
    otpVerify: function() {
       this.$store.dispatch('otpVerify');
     }
  }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 logo img {
     width: 150px;
 }
 footer img {
   width: 100%;

 }
 form input {
 
   width: 300px;
}
 
 form button {
   width: 50%;
   height : 50px;
   background-color: rgb(191, 208, 219);
   color : rgb(6, 76, 94);
   font-family: Verdana, Geneva, Tahoma, sans-serif;
   font-size: 40px;
   border-radius: 15px;
     cursor: pointer;
     box-shadow: 0 9px #999;
   }
 form button:hover {background-color: rgb(114, 177, 206)}
 form button:active {
  background-color: rgb(58, 149, 209);
  box-shadow: 0 5px #666;
  transform: translateY(4px);
 }

 h1 {
     margin-bottom: 0px;
 }
 h2 {
     margin-top: 0px;
     font-size: 1.2em;
     font-weight: normal;
     margin-bottom: 50px;
 }
 .narrow {
     width: 170px;
 }
 .wide {
     width: 370px;
 }
</style>