<template>
  <nav>
    <ul id="menu">
      <li class="right" v-if="loggedIn"><a @click="logout" href="#">Resend OTP</a></li>
      <li class="right" v-if="loggedIn">{{phoneNumber}}</li>
    </ul>
    <div class="flexWrapper errorPlace">
      <p v-if="loginError" class="flexRight error">{{loginError}}</p>
    </div>
  </nav>
</template>

<script>
 export default {
   name: 'AppHeader',
   data () {
     return {
       phoneNumber: '',
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
     logout: function() {
       this.$store.dispatch('logout');
     }
   }
 }
</script>

<style scoped>
 /* Strip the ul of padding and list styling */
 nav {
     display: grid;
     margin-bottom: 20px;
 }
 ul {
     list-style-type:none;
     margin:0;
     padding:0;
 }
 /* Create a horizontal list with spacing */
 li {
     display:inline-block;
     float: left;
     margin-right: 20px;
     height: 50px;
     text-align: center;
     line-height: 50px;
     color: #666;
 }
 /*Active color*/
 li a.active {
 }
 /*Hover state for top level links*/
 li:hover a {
 }
 .right {
     float: right;
 }
 .errorPlace {
     height: 20px;
 }
 img {
     width: 50px;
 }
</style>