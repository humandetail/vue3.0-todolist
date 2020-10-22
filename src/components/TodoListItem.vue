<template>
  <li class="todo-item">
    <div class="info">
      <!-- <span class="id">{{ todoItem.id }}</span> -->
      <span class="title" :title="todoItem.title">{{ todoItem.title }}</span>
      <span class="create-time">{{ createTime }}</span>
    </div>
    <div class="btn-groups">
      <button
        class="btn btn-update"
        type="button"
        @click="handleBtnClick('UPDATE', todoItem.id)"
      >
        编辑
      </button>
      <button
        class="btn btn-remove"
        type="button"
        @click="handleBtnClick('REMOVE', todoItem.id)"
      >
        删除
      </button>
    </div>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'TodoList',
  props: {
    todoItem: {
      type: Object,
      required: true
    },
    handleBtnClick: {
      type: Function,
      required: true
    }
  },
  setup (props) {
    const createTime = computed(() => {
      const date = new Date((props as any).todoItem.createTime);

      const y = date.getFullYear();
      const m = date.getMonth() + 1 + '';
      const d = date.getDate() + '';

      return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '')}`;
    });

    return {
      createTime
    };
  }
});
</script>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.todo-item:hover {
  background-color: rgba(110, 136, 160, 0.1)
}

.info {
  flex: 1;
  display: flex;
  min-width: 0;
}

.info .title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.info .create-time {
  margin-left: 15px;
}

.btn-groups {
  margin-left: 15px;
}

.btn {
  padding: 6px 10px;
  margin: 0 2px;
  border: none;
  background: #0098ff;
  color: #fff;
  border-radius: 3px;
}

.btn-remove {
  background-color: #f40;
}

.btn:hover,
.btn:focus {
  opacity: .8;
}
</style>
