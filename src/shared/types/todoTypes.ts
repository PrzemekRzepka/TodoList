export type TodoItem = {
    id: string,
    text: string,
    isDone: boolean,
    createdAt: string
}

export type TodoList = TodoItem[];