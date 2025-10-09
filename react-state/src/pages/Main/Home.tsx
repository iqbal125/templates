import React from 'react';
import Hero from './Hero';

const Home: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Welcome to the Todo App</h1>
            <Hero />
        </div>
    );
};

export default Home;

