import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md">
            <nav className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
                        Todo App
                    </Link>
                    <div className="flex space-x-6">
                        <Link to="/" className="text-blue-600 hover:underline">
                            Home
                        </Link>
                        <Link to="/todos" className="text-blue-600 hover:underline">
                            Todos
                        </Link>
                        <Link to="/todos-query" className="text-blue-600 hover:underline">
                            Todos (React Query)
                        </Link>
                        <Link to="/tasks" className="text-blue-600 hover:underline">
                            Tasks
                        </Link>
                        <Link to="/auth" className="text-blue-600 hover:underline">
                            Login / Sign Up
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
