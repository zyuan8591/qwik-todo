import {
  component$,
  useStylesScoped$,
  useStore,
  $,
  useSignal,
  useTask$,
  useClientEffect$,
} from '@builder.io/qwik';
import { isBrowser } from '@builder.io/qwik/build';
import styles from './todo.scss';

export default component$(() => {
  useStylesScoped$(styles);
  const todoInput = useSignal('');
  const todoInputHint = useSignal('');
  const editInput = useSignal('');
  const state = useStore(
    {
      todoList: [],
    },
    { recursive: true }
  );

  const saveTodo = $((todo) => {
    window.localStorage.setItem('todo', JSON.stringify(todo));
  });

  const getTodo = $(() => {
    return JSON.parse(window.localStorage.getItem('todo'));
  });

  useClientEffect$(
    async () => {
      state.todoList = await getTodo();
    },
    {
      eagerness: 'idle', // 'load' | 'visible' | 'idle'
    }
  );

  useTask$(async ({ track }) => {
    track(() => state.todoList);
    if (isBrowser) saveTodo(state.todoList);
  });

  const todoInputHandler = $((e) => {
    todoInput.value = e.target.value;
  });

  const editTodoInputHandler = $((e) => {
    editInput.value = e.target.value;
  });

  const updateTodoInputHint = $((hint) => {
    todoInputHint.value = hint;
  });

  const addTodo = $((todo) => {
    if (!todo.trim()) return updateTodoInputHint('請勿空白');
    state.todoList = [{ todo, edit: false }, ...state.todoList];
    todoInput.value = '';
    updateTodoInputHint('');
  });

  const delTodo = $((id) => {
    state.todoList = state.todoList.filter((todo, idx) => idx !== id);
  });

  const goEditing = $((id) => {
    state.todoList = state.todoList.map((todo) => {
      return { ...todo, edit: false };
    });
    state.todoList[id].edit = true;
    editInput.value = state.todoList[id].todo;
  });

  const updateTodo = $((id) => {
    let newTodo = state.todoList.map((todo, idx) => {
      if (idx === id) return { todo: editInput.value, edit: false };
      return { ...todo, edit: false };
    });
    state.todoList = newTodo;
    saveTodo(state.todoList);
  });

  return (
    <>
      <div class="title">Todo List</div>
      <div class="add-todo">
        <input
          value={todoInput.value}
          onInput$={todoInputHandler}
          onKeyDown$={(e) => {
            if (e.key === 'Enter') addTodo(todoInput.value);
          }}
        />
        <i
          class="fa-regular fa-square-plus"
          onClick$={() => addTodo(todoInput.value)}
        />
        <span class="empty-hint">{todoInputHint.value}</span>
      </div>
      <ul class="todo-list">
        {state.todoList.map((todo, idx) => (
          <li key={todo.id}>
            {todo.edit && (
              <i class="fa-solid fa-check" onClick$={() => updateTodo(idx)} />
            )}
            {!todo.edit && (
              <i class="fa-solid fa-pencil" onClick$={() => goEditing(idx)} />
            )}
            <i
              class="fa-regular fa-square-minus"
              onClick$={() => delTodo(idx)}
            />
            {!todo.edit && todo.todo}
            {todo.edit && (
              <input
                value={editInput.value}
                onInput$={editTodoInputHandler}
                onKeyDown$={(e) => {
                  if (e.key === 'Enter') updateTodo(idx);
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
});
