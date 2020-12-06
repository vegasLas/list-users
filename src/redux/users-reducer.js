export const UPLOAD_USER = 'UPLOAD_USER'
export const SET_USERS = 'SET_USERS'
export const DELETE_USER = 'DELETE_USER'
export const EDIT_USER = 'EDIT_USER'
export const SELECTED_USER = 'SELECTED_USER'
export const SET_FILTER = 'SET_FILTER'



const initialState = {
    users: [],
    selectedUser: {}
}
const usersReducer = (state = initialState, action) => {
    let usersСopy;
    switch (action.type) {
        case SET_USERS: {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case EDIT_USER: {
            debugger
            usersСopy = [...state.users]
            let userIndex = usersСopy.findIndex(u => u.email === action.payload.email)
            usersСopy[userIndex] = { ...usersСopy[userIndex], ...action.payload }
            localStorage.setItem('users', JSON.stringify(usersСopy))
            return {
                ...state,
                users: usersСopy
            }
        }
        case SET_FILTER: {
            const { phone, email, status } = action.filter
            let filteredUsers
            usersСopy = [...state.users]
            debugger
            if (phone.trim() && email.trim() && status.trim()) {
                debugger
                filteredUsers = usersСopy.filter(u => phone === u.phone && email === u.email && status === u.status)
            }
            else if (phone.trim() && email.trim()) {
                debugger
                filteredUsers = usersСopy.filter(u => phone === u.phone && email === u.email)
            }
            else if (phone.trim() && status.trim()) {
                debugger
                filteredUsers = usersСopy.filter(u => phone === u.phone && status === u.status)
            }
            else if (email.trim() && status.trim()) {
                debugger
                filteredUsers = usersСopy.filter(u => email === u.email && status === u.status)
            }
            else if (email.trim()) {
                debugger
                filteredUsers = usersСopy.filter(u => email === u.email)
            }
            else if (status.trim()) {
                debugger
                filteredUsers = usersСopy.filter(u => status === u.status)
            }
            else if (phone.trim()) {
                debugger
                filteredUsers = usersСopy.filter(u => phone === u.phone)
            }
            return {
                ...state,
                filteredUsers: filteredUsers
            }
        }
        case DELETE_USER: {
            usersСopy = [...state.users]
            const newDataUsers = usersСopy.filter(u => u.email !== action.email)
            debugger
            localStorage.setItem('users', JSON.stringify(newDataUsers))
            return {
                ...state,
                users: newDataUsers
            }
        }
        case SELECTED_USER: {
            usersСopy = [...state.users]
            let userIndex = usersСopy.findIndex(u => u.email === action.email)
            const newUser = usersСopy[userIndex]
            debugger
            return {
                ...state,
                selectedUser: newUser
            }
        }
        case UPLOAD_USER: {
            usersСopy = [...state.users]
            usersСopy.push(action.payload)

            return {
                ...state,
                users: usersСopy
            }
        }
        default:
            return state
    }
}
export const actions = {
    uploadUser: (name, surname, patronymic, phone, status, createdAt) => (
        { type: UPLOAD_USER, payload: { name, surname, patronymic, phone, status, createdAt } }),
    setUsers: (users) => ({ type: SET_USERS, users }),
    deleteUsers: (email) => ({ type: DELETE_USER, email }),
    editUser: (name, surname, patronymic, email, phone, status, editAt) => ({
        type: EDIT_USER, payload: { name, surname, patronymic, email, phone, status, editAt }
    }),
    selectUser: (email) => ({ type: SELECTED_USER, email }),
    setFilter: (phone, email, status) => ({ type: SET_FILTER, filter: { phone, email, status } }),

}

export const getUsers = () => async (dispatch) => {
    const usersLocal = await JSON.parse(localStorage.getItem('users'))
    if (!usersLocal) {
        localStorage.setItem("users", JSON.stringify([]))
    }
    dispatch(actions.setUsers(usersLocal))

}
export default usersReducer