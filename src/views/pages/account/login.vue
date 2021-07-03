<script>
import { required, email } from "vuelidate/lib/validators";

import {
  authMethods,
  notificationMethods
} from "@/state/helpers";

export default {
  data() {
    return {
      email: "",
      password: "",
      submitted: false
    };
  },
  created() {
    document.body.classList.add("auth-body-bg");
  },
  computed:{
    notification() {
      return this.$store ? this.$store.state.notification : null;
    }
  },
  validations: {
    email: { required, email },
    password: { required }
  },
  methods: {
    ...authMethods,
    ...notificationMethods,
    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      this.tryingToLogIn = true;
      // Reset the authError if it existed.
      this.authError = null;
      return (
        this.logIn({
          email: this.email,
          password: this.password
        })
          // eslint-disable-next-line no-unused-vars
          .then(token => {
            this.tryingToLogIn = false;
            this.isAuthError = false;
            // Redirect to the originally requested page, or to the home page
            this.$router.push(
              this.$route.query.redirectFrom || { name: "home" }
            );
          })
          .catch(error => {
            const err = error.response.data;
            this.tryingToLogIn = false;
            this.authError = err.message;
            this.isAuthError = true;
            this.$store.dispatch('notification/error', err.message, { root: true });
          })
      );
    }
  }
};
</script>

<template>
  <div>
    <div class="home-btn d-none d-sm-block">
      <a href="/">
        <i class="mdi mdi-home-variant h2 text-white"></i>
      </a>
    </div>
    <div>
      <div class="container-fluid p-0">
        <div class="row no-gutters">
          <div class="col-lg-4">
            <div class="authentication-page-content p-4 d-flex align-items-center min-vh-100">
              <div class="w-100">
                <div class="row justify-content-center">
                  <div class="col-lg-12 col-md-6">
                    <div>
                      <div class="text-center">
                        <div>
                          <a href="/" class="logo">
                            <img src="@/assets/images/logo-dark.png" height="20" alt="logo" />
                          </a>
                        </div>

                        <h4 class="font-size-18 mt-4">{{$t('pages.login.title')}}</h4>
                        <p class="text-muted">{{$t('pages.login.description')}}</p>
                      </div>
                      <b-alert
                        variant="danger"
                        class="mt-3"
                        v-if="notification.message"
                        show
                        dismissible
                      >{{notification.message}}</b-alert>

                      <div class="p-2 mt-5">
                        <form class="form-horizontal" @submit.prevent="tryToLogIn">
                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-mail-line auti-custom-input-icon"></i>
                            <label for="email">{{$t('forms.login.email.text')}}</label>
                            <input
                              type="email"
                              v-model="email"
                              class="form-control"
                              id="email"
                              :placeholder="$t('forms.login.email.placeholder')"
                              :class="{ 'is-invalid': submitted && $v.email.$error }"
                            />
                            <div v-if="submitted && $v.email.$error" class="invalid-feedback">
                              <span v-if="!$v.email.required">Email is required.</span>
                              <span v-if="!$v.email.email">Please enter valid email.</span>
                            </div>
                          </div>

                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-lock-2-line auti-custom-input-icon"></i>
                            <label for="userpassword">{{$t('forms.login.password.text')}}</label>
                            <input
                              v-model="password"
                              type="password"
                              class="form-control"
                              id="userpassword"
                              :placeholder="$t('forms.login.password.placeholder')"
                              :class="{ 'is-invalid': submitted && $v.password.$error }"
                            />
                            <div
                              v-if="submitted && !$v.password.required"
                              class="invalid-feedback"
                            >Password is required.</div>
                          </div>
                          <!-- <div class="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customControlInline"
                            />
                            <label
                              class="custom-control-label"
                              for="customControlInline"
                            >Remember me</label>
                          </div> -->

                          <div class="mt-4 text-center">
                            <button
                              class="btn btn-primary w-md waves-effect waves-light"
                              type="submit"
                            >{{$t('forms.login.button')}}</button>
                          </div>

                          <!-- <div class="mt-4 text-center">
                            <router-link tag="a" to="/forgot-password" class="text-muted">
                              <i class="mdi mdi-lock mr-1"></i> Forgot your password?
                            </router-link>
                          </div> -->
                        </form>
                      </div>

                      <div class="mt-5 text-center">
                        <p>
                          {{$t('pages.login.registermessage')}}
                          <router-link
                            tag="a"
                            to="/register"
                            class="font-weight-medium text-primary"
                          >Register</router-link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="authentication-bg">
              <div class="bg-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>