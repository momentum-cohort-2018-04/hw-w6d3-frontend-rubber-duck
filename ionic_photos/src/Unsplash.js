// import request from 'superagent'
import {} from 'dotenv/config'
import response from './Testpull'

// const token = process.env.REACT_APP_ACCESS_TOKEN

class Unsplash {
  // constructor () {}
  dummyReturn (value) {
    console.log('Query Value!!', value)
    return response
  }
  // unsplashSearch () {
  // request.get(`https://api.unsplash.com/photos/random?count=10`)
  // https://api.unsplash.com/search/photos/?query=cat&per_page=20
  // https://api.unsplash.com/search/collections/?query=cat&per_page=20
  // https://api.unsplash.com/collections/featured

  // .set('Authorization', 'Bearer ' + token)
  // .then(function (response) {
  //   const picturearray = response.body
  //   console.log(' response', picturearray)

  // const picturearray = JSON.parse(response.text)
  // })
  // }
}

export default Unsplash
