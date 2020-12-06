import React, { useState, useEffect } from 'react'
import './UsersList.css'
import './CreateEditUser.css'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersSel, getFilteredUsersrSel } from '../selectors/users-selectors'
import { getUsers, actions } from '../redux/users-reducer'

const User = ({ selectUser, key, name, surname, patronymic, phone, status, createdAt, deleteUser, email }) => {
    return (
        <div key={key} className='user'>
            <div className='user__bio'>
                <div>{name}</div>
                <div>{surname}</div>
                <div>{patronymic}</div>
                <div>{phone}</div>
                <div>{email}</div>

            </div>
            <div className='user_status'>
                <div>{status}</div>
                <div>{createdAt}</div>
                <button onClick={() => deleteUser(email)}>Удалить пользователя</button>
                <button onClick={() => selectUser(email)}>Редактировать</button>
            </div>
        </div>
    )
}
export default function UsersList() {
    const [values, setValues] = useState({
        phone: '',
        email: '',
        status: ''
    })
    const users = useSelector(getUsersSel)
    const filteredUsers = useSelector(getFilteredUsersrSel)
    const deleteUser = (email) => dispatch(actions.deleteUsers(email))

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
    }, [])
    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(actions.setFilter(
            values.phone, values.email, values.status
        ))
    }
    const [isState, isSetState] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    if (isEdit) { return <Redirect to='/edit' /> }
    if (isState) { return <Redirect to='/create' /> }
    const selectUser = (email) => {
        dispatch(actions.selectUser(email))
        setIsEdit(true)
    }
    const onChange = (event) => setValues({ ...values, [event.target.name]: event.target.value })

    return (
        <div className="usersList">
            <h2 className='usersList_title'>Список пользователей </h2>
            <button className='usersList__button' onClick={() => isSetState(true)}>Добавить пользователя</button>
            <form className='filtered_form' onSubmit={onSubmit}>
                <span className='filterfield_title'>Фильтр:</span>
                <input className='filterfield' name='phone' onChange={onChange} value={values.phone} placeholder='Номер' />
                <input className='filterfield' name='email' onChange={onChange} value={values.email} placeholder='Почта' />
                <select name='user__select' value={values.status} onChange={onChange} name='status' >
                    <option>client</option>
                    <option>partner</option>
                    <option>admin</option>
                </select>
                <button>Найти</button>
            </form>
            {(filteredUsers ? filteredUsers : users).map(u => <User
                key={u.email}
                deleteUser={deleteUser}
                selectUser={selectUser}
                name={u.name}
                surname={u.surname}
                patronymic={u.patronymic}
                email={u.email}
                phone={u.phone}
                status={u.status}
                createdAt={u.createdAt} />)}

        </div>
    )
}
