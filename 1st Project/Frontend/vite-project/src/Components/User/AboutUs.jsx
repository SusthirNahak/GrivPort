
import { useState, useEffect, useRef } from 'react';


const AboutUs = () => {
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
    contact: useRef(null)
  };

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

    // Immediately set hero to visible for better UX
    setIsVisible(prev => ({ ...prev, hero: true }));

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

  return (
    <div className="min-h-screen bg-gray-50">
    
      
      {/* Hero Section */}
      <section 
        ref={sectionRefs.hero}
        className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 to-indigo-900 text-white"
      >
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className={`max-w-3xl mx-auto transition-all duration-1000 ease-out ${fadeInClass('hero')}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              About GrievEase
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto">
              Empowering citizens through transparent and efficient grievance redressal. Learn about our mission, team, and the impact we're making.
            </p>
          </div>
          <div className={`mt-12 max-w-4xl mx-auto transition-all duration-1000 delay-300 ease-out transform ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-50 rounded-lg"></div>
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1000&auto=format&fit=crop" 
                alt="Government office building" 
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section 
        ref={sectionRefs.mission}
        className="py-16 md:py-24 bg-white"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className={`md:w-1/2 transition-all duration-700 ease-out ${fadeInClass('mission')}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Our Mission & Vision</h2>
              <div className="space-y-8">
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Our Mission</h3>
                  <p className="text-gray-700">
                    To provide a transparent, accessible, and efficient platform for citizens to voice their grievances and receive timely resolutions, fostering trust between the government and its people.
                  </p>
                </div>
                
                <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-600">
                  <h3 className="text-xl font-semibold text-indigo-800 mb-3">Our Vision</h3>
                  <p className="text-gray-700">
                    A responsive governance system where every citizen's voice is heard, respected, and addressed, leading to improved public services and enhanced quality of life for all.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">Our Values</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-gray-700">Transparency</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-gray-700">Accountability</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-gray-700">Efficiency</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-gray-700">Citizen-Centric</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`md:w-1/2 transition-all duration-700 delay-200 ease-out ${fadeInClass('mission')}`}>
              <div className="relative">
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

      {/* Leadership Team Section */}
      <section 
        ref={sectionRefs.team}
        className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-blue-900 transition-all duration-700 ${isVisible.team ? 'opacity-100' : 'opacity-0'}`}>
              Leadership Team
            </h2>
            <p className={`mt-4 text-lg text-gray-600 transition-all duration-700 delay-200 ${isVisible.team ? 'opacity-100' : 'opacity-0'}`}>
              Meet the dedicated officials leading our mission to transform grievance redressal in India.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Rajiv Sharma, IAS',
                role: 'Secretary, Department of Administrative Reforms',
                bio: 'With over 25 years of public service experience, Dr. Sharma leads GrievEase with a vision to transform citizen-government interaction.',
                image: 'https://randomuser.me/api/portraits/men/32.jpg'
              },
              {
                name: 'Ms. Sunita Patel, IAS',
                role: 'Joint Secretary, Grievance Cell',
                bio: 'A champion of digital governance, Ms. Patel has pioneered several e-governance initiatives that have improved government services.',
                image: 'https://randomuser.me/api/portraits/women/44.jpg'
              },
              {
                name: 'Mr. Anil Kumar, IPS',
                role: 'Director of Operations',
                bio: 'With expertise in process optimization, Mr. Kumar ensures that grievances are addressed efficiently and effectively.',
                image: 'https://randomuser.me/api/portraits/men/67.jpg'
              }
            ].map((member, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-700 ease-out ${isVisible.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${200 * index}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-50"></div>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="font-bold text-xl">{member.name}</h3>
                    <p className="text-blue-200">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History & Evolution Section */}
      <section 
        ref={sectionRefs.history}
        className="py-16 md:py-24 bg-white"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-3xl md:text-4xl font-bold text-blue-900 text-center mb-16 transition-all duration-700 ${isVisible.history ? 'opacity-100' : 'opacity-0'}`}>
              Our Journey
            </h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform md:translate-x-[-50%]"></div>
              
              {/* Timeline items */}
              {[
                {
                  year: '2018',
                  title: 'Initiative Launch',
                  description: 'The GrievEase initiative was launched as part of the Digital India program to modernize the grievance redressal system.',
                  align: 'right'
                },
                {
                  year: '2019',
                  title: 'Pilot Program',
                  description: 'Successfully implemented in 10 states, establishing the framework for a nationwide grievance handling system.',
                  align: 'left'
                },
                {
                  year: '2020',
                  title: 'Digital Transformation',
                  description: 'Complete digital overhaul with mobile app launch and integration with other government services.',
                  align: 'right'
                },
                {
                  year: '2021',
                  title: 'Nationwide Expansion',
                  description: 'Expanded to all states and union territories with localized language support for broader accessibility.',
                  align: 'left'
                },
                {
                  year: '2022',
                  title: 'AI Integration',
                  description: 'Introduced AI-powered categorization and routing to speed up grievance processing and resolution.',
                  align: 'right'
                },
                {
                  year: '2023',
                  title: 'International Recognition',
                  description: 'Received UN Public Service Award for innovative use of technology in public grievance management.',
                  align: 'left'
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`relative mb-12 md:mb-24 transition-all duration-700 ease-out ${isVisible.history ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${150 * index}ms` }}
                >
                  <div className={`flex flex-col md:flex-row items-center ${item.align === 'left' ? 'md:flex-row-reverse' : ''}`}>
                    <div className="md:w-1/2 flex justify-center md:justify-end md:pr-12 md:pl-0 pl-12">
                      {item.align === 'right' && (
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 md:ml-auto">
                          <h3 className="text-xl font-semibold text-blue-800 mb-2">{item.title}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-600 z-10 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="bg-blue-800 text-white font-bold px-3 py-1 rounded mt-2">
                        {item.year}
                      </div>
                    </div>
                    
                    <div className="md:w-1/2 flex justify-center md:justify-start md:pl-12 md:pr-0 pl-12">
                      {item.align === 'left' && (
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 md:mr-auto">
                          <h3 className="text-xl font-semibold text-blue-800 mb-2">{item.title}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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
