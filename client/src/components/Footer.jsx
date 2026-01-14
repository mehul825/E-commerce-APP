import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-white py-6 mt-10">
            <div className="container mx-auto text-center">
                <p>Ms Shopping &copy; {currentYear}</p>
            </div>
        </footer>
    );
};

export default Footer;
