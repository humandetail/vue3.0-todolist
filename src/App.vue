<template>
  <div id="app">
    <todo-input
      :title="title"
      :action="action"
      @on-input="onInput"
      @on-submit="onSubmit"
      @on-cancel="onCancel"
    />

    <todo-list
      :todo-list="todoList"
      :handleBtnClick="handleBtnClick"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from 'vue';

import {
  TodoItem,
  ACTIONs,
  useState,
  setState
} from '@/store';

import TodoInput from '@/components/TodoInput.vue';
import TodoList from '@/components/TodoList.vue';

export default defineComponent({
  name: 'App',
  components: {
    TodoInput,
    TodoList
  },
  setup () {
    const title = ref('');
    const action = ref(ACTIONs.CREATE);
    const id = ref('');

    const { todoList } = useState();

    // setState(ACTIONs.CREATE, {
    //   title: '这里是测试内容2'
    // });

    const handleBtnClick = (_type: string, _id: string) => {
      const item = (todoList as Array<TodoItem>).find((item) => item.id === _id);

      console.log(_id);

      if (!item) {
        alert('程序出错了～');
        return false;
      }

      switch (_type.toUpperCase()) {
        case 'UPDATE':
          action.value = ACTIONs.UPDATE;
          id.value = _id;
          title.value = item.title;
          console.log('here');
          break;
        case 'REMOVE':
          setState(ACTIONs.REMOVE, item).catch((err) => {
            alert(err);
          });
          break;
        default:
          break;
      }
    };

    const onInput = (value: string) => {
      title.value = value;
    };

    const onSubmit = async () => {
      const value = title.value;

      console.log('onSubmit.');

      if (value.length < 4) {
        alert('标题不得少于4个字符。');
        return false;
      }

      const item = (todoList as Array<TodoItem>).find((item) => item.id === id.value);

      if (!item && action.value === ACTIONs.UPDATE) {
        alert('非法操作');
        return false;
      }

      await setState(action.value, {
        ...item,
        title: title.value
      }).catch((err) => {
        alert(err);
      });
    };

    const onCancel = () => {
      title.value = '';
      action.value = ACTIONs.CREATE;
    };

    return {
      todoList,
      title,
      action,
      onInput,
      onSubmit,
      onCancel,
      handleBtnClick
    };
  }
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

button {
  outline: none;
  cursor: pointer;
}

input {
  outline: none;
}

#app {
  width: 600px;
  margin: 60px auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
