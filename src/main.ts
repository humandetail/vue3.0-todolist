import {
  createApp
} from 'vue';
import App from './App.vue';
import {
  todoListSymbol,
  todoList
} from './store';

const app = createApp(App);

app.provide(todoListSymbol, todoList);

app.mount('#app');
