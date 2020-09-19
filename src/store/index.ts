import { inject, reactive } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export interface TodoItem {
  id?: string;
  title: string;
  createTime?: Date | string;
}

export enum ACTIONs {
  CREATE,
  UPDATE,
  REMOVE
}

export const todoListSymbol = Symbol('todoList');

// 获取初始化的todoList列表
const getTodoList: () => Array<TodoItem> = () => {
  let list = [];

  try {
    list = JSON.parse(localStorage.getItem('todoList') || '[]');
  } catch {}

  return list;
};

export const todoList = reactive(getTodoList());

// 新增数据
const create = (options: TodoItem) => {
  return new Promise((resolve, reject) => {
    const { title } = options;

    if (title.length < 4) {
      return reject(new Error('The title length must be longer than 4 characters.'));
    }

    if (todoList.find((item) => item.title === title)) {
      return reject(new Error('Title already exists.'));
    }

    const id = uuidv4();
    const createTime = new Date();

    const list = {
      id,
      title,
      createTime
    };

    todoList.push(list);

    try {
      localStorage.setItem('todoList', JSON.stringify(todoList));
    } catch {};

    resolve(list);
  });
};

// 更新数据
const update = (options: TodoItem) => {
  return new Promise((resolve, reject) => {
    const {
      id,
      title
    } = options;

    const idx = todoList.findIndex((item) => item.id === id);

    if (idx === -1) {
      reject(new Error('Invalid parameter "options.id"'));
    }

    if (!title || title.length <= 4) {
      return reject(new Error('Invalid parameter "options.title"'));
    }

    if (todoList.find((item) => item.id !== id && item.title === title)) {
      return reject(new Error('Title already exists.'));
    }

    todoList.splice(idx, 1, options);

    try {
      localStorage.setItem('todoList', JSON.stringify(todoList));
    } catch {};

    resolve(options);
  });
};

// 删除数据
const remove = (options: TodoItem) => {
  return new Promise((resolve, reject) => {
    const {
      id
    } = options;

    const idx = todoList.findIndex((item) => item.id === id);

    if (idx === -1) {
      return reject(new Error('Invild parameter "optioins".'));
    }

    todoList.splice(idx, 1);

    try {
      localStorage.setItem('todoList', JSON.stringify(todoList));
    } catch {};

    resolve();
  });
};

export const useState = () => {
  const todoList = inject(todoListSymbol);
  return {
    todoList
  };
};

export const setState = async (action: number, options: TodoItem) => {
  switch (action) {
    case ACTIONs.CREATE:
      return await create(options);
    case ACTIONs.UPDATE:
      return await update(options);
    case ACTIONs.REMOVE:
      return await remove(options);
    default:
      throw new Error('Invalid parameter "action"');
  }
};
