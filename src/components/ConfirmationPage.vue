<template>
  <div class="column">
    <logo id="headerlogo"> <img src="/static/images/star-craft.jpg"/></logo>
    <h1>Congratulations!</h1>
    <p>Dual authentification compelete! Kerrigan is pleased. Welcome to the swarm. </p>
    <!--   <form v-on:submit.prevent="register"> -->
    <p></p>
    <footer> <img src="/static/images/Kerrigan.jpg"/></footer>
    <p class="error">{{registerError}}</p>
  </div>

</template>





<script>
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