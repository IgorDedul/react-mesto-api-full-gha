function PopupWithForm(props) {
  function handlePopupMouseDown(event) {
    if (event.target === event.currentTarget || event.target.classList.contains('popup__close')) {
      props.onClose();
    }
  }

  return (
    <div className={`popup popup_type_${props.name} popup_background_dark-light ${(props.isOpen) ? 'popup_opened' : ''}`} onMouseDown={handlePopupMouseDown}>
      <div className="popup__container">
        <button className="popup__close link" type="button"></button>
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__submit link" type="submit">{props.buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
