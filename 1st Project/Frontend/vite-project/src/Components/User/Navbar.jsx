import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './i18n';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const { i18n } = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogOut = () => {
        Cookies.remove('setPhoneNumber');
        navigate('/home');
    };

    const handleLogIn = () => {
        Cookies.set('currentLocation', location.pathname);
        navigate('/landingpage');
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const phoneNumberFromCookie = Cookies.get('setPhoneNumber');
    const isAboutUs = location.pathname === '/about-us';
    const changeLanguage = (event) => {
        const language = event.target.value;
        setCurrentLanguage(language);
        i18n.changeLanguage(language)
        
    };

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'od', label: 'Odia' }
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full h-[12vh] z-50 transition-all duration-300 ease-in-out flex items-center ${isScrolled || isAboutUs ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-700 to-blue-900 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <span className="text-white font-bold text-xl">G</span>
                    </div>
                    <div>
                        <h1 className="text-blue-900 font-bold text-xl transition-colors duration-300">GrievEase</h1>
                        <p className="text-xs text-blue-700">Government Grievance Portal</p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="text-blue-900 hover:text-blue-700 font-medium relative group">
                        Home
                        <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${location.pathname === '/home' || location.pathname === '/' ? 'w-full' : ''}`}></span>
                    </Link>
                    <Link to="/about-us" className="text-blue-900 hover:text-blue-700 font-medium relative group">
                        About Us
                        <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${location.pathname === '/about-us' ? 'w-full' : ''}`}></span>
                    </Link>

                    {/* Language Selector */}
                    <select
                        value={currentLanguage}
                        onChange={changeLanguage}
                        className="text-blue-800 hover:text-blue-600 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        {languages.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                                {lang.label}
                            </option>
                        ))}
                    </select>

                    {phoneNumberFromCookie && (
                        <Link to="/mygrievance" className="text-blue-900 hover:text-blue-700 pb-0.5 font-medium relative group">
                            My Grievance
                            <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${location.pathname === '/mygrievance' ? 'w-full' : ''}`}></span>
                        </Link>
                    )}

                    <button onClick={!phoneNumberFromCookie ? handleLogIn : handleLogOut} className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-5 py-2 rounded-full cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
                        {!phoneNumberFromCookie ? 'Log In' : 'Log Out'}
                    </button>
                </div>

                {/* Mobile Navigation Toggle */}
                <div className='flex md:hidden'>
                    {/* Language Selector */}
                    <select
                        value={currentLanguage}
                        onChange={changeLanguage}
                        className="text-blue-800 hover:text-blue-600 mr-4 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        {languages.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                                {lang.code}
                            </option>
                        ))}
                    </select>
                    <button
                        className="text-blue-900"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-white absolute w-full top-[10vh] transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
            >
                <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                    <Link to="/" className="text-blue-900 hover:text-blue-700 font-medium py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <Link to="/about-us" className="text-blue-900 hover:text-blue-700 font-medium py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>

                    {phoneNumberFromCookie && (
                        <Link to="/mygrievance" className="text-blue-900 hover:text-blue-700 font-medium py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>My Grievance</Link>
                    )}

                    <button onClick={!phoneNumberFromCookie ? handleLogIn : handleLogOut} className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-5 py-2 rounded-full hover:shadow-lg transition-all duration-300">
                        {!phoneNumberFromCookie ? 'Log In' : 'Log Out'}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
