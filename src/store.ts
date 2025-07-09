import { configureStore } from "@reduxjs/toolkit";
import todotodoSlice from "./features/todoList/slices/todo"


export const store = configureStore({
    reducer: {
        todoSlice: todotodoSlice
    }
})

export type RootState = ReturnType<typeof store.getState>