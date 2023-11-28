
<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.colors.primary }">
    <v-main>
      <v-container class="px-15 mt-n1" fluid="">
        <v-row justify-end>
          <v-col cols="12" md="4">
            <profile/>
          </v-col>
          <v-col cols="12" md="8">
            <EventCalendar/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "@/components/SideBare.vue";
import EventCalendar from "@/components/EventCalendar.vue";
import Profile from "@/components/Profile.vue";
export default {
  date: () => ({}),
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Sidebar,
    EventCalendar,
    Profile,
  },
};
</script>

<style scoped></style>
