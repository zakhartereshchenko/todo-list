import { useDispatch, useSelector } from 'react-redux'
import { toggleTodoComplete, removeTodo, openModal } from '../store/todoSlice'

import API from '../hooks/http.hook'

import './TodoListItem.scss'

const TodosListItem = ({ id, text, completed}) => {
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos.todos)
    const handleButtonRemoveTodo = (id) => {
        API.delete(`todos/${id}`)
            .then(dispatch(removeTodo({id})))
            .catch(err => console.log(err))
    }

    const handleButtonToggleComplete = (id) => {
        const todo = todos.filter(item => item.id === id)
        API.put(`todos/${id}`, {id: todo[0].id, text:todo[0].text, completed: !todo[0].completed})
            .then(dispatch(toggleTodoComplete({id})))
            .catch(err => console.log(err))
    }

    const classes = completed ? 'done-todo' : ''

    return(
        <li>
            <input type="checkbox" checked={completed} onChange = {() => handleButtonToggleComplete(id)}/>
            <span id = 'text' className={classes}>{text}</span>
            <div className = "buttons">
                <button onClick = {() => dispatch(openModal({id}))}>Change</button>
                <button onClick = {() => handleButtonRemoveTodo(id)}>Delete</button>
            </div>
        </li>
    )
}

export default TodosListItem