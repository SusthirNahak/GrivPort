
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { motion } from 'framer-motion';


const AboutUs = () => {

  const { t } = useTranslation();

  const [isVisible, setIsVisible] = useState({
    hero: false,
    mission: false,
    team: false,
    history: false,
    achievements: false,
    contact: false
  });

  const sectionRefs = {
    hero: useRef(null),
    mission: useRef(null),
    team: useRef(null),
    history: useRef(null),
    achievements: useRef(null),
    contact: useRef(null),
    cta: useRef(null)
  };

  const navigate = useNavigate();
  let cookiesData = Cookies.get("setPhoneNumber");

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15
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



    return () => {
      Object.entries(observers).forEach(([key, observer]) => {
        if (sectionRefs[key].current) {
          observer.unobserve(sectionRefs[key].current);
        }
      });
    };
  }, []);

  const fadeInClass = (section) =>
    isVisible[section] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';


  useEffect(() => {
    // Set hero section to visible on mount for immediate animation
    setIsVisible(true);
  }, []);

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  // Child text animation variants
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Image animation variants
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: 'easeOut' },
    },
  };
  return (
    <div className="min-h-screen bg-gray-100">


      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-36 md:pt-24 px-4 bg-gradient-to-br from-indigo-50 via-white to-blue-50 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
        {/* Text Container */}
          <motion.div
            className="order-2 lg:order-1 w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12"
            variants={textVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold flex justify-center items-center md:text-left bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 via-blue-700 to-blue-500 mb-4 py-4 tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
              variants={childVariants}
            >
              {t('minister_name')}
            </motion.h1>

            <motion.p
              className="text-2xl lg:text-3xl font-light flex justify-center items-center text-justify text-gray-700 mb-6 tracking-wide italic"
              style={{ fontFamily: "'Playfair Display', serif" }}
              variants={childVariants}
            >
              {t('what_is_he')}
            </motion.p>

            <motion.p
              className="text-lg md:text-xl flex justify-center items-center text-justify text-gray-600 mb-8 leading-relaxed"
              style={{ fontFamily: "'EB Garamond', serif" }}
              variants={childVariants}
            >
              {t('about_him_para_1')}
            </motion.p>

            <motion.p
              className="text-lg md:text-xl flex justify-center items-center text-justify text-gray-600 mb-8 leading-relaxed"
              style={{ fontFamily: "'EB Garamond', serif" }}
              variants={childVariants}
            >
              {t('about_him_para_2')}
            </motion.p>

            <motion.div
              className="flex justify-center md:justify-start"
              variants={childVariants}
            >
              <button className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                {t('learn_more')}
              </button>
            </motion.div>
          </motion.div>

          {/* Image Container */}
          <motion.div
            className="order-1 lg:order-2 w-full lg:w-1/2 flex justify-center"
            variants={imageVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
          >
            <div className="relative max-w-md md:max-w-lg">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-200 to-blue-200 rounded-3xl transform -rotate-3 z-0 opacity-50"></div>
              <img
                src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                alt="Minister Image"
                className="relative z-10 rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/40 to-transparent z-10"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section
        ref={sectionRefs.mission}
        className="py-16 md:py-24 bg-white"
      >
        <div className="container mx-auto px-4 md:px-6 ">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className={`md:w-1/2 transition-all duration-700 ease-out  ${fadeInClass('mission')}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">{t('mission_visoin_title')}</h2>
              <div className="space-y-8">
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">{t('mission_visoin_subtitle_1')}</h3>
                  <p className="text-gray-700">{t('mission_visoin_sparagraph_1')}</p>
                </div>

                <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-600">
                  <h3 className="text-xl font-semibold text-indigo-800 mb-3">{t('mission_visoin_subtitle_2')}</h3>
                  <p className="text-gray-700">
                    {t('mission_visoin_sparagraph_2')}
                  </p>
                </div>

                <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-600">
                  <h3 className="text-xl font-semibold text-indigo-800 mb-3">{t('mission_visoin_subtitle_3')}</h3>
                  <p className="text-gray-700">
                    {t('mission_visoin_sparagraph_3')}
                  </p>
                </div>
              </div>
            </div>

            <div className={`md:w-1/2 transition-all duration-700 delay-200 ease-out ${fadeInClass('mission')}`}>
              <div className="relative ">
                <div className="absolute -top-6 -left-6 w-full h-full bg-gradient-to-br from-blue-200 to-indigo-200 rounded-xl transform -rotate-2"></div>
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop"
                  alt="Team meeting"
                  className="relative z-10 rounded-xl shadow-lg w-full"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg z-20 max-w-xs">
                  <p className="text-blue-900 font-semibold text-lg">"Good governance is the art of serving citizens, not ruling them."</p>
                  <p className="text-gray-600 text-sm mt-2">- Department of Administrative Reforms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={sectionRefs.cta}
        className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
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

      {/* Achievements Section */}
      <section
        ref={sectionRefs.achievements}
        className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-blue-900 transition-all duration-700 ${isVisible.achievements ? 'opacity-100' : 'opacity-0'}`}>
              Our Achievements
            </h2>
            <p className={`mt-4 text-lg text-gray-600 transition-all duration-700 delay-200 ${isVisible.achievements ? 'opacity-100' : 'opacity-0'}`}>
              Milestones that mark our commitment to transforming citizen experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: '25 Million+',
                subtitle: 'Grievances Processed',
                description: 'Successfully processed and resolved grievances from across the nation.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                )
              },
              {
                title: '94%',
                subtitle: 'Resolution Rate',
                description: 'High success rate in resolving citizen grievances across departments.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: '15 Days',
                subtitle: 'Average Resolution Time',
                description: 'Reduced from 45 days, demonstrating our commitment to efficiency.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: '100%',
                subtitle: 'Digital Transformation',
                description: 'Complete end-to-end digitization of the grievance process.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: '28 States',
                subtitle: 'Full Implementation',
                description: 'Seamless integration across all states and union territories.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: '5 Awards',
                subtitle: 'National & International',
                description: 'Recognized for excellence in e-governance and public service.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                )
              }
            ].map((achievement, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-700 ease-out transform hover:-translate-y-2 hover:shadow-lg ${isVisible.achievements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${100 * index}ms` }}
              >
                <div className="flex items-start">
                  <div className="mr-4">
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-900">{achievement.title}</h3>
                    <p className="text-lg font-semibold text-blue-600 mb-2">{achievement.subtitle}</p>
                    <p className="text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={sectionRefs.contact}
        className="py-16 md:py-24 bg-gradient-to-br from-blue-900 to-indigo-900 text-white"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible.contact ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Have questions about GrievEase? Our team is here to help you navigate the grievance redressal process.
            </p>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl shadow-lg">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500 mx-auto flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                  <p className="text-blue-200">contact@grievease.gov.in</p>
                  <p className="text-blue-200">support@grievease.gov.in</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500 mx-auto flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                  <p className="text-blue-200">Toll Free: 1800-123-4567</p>
                  <p className="text-blue-200">Helpline: +91-11-23456789</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500 mx-auto flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                  <p className="text-blue-200">123 Government Complex</p>
                  <p className="text-blue-200">New Delhi, 110001</p>
                </div>
              </div>

              <div className="mt-12 text-center">
                <button className="px-8 py-3 bg-white text-blue-900 font-medium rounded-full transition duration-300 hover:bg-blue-100 hover:shadow-lg">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
