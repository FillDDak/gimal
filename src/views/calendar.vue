<template>
  <v-app>
    <v-main>
      <v-container class="container-custom">
        <vc-calendar
          class="custom-calendar"
          @dayclick="onDayClick"
        />
        <v-slide-x-transition>
          <v-navigation-drawer
            v-model="panel"
            right
            app
            width="500"
          >
            <v-card>
              <v-card-title>
                {{ selectedDate }} 일정
              </v-card-title>
              <v-card-text>
                <v-text-field
                  label="일정 내용"
                  v-model="editedContent"
                  outlined
                  dense
                  multi-line
                  :error-messages="contentErrorMessages"
                  @input="clearErrorMessages"
                ></v-text-field>
                <v-btn @click="saveChanges">저장</v-btn>
              </v-card-text>
            </v-card>
            <v-list v-if="getContentForDate(selectedDate).length">
              <v-list-item
                v-for="(item, index) in getContentForDate(selectedDate)"
                :key="index"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ item.content }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.modified }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="deleteItem(selectedDate, index)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-alert v-else>
              일정 내용을 입력해주세요.
            </v-alert>
          </v-navigation-drawer>
        </v-slide-x-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      panel: false,
      selectedDate: '',
      editedContent: '',
      savedContents: {}, // 날짜별로 내용을 저장할 객체
      contentErrorMessages: '', // 일정 내용 에러 메시지
    }
  },
  methods: {
    onDayClick(day) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      this.selectedDate = day.date.toLocaleDateString('ko-KR', options); // 클릭된 날짜를 selectedDate에 저장
      // 패널 열 때마다 수정 내용 초기화
      this.editedContent = this.getContentForDate(day.date);
      this.panel = true; // 패널 열기
    },
    getContentForDate(date) {
      // 날짜에 해당하는 내용 가져오기
      return this.savedContents[date] || [];
    },
    saveChanges() {
      if (!this.editedContent) {
        this.contentErrorMessages = '내용을 입력해 주세요.'; // 일정 내용이 비어있는 경우 에러 메시지 설정
        return; // 일정 내용이 없으면 저장하지 않음
      }
      // 변경된 내용 저장
      const newItem = {
        content: this.editedContent,
        modified: this.selectedDate // 클릭한 날짜로 저장
      };
      if (!this.savedContents[this.selectedDate]) {
        this.savedContents[this.selectedDate] = []; // 해당 날짜에 저장된 내용이 없으면 배열 초기화
      }
      this.savedContents[this.selectedDate].push(newItem); // 해당 날짜의 내용 추가
      // 저장 후 입력 창 초기화
      this.editedContent = '';
      // 저장 후 에러 메시지 초기화
      this.contentErrorMessages = '';
      // 여기에 변경된 내용을 저장하는 로직을 추가할 수 있습니다.
    },

    clearErrorMessages() {
      // 입력 창에 입력할 때마다 에러 메시지 초기화
      this.contentErrorMessages = '';
    },
    deleteItem(date, index) {
      this.savedContents[date].splice(index, 1); // 해당 날짜의 항목 삭제
    }
  }
}
</script>

<style>
.container-custom {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh; /* 컨테이너 높이를 뷰포트 높이로 설정 */
  position: relative;
}

.custom-calendar {
  width: 100%;
  max-width: 800px; /* 원하는 최대 너비로 조절 */
  margin: 0 auto; /* 가운데 정렬 */
}

.v-navigation-drawer {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
}
</style>
