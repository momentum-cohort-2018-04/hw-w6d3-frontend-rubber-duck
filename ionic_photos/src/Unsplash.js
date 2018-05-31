import request from 'superagent'
import {} from 'dotenv/config'

const token = process.env.REACT_APP_ACCESS_TOKEN

class Unsplash {
  // constructor () {}

  unsplashSearch () {
    request.get(`https://api.unsplash.com/photos/random?count=10`)
    // https://api.unsplash.com/search/photos/?query=cat&per_page=20
    // https://api.unsplash.com/search/collections/?query=cat&per_page=20
    // https://api.unsplash.com/collections/featured

      .set('Authorization', 'Bearer ' + token)
      .then(function (response) {
        const picturearray = response.body
        console.log(' response', picturearray)

        // const picturearray = JSON.parse(response.text)
      })
  }
}

export default Unsplash
