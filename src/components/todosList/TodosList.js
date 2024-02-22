import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import TodosListItem from "../todoItem/TodosListItem"
import {fetchTodos} from '../store/todoSlice'

import './TodosList.scss'

const TodosList = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchTodos())
        // eslint-disable-next-line
    }, [])

    
    
    const todos = useSelector(state => state.todos.todos)
    const renderTodoList = todos => {
        if(!todos.length) return 0

        const list = todos.map(({id, ...props})=>
            <TodosListItem 
                key={id}
                id = {id}
                {...props}
            />
        )
        return <ul>{list}</ul>
    }
    const emptyList = <span className='emptyList'>Your list is empty</span>
    
    const elements = renderTodoList(todos)
    return (
        
        <>
            {elements || emptyList}
        </>
        
    );
}

export default TodosList