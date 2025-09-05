import React from 'react';

interface ErrorMessageProps {
    error: Error | null;
    message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, message }) => {
    return (
        <div className="text-red-600 text-center py-4">
            <p>{message || `Error: ${error?.message || 'Something went wrong'}`}</p>
        </div>
    );
};

export default ErrorMessage;
