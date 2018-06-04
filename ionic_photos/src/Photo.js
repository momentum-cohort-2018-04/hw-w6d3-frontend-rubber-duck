import React, { Component } from 'react'
import Unsplash from './Unsplash'

class Photo extends Component {
  render () {
    const typeFxn = this.props.setType
    const arrayFxn = this.props.setArray
    const type = this.props.type
    const origArray = this.props.array

    if (type === 'Search' && origArray.length > 0) {
      const newArray = origArray.map(function (entry, id) {
        return (
          <PhotoModal index={id} entry={entry} array={origArray} key={id} setArray={arrayFxn} />)
      })
      return newArray
    } else if (type === 'Collections' && origArray.length > 0) {
      const newArray = origArray.map(function (entry, id) {
        return (
          <PhotoCollection index={id} entry={entry} array={origArray} key={id} setType={typeFxn} setArray={arrayFxn} />)
      })
      return newArray
    } else {
      return null
    }
  }
}

class PhotoModal extends Component {
  constructor () {
    super()
    this.state = {
      open: false
    }
    this.toggleModal = this.toggleModal.bind(this)
  }
  toggleModal () {
    const boolie = !(this.state.open)
    this.setState({open: boolie})
  }
  likePhoto (event) {
    const photoID = event.target.id
    const photoApi = new Unsplash()
    const array = this.props.array
    const arrayUpdate = this.props.setArray
    const itemIndex = Number(event.target.dataset.index)
    photoApi.likePhoto(photoID)
    array[itemIndex].liked_by_user = true
    arrayUpdate(array)
  }
  unlikePhoto (event) {
    const photoID = event.target.id
    const photoApi = new Unsplash()
    const array = this.props.array
    const arrayUpdate = this.props.setArray
    const itemIndex = Number(event.target.dataset.index)
    photoApi.unlikePhoto(photoID)
    array[itemIndex].liked_by_user = false
    arrayUpdate(array)
  }
  render () {
    let id = this.props.index
    const entry = this.props.array[id]
    let thumbnail = entry.urls.small
    // let thumbnail = entry.urls.thumb
    let description
    if (entry.description) {
      description = entry.description
    } else {
      description = 'No Description'
    }
    let unsplashID = entry.id
    let regularImage = entry.urls.regular
    // let likes = entry.likes // 36
    let userlike = entry.liked_by_user // false
    let photog = convertCase(entry.user.name) // Danny Feng
    let photogUN = entry.user.username // hellodannyfeng
    let portfolio = entry.user.portfolio_url // http://www.hellodannyfeng.com'
    // note there is exif data on the pics (make, model, exposure, aperature, iso)
    // also breakdown of locatiton, coordinate position
    let photoLocate
    if (entry.location) {
      photoLocate = entry.location.title
    }
    if (this.state.open) {
      return (
        <div className='level-item'>
          <figure className='image'>
            <img src={thumbnail} alt={description} onClick={this.toggleModal} />
          </figure>
          <div className='modal is-active red'>
            <div className='modal-background' onClick={this.toggleModal} />
            <div className='modal-content'>
              <p className='image'>
                {!userlike && <img className='modal-image' onDoubleClick={(event) => this.likePhoto(event)} src={regularImage} id={unsplashID} data-index={id} alt={description} />}
                {userlike && <img className='modal-image' onDoubleClick={(event) => this.unlikePhoto(event)} src={regularImage} id={unsplashID} data-index={id} alt={description} />}
              </p>
              {userlike && <div className='favorite' />}
              <ul className='modal-words'>
                <li>Photo by {photog} <small className='float-right'>@{photogUN}</small></li>
                {photoLocate && <li>Taken in {photoLocate}</li>}
                <li className='modal-href'><a href={portfolio}>View Portfolio</a></li>
              </ul>
            </div>
            <button className='modal-close is-large' aria-label='close' onClick={this.toggleModal} />
          </div>
        </div>)
    } else {
      return (
        <div className='level-item preview'>
          <figure className='image preview-img'>
            <img src={thumbnail} alt={description} onClick={this.toggleModal} />
          </figure>
        </div>)
    }
  }
}

class PhotoCollection extends Component {
  constructor () {
    super()
    this.state = {
      open: false
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.pictureAPIREQ = this.pictureAPIREQ.bind(this)
  }
  toggleModal () {
    const boolie = !(this.state.open)
    this.setState({open: boolie})
  }

  pictureAPIREQ (event) {
    event.preventDefault()
    const justID = this.props.entry.id
    const photoApi = new Unsplash()
    const prop = this.props

    let response = photoApi.dummycollectionPhotoSearch(justID)
    prop.setArray([])
    prop.setType('Search')
    prop.setArray(response)

    // photoApi.collectionPhotoSearch(justID)
    //   .then(function (response) {
    //     prop.setArray([])
    //     prop.setType('Search')
    //     prop.setArray(response)
    //   })
  }

  render () {
    const entry = this.props.entry
    const collID = entry.id // 2148809
    const collTitle = convertCase(entry.title) // The Architecture Catwalk"
    const collDesc = entry.description // Buildings looking sharp.
    // curated f , featured, t
    // const colltagsArray = entry.tags
    const collCoverthumb = entry.cover_photo.urls.thumb
    const collpreviewArray = entry.preview_photos
    const colluserName = entry.user.name // "Hello I'm Nik"
    const collUN = entry.user.username // "helloimnik"
    const collUserPortf = entry.user.portfolio_url // "https://www.instagram.com/helloimnik_/"
    const colluserPage = entry.user.links.html // https://unsplash.com/@heysupersimi
    // const collAPIphotos = entry.links.photos // https://api.unsplash.com/collections/2148809/photos
    const previewPhotos = collpreviewArray.map(function (eachphoto, id) {
      let previewID = eachphoto.id
      let previewThumb = eachphoto.urls.small
      return (
        <figure className='image' key={id}>
          <img src={previewThumb} alt={previewID} />
        </figure>
      )
    })

    if (this.state.open) {
      return (
        <div className='level-item'>
          <figure className='image'>
            <img src={collCoverthumb} alt={collTitle} onClick={this.toggleModal} />
          </figure>
          <div className='modal is-active'>
            <div className='modal-background' onClick={this.toggleModal} />
            <div className='modal-content'>
              <ul>
                <li className='modal-href float-right'><small>Collection by</small> <a href={colluserPage}>{colluserName}</a> </li>
                <li><a href='' onClick={this.pictureAPIREQ}><b>{collTitle}</b></a></li>
                <li className='modal-href float-right'><small>@{collUN}</small> | <a href={collUserPortf}><small>View Portfolio</small></a></li>
                <li><i>{collDesc}</i></li>
              </ul>
              <div className='image-collection'>
                {previewPhotos}
              </div>
            </div>
            <button className='modal-close is-large' aria-label='close' onClick={this.toggleModal} />
          </div>
        </div>)
    } else {
      return (
        <ul className='collection-preview'>
          <li><strong>{collTitle}</strong></li>
          <li><div className='green' id={collID}>
            <figure className='image'>
              <img className='green-img' src={collCoverthumb} alt={collTitle} onClick={this.toggleModal} />
            </figure> </div>
          </li>
        </ul>
      )
    }
  }
}

function convertCase (string) {
  let stringArray = string.split(' ')
  for (var i of stringArray) {
    var lowercase = i.substr(1).toLowerCase()
    var uppercase = i.charAt(0).toUpperCase()
    var newWord = uppercase + lowercase
    var indexnumb = stringArray.indexOf(i)
    stringArray.splice(indexnumb, 1, newWord)
  }
  return stringArray.join(' ')
}

export default Photo
