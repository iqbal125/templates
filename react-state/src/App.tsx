import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Main/Home';
import Todo from './pages/Todo';
import TodoQuery from './pages/TodoQuery';
import UserAuth from './pages/Auth';
import TaskPage from './pages/Task';


const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos" element={<Todo />} />
            <Route path="/todos-query" element={<TodoQuery />} />
            <Route path="/auth" element={<UserAuth />} />
            <Route path="/tasks" element={<TaskPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
