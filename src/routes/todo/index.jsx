import {
  component$,
  useStylesScoped$,
  useStore,
  $,
  useSignal,
  useClientEffect$,
} from '@builder.io/qwik';
import style from './todo.scss?inline';

export default component$(() => {
  useStylesScoped$(style);
  const todoInput = useSignal('');
  const todoInputHint = useSignal('');
  const editInput = useSignal('');
  const state = useStore(
    {
      todoList: [],
    },
    { recursive: true }
  );

  const saveTodo = $(() => {
    window.localStorage.setItem('todo', JSON.stringify(state.todoList));
  });

  const getTodo = $(() => {
    return JSON.parse(window.localStorage.getItem('todo'));
  });

  useClientEffect$(
    async () => {
      state.todoList = await getTodo();
      console.log(state.todoList);
    },
    {
      eagerness: 'idle', // 'load' | 'visible' | 'idle'
    }
  );

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
    saveTodo();
  });

  const delTodo = $((id) => {
    state.todoList = state.todoList.filter((todo, idx) => idx !== id);
    saveTodo();
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
    saveTodo();
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
