import React, { useState } from 'react'
// IMPORT INTERFACE HERE
import { ITodo } from '../../store/TodoStore'
// IMPORT TODOSTORE CONTEXT HERE
import { useStores } from '../../use-stores'
//IMPORT OBSERVER REACT HERE
import { observer } from 'mobx-react'
// IMPORT HERE STYLES
import { StyledTodoItem } from "./styles";
import FlexContainer from "./../FlexContainer";
// IMPORT HERE MATERAL UI COMPONENTS
import { Button, Checkbox, IconButton, TextField } from "@material-ui/core";
// IMPORTE HERE EXTERNAL ICONS
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

// SET THE INTERFACE HERE
interface IProps {
  todo: ITodo;
}

const TodoItem = observer(({todo}: IProps) => {
  const { TodoStore } = useStores()

  const [editMode, setEditMode] = useState(false);
  const [formValue, setFormvalue] = useState(todo.text);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = {
      ...todo,
      text: formValue
    };
    TodoStore.updateTodo(newTodo);
    setEditMode(false);
  }

  return (
    <StyledTodoItem>
      <FlexContainer>

        <Checkbox
            checked={todo.completed}
            onChange={() => TodoStore.toggleCompleted(todo.id)}
          />
        {!editMode && <div onClick={() => setEditMode(true)}>{todo.text}</div>}
        {editMode && (
          <form action="" onSubmit={handleSubmit}>
            <TextField
              style={{ marginRight: 10 }}
              value={formValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormvalue(e.target.value)
              }
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginRight: 10 }}
            >
              Save
            </Button>
            <Button type="button" onClick={() => setEditMode(false)}>
              cancel
            </Button>
          </form>
        )}

      </FlexContainer>
        <div>
          <IconButton onClick={() => setEditMode(!editMode)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => TodoStore.deleteTodo(todo.id)}>
            <DeleteIcon />
          </IconButton>
        </div>

    </StyledTodoItem>
  )
})

export default TodoItem