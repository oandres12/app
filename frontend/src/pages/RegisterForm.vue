<template>
  <div class="flex flex-center">
    <div class="q-pa-md column items-start q-gutter-md">
      <h5>Rejestracja</h5>
      <div class="q-gutter-md column items-start">
        <q-input v-model="login" filled  hint="Login">
        </q-input>
        <q-input v-model="password" filled type="password" hint="Hasło">
        </q-input>
        <q-btn :onclick="sumbitRegister">
          Zarejestruj się
        </q-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { api } from 'boot/axios';

export default {
  data() {
    return {
      login: '',
      password: '',
    };
  },
  methods: {
    sumbitRegister() {
      api.post('/register', {
        login: this.login,
        password: this.password,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$q.notify({
              type: 'positive',
              message: 'Dodano użytkownika pomyślnie',
            });
            this.$router.push({ name: 'mainPage' });
          }
        })
        .catch((err) => {
          this.$q.notify({
            type: 'negative',
            message: `Błąd ${err.message}`,
          });
        });
    },
  },
};
</script>
