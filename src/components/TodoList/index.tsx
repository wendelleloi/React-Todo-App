import React, { useState } from "react";
import { observer } from "mobx-react";
import TodoItem from "../TodoItem";
import { useStores } from "../../use-stores";
import { Container, StyledHeader, StyledTodoList } from './styles'
import { Button } from "@material-ui/core";
import ModalNewTodo from "../ModalNewTodo";

const TodoList = observer(() => {

  const [modalNewTodoIsOpen, setModalNewTodo] = useState(false);
  const { TodoStore } = useStores()

  return (
    <>

      {modalNewTodoIsOpen && (
        <ModalNewTodo
          isOpen={modalNewTodoIsOpen}
          closeModal={() => setModalNewTodo(false)}
        />
      )}

      <Container>
        <StyledHeader>
          <h2> My Todo Mobx </h2>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setModalNewTodo(true)}
          >
            Adicionar novo
          </Button>
        </StyledHeader>

        <StyledTodoList>
          { TodoStore.incompleteTodos.map(todo => {
            return <TodoItem key={todo.id} todo={todo}/>
          }) }
        </StyledTodoList>

        <h3>completed {TodoStore.todoProgress}</h3>
        <StyledTodoList>
          { TodoStore.completedTodos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} />
          }) }  
        </StyledTodoList>
      </Container>
    </>
  )
})

export default TodoList