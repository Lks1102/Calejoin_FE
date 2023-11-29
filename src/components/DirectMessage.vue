<template>
  <div style="height: 100vh; background: grey; display: flex;">

    <!-- Sidebar with rooms -->
    <aside style="width: 25%; padding: 20px; background-color: #303030;">
      <div style="color: white; font-size: 40px; margin-left: 11px;">Rooms
        <v-btn density="compact" icon="mdi-plus" style="float: right; margin-top: 18px"></v-btn>
      </div>
      <v-row align="center" justify="center">
        <!-- Room cards go here -->
        <v-col>
          <v-card
            class="mx-auto"
            max-width="344"
            title="Room 1"
            subtitle="2023.11.28 PM18:00"
            append-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
            style="background-color: #424242; color: white; margin-top: 20px;"
          >
            <v-card-text>언제 완성 돼??</v-card-text>
          </v-card>
        </v-col>

        <!-- Add more rooms as needed -->

      </v-row>
    </aside>

    <section style="flex: 1; padding: 20px;">

      <v-toolbar style="background-color: transparent !important; box-shadow: none !important; margin-bottom: 20px;">
        <v-avatar>
          <v-img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          ></v-img>
        </v-avatar>

        <v-toolbar-title>Avatar</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>

        <v-container id="chat-messages" style="height: 750px;" >
          <v-row v-for="message in messages">
            <v-col
              offset-lg="10"
              class="speech-bubble"
            >
              <v-card style="box-shadow: none"
                label="prepend-icon"
                rows="1">
                <v-card-title>{{message.sender}}</v-card-title>
                <v-card-text>{{message.message}}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <!--<v-row style="float: right">PM 3:33</v-row>-->
<!--          <div style="padding: 33px"></div>-->
          <!--<v-row>
            <v-col
              offset-lg="-10"
              class="left"
            >
              <v-card style="box-shadow: none"
                      label="prepend-icon"
                      rows="1"
                      text="되겠는데?"
              >
              </v-card>
            </v-col>


          </v-row>
          <v-row style="float: left">PM 3:33</v-row>-->
        </v-container>

      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="11"
          >
            <div style="display: flex; align-items: center;">
            <v-textarea
              append-inner-icon="mdi-comment"
              class="mx-2"
              rows="1"
              v-model="inputMessage"
            >

            </v-textarea>
            <v-btn @click="btnSendMessage" density="compact" style="float: right; margin-bottom: 20px;">전송</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>

    </section>

  </div>
</template>

<style>
.v-col{

  max-width: 13%;
}

.left{
  position: relative;
  background: #ffffff;
  border-radius: .4em;
  float: left;
  clear: both;
}

.left:after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 20px solid transparent;
  border-right-color: #ffffff;
  border-left: 0;
  margin-top: -20px;
  margin-left: -20px;
}

.speech-bubble {
  position: relative;
  background: #ffffff;
  border-radius: .4em;
  float: right;
  clear: both;
}

.speech-bubble:after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 20px solid transparent;
  border-left-color: #ffffff;
  border-right: 0;
  margin-top: -20px;
  margin-right: -20px;
}
.ce-new-chat-button {
  width: 32px;
  position: relative;
  bottom: 22px;
}

div::-webkit-scrollbar {
  display: block;
}

aside {
  float: left;
  width: 20%;
  height: 100%;
  background: #59D0FB;
}

section {
  float: left;
  width: 80%;
  height: 100%;
  background: #2185d0;
}

</style>

<script setup>
import { onMounted, ref } from "vue";

const inputMessage = ref(null);
const messages = ref([]);
const roomId = ref("123");
const sender = ref("user1");
const receiver = ref("user2"); // 추가: 수신자(receiver) 변수
let stompClient = null;

const connect = () => {
  const socket = new SockJS("http://localhost:8088/ws");
  stompClient = Stomp.over(socket);

  stompClient.connect({}, function (frame) {
    console.log("Connected: " + frame);

    stompClient.subscribe("/topic/messages", function (message) {
      //showMessage(JSON.parse(message.body).message);
      console.log("sender : " + JSON.parse(message.body).sender);
      console.log("message : " + JSON.parse(message.body).message);

      messages.value.push(JSON.parse(message.body));
    });

    stompClient.send(
      "/app/chat",
      {},
      JSON.stringify({
        type: "ENTER",
        roomId: roomId.value,
        sender: sender.value,
        receiver: receiver.value, // 추가: 수신자 정보 전달
      })
    );
  });
};

onMounted(() => {
  connect();
});

const btnSendMessage = () => {
  // 사용자의 입력이 빈 문자열이면 메시지를 전송하지 않음
  if (inputMessage.value.trim() !== "") {
    stompClient.send(
      "/app/chat",
      {},
      JSON.stringify({
        type: "TALK",
        roomId: roomId.value,
        sender: sender.value,
        receiver: receiver.value, // 추가: 수신자 정보 전달
        message: inputMessage.value,
      })
    );
    inputMessage.value = ""; // 메시지 전송 후 입력창 초기화
  }
};



</script>
