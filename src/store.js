import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loggedIn: false,
        loginError: '',
        registerError: '',
        phoneNumber: {},
        otp: {},
        otpVerified: false,
        
      },
      getters: {
        loggedIn: state => state.loggedIn,
        loginError: state => state.loginError,
        phoneError: state => state.phoneError,
        phoneNumber: state => state.phoneNumber,
        otpVerified: state => state.otpVerified,
        otp: state => state.otp,
      },
    
      mutations: {
        setLogin (state, status) {
          state.loggedIn = status;
        },
        setLoginError (state, message) {
          state.loginError = message;
        },
        setphoneError (state, message) {
          state.registerError = message;
        },
        setPhoneNumber (state, phoneNumber) {
          state.phoneNumber = setphoneNumber;
        },
        setOtpVerified (state,status) {
          state.otpVerified = status;
        },
        setOtp (state,otp){
          state.otp = setOtp;
        },
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
        /*axios.post("/api/phoneNumber",user).then(response => {
      context.commit('setUser', response.data.user);*/
      context.commit('setLogin',true);
      /*context.commit('setPhoneError',"");
      context.commit('setLoginError',"");
        }).catch(error => {
      context.commit('setLoginError',"");
      context.commit('setLogin',false);
      if (error.response) {
        if (error.response.status === 403)
          context.commit('setPhoneError',"That email address already has an account.");
        else if (error.response.status === 409)
          context.commit('setphoneError',"That user name is already taken.");
        return;
      }
      context.commit('setphoneError',"Sorry, your request failed. We will look into it.");
        });*/
      },

      //Verify OTP
      otpVerify(context, otp){
        context.commit('setOtpVerified', true);
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