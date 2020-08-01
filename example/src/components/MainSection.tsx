import * as React from 'react'
import Footer from './Footer'
import TodoList from './TodoList'
import { useSelector, dispatch } from '../stores/todoStore'

const MainSection = () => {
  const todos = useSelector(S => S.todos)
  const todosCount = todos.length
  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <section className="main">
      <React.Fragment>
        {!!todosCount && (
          <span>
            <input className="toggle-all" type="checkbox" />
            <label onClick={() => dispatch('completeAllTodos')} />
          </span>
        )}
        <TodoList />
        {!!todosCount && (
          <Footer
            completedCount={completedCount}
            activeCount={todosCount - completedCount}
            onClearCompleted={() => dispatch('clearCompleted')}
          />
        )}
      </React.Fragment>
    </section>
  )
}

export default MainSection
