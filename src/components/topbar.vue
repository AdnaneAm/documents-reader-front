<script>
import i18n from "../i18n";

export default {
  data() {
    return {
      languages: [
        {
          flag: require("@/assets/images/flags/us.jpg"),
          language: "en",
          title: "English"
        },
        {
          flag: require("@/assets/images/flags/french.jpg"),
          language: "fr",
          title: "French"
        },
        {
          flag: require("@/assets/images/flags/spain.jpg"),
          language: "es",
          title: "spanish"
        },
        {
          flag: require("@/assets/images/flags/chaina.png"),
          language: "zh",
          title: "Chinese"
        },
        {
          flag: require("@/assets/images/flags/arabic.png"),
          language: "ar",
          title: "Arabic"
        }
      ],
      current_language: "en"
    };
  },
  methods: {
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */ !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    setLanguage(locale) {
      i18n.locale = locale;
      this.current_language = i18n.locale;
    },
    logOut(){
      this.$store.dispatch('auth/logOut');
      this.$router.push({name:'login'})
    }
  }
};
</script>

<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <a href="index.html" class="logo logo-dark">
            <span class="logo-sm">
              <img src="@/assets/images/logo-sm-dark.png" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-dark.png" alt height="20" />
            </span>
          </a>

          <a href="index.html" class="logo logo-light">
            <span class="logo-sm">
              <img src="@/assets/images/logo-sm-light.png" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-light.png" alt height="20" />
            </span>
          </a>
        </div>

        <button
          @click="toggleMenu"
          type="button"
          class="btn btn-sm px-3 font-size-24 header-item waves-effect"
          id="vertical-menu-btn"
        >
          <i class="ri-menu-2-line align-middle"></i>
        </button>
      </div>

      <div class="d-flex">
        <b-dropdown variant="white" right toggle-class="header-item">
          <template v-slot:button-content>
            <img class src="@/assets/images/flags/us.jpg" alt="Header Language" height="16" />
          </template>
          <b-dropdown-item
            class="notify-item"
            v-for="(entry, i) in languages"
            :key="`Lang${i}`"
            :value="entry"
            @click="setLanguage(entry.language)"
            :link-class="{'active': entry.language === current_language}"
          >
            <img :src="`${entry.flag}`" alt="user-image" class="mr-1" height="12" />
            <span class="align-middle">{{ entry.title }}</span>
          </b-dropdown-item>
        </b-dropdown>
        <div class="dropdown d-none d-lg-inline-block ml-1">
          <button
            type="button"
            class="btn header-item noti-icon waves-effect"
            @click="initFullScreen"
          >
            <i class="ri-fullscreen-line"></i>
          </button>
        </div>
        <b-dropdown
          right
          variant="black"
          toggle-class="header-item"
          class="d-inline-block user-dropdown"
        >
          <template v-slot:button-content>
            <img
              :src="require('@/assets/images/avatar.jpeg')"
              class="rounded-circle header-profile-user"
              alt="Header Avatar"
            />
            <span class="d-none d-xl-inline-block ml-1">{{ $t('navbar.dropdown.kevin.text')}}</span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </template>
          <!-- item-->
          <a class="dropdown-item" href="#">
            <i class="ri-user-line align-middle mr-1"></i>
            {{ $t('navbar.dropdown.kevin.list.profile') }}
          </a>
          <a class="dropdown-item" href="#">
            <i class="ri-wallet-2-line align-middle mr-1"></i>
            {{ $t('navbar.dropdown.kevin.list.mywallet') }}
          </a>
          <a class="dropdown-item d-block" href="#">
            <span class="badge badge-success float-right mt-1">11</span>
            <i class="ri-settings-2-line align-middle mr-1"></i>
            {{ $t('navbar.dropdown.kevin.list.settings') }}
          </a>
          <a class="dropdown-item" href="#">
            <i class="ri-lock-unlock-line align-middle mr-1"></i>
            {{ $t('navbar.dropdown.kevin.list.lockscreen') }}
          </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item text-danger" @click="logOut">
            <i class="ri-shut-down-line align-middle mr-1 text-danger"></i>
            {{ $t('navbar.dropdown.kevin.list.logout') }}
          </a>
        </b-dropdown>

        <div class="dropdown d-inline-block">
          <button
            type="button"
            class="btn header-item noti-icon right-bar-toggle waves-effect toggle-right"
            @click="toggleRightSidebar"
          >
            <i class="ri-settings-2-line toggle-right"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.notify-item {
  .active {
    color: #16181b;
    background-color: #f8f9fa;
  }
}
</style>