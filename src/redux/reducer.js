import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from "./actionTypes";

const initialState = {
  totalTodo: 1,
  todos: [{ title: "Read a Book", done: false }]
};
function reducer(state = initialState, action) {
  const updatedTodos = state.todos.slice();
  switch (action.type) {
    case ADD_TODO:
      updatedTodos.push({ title: action.title, done: false });
      return {
        ...state,
        ...{
          totalTodo: state.totalTodo + 1,
          todos: updatedTodos
        }
      };
    case REMOVE_TODO:
      updatedTodos.splice(action.index, 1);
      return {
        ...state,
        ...{
          totalTodo: state.totalTodo - 1,
          todos: updatedTodos
        }
      };
    case TOGGLE_TODO:
      updatedTodos[action.index].done = !updatedTodos[action.index].done;
      return {
        ...state,
        ...{
          todos: updatedTodos
        }
      };
    default:
      return state;
  }
}

export default reducer;