<template>
  <section class="todo-input-wrapper">
    <form class="todo-form" @submit.prevent="onSubmit">
      <input
        class="todo-input"
        type="text"
        :value="title"
        @input="onInput"
      />
      <button
        class="btn btn-submit"
        type="submit"
      >
        {{ normalizedAction }}
      </button>
      <button
        v-if="action === 1"
        class="btn btn-cancel"
        type="button"
        @click="onCancel"
      >
        Cancel
      </button>
    </form>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'TodoInput',
  props: {
    title: {
      type: String,
      default: ''
    },

    action: {
      type: Number,
      default: 0
    }
  },
  setup (props, { emit }) {
    const normalizedAction = computed(() => {
      const action = props.action;

      return action === 1
        ? 'Update'
        : 'Create';
    });

    const onInput = (e: KeyboardEvent) => {
      emit('on-input', (e.target as HTMLInputElement).value);
    };

    const onSubmit = () => {
      emit('on-submit');
    };

    const onCancel = () => {
      emit('on-cancel');
    };

    return {
      normalizedAction,
      onInput,
      onSubmit,
      onCancel
    };
  }
});
</script>

<style scoped>
.todo-input-wrapper {
  height: 50px;
}

.todo-form {
  width: 100%;
  display: flex;
  align-items: center;
}

.todo-input {
  flex: 1;
  height: 50px;
  padding: 0 80px 0 10px;
  border: 2px solid #0098ff;
  /* border-radius: 5px; */
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  box-sizing: border-box;
}

.btn {
  width: 80px;
  height: 50px;
  border: none;
}

.btn:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.btn-submit {
  background-color: #0098ff;
  color: #fff;
  font-size: 16px;
}
</style>
