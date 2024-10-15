import { configureStore, type Middleware } from '@reduxjs/toolkit'
import usersReducer, { rollbackUser, UserWithId } from './users/slice'
import { toast } from 'sonner'

const persistanceLocalStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    next(action)
    localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
  }

const syncWithDatabase: Middleware = (store) => (next) => (action) => {
  const { type, payload } = action
  const previousState = store.getState()
  // fase 1 👆
  next(action)
  // fase 2 👇

  if (type === 'users/deleteUserById') {
    const userIdToRemove = payload
    const userToRemove = previousState.users.find(
      (user: UserWithId) => user.id === payload
    )

    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          toast.success(`Usuario ${userIdToRemove} eliminado correctamente`)
        }
      })
      .catch((err) => {
        toast.error(`Error deleting user ${userIdToRemove}`)
        if (userToRemove) store.dispatch(rollbackUser(userToRemove))
        console.log(err)
      })
  }
}

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: [persistanceLocalStorageMiddleware, syncWithDatabase],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
