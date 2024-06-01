<template>
  <v-app>
    <v-app-bar app dark style="height: 64px;">
      <v-container class="d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <v-toolbar-title>H-캘린더</v-toolbar-title>
        </div>
        <v-img src="@/assets/Hlogo.png" alt="Logo" contain max-height="60" class="logo mx-2"></v-img>
        <div class="d-flex align-center">
          <v-btn text to="/">홈</v-btn>
          <v-btn v-if="$store.state.loginUser" @click="logout">
            {{ $store.state.loginUser.id }}
          </v-btn>
          <v-btn v-if="!$store.state.loginUser" text to="/login">로그인</v-btn>
          <v-btn text to="/calendar">캘린더</v-btn>
          <v-btn icon @click="drawer = !drawer">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item to="/">
            <v-list-item-content>
              <v-list-item-title>홈</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/login">
            <v-list-item-content>
              <v-list-item-title>로그인</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/calendar">
            <v-list-item-content>
              <v-list-item-title>캘린더</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <div style="padding-top:64px;">
      <router-view></router-view>
    </div>

    <v-footer app>
      <v-container>
        <span class="mx-auto">&copy; 2024541012 최현규</span>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: false,
    };
  },
  mounted() {
    this.$axios.post("http://localhost:3000/users/info", {}, { withCredentials: true })
      .then(response => {
        if (response.data.result === "success") {
          this.$store.commit("setLoginUser", response.data.user);
        } else {
          this.$store.commit("setLoginUser", null);
        }
      })
      .catch(error => {
        console.error("Error fetching user info:", error);
      });
  },
  methods: {
    logout() {
      this.$axios.post("http://localhost:3000/users/logout", {}, { withCredentials: true })
        .then(response => {
          if (response.data.result == "success") {
            this.$store.commit("logout")
          }
        })
    }
  }

};
</script>

<style>
@import '~vuetify/dist/vuetify.min.css';

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.logo {
  margin-left: auto;
  margin-right: auto;
}
</style>
