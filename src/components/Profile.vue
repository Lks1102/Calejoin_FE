<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiFolderOpen } from "@mdi/js";
import { mdiTag } from "@mdi/js";
import { mdiFormatListChecks } from "@mdi/js";
import { mdiPin } from "@mdi/js";
import { mdiPencilPlus } from "@mdi/js";
import {onMounted, ref} from "vue";
import axios from 'axios';


const mdiFolderOpenPath = mdiFolderOpen;
const mdiTagPath = mdiTag;
const mdiFormatListChecksPath = mdiFormatListChecks;
const mdiPinPath = mdiPin;
const mdiPencilPlusPath = mdiPencilPlus;

const toggle = ref(false); // 초기 상태 (false: 꺼짐, true: 켜짐)

const showCardContents = ref(true);

const showCardContents2 = ref(false);

const toggleCard = () => {
  showCardContents.value = !showCardContents.value; // 카드 내용 토글
};
const toggleCard2 = () => {
  showCardContents2.value = !showCardContents2.value; // 카드 내용 토글
};
/*const uid = ref("");*/
const plans = ref([]);
const categories = ref([]);
const homedata = async () => {
  try {
    const response = await axios.get('http://localhost:8080/');
    plans.value = response.data.plans;
    categories.value = response.data.categories;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(homedata);

</script>
<template>
  <div>
    <v-switch v-model="toggle" label="Calendar"></v-switch>
  </div>
  <p class="custom-font">NAME's</p>
  <p class="custom-font" style="color: mediumblue">NOVEMBER</p>
  <div
    style="color: mediumblue; width: 40%; padding: 10px 0"
    @click="toggleCard"
  >
    <svg-icon
      type="mdi"
      :path="mdiFolderOpenPath"
      style="color: grey"
    ></svg-icon>
    카테고리
  </div>
  <v-card v-if="showCardContents">
    <v-card-title></v-card-title>
    <v-card-text>
      <v-sheet  height="auto" max-height="150" :class="['custom-scroll', 'overflow-y-auto']" >
        <div v-for="category in categories" :key="category.id" style="font-size: 17px; padding: 2px">
          <svg-icon type="mdi" :path="mdiTagPath" style="color: grey"></svg-icon>
          No:{{category.cateNo}} {{category.cateName}}
        </div>
      </v-sheet>
    </v-card-text>
  </v-card>
  <div
    style="color: mediumblue; width: 50%; padding-bottom: 10px"
    @click="toggleCard2"
  >
    <svg-icon
      type="mdi"
      :path="mdiFormatListChecksPath"
      style="color: grey"
    ></svg-icon>
    나의 일정 보기
  </div>
  <v-card v-if="showCardContents2">
    <v-card-title></v-card-title>
    <v-card-text>
      <v-sheet :class="['custom-scroll', 'overflow-y-auto']" height="auto" max-height="150">
      <div v-for="plan in plans" :key="plan.id" style="font-size: 17px; padding: 2px">
        <svg-icon type="mdi" :path="mdiPinPath" style="color: grey"></svg-icon>
          {{plan.title}} : {{plan.memo}}
      </div>


      </v-sheet>
    </v-card-text>
  </v-card>
  <div style="color: mediumblue">
    <svg-icon
      type="mdi"
      :path="mdiPencilPlusPath"
      style="color: grey"
    ></svg-icon>
    <router-link to="/PlanWrite">새 일정 추가</router-link>&nbsp;
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lilita+One&display=swap");

.custom-scroll::-webkit-scrollbar {
  width: 12px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}
.custom-font {
  font-family: "Lilita One", sans-serif;

  font-size: 40px;
}
</style>
