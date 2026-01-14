import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Store, Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const [keyword, setKeyword] = React.useState('');
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/?keyword=${keyword}`);
            setMobileMenuOpen(false);
        } else {
            navigate('/');
            setMobileMenuOpen(false);
        }
    };

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
            setMobileMenuOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <header className="bg-slate-800 shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-2 md:gap-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 flex-shrink-0" onClick={() => setKeyword('')}>
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center p-1">
                        <img src="/logo.png" alt="Ms Shopping" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-white text-xl font-bold tracking-wide italic hidden md:block">Ms Shopping</span>
                </Link>

                {/* Search Bar - Visible on Mobile now */}
                <form onSubmit={submitHandler} className="flex flex-1 max-w-xl mx-2 md:mx-8 relative">
                    <input
                        type="text"
                        name="q"
                        onChange={(e) => setKeyword(e.target.value)}
                        value={keyword}
                        placeholder="Search..."
                        className="w-full py-1.5 md:py-2 px-3 md:px-4 rounded-sm bg-white text-gray-900 placeholder-gray-500 focus:outline-none shadow-sm text-sm md:text-base"
                    />
                    <button type="submit" className="absolute right-0 top-0 h-full px-2 md:px-4 text-orange-600 bg-white hover:bg-gray-100 rounded-r-sm">
                        <Search size={18} className="md:w-5 md:h-5" />
                    </button>
                </form>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {/* User */}
                    {userInfo ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="text-white font-medium cursor-pointer flex items-center gap-1 hover:text-gray-200"
                            >
                                <User size={20} />
                                <span>{userInfo.name}</span>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 text-left">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logoutHandler();
                                            setDropdownOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="bg-white text-orange-600 px-6 py-1 font-semibold rounded-sm hover:bg-gray-100 transition-colors">
                            Login
                        </Link>
                    )}

                    {/* Admin Link (Conditional) */}
                    {userInfo && userInfo.isAdmin && (
                        <Link to="/admin/dashboard" className="text-white font-medium flex items-center gap-1">
                            <Store size={20} />
                        </Link>
                    )}

                    {/* Cart */}
                    <Link to="/cart" className="flex items-center gap-2 text-white font-medium group bg-slate-700 px-4 py-2 rounded hover:bg-slate-600 transition-colors">
                        <div className="relative">
                            <ShoppingCart size={24} />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-slate-700">
                                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                </span>
                            )}
                        </div>
                        <span className="group-hover:text-gray-200">Cart</span>
                    </Link>
                </nav>

                {/* Mobile Hamburger Button */}
                <button
                    className="md:hidden text-white p-1"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-slate-800 border-t border-slate-700 absolute w-full left-0 shadow-xl z-40">
                    <nav className="flex flex-col p-4 space-y-4">
                        {userInfo ? (
                            <>
                                <div className="text-gray-300 px-2 text-sm">Welcome, {userInfo.name}</div>
                                <Link
                                    to="/profile"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 text-white hover:bg-slate-700 p-2 rounded transition-colors"
                                >
                                    <User size={20} /> Profile
                                </Link>

                                {userInfo.isAdmin && (
                                    <Link
                                        to="/admin/dashboard"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-3 text-white hover:bg-slate-700 p-2 rounded transition-colors"
                                    >
                                        <Store size={20} /> Admin Dashboard
                                    </Link>
                                )}

                                <button
                                    onClick={logoutHandler}
                                    className="flex items-center gap-3 text-white hover:bg-slate-700 p-2 rounded transition-colors w-full text-left"
                                >
                                    <X size={20} /> Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-3 text-white hover:bg-slate-700 p-2 rounded transition-colors"
                            >
                                <User size={20} /> Login
                            </Link>
                        )}
                        <hr className="border-slate-600 my-2" />
                        <Link
                            to="/cart"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 text-white hover:bg-slate-700 p-2 rounded transition-colors"
                        >
                            <div className="relative">
                                <ShoppingCart size={20} />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                    </span>
                                )}
                            </div>
                            Cart
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
