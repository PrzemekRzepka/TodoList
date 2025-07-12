import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TodoItem, TodoList } from "../../../shared/types/todoTypes"
import { RootState } from "../../../store"

const initialState: TodoList = []

const todoSlice = createSlice({
    name: "todoSlice",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<TodoItem>) {
            if (action.payload.text !== '') {
                state.push(action.payload)
            } else {
                console.log('empty item')
            }
        },

        addItems(state, action: PayloadAction<TodoList>) {
            return action.payload
        },

        removeItem(state, action: PayloadAction<string>) {
            const itemIndex = state.findIndex(item => item.id === action.payload);

            if (itemIndex === -1) {
                console.log(`Dont found item with id: ${action.payload}`)
                return state
            }
            return state.filter(item => item.id !== action.payload)
        },
        toggleDone(state, action: PayloadAction<string>) {
            return state.map(item =>
                item.id == action.payload ?
                    { ...item, isDone: !item.isDone } : item
            )
        }
    }
})


export const { addItem, addItems, removeItem, toggleDone } = todoSlice.actions
export const selectTodoListItems = (state: RootState) => state.todoSlice
export default todoSlice.reducer;