import React from 'react';
import { Link } from 'react-router';

const Navigation: React.FC = () => {
    return (
        <nav className="bg-white shadow px-4 py-2 flex space-x-4">
            <Link to="/" className="text-blue-600 hover:underline">
                Home
            </Link>
        </nav>
    );
};

export default Navigation;
