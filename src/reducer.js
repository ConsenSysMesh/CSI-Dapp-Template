// Application's Reducer where universal state is created

/* If you'd like to integrate Drizzle's reducers and sagas with your existing store,
import them for use alongside your existing reducers. In this example, we already
have react-router-redux keeping the state of react-router in our store. */

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { drizzleReducers } from 'drizzle'

const reducer = combineReducers({
  routing: routerReducer,
  ...drizzleReducers
})

export default reducer
