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
      error: ''
    };
  },
  methods: {
    async submit() {
      try {
        // axios를 이용한 로그인 요청
        const response = await axios.post('http://localhost:3000/users/login', {
          id: this.user.id,
          password: this.user.password
        });

        // 백엔드 응답에 따른 처리
        if (response.data.result === 'success') {
          this.$router.push('/calendar');
        } else {
          this.error = response.data.message;
        }
      } catch (error) {
        console.error('로그인 요청 실패:', error);
        this.error = '로그인에 실패했습니다. 다시 시도해주세요.';
      }
    }
  }
};
</script>



<style scoped>
.error-message {
  color: red;
}
</style>
