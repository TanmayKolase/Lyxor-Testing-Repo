import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import cartReducer from './reducers/cartReducer';
import { loadCartFromStorage } from './actions/cartActions';

const store = createStore(cartReducer, applyMiddleware(thunk));

// Load cart from localStorage on startup
store.dispatch(loadCartFromStorage());

export default store;

