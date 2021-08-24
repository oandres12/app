<template>
  <div class="flex flex-center">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-input v-model="searchedRecipe" filled type="search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-space></q-space>
      <q-btn :onClick="filterRecipes">Filtruj</q-btn>
    </div>
  </div>
  <div class="flex flex-center">
  <div class="q-pa-lg row q-gutter-md">
    <q-card v-for='recipe in filteredRecipes' :key="recipe.id" class="my-card">
        <img :src="recipe.img_url">
        <q-card-section>
          <div class="text-h5">{{ recipe.name }}</div>
          <div class="text-subtitle2">Autor: {{recipe.author}}</div>
          <div class="text-subtitle3">Składniki: {{recipe.ingredients}}</div>
          <div class="text-subtitle3">
            Czas przygotowania: {{recipe.time}}, Poziom trudności: {{recipe.difficulty}}/5
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Przepis: {{ recipe.description }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { api } from 'boot/axios';

export default {
  data() {
    return {
      searchedRecipe: '',
      recipes: [],
      filteredRecipes: [],
    };
  },
  methods: {
    async getData() {
      api.get('/recipes')
        .then((response) => {
          this.recipes = response.data;
          this.filteredRecipes = response.data;
        })
        .catch(() => {
          this.$q.notify({
            type: 'negative',
            message: 'Błąd pobierania danych',
          });
        });
    },
    filterRecipes() {
      this.filteredRecipes = this.recipes.filter(
        (recipe) => recipe.name.includes(this.searchedRecipe),
      );
    },
  },
  created() {
    this.getData();
  },
};
</script>
<style>
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>
