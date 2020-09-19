<template>
  <section class="todo-list-wrapper">
    <header class="header">
      <h2 class="title">待办事项：</h2>
    </header>
    <ul class="todo-list">
      <todo-list-item
        is="li"
        class="item"
        v-for="(item) of todoList"
        :key="item.id"
        :todo-item="item"
        :handleBtnClick="handleBtnClick"
      />
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import TodoListItem from './TodoListItem.vue';

export default defineComponent({
  name: 'TodoList',
  components: {
    TodoListItem
  },
  props: {
    todoList: {
      type: Array,
      default () {
        return [];
      }
    },

    handleBtnClick: {
      type: Function,
      required: true
    }
  }
});
</script>

<style scoped>
.todo-list-wrapper {
  margin-top: 20px;
}

.header .title {
  font-size: 18px;
  color: #0098ff;
}
</style>
