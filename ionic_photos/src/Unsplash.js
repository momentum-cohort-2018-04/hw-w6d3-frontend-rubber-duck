import request from 'superagent'
import {} from 'dotenv/config'
import response from './Testpull'
import collectionz from './Collections'
import collectionPhotos from './Collection_photos'
const token = process.env.REACT_APP_ACCESS_TOKEN

class Unsplash {
  dummyReturn (value) {
    console.log('Query Value!!', value)
    return response
  }
  // request.get(`https://api.unsplash.com/photos/random?count=10`)
  // https://api.unsplash.com/collections/featured

  generalSearch (value) {
    return (
      request.get(`https://api.unsplash.com/search/photos/?query=${value}&per_page=20`)
        .set('Authorization', 'Bearer ' + token)
        .then(function (response) {
          console.log(response.body.results)
          return response.body.results
        })
    )
  }

  // collectionSearch (value) {
  //   return (
  //     request.get(`https://api.unsplash.com/search/collections/?query=${value}&per_page=20`)
  //       .set('Authorization', 'Bearer ' + token)
  //       .then(function (response) {
  //         console.log(response.body.results)
  //         return response.body.results
  //       })
  //   )
  // }

  dummycollectionSearch (value) {
    // dummy
    console.log('colls Value', value)
    // console.log(collectionz)
    return collectionz
  }

  collectionPhotoSearch (collectionID) {
    return (
      request.get(`https://api.unsplash.com/collections/${collectionID}/photos`)
        .set('Authorization', 'Bearer ' + token)
        .then(function (response) {
          console.log(response)
          return response.body
        })
    )
  }

  dummycollectionPhotoSearch (value) {
    console.log('col photo s Value', value)
    // dummy
    return (collectionPhotos)
  }

  likePhoto (photoid) {
    return (
      request.post(`https://api.unsplash.com/photos/${photoid}/like`)
        .set('Authorization', 'Bearer ' + token)
        .then(function (response) {
          if (response.body.photo.id === photoid) {
            console.log(`Photo ${photoid} Liked!`)
          }
          console.log(response)
        })
    )
  }

  unlikePhoto (photoid) {
    return (
      request.delete(`https://api.unsplash.com/photos/${photoid}/like`)
        .set('Authorization', 'Bearer ' + token)
        .then(function (response) {
          // if (response.body.photo.id === photoid) {
          //   console.log(`Photo ${photoid} Liked!`)
          // }
          console.log('DELETED', response)
        })
    )
  }
}

export default Unsplash
