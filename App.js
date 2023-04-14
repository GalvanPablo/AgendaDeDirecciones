import React from 'react';

// redux
import { Provider } from 'react-redux'
import store from './store'

// navigation
import MainNavigator from './navigation'

// db
import { init } from './db'

init()
  .then(() => console.log('Initialized database'))
  .catch(err => {
    console.log('Initializing db failed.')
    console.log(err.message)
  })

export default function App() {
  return (<Provider store={store}><MainNavigator /></Provider>);
}
