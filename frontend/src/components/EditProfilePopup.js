import React from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useFormValidation from '../hooks/useFormValidation';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, onLoading}) => {
    const currentUser = useContext(CurrentUserContext);

    const { enteredValues, errors, handleChange, isFormValid, resetForm } =
    useFormValidation();

    // Переменные с стейтами имени и информации о пользователе
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
 
    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]); 


    // Функция-обработчик изменения инпута имени обновляет стейт name
    function handleChangeName(e) {
        setName(e.currentTarget.value);
    }
    
    // Функция-обработчик изменения инпута занятия обновляет стейт description
    function handleChangeDescription(e) {
        setDescription(e.currentTarget.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
          name,
          about: description,
        });
      } 
  

    return (
        <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isLoading={onLoading}>
        <label className="popup__field">  
          <input
              type="text"
              id="name-input"
              className="popup__input popup__name-input"
              name="userName"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              onChange={handleChangeName}
              value={name || ''}
              required
          />
          <span id="name-input-error" className="popup__input-error"/>
        </label>
        <label className="popup__field">  
          <input
              type="text"
              id="about-input"
              className="popup__input popup__input_edit-about"
              name="about"
              placeholder="О себе"
              minLength="2"
              maxLength="200"
              onChange={handleChangeDescription}
              value={description || ''}
              required
          />
          <span id="about-input-error" className="popup__input-error"/>
        </label>  
      </PopupWithForm>
    );
  };
  
  export default EditProfilePopup;