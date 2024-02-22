
import './App.css';
import TodosList from '../todosList/TodosList';
import TodosAddForm from '../todosAddForm/TodosAddForm'
import Modal from '../modal/Modal';


function App() {
    return (
        <div className="App container">
            <TodosAddForm/>
            <TodosList/>
            <Modal/>
        </div>
        
    );
}

export default App;
