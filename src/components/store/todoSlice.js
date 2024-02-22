import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
        const res = await axios({
                baseURL: 'http://localhost:3001/',
                url: 'todos',
                method: 'GET',
            })
            return res.data
    }
)

const todoSlice = createSlice({
    name: 'todos',
    initialState:{
        todos: [],
        todosLoadingStatus: 'idle',
        modalStatus: false,
        modalContent: []
    },
    reducers:{
        addTodo(state, action) {
            if(action.payload){
                state.todos.push(action.payload)
            }
        },
        removeTodo(state, action) {
            if(action.payload.id){
                state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
            }
        },
        toggleTodoComplete(state, action) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id)
            toggledTodo.completed = !toggledTodo.completed
        },
        // toggleModalStatus(state) {
        //     state.modalStatus = !state.modalStatus
        // },
        // setModalContent(state, action) {
        //     state.modalContent = action.payload.text
        // },
        openModal(state, action){
            state.modalStatus = true
            state.modalContent = state.todos.find(todo => todo.id === action.payload.id)
        },
        closeModal(state){
            state.modalStatus = false
            state.modalContent = ''
        },
        setNewTodo(state, action){
            if(action.payload.text){
                const todo = state.todos.find(todo => todo.id === action.payload.id)
                todo.text = action.payload.text
                state.modalStatus = false
                state.modalContent = ''
            }
            
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.todosLoadingStatus = 'loading'
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload
                state.todosLoadingStatus = 'idle'
            })
            .addCase(fetchTodos.rejected, state => {
                state.todosLoadingStatus = 'error'
            })
            .addDefaultCase(()=>{})
    }
})

export const {addTodo, removeTodo, toggleTodoComplete, openModal, closeModal, setNewTodo} = todoSlice.actions

export default todoSlice.reducer