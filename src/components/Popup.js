import React from 'react';

class Popup extends React.Component {
  render() {
    return (
      <div className="popup" onClick={this.props.closePopup}>
          <div className="popup__inner">
            <button className="popup__button_delete popup__button button_delete button" onClick={this.props.deleteImage}>Удалить</button>
            <button
            className="popup__button_close popup__button button_close button"
            onClick={this.props.closePopup}
            >закрыть X</button>
            <img className="popup__image image" src={this.props.popImageUrl} alt="imageItem"/>
          </div>
      </div>
    )
  }
}

export default Popup;