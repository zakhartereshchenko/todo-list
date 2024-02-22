import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../store/todoSlice'
import API from '../hooks/http.hook'

import './TodosAddForm.scss'

const TodosAddForm = () => {
    const dispatch = useDispatch()

    const [text, setText] = useState('')

    const handleButtonNewTask = (e) => {
        e.preventDefault()
        if(text.length){

            const newTodo = 
                {
                    id: new Date().toISOString(),
                    text,
                    completed: false
                }

            API.post('todos', newTodo)
                .then(dispatch(addTodo(newTodo)))
                .catch(err => console.log(err))
            setText('')
        }
    }

    return(
        <label>
            <input type="text" value = {text || ''} onChange={(e)=>setText(e.target.value)}/>
            <button onClick = {handleButtonNewTask}>Add Todo</button>
        </label>
    )
}

export default TodosAddForm