import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import TodoList from './components/TodoList'

const App: React.FC = () => {
  return (
    <div style={{padding: '0 1rem', height: '100vh', backgroundColor: '#f4f6f8'}}>
      <CssBaseline />
      <TodoList/>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
    </div>
  );
}

export default App;
