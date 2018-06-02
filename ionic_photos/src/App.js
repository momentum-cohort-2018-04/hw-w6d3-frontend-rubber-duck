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
  }
  submit (event) {
    event.preventDefault()
    const photoApi = new Unsplash()
    photoApi.generalSearch(this.state.value).then(result => {
      this.importArray(result)
    })
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
      <section className='hero is-light is-fullheight'>
        <div className='hero-head'>
          <header className='navbar' />
        </div>
        <div className='hero-body '>
          <section className='level center has-text-centered '>
            <div className='level-item'>
              <h1 className='title'>Title</h1>
            </div>
            <div className='level-item'>
              <h2 className='subtitle'>Subtitle</h2>
            </div>
            <div className='level-item'>
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
          <section className='level center full'>
            <div className='level-item orange'>
              {/* <div className='container pink'> */}
              <div className='level photo_column red'>
                {/* <Photo array={this.state.array} onClick={}/> */}
                <Photo array={this.state.array} />
              </div>
              {/* </div> */}
            </div>
          </section>
        </div>
        <div className='hero-foot' />
      </section>

    )
  }
}

export default App
