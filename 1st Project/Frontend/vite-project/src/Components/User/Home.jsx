import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import '../../UserIndex.css';


const Home = () => {
    const { t } = useTranslation();
    
    const [isVisible, setIsVisible] = useState({
        hero: false,
        stats: false,
        features: false,
        process: false,
        testimonials: false,
        cta: false
    });
    const navigate = useNavigate();

    const sectionRefs = {
        hero: useRef(null),
        stats: useRef(null),
        features: useRef(null),
        process: useRef(null),
        testimonials: useRef(null),
        cta: useRef(null)
    };

    useEffect(() => {
        const observerOptions = {
            threshold: 0.25
        };

        const observers = {};

        Object.entries(sectionRefs).forEach(([key, ref]) => {
            const callback = (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({ ...prev, [key]: true }));
                    }
                });
            };

            observers[key] = new IntersectionObserver(callback, observerOptions);
            if (ref.current) {
                observers[key].observe(ref.current);
            }
        });

        setIsVisible(prev => ({ ...prev, hero: true }));

        return () => {
            Object.entries(observers).forEach(([key, observer]) => {
                if (sectionRefs[key].current) {
                    observer.unobserve(sectionRefs[key].current);
                }
            });
        };
    }, []);

    const fadeInClass = (section) => isVisible[section] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';

    let cookiesData = Cookies.get("setPhoneNumber");

    return (
        <div className="min-h-screen bg-gray-50">


            {/* Hero Section */}
            <section
                ref={sectionRefs.hero}
                className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-50 to-indigo-50"
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className={`md:w-1/2 transition-all duration-1000 ease-out ${fadeInClass('hero')}`}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight">
                                Your Voice Matters to Us
                            </h1>
                            <p className="mt-6 text-lg text-gray-600 max-w-xl">
                                GrievEase: The official grievance redressal portal for citizens.
                                We are committed to addressing your concerns efficiently and transparently.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-1 hover:scale-105" onClick={() => {
                                    cookiesData ? navigate('/grievanceform') : navigate('/landingpage');
                                }}>
                                    File a Grievance
                                </button>
                                <button className="px-8 py-3 rounded-full border-2 border-blue-600 text-blue-700 font-medium hover:bg-blue-50 transition duration-300" onClick={() => {
                                    cookiesData ? navigate('/mygrievance') : navigate('/landingpage');
                                }}>
                                    Track Status
                                </button>
                            </div>
                        </div>
                        <div className={`md:w-1/2 mt-12 md:mt-0 transition-all duration-1000 delay-300 ease-out ${fadeInClass('hero')}`}>
                            <div className="relative">
                                <div className="absolute -bottom-6 -right-6 w-full h-full rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 transform rotate-2"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000&auto=format&fit=crop"
                                    alt="Government Portal Interface"
                                    className="relative z-10 rounded-xl shadow-xl w-full object-cover h-80 md:h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section
                ref={sectionRefs.stats}
                className="py-14 bg-white"
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { count: '98%', label: 'Satisfaction Rate', icon: '👍' },
                            { count: '24h', label: 'Response Time', icon: '⏱️' },
                            { count: '10M+', label: 'Citizens Served', icon: '👥' },
                            { count: '95%', label: 'Resolution Rate', icon: '✅' }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className={`text-center p-6 rounded-lg bg-gradient-to-b from-gray-50 to-white shadow-md border border-gray-100 transition-all transform duration-700 ease-out ${isVisible.stats ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                                style={{ transitionDelay: `${150 * index}ms` }}
                            >
                                <div className="text-2xl mb-2">{stat.icon}</div>
                                <h3 className="text-3xl font-bold text-blue-800">{stat.count}</h3>
                                <p className="text-gray-600 mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section
                ref={sectionRefs.features}
                className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50"
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className={`text-3xl md:text-4xl font-bold text-blue-900 transition-all duration-700 ${isVisible.features ? 'opacity-100' : 'opacity-0'}`}>
                            How GrievEase Empowers Citizens
                        </h2>
                        <p className={`mt-4 text-lg text-gray-600 transition-all duration-700 delay-200 ${isVisible.features ? 'opacity-100' : 'opacity-0'}`}>
                            Our platform simplifies the grievance redressal process with powerful features designed to serve you better.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Easy Submission',
                                description: 'Submit grievances seamlessly through our user-friendly interface or mobile app.',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                )
                            },
                            {
                                title: 'Real-time Tracking',
                                description: 'Monitor the status of your grievance in real-time with our transparent tracking system.',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                )
                            },
                            {
                                title: 'Timely Resolution',
                                description: 'Experience prompt resolution with our streamlined workflow and escalation mechanisms.',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className={`bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-700 ease-out ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${200 * index}ms` }}
                            >
                                <div className="mb-5">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-blue-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                                <a href="#" className="mt-5 inline-block text-blue-600 font-medium hover:text-blue-800 transition-colors duration-300">
                                    Learn more →
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section
                ref={sectionRefs.process}
                className="py-16 md:py-24 bg-white"
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className={`text-3xl md:text-4xl font-bold text-blue-900 transition-all duration-700 ${isVisible.process ? 'opacity-100' : 'opacity-0'}`}>
                            Simple 4-Step Grievance Process
                        </h2>
                        <p className={`mt-4 text-lg text-gray-600 transition-all duration-700 delay-200 ${isVisible.process ? 'opacity-100' : 'opacity-0'}`}>
                            We've streamlined the grievance redressal process to make it efficient and hassle-free for all citizens.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center gap-6 mt-12">
                        {[
                            {
                                title: 'Submit Grievance',
                                description: 'Fill the simple form with your grievance details',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                ),
                                color: 'from-blue-500 to-blue-700'
                            },
                            {
                                title: 'Acknowledgement',
                                description: 'Receive immediate notification with tracking ID',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                color: 'from-indigo-500 to-indigo-700'
                            },
                            {
                                title: 'Processing',
                                description: 'Your case is assigned and addressed by relevant department',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                ),
                                color: 'from-purple-500 to-purple-700'
                            },
                            {
                                title: 'Resolution',
                                description: 'Receive resolution notification and provide feedback',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ),
                                color: 'from-green-500 to-green-700'
                            }
                        ].map((step, index) => (
                            <div
                                key={index}
                                className={`flex-1 transition-all duration-700 ease-out ${isVisible.process ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${200 * index}ms` }}
                            >
                                <div className="text-center">
                                    <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${step.color} mx-auto flex items-center justify-center shadow-lg mb-6 transform transition duration-500 hover:scale-110`}>
                                        {step.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-blue-900 mb-2">{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>

                                {index < 3 && (
                                    <div className="hidden md:block h-1 w-12 bg-blue-200 mt-12 ml-auto mr-0 transform rotate-90 md:rotate-0 md:mt-0 md:mx-auto rounded"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section
                ref={sectionRefs.testimonials}
                className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white"
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className={`text-3xl md:text-4xl font-bold text-blue-900 transition-all duration-700 ${isVisible.testimonials ? 'opacity-100' : 'opacity-0'}`}>
                            Citizens' Experiences
                        </h2>
                        <p className={`mt-4 text-lg text-gray-600 transition-all duration-700 delay-200 ${isVisible.testimonials ? 'opacity-100' : 'opacity-0'}`}>
                            Hear from citizens who have successfully resolved their grievances through our platform.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Rajesh Kumar',
                                location: 'Delhi',
                                content: 'I submitted a complaint about a pothole in our colony, and it was fixed within a week. The portal kept me updated throughout the process.',
                                image: 'https://randomuser.me/api/portraits/men/32.jpg'
                            },
                            {
                                name: 'Priya Sharma',
                                location: 'Mumbai',
                                content: 'My electricity bill dispute was resolved quickly. The officials were responsive and provided clear explanations. Outstanding service!',
                                image: 'https://randomuser.me/api/portraits/women/44.jpg'
                            },
                            {
                                name: 'Anand Patel',
                                location: 'Ahmedabad',
                                content: 'Reported an issue with my water supply, and the concerned department fixed it promptly. The tracking feature was very helpful.',
                                image: 'https://randomuser.me/api/portraits/men/67.jpg'
                            }
                        ].map((testimonial, index) => (
                            <div
                                key={index}
                                className={`bg-white p-8 rounded-xl shadow-md border border-gray-100 transition-all duration-700 ease-out ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${200 * index}ms` }}
                            >
                                <div className="mb-6">
                                    <svg className="h-8 w-8 text-yellow-400" fill="currentColor" viewBox="0 0 32 32">
                                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                    </svg>
                                </div>
                                <p className="text-gray-600 mb-6">{testimonial.content}</p>
                                <div className="flex items-center">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-blue-900">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
        ref={sectionRefs.cta}
        className="py-16 md:py-24 bg-gradient-to-r from-[#FC635C] via-[#FF8A4D] to-[#F8BA64] text-white"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible.cta ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('grievance_send_title')}</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {t('grievance_send_paragraph')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 rounded-full border-2 border-white text-white font-medium hover:bg-white hover:text-blue-700 hover:bg-opacity-90 shadow-lg transition duration-300 transform hover:-translate-y-1" onClick={() => {

                cookiesData ? navigate('/grievanceform') : navigate('/landingpage');
              }}>
                {t("file_a_grievance")}
              </button>
              <Link to="/about-us" className="px-8 py-3 rounded-full border-2 border-white text-white font-medium hover:bg-white hover:text-blue-700 hover:bg-opacity-10 transition duration-300">
                {t('learn_more')}
              </Link>
            </div>
          </div>
        </div>
      </section>

        </div>
    );
};

export default Home;