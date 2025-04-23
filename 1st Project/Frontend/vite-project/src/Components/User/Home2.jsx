import React, { useState, useEffect } from 'react';
import './UserIndex.css'
{/* HeroSection Start */ }

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

{/* HeroSection End */ }

import Navbar from "./Navbar.jsx";

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "PublicPulse - Government Grievance Portal";
    }, []);

    //   Process Start 
    const steps = [
        {
            title: "Submit Grievance",
            description: "Fill out a simple form with details about your grievance and related government department.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            )
        },
        {
            title: "Verify & Process",
            description: "Our team verifies your submission and forwards it to the appropriate department.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            )
        },
        {
            title: "Track Progress",
            description: "Monitor the status of your grievance in real-time through your personal dashboard.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        },
        {
            title: "Receive Resolution",
            description: "Get notified when your grievance has been addressed with detailed resolution information.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            )
        }
    ];
    // Process End

    // {/* StatisticsSection Start */ }
    const [animated, setAnimated] = useState(false);
    const [counts, setCounts] = useState({
        grievances: 0,
        resolved: 0,
        departments: 0,
        satisfaction: 0
    });

    const finalCounts = {
        grievances: 12500,
        resolved: 11890,
        departments: 42,
        satisfaction: 98
    };

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('statistics-section');
            if (element) {
                const position = element.getBoundingClientRect();
                if (position.top < window.innerHeight - 100 && !animated) {
                    setAnimated(true);
                    animateCounters();
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [animated]);

    const animateCounters = () => {
        const duration = 2000; // 2 seconds
        const steps = 50;
        const stepTime = duration / steps;

        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            setCounts({
                grievances: Math.floor(finalCounts.grievances * progress),
                resolved: Math.floor(finalCounts.resolved * progress),
                departments: Math.floor(finalCounts.departments * progress),
                satisfaction: Math.floor(finalCounts.satisfaction * progress)
            });

            if (currentStep === steps) {
                clearInterval(interval);
            }
        }, stepTime);
    };
    // {/* StatisticsSection End */ }

    // {/* TestimonialSection Start */}

    const testimonials = [
        {
            id: 1,
            name: "Rajesh Kumar",
            location: "New Delhi",
            quote: "I had an issue with my pension payments that had been pending for months. Through PublicPulse, my grievance was resolved in just 15 days. The transparency in the process was impressive.",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            id: 2,
            name: "Priya Sharma",
            location: "Mumbai",
            quote: "After trying for months to get a response about my property documents, I submitted my complaint through PublicPulse. I could track every step, and the issue was resolved efficiently.",
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            id: 3,
            name: "Amit Patel",
            location: "Ahmedabad",
            quote: "The water supply in our area was irregular for years. Within weeks of filing a grievance through this portal, the municipal corporation fixed the issue. Truly a citizen-centric initiative.",
            image: "https://randomuser.me/api/portraits/men/85.jpg"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 6000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const goToNext = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
                setIsAnimating(false);
            }, 500);
        }
    };

    const goToPrev = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
                setIsAnimating(false);
            }, 500);
        }
    };
    // {/* TestimonialSection End */}



    return (
        <div className="min-h-screen bg-government-gray-light">
            <Navbar />
            <main>
                {/* <HeroSection /> */}
                <div className="relative min-h-screen flex items-center">
                    {/* Background with gradient overlay */}
                    <div className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
                            backgroundPosition: "center 30%"
                        }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-government-blue-dark/90 to-government-blue/70"></div>
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10 py-20 mt-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="text-white space-y-6">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight opacity-0 animate-fade-in">
                                    Your Voice Matters to Us
                                </h1>
                                <p className="text-xl md:text-2xl opacity-0 animate-delayed-fade-in">
                                    A secure and transparent platform to submit and track your grievances with government departments.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 pt-4 opacity-0 animate-delayed-fade-in-2">
                                    <Link to="/about" className="bg-white text-government-blue-dark hover:bg-gray-100 px-8 py-3 rounded-md font-semibold inline-flex items-center justify-center group transition-all">
                                        Learn More
                                        <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-white/20 opacity-0 animate-delayed-fade-in-3">
                                <div className="bg-white rounded-md p-6 shadow-inner">
                                    <h3 className="text-government-blue-dark text-xl font-semibold mb-4">Key Features</h3>
                                    <ul className="space-y-3">
                                        {[
                                            "Easy grievance submission process",
                                            "Secure and confidential platform",
                                            "Real-time status tracking",
                                            "Direct communication with departments",
                                            "Transparent resolution process",
                                            "Accessible on all devices"
                                        ].map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <div className="bg-government-blue/10 rounded-full p-1 mr-3 mt-0.5">
                                                    <svg className="w-4 h-4 text-government-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                </div>
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <ProcessSection Start */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-government-blue mb-4">How It Works</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">Our streamlined process ensures your grievances are addressed efficiently and transparently.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className="bg-government-gray-light rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                                >
                                    <div className="mb-5 text-government-blue bg-government-blue/10 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-government-blue group-hover:text-white transition-all duration-300">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                    <div className="mt-4 hidden md:block">
                                        {index < steps.length - 1 ? (
                                            <div className="w-12 h-1 bg-government-blue/20 absolute top-1/2 right-0 transform translate-x-full"></div>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* <ProcessSection End */}

                {/* StatisticsSection Start */}
                <section id="statistics-section" className="py-16 bg-government-blue text-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-10 max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Making an Impact</h2>
                            <p className="text-white/80">Our platform has helped thousands of citizens resolve their grievances with various government departments across the country.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm">
                                <div className="text-4xl md:text-5xl font-bold mb-2">{counts.grievances.toLocaleString()}</div>
                                <p className="text-white/80 text-sm md:text-base">Grievances Submitted</p>
                            </div>

                            <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm">
                                <div className="text-4xl md:text-5xl font-bold mb-2">{counts.resolved.toLocaleString()}</div>
                                <p className="text-white/80 text-sm md:text-base">Grievances Resolved</p>
                            </div>

                            <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm">
                                <div className="text-4xl md:text-5xl font-bold mb-2">{counts.departments}</div>
                                <p className="text-white/80 text-sm md:text-base">Connected Departments</p>
                            </div>

                            <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm">
                                <div className="text-4xl md:text-5xl font-bold mb-2">{counts.satisfaction}%</div>
                                <p className="text-white/80 text-sm md:text-base">Citizen Satisfaction</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* StatisticsSection End */}

                {/* TestimonialSection Start */}
                <section className="py-20 bg-government-gray-light">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-government-blue mb-4">Citizen Testimonials</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Hear from citizens who have successfully resolved their grievances through our platform.
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto relative">
                            <div className="bg-white rounded-lg shadow-xl p-8 md:p-10 overflow-hidden">
                                <div
                                    className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
                                >
                                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={testimonials[currentIndex].image}
                                                alt={testimonials[currentIndex].name}
                                                className="w-20 h-20 rounded-full object-cover border-4 border-government-blue/20"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-gray-600 italic mb-4">
                                                "{testimonials[currentIndex].quote}"
                                            </div>
                                            <div className="font-medium text-government-blue-dark">
                                                {testimonials[currentIndex].name} • {testimonials[currentIndex].location}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center mt-8 space-x-2">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                if (index !== currentIndex && !isAnimating) {
                                                    setIsAnimating(true);
                                                    setTimeout(() => {
                                                        setCurrentIndex(index);
                                                        setIsAnimating(false);
                                                    }, 500);
                                                }
                                            }}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-government-blue scale-125' : 'bg-gray-300'
                                                }`}
                                            aria-label={`Go to testimonial ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={goToPrev}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-government-blue hover:bg-government-blue hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-government-blue focus:ring-opacity-50 md:-translate-x-5"
                                aria-label="Previous testimonial"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                onClick={goToNext}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-government-blue hover:bg-government-blue hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-government-blue focus:ring-opacity-50 md:translate-x-5"
                                aria-label="Next testimonial"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>
                {/* TestimonialSection End */}

                {/* CTASection Start */}
                <section className="py-16 bg-gradient-to-r from-government-blue to-government-blue-dark text-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="max-w-2xl">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Submit Your Grievance?</h2>
                                <p className="text-white/80 text-lg mb-6">
                                    Take the first step towards resolution. Our streamlined process ensures your voice is heard and your concerns are addressed promptly.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        to="/"
                                        className="bg-white text-government-blue hover:bg-gray-100 px-8 py-3 rounded-md font-semibold inline-flex items-center justify-center group transition-all"
                                    >
                                        Get Started
                                        <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        to="/about"
                                        className="bg-transparent hover:bg-white/10 border border-white px-8 py-3 rounded-md font-semibold inline-flex items-center justify-center"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm p-1 rounded-lg shadow-xl">
                                <div className="bg-white/5 rounded-md p-6 text-center">
                                    <div className="text-4xl font-bold mb-2">24/7</div>
                                    <p className="text-white/80">Support Available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* CTASection End */}
            </main>
            {/* Footer Start */}
            <footer className="bg-government-blue-dark text-white pt-12 pb-6">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
                                    <span className="text-government-blue-dark font-bold text-xl">G</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl">PublicPulse</h3>
                                    <p className="text-xs opacity-80">Government Grievance Portal</p>
                                </div>
                            </div>
                            <p className="text-sm opacity-80 max-w-xs">
                                Your trusted platform for submitting and tracking grievances with government departments.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-lg mb-4">Contact Information</h4>
                            <ul className="space-y-2 text-sm opacity-80">
                                <li>123 Government Complex</li>
                                <li>New Delhi, India 110001</li>
                                <li>Phone: +91 1234567890</li>
                                <li>Email: support@publicpulse.gov.in</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 pt-4 border-t border-white/20 text-center text-sm opacity-70">
                        <p>© {new Date().getFullYear()} PublicPulse | Government of India. All rights reserved.</p>
                    </div>
                </div>
            </footer>
            {/* Footer End */}

        </div>
    );
};

export default Home;
