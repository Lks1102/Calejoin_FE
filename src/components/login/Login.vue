<template>
  <v-main>
    <div id="loginBg" :style="{backgroundImage : `url(${bgImg})`}">

    </div>
    <div id="loginPg">
      <form @:submit.prevent="login">
      <div id="loginForm">
        <div class="loginTitle">
          <h4>LOGIN</h4>
        </div>
        <label> 로그인 </label>
        <v-text-field v-model="UserLogin.data.uid" />
        <label> 비밀번호 </label>
        <v-text-field type="password" v-model="UserLogin.data.pass" />
        <v-btn style="margin-left: 280px; display: block " rounded="xl" size="x-large" type="submit">로그인</v-btn>
        <v-btn style="margin-left: 280px; display: block; margin-top: 20px " rounded="xl" size="x-large" type="submit" router-link to="/register">회원 가입</v-btn>
      </div>
      </form>
    </div>
  </v-main>
</template>

<script setup>
import { reactive } from "vue";
import axios from "axios";
import router from "@/router";

const UserLogin = reactive({
  data: {
    uid: "",
    pass: "",
  },
});
function getImageUrl() {
  const i = Math.floor(Math.random() * 7);
  console.log(i);
  return new URL("/images/login_bg" + i + ".webp", import.meta.url).href;
}
const bgImg = getImageUrl();

const login = () => {
  axios
    .post("http://localhost:8080/user/login", UserLogin.data)
    .then((response) => {
      console.log("로그인 완료시 리스폰스 거쳐감: ");
      if (response.data === 1) {
        console.log("로그인 완료시 리스폰스: " + response.data);
        alert("로그인 완료");
        router.push("/");
      } else {
        console.log("로그인 실패시 리스폰스: " + response.data);
        alert("로그인 실패");
        router.push("/login");
      }
    })
    .catch((err) => {
      console.log("실패:  " + err);
    });
};
</script>
<style scoped>

* {
  margin: 0;
  padding: 0;
}

ul,li,ol {
  list-style: none;
}

a {
  text-decoration: none;
  color: #111;
}
input,
textarea {
  outline: none;
}

@media (max-width: 768px) {

  #loginForm{
    width: 100vw;
    height:100vh;
  }
  .loginTitle{
    width:100vw;
  }


}

@media (min-width: 768px) {

  #loginPg{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  #loginForm{
    border-radius: 75px;
    //border: 2px solid #fff;
    box-sizing: content-box;
    width: 900px;
    height: 550px;
    box-shadow: 0px 5px 5px  rgba(0,0,0,0.2);
  }

  .loginTitle{
    border-radius: 75px 75px 0 0;
    width: 900px;
  }
}

#loginPg{
  height: 100vh;
  background:rgba(0,0,0,0.4);
  position:relative;

}
#loginBg{
  width: 100%;
  height: 100vh;
  content: "";
  overflow: hidden;
  margin:0;
  background-repeat:no-repeat;
  background-position: center;
  background-size: cover;
  filter: blur(10px);
  -webkit-filter: blur(10px);
  position:absolute;
  top:0;
  left:0;
}
#loginForm{
  background-color:rgba(255, 255, 255, 0.4);
}
.loginTitle{

  background-color: rgba(255, 255, 255, 0.2);
  height: 120px;
  color:white;
}
.loginTitle > h4{
  font-family: 'Moirai One';
  font-size: 63px;
  letter-spacing: 6.3px;
  text-align: center;
  line-height: 120px;
}

li#kkLoginBtn a {
  display:block;
  height:56px;
  padding-left:35px;
  background:#ffe812 url("../../assets/ic-kakao-02.png") no-repeat 120px 21px;
  background-size:18px 17px;
  color:#262626;
  box-sizing:border-box;
  font-size:16px;
  line-height:56px;
  text-align:center;
}

li#kkLoginBtn a img {
  display:inline-block;
  margin-right:3px;
  margin-left:-20px;
  margin-bottom:2px;
}

li#kkLoginBtn .kkLogin {
  display:block;
  height:56px;
  padding-left:35px;
  background:#ffe812 url("../../assets/ic-kakao-02.png") no-repeat 120px 19px;
  background-size:18px 17px;
  color:#262626;
  box-sizing:border-box;
  font-size:16px;
  line-height:56px;
  text-align:center;
}

.w100p {
  width: 100% !important;
}


.v-btn.v-btn--density-default{

  width: 300px;
}
.v-btn.v-btn--density-default.content{

  width: 300px;
}
</style>

