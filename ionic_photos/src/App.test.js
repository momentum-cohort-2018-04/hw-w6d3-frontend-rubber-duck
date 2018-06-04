/* globals test, expect */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { mount } from 'enzyme'

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('functions set this.state values', () => {
  const app = mount(<App />)
  app.importArray([1, 2, 3])
  console.log(app)
  expect(app.state.array).toBe([1, 2, 3])
})

// test('shows title of app', () => {
//   const wrapper = mount(<App />)
//   expect(wrapper.text()).toContain('TweetShrink')
