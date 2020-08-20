import React from 'react';
import './App.scss';
import Form from './components/Form';
import Popup from './components/Popup';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrlArray: [],
      showModal: false,
      showForm: false,
      popImageUrl: '',
      dimensions: {}
    }
  }
  
  imageSubmitter = (imageUrl) => {
    if (imageUrl) {
      let imageUrlsArray = this.state.imageUrlArray;
      imageUrlsArray.push(imageUrl);
      this.setState({
        imageUrlArray: imageUrlsArray
      });
    }
  };

  deleteImage = (e) => {
    this.setState({
      imageUrlArray: this.state.imageUrlArray.filter((url) => url !== this.state.popImageUrl)
    })
  }

  closeForm = (e) => {
    this.setState({
      showForm: !this.state.showForm
    })
  }

  handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let reader = new FileReader();
      if (file.type === 'application/json') {
        reader.onload = (e) => {
          let urls = [];
          JSON.parse(e.target.result).galleryImages.forEach((data) => urls.push(data.url));
          this.setState({
            imageUrlArray: [...this.state.imageUrlArray, ...urls]
          })
        };
        reader.readAsText(file);
      }
      if (file.type.startsWith('image/')) {
        reader.onload = (e) => {
          console.log(e.target.result)
          this.setState({
            imageUrlArray: [...this.state.imageUrlArray, e.target.result]
          })
        };
        reader.readAsDataURL(file);
      }
    }
  }

handlePopup = (url) => {
  this.setState({
    showModal: !this.state.showModal,
    popImageUrl: url
  })
}

openForm = () => this.setState({showForm: true});

onImgLoad = ({target:img}) => {
  let aspectRatio = img.naturalWidth/img.naturalHeight;
  img.parentNode.style.height = 'auto';
  if (window.screen.width < 480) {
    img.parentNode.style.width = aspectRatio*120 + "px";
    img.parentNode.style.flexGrow = aspectRatio*120;
    return;
  }
  img.parentNode.style.width = aspectRatio*200 + "px";
  img.parentNode.style.flexGrow = aspectRatio*200;
  
}

onDragEnter = (e) => {
  e.stopPropagation();
  e.preventDefault();
};

onDragOver = (e) => {
  e.stopPropagation();
  e.preventDefault();
};

onDrop = (e) => {
  e.stopPropagation();
  e.preventDefault();

  let dt = e.dataTransfer;
  let files = dt.files;

  this.handleFiles(files);
};

  render() {
    let imageUrlArray = this.state.imageUrlArray;
    
    const images = imageUrlArray.map((url, index) =>{
    return(
          <div className="main__image-wrapper">
            {<img
              src={url} 
              alt="imageItem"
              onClick={() => this.handlePopup(url)}
              onLoad={this.onImgLoad}
              key={index}
              className="main__image image"
            />}
          </div>
      )
    })
    return (
      <div className="main" onDragEnter={this.onDragEnter} onDragOver={this.onDragOver} onDrop={this.onDrop}>
        {(this.state.showForm || this.state.imageUrlArray.length === 0) && (
        <Form
        closeForm={this.closeForm}
        imageSubmitter={this.imageSubmitter}
        handleFiles={this.handleFiles}
        imageSubmitter={this.imageSubmitter}
        isEmpty={this.state.imageUrlArray.length === 0}
        />)}
        {this.state.imageUrlArray.length !== 0 && (
        <section className="main__container">
          {this.state.showModal && (
          <Popup
          deleteImage={this.deleteImage}
          popImageUrl={this.state.popImageUrl}
          closePopup={this.handlePopup}
          />)}
          {images}
          <button className="main__button_add button_add button" onClick={this.openForm}></button>
        </section>)}
      </div>
    )
  }
}

export default App;
