<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          {{checkLoggedUser() ? `Zalogowano jako ${checkLoggedUser()}` : 'Przepisy'}}
        </q-toolbar-title>
        <router-link item to="/" exact>
          <q-btn flat stretch class="text-white nav-link">Przepisy</q-btn>
        </router-link>
        <router-link v-if="checkLoggedUser()" item to="/add-recipe" exact>
          <q-btn flat stretch class="text-white nav-link">Dodaj przepis</q-btn>
        </router-link>
        <router-link v-if="!checkLoggedUser()" item to="/login" exact>
          <q-btn flat stretch class="text-white nav-link">Logowanie</q-btn>
        </router-link>
        <router-link v-if="!checkLoggedUser()" item to="/register" exact>
          <q-btn flat stretch class="text-white nav-link">Rejestracja</q-btn>
        </router-link>
        <q-btn
            v-if="checkLoggedUser()"
            :onclick="logoutUser"
            flat
            stretch
            class="text-white nav-link"
        >
          Wyloguj
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  data() {
    return {
      loggedUser: '',
    };
  },
  methods: {
    checkLoggedUser() {
      return localStorage.getItem('logged_user');
    },
    logoutUser() {
      localStorage.removeItem('logged_user');
      this.$q.notify({
        type: 'positive',
        message: 'Wylogowano, proszę odśwież stronę',
      });
    },
  },
};

</script>
<style>
  .nav-link {
    text-decoration: none;
  }
</style>
