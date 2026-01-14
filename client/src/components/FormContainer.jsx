import React from 'react';

const FormContainer = ({ children }) => {
    return (
        <div className="container mx-auto">
            <div className="flex justify-center mt-10">
                <div className="w-full max-w-xl bg-white p-8 rounded-md shadow-md">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FormContainer;
