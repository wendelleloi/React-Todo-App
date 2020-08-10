import { createContext } from 'react'
import { TodoStore } from './TodoStore'

export const rootStoreContext = createContext({
  TodoStore: new TodoStore()
})