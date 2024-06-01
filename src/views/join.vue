<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>운동 기록 일지에 오신 것을 환영합니다.</v-card-title>
              <v-card-text>
                <v-text-field v-model="user.id" label="아이디" @keyup.enter="submit"></v-text-field>
                <v-text-field v-model="user.password" label="비밀번호" type="password" @keyup.enter="submit"></v-text-field>
                <v-text-field v-model="user.confirmPassword" label="비밀번호 재입력" type="password" @keyup.enter="submit"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="submit">회원가입</v-btn>
              </v-card-actions>
              <p v-if="error" class="error-message">{{ error }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <!-- 오류 모달 창 -->
    <v-dialog v-model="showErrorDialog" max-width="300">
      <v-card>
        <v-card-title>오류</v-card-title>
        <v-card-text>{{ error }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="showErrorDialog = false">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 성공 모달 창 -->
    <v-dialog v-model="showSuccessDialog" max-width="300">
      <v-card>
        <v-card-title>회원가입 성공</v-card-title>
        <v-card-text>로그인 화면으로 이동합니다.</v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="redirectToLogin">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import axios from 'axios'; // axios 임포트

export default {
  data() {
    return {
      user: {
        id: "",
        password: "",
        confirmPassword: ""
      },
      error: '',
      showErrorDialog: false, // 모달 창 표시 여부
      showSuccessDialog: false // 로그인 성공 모달 창 표시 여부
    };
  },
  methods: {
    async submit() {
      try {
        // 필드 체크
        if (!this.user.id || !this.user.password || !this.user.confirmPassword) {
          this.error = '모든 필드를 입력해주세요.';
          this.showErrorDialog = true;
          return;
        }
        if (this.user.password !== this.user.confirmPassword) {
          this.error = '비밀번호가 일치하지 않습니다.';
          this.showErrorDialog = true;
          return;
        }
        const response = await axios.post('http://localhost:3000/users/join', this.user);
        if (response.data.result === "success") {
          this.showSuccessDialog = true;
        } else {
          this.error = response.data.message;
          this.showErrorDialog = true;
        }
      } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data.message) {
          this.error = error.response.data.message;
        } else {
          this.error = '회원가입에 실패했습니다. 다시 시도해주세요.';
        }
        this.showErrorDialog = true;
      }
    },
    redirectToLogin() {
      // 로그인 화면으로 이동
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.error-message {
  color: red;
}
</style>
