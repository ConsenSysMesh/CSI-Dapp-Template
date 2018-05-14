//import normal react scaffolding to get app started
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

//import provider and connector from drizzle to ensure contract connectivity
import { DrizzleProvider } from 'drizzle-react'

//import store and options for application to access
import store from './store'
import drizzleOptions from './drizzleOptions'

//import App component (acess to the rest of the application)
import App from './App'
import HomeContainer from './layouts/views/home/HomeContainer'
import Transactions from './layouts/views/transactions/TransactionsContainer'
import { LoadingContainer } from 'drizzle-react-components'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);

/*
Description: DrizzleProvider can take options and store -
  options --> contract instantio and configs across app
  store --> state access across app (redux)

Router would also go here if you want to control the navigation
architecture of the application using react-router-redux and react-router
*/
ReactDOM.render((
    <DrizzleProvider options={drizzleOptions} store={store}>
      <LoadingContainer>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={HomeContainer} />
            <Route exact path="/reports" component={Transactions}/>
          </Route>
        </Router>
      </LoadingContainer>
    </DrizzleProvider>
  ),
  document.getElementById('root')
);
