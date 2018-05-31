import React, { Component } from 'react'
import './App.css'
import Unsplash from './Unsplash'
require('dotenv').config()

class App extends Component {
  // constructor () {
  //   super()
  // }

  render () {
    // unsplashSearch()
    return (
      <div className='App'>
        <h1 className='App-title'>Welcome to React</h1>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
