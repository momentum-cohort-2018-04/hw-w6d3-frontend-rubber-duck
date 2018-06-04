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
      array: [],
      type: 'Search'
    }
    this.submit = this.submit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.changeType = this.changeType.bind(this)
    this.importArray = this.importArray.bind(this)
    this.setType = this.setType.bind(this)
  }
  submit (event) {
    event.preventDefault()
    const photoApi = new Unsplash()
    if (this.state.type === 'Search') {
      let response = photoApi.dummyReturn(this.state.value)
      this.importArray(response)
      // photoApi.generalSearch(this.state.value).then(result => {
      //   this.importArray(result)
      // })
    } else if (this.state.type === 'Collections') {
      let response = photoApi.dummycollectionSearch(this.state.value)
      this.importArray(response)
      // photoApi.collectionSearch(this.state.value)
      //   .then(result => {
      //     this.importArray(result)
      //   })
    } else {}
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }
  importArray (newarray) {
    this.setState({array: newarray})
  }
  changeType (event) {
    this.setState({type: event.target.innerHTML})
    this.importArray([])
  }
  setType (value) {
    this.setState({type: value})
  }
  // componentDidUpdate () { // logs the current status of the state properties
  // //   console.log('THIS STATE ARRAY', this.state.array)
  //   console.log(this.state.type)
  // }

  render () {
    return (
      <section className='hero is-light is-fullheight'>
        <div className='hero-head'>
          <nav className='navbar-brand'>
            {this.state.type === 'Search' && <a className='navbar-item is-active' onClick={this.changeType}>Search</a>}
            {this.state.type === 'Collections' && <a className='navbar-item' onClick={this.changeType}>Search</a>}
            {this.state.type === 'Collections' && <a className='navbar-item is-active' onClick={this.changeType}>Collections</a>}
            {this.state.type === 'Search' && <a className='navbar-item' onClick={this.changeType}>Collections</a>}
          </nav>
        </div>
        <div className='hero-body'>
          <section className='level center has-text-centered'>
            <div className='level-item'>
              <h1 className='title'>PhotoDiving</h1>
            </div>
            <div className='level-item'>
              <h2 className='subtitle'>Look, I'm bad at</h2>
            </div>
            <div className='level-item '>
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
            <div className='level-item'>
              <div className='level photo_column'>
                <Photo array={this.state.array} type={this.state.type} setType={this.setType} setArray={this.importArray} />
              </div>
            </div>
          </section>
        </div>
        <div className='hero-foot' />
      </section>

    )
  }
}

export default App
