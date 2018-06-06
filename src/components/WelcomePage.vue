<template>
  <div class="column">
    <h1>Userless Demo</h1>
    <!--   <form v-on:submit.prevent="register"> -->
    <form>
      <input class="narrow" v-model="phonenumber" placeholder="Phone Number">
      <p></p>
      <button class="alternate" type="submit" v-on:click.left="phoneVerify">Send an OTP</button>
    </form>
    <p></p>
    <footer> <img src="/static/images/hydralisk.jpg"/></footer>
    <p class="error">{{registerError}}</p>
  </div>

</template>


<script>
export default {
  name: 'WelcomePage',
  data(){
    return {
      phoneNumber: '',
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
   },
  methods: {
    phoneVerify: function() {
       this.$store.dispatch('phoneVerify');
     }
  }
  }
        //TODO: place variables here
  
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