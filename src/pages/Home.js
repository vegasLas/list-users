import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import UsersList from './UsersList'
import CreateUserComponent from './CreateUser'
import './home.css'
import EditUserComponent from './EditUser'

export default function Home() {
    return (
        <div className='home'>
            <Switch>
                <Route path='/' render={() => <UsersList />} ></Route>
                <Route path='/create' render={() => <CreateUserComponent />} ></Route>
                <Route path='/edit' render={() => <EditUserComponent />} ></Route>
            </Switch>
        </div >
    )
}
