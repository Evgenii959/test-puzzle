<template>
  <div id="app">
    <div class="block">
      <input
        type="search"
        v-model="search"
        @input="onInput"
        @keydown.down="selectNext"
        @keydown.up="selectPrevious"
        @keydown.enter.prevent="goToProfile"
        placeholder="Введите название..."
        class="search"
      />
      <button>
        <img src="./images/search.svg" class="image" />
      </button>
    </div>
    <ul v-if="filteredResults.length > 0" class="list">
      <li
        v-for="(item, index) in filteredResults"
        :key="item.id"
        @mousedown="goToProfile(item)"
        :class="{ active: selectedIndex === index }"
        @mouseover="selectedIndex = index"
        class="item"
      >
        <p>{{ item.title }}</p>
        <p>{{ item.body }}</p>
      </li>
    </ul>
    <p v-if="search.length < 3 && search.length > 0">Введите 3 символа</p>
    <p v-if="search.length >= 3 && filteredResults.length === 0">
      Нет результатов
    </p>
    <div v-if="selectedItem" class="card">
      <h2>Профиль: {{ selectedItem.title }}</h2>
      <p>{{ selectedItem.body }}</p>
    </div>
  </div>
</template>

<script>
import { persons } from './data/data';

export default {
  name: 'App',
  data() {
    return {
      search: '',
      data: [],
      selectedIndex: 0,
      filteredResults: [],
      selectedItem: null,
    };
  },
  created() {
    this.data = persons;
  },
  methods: {
    onInput() {
      if (this.search.length >= 3) {
        this.filteredResults = this.data
          .filter((elem) => {
            const fullName = `${elem.title} ${elem.body}`;
            return fullName.toLowerCase().startsWith(this.search.toLowerCase());
          })
          .slice(0, 10);
      } else {
        this.filteredResults = [];
        this.selectedItem = null;
      }
      this.selectedIndex = 0;
    },
    selectNext() {
      if (this.selectedIndex < this.filteredResults.length - 1) {
        this.selectedIndex++;
      }
    },
    selectPrevious() {
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
      }
    },
    goToProfile() {
      const selectedItem = this.filteredResults[this.selectedIndex];
      if (selectedItem) {
        this.selectedItem = selectedItem;
        this.search = '';
        this.filteredResults = [];
        console.log(this.selectedItem);
      }
    },
  },
};
</script>

<style scoped>
#app {
  max-width: 500px;
}
.active {
  background-color: #cbc6c6;
}
.block {
  display: flex;
}
.search {
  width: 100%;
  padding: 10px;
  border: 0;
  background-color: #e5e1e1;
}
.list {
  border: none;
  padding: 0;
  background-color: #f1efef;
}
.item {
  border: none;
  border-bottom: 1px solid #c4c0c0;
  list-style-type: none;
  padding: 10px;
}
.item:last-child {
  border: none;
}
.card {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.image {
  max-width: 40px;
  border: none;
}
</style>
