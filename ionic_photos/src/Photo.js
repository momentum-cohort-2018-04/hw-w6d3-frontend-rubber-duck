import React, { Component } from 'react'
import Unsplash from './Unsplash'

class Photo extends Component {
  // constructor () {
  //   super()
  //   this.setType = this.props.setType.bind(this)
  //   this.setArray = this.props.setArray.bind(this)
  // }
  render () {
    // const type = 'Search'
    // changeType={this.changeType} setArray
    const typeFxn = this.props.setType
    console.log(typeFxn)
    const arrayFxn = this.props.setArray
    console.log('array', arrayFxn)
    const type = this.props.type
    const origArray = this.props.array
    console.log('PROP TYPE', type)
    if (type === 'Search' && origArray.length > 0) {
      const newArray = origArray.map(function (entry, id) {
        return (
          <PhotoModal index={id} entry={entry} array={origArray} key={id} />)
      })
      return newArray
    } else if (type === 'Collections' && origArray.length > 0) {
      const newArray = origArray.map(function (entry, id) {
        return (
          <PhotoCollection index={id} entry={entry} array={origArray} key={id} setType={typeFxn} setArray={arrayFxn} />)
        // setType={() => { typeFxn }} setArray={arrayFxn}
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
  render () {
    let id = this.props.index
    const entry = this.props.array[id]
    let thumbnail = entry.urls.thumb
    let description
    if (entry.description) {
      description = entry.description
    } else {
      description = 'No Description'
    }
    let unsplashID = entry.id
    let regularImage = entry.urls.regular
    // let likes = entry.likes // 36
    // let userlike = entry.liked_by_user // false
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
          <div className='modal is-active blue'>
            <div className='modal-background' onClick={this.toggleModal} />
            <div className='modal-content'>
              <p className='image'>
                <img className='modal-image' src={regularImage} id={unsplashID} alt={description} />
              </p>
              <ul>
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
        <div className='level-item green'>
          <figure className='image green-img'>
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
    const collAPIphotos = this.props.entry.links.photos
    const newUnsplash = new Unsplash()
    const newCollection = newUnsplash.collectionPhotoSearch(collAPIphotos)
    console.log(newCollection)
    this.props.setArray(newCollection)
    this.props.setType('Search')
  }

  render () {
    // let id = this.props.index
    // const entry = this.props.array[id]
    const entry = this.props.entry
    const collID = entry.id // 2148809
    const collTitle = convertCase(entry.title) // The Architecture Catwalk"
    const collDesc = entry.description // Buildings looking sharp.
    // curated f , featured, t
    // const colltagsArray = entry.tags
    const collCoverthumb = entry.cover_photo.urls.thumb

    const collpreviewArray = entry.preview_photos

    const previewPhotos = collpreviewArray.map(function (eachphoto, id) {
      let previewID = eachphoto.id
      let previewThumb = eachphoto.urls.small
      return (
        // <div className='column' key={id}>
        <figure className='image' key={id}>
          <img src={previewThumb} alt={previewID} />
        </figure>
        // </div>
      )
    })
    const colluserName = entry.user.name // "Hello I'm Nik"
    const collUN = entry.user.username // "helloimnik"
    const collUserPortf = entry.user.portfolio_url // "https://www.instagram.com/helloimnik_/"
    const colluserPage = entry.user.links.html // https://unsplash.com/@heysupersimi
    // const collAPIphotos = entry.links.photos // https://api.unsplash.com/collections/2148809/photos
    // const collhtml = entry.links.html // https://unsplash.com/collections/2148809/the-architecture-catwalk

    if (this.state.open) {
      return (
        <div className='level-item'>
          <figure className='image'>
            <img src={collCoverthumb} alt={collTitle} onClick={this.toggleModal} />
          </figure>
          <div className='modal is-active blue'>
            <div className='modal-background' onClick={this.toggleModal} />
            <div className='modal-content'>
              <ul>
                <li className='modal-href float-right'>Collection by <a href={colluserPage}>{colluserName}</a> </li>
                <li><a href='' onClick={this.pictureAPIREQ}><em>{collTitle}</em></a></li>
                <li className='modal-href float-right'><small>@{collUN}</small> | <a href={collUserPortf}>View Portfolio</a></li>
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
