import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSelectedUserSel } from '../selectors/users-selectors'
import { actions } from '../redux/users-reducer'
import './CreateEditUser.css'
import { Redirect } from 'react-router-dom'

const ProfileStatusWithHooks = () => {
    const getSelectedUser = useSelector(getSelectedUserSel)
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        name: getSelectedUser.name,
        surname: getSelectedUser.surname,
        patronymic: getSelectedUser.patronymic,
        phone: getSelectedUser.phone,
        email: getSelectedUser.email,
        status: getSelectedUser.status,
        isState: false
    })
    if (values.isState || !getSelectedUser.name) {
        return <Redirect to='/list' />
    }

    const editUserDis = (name, surname, patronymic, email, phone, status, editAt) => dispatch(
        actions.editUser(name, surname, patronymic, email, phone, status, editAt)
    )
    const onChange = (event) => setValues({ ...values, [event.target.name]: event.target.value })
    const onSubmit = event => {
        event.preventDefault();
        editUserDis(values.name, values.surname, values.patronymic, values.email, values.phone, values.status)
        setValues({ ...values, isState: true })
    }
    return (
        <div className='user-form'>
            <form className='user-form__form' onSubmit={onSubmit} >
                <input
                    className='user-form__input'
                    onChange={onChange}
                    name="name"
                    value={values.name}
                />
                <input
                    className='user-form__input'
                    onChange={onChange}
                    name="surname"
                    value={values.surname} />
                <input
                    className='user-form__input'
                    onChange={onChange}
                    name="patronymic"
                    value={values.patronymic} />
                <input
                    className='user-form__input'
                    onChange={onChange}
                    name="phone"
                    value={values.phone} />
                <input
                    className='user-form__input'
                    onChange={onChange}
                    name="email"
                    value={values.email} />
                <select className='user-form__input' onChange={onChange} name='status' >
                    <option>client</option>
                    <option>partner</option>
                    <option>admin</option>
                </select>
                <button className='user-form__button' >
                    Изменить
            </button>
            </form >
        </div >
    )
}

export default ProfileStatusWithHooks