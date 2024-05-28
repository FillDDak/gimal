<template>
  <v-app>
    <v-app-bar app :absolute="false">
      <v-toolbar-title>H-캘린더</v-toolbar-title>
      <v-img src="@/assets/Hlogo.png" alt="Logo" contain max-height="60" class="mr-2"></v-img>
      <v-spacer></v-spacer>
      <v-btn text to="/">홈</v-btn>
      <v-btn text to="/login">로그인</v-btn>
      <v-btn text to="/calendar">캘린더</v-btn>
    </v-app-bar>
    <div style="padding-top:60px;">
      <router-view></router-view>
    </div>

    <v-footer app>
      <span class="mx-auto">&copy; 2024541012 최현규</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@import '~vuetify/dist/vuetify.min.css';

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
</style>