import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TodoItem, TodoList } from "../../../shared/types/todoTypes"
import { RootState } from "../../../store"

const initialState: TodoList[] = []

const todoSlice = createSlice({
    name: "todoSlice",
    initialState,
    reducers: {
        addList(state, action: PayloadAction<Omit<TodoList, 'items'>>) {
            state.push({
                id: action.payload.id,
                title: action.payload.title,
                createdAt: action.payload.createdAt,
                items: []
            })
        },
        removeList(state, action: PayloadAction<string>) {
            return state.filter(item => item.id !== action.payload)
        },
        addLists(state, action: PayloadAction<TodoList[]>) {
            return action.payload
        },
        addItem(state, action: PayloadAction<{ listId: string, item: TodoItem }>) {
            const list = state.find(list => list.id === action.payload.listId)
            if (list) {
                list.items.push(action.payload.item);
            }
        },
        removeItem(state, action: PayloadAction<{ listId: string, itemId: string }>) {
            const list = state.find(list => list.id === action.payload.listId);
            if (list) {
                list.items = list.items.filter(item => item.id !== action.payload.itemId);
            }
        },
        toggleDone(state, action: PayloadAction<{ listId: string, itemId: string }>) {
            const list = state.find(list => list.id === action.payload.listId);
            if (list) {
                const item = list.items.find(item => item.id === action.payload.itemId);
                if (item) {
                    item.isDone = !item.isDone
                }
            }

        }
    }
})


export const { addList, removeList, addLists, addItem, removeItem, toggleDone } = todoSlice.actions
export const selectTodoLists = (state: RootState) => state.todoSlice

export default todoSlice.reducer;