import React, { Component } from 'react'
import './App.css'
import Unsplash from './Unsplash'
import Photo from './Photo'
require('dotenv').config()

class App extends Component {
  constructor () {
    super()
    this.state = {
      value: '',
      array: []
    }
    this.submit = this.submit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // this.handleChange = this..bind(this)
  }
  submit (event) {
    event.preventDefault()
    const photoApi = new Unsplash()
    const results = photoApi.dummyReturn(this.state.value)
    this.importArray(results)
    console.log('queried!')
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }
  importArray (newarray) {
    this.setState({array: newarray})
  }

  // componentDidUpdate () { // logs the current status of the state properties
  //   console.log('THIS STATE ARRAY', this.state.array)
  //   console.log(this.state.value)
  // }

  render () {
    return (
      <div className='main'>
        <section className='hero is-light'>
          <div className='hero-body has-text-centered'>
            <h1 className='title'>Welcome to React</h1>
            <h2 className='subtitle'>To get started, edit and save to reload.</h2>
          </div>
        </section>
        <section className='level'>
          <div className='level-item has-text-centered'>
            <form onSubmit={this.submit} className='field has-addons'>
              <div className='control'>
                <input className='input' type='text' value={this.state.value} onChange={this.handleChange} placeholder='Text input' />
              </div>
              <div className='control'>
                <button className='button is-primary' >Search</button>
              </div>
            </form>
          </div>
        </section>
        <section className='section'>
          <div className='container'>
            <div className='level photo_column'>
              {/* <Photo array={this.state.array} onClick={}/> */}
              <Photo array={this.state.array} />
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default App
