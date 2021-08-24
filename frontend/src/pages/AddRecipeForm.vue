<template>
  <div class="flex flex-center">
    <div class="q-pa-md column items-start q-gutter-md">
      <h5>Dodawanie przepisu</h5>
      <div class="q-gutter-md column items-start">
        <q-input v-model="name" filled  hint="Nazwa potrawy">
        </q-input>
        <q-input v-model="difficulty" filled  hint="Trudność">
        </q-input>
        <q-input v-model="time" filled  hint="Czas wykonania">
        </q-input>
        <q-input v-model="ingredients" filled  hint="Składniki">
        </q-input>
        <q-input v-model="description" filled  hint="Przepis">
        </q-input>
        <q-input v-model="img_url" filled  hint="Link do obrazka">
        </q-input>
        <q-input v-model="author" filled  hint="Autor">
        </q-input>
        <q-btn :onclick="submitLogin">
          Dodaj przepis
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
      name: '',
      difficulty: '',
      time: '',
      ingredients: '',
      description: '',
      img_url: '',
      author: '',
    };
  },
  methods: {
    submitLogin() {
      api.post('/add-recipe', {
        name: this.name,
        difficulty: this.difficulty,
        time: this.time,
        ingredients: this.ingredients,
        description: this.description,
        img_url: this.img_url,
        author: this.author,
      })
        .then((response) => {
          if (response.status === 200) {
            this.$q.notify({
              type: 'positive',
              message: 'Dodano przepis pozytywnie',
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
