import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import './CreateEditUser.css'
import { useDispatch } from 'react-redux'
import { actions } from '../redux/users-reducer'
import { Redirect } from 'react-router-dom'
import { createField, Input } from '../validate/FormControl'
import classes from '../validate/FormControl.module.css'
import { required, email, minValue11, number } from '../validate/validate'


const CreateUserForm = ({ handleSubmit, error }) => {

    return (
        <form className='user-form__form' onSubmit={handleSubmit}>
            {createField('Имя', 'name', [required], Input)}
            {createField('Фамилия', 'surname', [required], Input)}
            {createField('Отчесво', 'patronymic', [required], Input)}
            {createField('Телефон', 'phone', [required, number, minValue11], Input)}
            {createField('Email', 'email', [required, email], Input)}
            {createField('Password', 'password', [required, minValue11], Input,  { type: 'password' })}
            <Field validate={[required]} className='user-form__select' name="status" component="select" >
                <option value="client">client</option>
                <option value="partner">partner</option>
                <option value="admin">admin</option>
            </Field>
            {error && <div className={classes.formSummaryError}>{error}</div>}
            <button className='user-form__button'
                type="submit">Создать</button>
        </form>
    )
}
const CreateUser = reduxForm({ form: 'user' })(CreateUserForm)
const CreateUserComponent = () => {
    const dispatch = useDispatch()

    const [isState, setIsState] = useState(false)
    if (isState) {
        return <Redirect to='/list' />
    }
    const onSubmit = (formData) => {
        console.log(formData)
        formData.createdAt = new Date().toISOString()
        let usersLocal = JSON.parse(localStorage.getItem('users'))
        usersLocal.push(formData)
        localStorage.setItem('users', JSON.stringify(usersLocal))
        dispatch(actions.uploadUser(
            formData.name,
            formData.surname,
            formData.patronymic,
            formData.phone,
            formData.status,
            formData.createdAt
        ))
        setIsState(true)
    }
    return (
        <div className='user-form'>
            <CreateUser onSubmit={onSubmit} />
        </div>
    )
}

export default CreateUserComponent