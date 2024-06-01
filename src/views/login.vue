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
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="submit">로그인</v-btn>
                <v-btn color="primary" :to="'/join'">회원가입</v-btn>
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
        <v-card-title>로그인 성공</v-card-title>
        <v-card-text>운동 기록 화면으로 이동합니다.</v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="redirectToCalendar">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import axios from 'axios'; // axios를 import

export default {
  data() {
    return {
      user: {
        id: '',
        password: ''
      },
      error: '',
      showErrorDialog: false, // 모달 창 표시 여부
      showSuccessDialog: false // 로그인 성공 모달 창 표시 여부
    };
  },
  methods: {
    async submit() {
      try {
        if (!this.user.id || !this.user.password) {
          this.error = '아이디와 비밀번호를 입력해주세요.';
          this.showErrorDialog = true;
          return;
        }

        // axios를 이용한 로그인 요청
        const response = await axios.post('http://localhost:3000/users/login', {
          id: this.user.id,
          password: this.user.password
        });

        // 백엔드 응답에 따른 처리
        if (response.data.result == 'success') {
          this.$store.commit("setLoginUser", response.data.user)
          this.showSuccessDialog = true;
        } else {
          this.error = response.data.message;
          this.showErrorDialog = true;
        }
      } catch (error) {
        console.error('로그인 요청 실패:', error);
        if (error.response && error.response.data && error.response.data.message) {
          this.error = error.response.data.message;
        } else {
          this.error = '로그인에 실패했습니다. 다시 시도해주세요.';
        }
        this.showErrorDialog = true;
      }
    },
    redirectToCalendar() {
      // 운동 기록 화면으로 이동
      this.$router.push('/calendar');
    }
  }
};
</script>

<style scoped>
.error-message {
  color: red;
}
</style>