import {configureStore} from '@reduxjs/toolkit'
import todoReducer from './todoSlice'

const stringMiddleware = () => (next) => (action) => {
    if(typeof action === 'string'){
        return next({
            type: action
        })  
    }
    return next(action)
};

export default configureStore ({
    reducer: {
        todos: todoReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})