<script>
import { required, email } from "vuelidate/lib/validators";
import {
  authMethods,
  notificationMethods
} from "@/state/helpers";
export default {
  data() {
    return {
      user: { 
        name: "",
        email: "",
        password: ""
      },
      submitted: false,
      regError: null,
      tryingToRegister: false,
      isRegisterError: false,
      registerSuccess: false
    };
  },
  computed:{
    notification() {
      return this.$store ? this.$store.state.notification : null;
    }
  },
  validations: {
    user: {
      name: { required },
      email: { required, email },
      password: { required }
    }
  },
  created() {
    document.body.classList.add("auth-body-bg");
  },
  methods: {
    ...authMethods,
    ...notificationMethods,
    // Try to register the user in with the email, username
    // and password they provided.
    tryToRegisterIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      this.tryingToRegister = true;
      // Reset the regError if it existed.
      this.regError = null;
      return (
        this.register({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password
        })
          // eslint-disable-next-line no-unused-vars
          .then(token => {
            this.tryingToRegister = false;
            this.isRegisterError = false;
            this.registerSuccess = true;
            if (this.registerSuccess) {
              this.$router.push(
                this.$route.query.redirectFrom || { name: "home" }
              );
            }
          })
          .catch((error) => {
            const err = error.response.data;
            this.tryingToRegister = false;
            this.regError = err.message;
            this.isRegisterError = true;
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
                        <h4 class="font-size-18 mt-4">{{$t('pages.register.title')}}</h4>
                        <p class="text-muted">{{$t('pages.register.description')}}</p>
                      </div>

                      <div class="p-2 mt-5">
                        <b-alert
                          v-model="registerSuccess"
                          class="mt-3"
                          variant="success"
                          dismissible
                        >{{$t('pages.register.success')}}</b-alert>
                        <b-alert
                          v-model="isRegisterError"
                          class="mt-3"
                          variant="danger"
                          dismissible
                        >{{regError}}</b-alert>                        
                        <form class="form-horizontal" @submit.prevent="tryToRegisterIn">
                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-user-2-line auti-custom-input-icon"></i>
                            <label for="full-name">{{$t('forms.fullname')}}</label>
                            <input
                              v-model="user.name"
                              type="text"
                              class="form-control"
                              id="full-name"
                              :class="{ 'is-invalid': submitted && $v.user.name.$error }"
                              placeholder="Enter full name"
                            />
                            <div
                              v-if="submitted && !$v.user.name.required"
                              class="invalid-feedback"
                            >Username is required.</div>
                          </div>

                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-mail-line auti-custom-input-icon"></i>
                            <label for="useremail">Email</label>
                            <input
                              v-model="user.email"
                              type="email"
                              class="form-control"
                              id="useremail"
                              placeholder="Enter email"
                              :class="{ 'is-invalid': submitted && $v.user.email.$error }"
                            />
                            <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                              <span v-if="!$v.user.email.required">Email is required.</span>
                              <span v-if="!$v.user.email.email">Please enter valid email.</span>
                            </div>
                          </div>

                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-lock-2-line auti-custom-input-icon"></i>
                            <label for="userpassword">Password</label>
                            <input
                              v-model="user.password"
                              type="password"
                              class="form-control"
                              id="userpassword"
                              placeholder="Enter password"
                              :class="{ 'is-invalid': submitted && $v.user.password.$error }"
                            />
                            <div
                              v-if="submitted && !$v.user.password.required"
                              class="invalid-feedback"
                            >Password is required.</div>
                          </div>

                          <div class="text-center">
                            <button
                              class="btn btn-primary w-md waves-effect waves-light"
                              type="submit"
                            >Register</button>
                          </div>
                        </form>
                      </div>

                      <div class="mt-5 text-center">
                        <p>
                          {{$t('pages.register.alreadymessage')}}
                          <router-link
                            tag="a"
                            to="/login"
                            class="font-weight-medium text-primary"
                          >{{$t('pages.register.login')}}</router-link>
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