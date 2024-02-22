import { useSelector, useDispatch } from 'react-redux'
import './Modal.scss'
import { closeModal, setNewTodo } from '../store/todoSlice'
import { useState } from 'react'
import API from '../hooks/http.hook'

const Modal = () => {
    const modalStatus = useSelector(state => state.todos.modalStatus)
    const modalContentObject = useSelector(state => state.todos.modalContent)
    const dispatch = useDispatch()

    const [text, setText] = useState('')
    

    const handleButtonSetText = (todo) => {
        const newTodo = {
            text,
            id: todo.id,
            toggledTodo: todo.toggledTodo
        }

        API.put(`todos/${newTodo.id}`, newTodo)
            .then(dispatch(setNewTodo(newTodo)))
            .catch(err => console.log(err))
        
        setText('')
    }

    const handleButtonCloseModal = () => {
        dispatch(closeModal())
        setText('')
    }

    return(
        <div className = {modalStatus ? "modal active" : "modal"} onClick = {()=>handleButtonCloseModal()}>
            <div className={modalStatus ? "modal__content active" : "modal__content"} onClick = {e=>e.stopPropagation()}>
                <div className="container">
                    <h3>Changing text of your todo</h3>
                    <span>
                        Text of yours todo: <br></br>
                        {modalContentObject.text}
                    </span>
                    <span>New text: <input type="text" id ="text" onChange = {e => setText(e.target.value)} value={text} placeholder="Enter your new text for todo.."/></span>
                    <button onClick={()=>handleButtonSetText(modalContentObject)}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default Modal