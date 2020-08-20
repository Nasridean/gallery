import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
    }
  }
  handleLinkChange = (e) => {
    e.preventDefault();
    this.setState({
      imageUrl: e.target.value
    });
  };

  submit = (e) => {
    e.preventDefault();
    this.props.imageSubmitter(this.state.imageUrl);
  }

  render() {
    return (
        <form onSubmit={this.props.imageSubmitter} className={this.props.isEmpty ? "form_empty" : "form"}>
         {!this.props.isEmpty && (<button className="form__button_close button_close button" onClick={this.props.closeForm}>Закрыть X</button>)}
          <p className="form__p_first form__p">Вставьте ссылку к картинке</p>
          <input type="text"
          className="form__input_text input_text"
          placeholder="Вставьте ссылку сюда"
          onChange={this.handleLinkChange}
          />
          <button type="submit" className="form__button_3d button_3d button" onClick={this.submit}>Вставить</button>
          <p className="form__p_second form__p">или</p>
          <input className="input_file" type="file" accept=".json, image/*" onChange={(e) => this.props.handleFiles(e.target.files)} id="input" multiple />
          <p className="form__p_third form__p">Загрузите <label htmlFor="input" className="form__label_input">файл</label></p>

        </form>
    )
  }
}

export default Form;