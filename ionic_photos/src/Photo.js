import React, { Component } from 'react'

class Photo extends Component {
  render () {
    const origArray = this.props.array
    const newArray = origArray.map(function (entry, id) {
      return (
        <PhotoModal index={id} entry={entry} array={origArray} key={id} />)
    })
    return newArray
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
    let photog = entry.user.name // Danny Feng
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

export default Photo
