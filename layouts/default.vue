<template>

<v-app style="background-color: #F4F6F9;">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      style="padding-right: 0; margin-right: 0;"
    >
    <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          active-class="custom-active-class"
          style="padding-bottom: 10px;
        >
          <v-list-item-action ">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="margin-left: 20px;">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app dense>

      <v-btn icon @click.stop="miniVariant = !miniVariant">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

 
      
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-account-multiple',
          title: 'Client Management',
          to: '/client_management',
        },
        {
          icon: 'mdi-account-settings',
          title: 'User Management',
          to: '/user_management',
        },
        {
          icon: 'mdi-file-document-outline',
          title: 'Recurring Invoices',
          to: '/recurring_invoices',
        },
        {
          icon: 'mdi-message',
          title: 'Bulk SMS',
          to: '/bulk_sms',
        },
        {
          icon: 'mdi-clock-alert-outline',
          title: 'Expire Management',
          to: '/expire_management',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>


<style scoped>
.custom-active-class {
  background-color: rgba(40, 132, 213, 1) !important; /* Change background color */
  color: white !important; /* Change font color */
}

.custom-active-class .v-icon {
  color: white !important; /* Change icon color */
}
</style>