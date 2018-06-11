import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import twoFactor from 'node-2fa';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loggedIn: false,
        loginError: '',
        registerError: '',
        phoneNumber: {},
        otp: {},
        otpVerified: false,
        secret: '',
      },
      getters: {
        loggedIn: state => state.loggedIn,
        loginError: state => state.loginError,
        phoneError: state => state.phoneError,
        phoneNumber: state => state.phoneNumber,
        otpVerified: state => state.otpVerified,
        otp: state => state.otp,
        secret: state => state.secret,
      },
    
      mutations: {
        setLogin (state, status) {
          state.loggedIn = status;
        },
        setLoginError (state, message) {
          state.loginError = message;
        },
        setphoneError (state, message) {
          state.phoneError = message;
        },
        setPhoneNumber (state, phoneNumber) {
          state.phoneNumber = phoneNumber;
        },
        setOtpVerified (state,status) {
          state.otpVerified = status;
        },
        setOtp (state,otp){
          state.otp = otp;
        },
        setSecret (state, secret) {
          state.secret = secret;
        }

      },
    
  actions: {
      //TODO: 
      //Logout
      logout(context,loggedIn) {
        context.commit('setLogin',false);
        context.commit('setOtpVerified', false)
      },
       
    //Verify Phonenumber //
       phoneVerify(context,phoneNumber) {
         axios.get("/generate-secret").then((response)=>{
           console.log("afwsfjakls;df");
          console.log(response);
            context.commit('setSecret', response.data.secret.secret);
         }).then(()=>{
          axios.post("/generate-otp", {
            phoneNumber: phoneNumber,
            secret: context.getters.secret,
          }).then((otpResponse)=>{
            console.log('serotp seuriot');
            console.log(otpResponse);
            context.commit('setOtp', otpResponse.data.otp);
            context.commit('setLogin',true);
         })  
        
      //Create phone verification program to test if actual phone/email write error
      //Create program to send a generated otp to given phone/email write error
        console.log(response);
      })
      },

      //Verify OTP
      otpVerify(context){
        //check otp against the saved otp-phone number pair
        let secret = context.getters.secret;
        let token = context.getters.otp.token;
        console.log(token);
        console.log(secret);
        let verification = twoFactor.verifyToken(secret, token);
        console.log(verification);
         if (verification === null){
          context.commit('setOtpVerified', false);
         }else{
          context.commit('setOtpVerified', true);
         }
         console.log(context.getters.otpVerified);
      }


//after phone number is proven as vaild transition to otp page.//
      /*login(context,user) {
        axios.post("/api/login",user).then(response => {
      context.commit('setUser', response.data.user);
      context.commit('setLogin',true);
      context.commit('setRegisterError',"");
      context.commit('setLoginError',"");
        }).catch(error => {
      context.commit('setRegisterError',"");
      if (error.response) {
        if (error.response.status === 403 || error.response.status === 400)
          context.commit('setLoginError',"Invalid login.");
        context.commit('setRegisterError',"");
        return;
      }
      context.commit('setLoginError',"Sorry, your request failed. We will look into it.");
        });
      },
      //logout
      logout(context,user) {
        context.commit('setUser', {});
        context.commit('setLogin',false);
      },*/
  
  }
});