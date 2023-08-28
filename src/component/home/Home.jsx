import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';
import Footer from "../Footer";
import { logout, resetAuth } from "../../features/auth/authSlice";
import { createconversation,resetConversation } from "../../features/Conversation/convoSlice";

function Home () {
  const navigate = useNavigate();
    const dispatch = useDispatch()
    const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    const userToken = localStorage.getItem('userData');
    
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      // You might want to add additional checks here
      if (decodedToken.user_id) {
        setLoggedIn(true);
      }
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('userData');
    dispatch(logout())
    dispatch(resetAuth())
    setLoggedIn(false);
    navigate("/login")
  };

  useEffect(() => {
    // Reset appointment data when component unmounts or changes
    return () => {
      dispatch(resetConversation());
    };
  }, [dispatch]);

  const handleTreate = async (event) => {
    event.preventDefault();

    // Prepare the request body
    const requestBody = {
      questionnaire: {
        chronic_diseases: "diabetes",
        activity_level: "sedentary",
        smoking_habits: "never",
        alcohol_consumption: "never",
        sleep_patterns: "less_than_6_hours",
        current_diet: "vegetarian",
        food_allergies: "gluten",
        physical_disability: true
      }
    };

    

    try {
      console.log("$%$%$requestion body%$%$",requestBody)
      dispatch(createconversation(requestBody));
      console.log('conversation creation initiated.');
      navigate("/survey")
      
    } catch (error) {
      console.error('Appointment creation failed:', error.message);
      
    }
  };

  const handlehome = () => {
    navigate('/');
  };
  const handleLogin = () => {
    navigate('/login');
  };
    const nutri = "https://res.cloudinary.com/basha18/image/upload/v1692001522/docnutr_ok0qrq.png";
    const workshop= "https://cdni.iconscout.com/illustration/premium/thumb/family-with-diet-plan-6577255-5618751.png";
    const nutrition="https://img.freepik.com/premium-vector/nutrition-concept-design-vector-illustration-eps10-graphic_24908-10953.jpg?w=2000";
    const weightloss="https://res.cloudinary.com/basha18/image/upload/v1692005059/loss-removebg-preview_nlrpjn.png";
  return (
    <div className='w-full'>
      <div class="w-full leading-normal tracking-normal text-white gradient">
      {/* Header */}
        <div class="fixed w-full z-30 top-0 text-white bg-white">
            <header>
                <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <a onClick={handlehome} class="flex items-center">
                            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Nutrion</span>
                        </a>
                        <div class="flex items-center lg:order-2">
                          {!loggedIn && (
                            <a
                              onClick={handleLogin}
                              className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                            >
                              Log In
                            </a>
                          )}
                          <a
                            onClick={handleLogout}
                            className={`text-gray-800 ${
                              loggedIn ? 'block' : 'hidden'
                            } dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800`}
                          >
                            Log Out
                          </a>
                          <a
                            className={`text-white bg-primary-700 ${
                              loggedIn ? 'hidden' : 'block'
                            } hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800`}
                          >
                            Get Started
                          </a>
                            
                        </div>
                        <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                            <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <a href="#" class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</a>
                                </li>
                                <li>
                                    <a href="#about" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">About us</a>
                                </li>
                                <li>
                                    <a  href="#How" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">How It work</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
      </div>
    {/* <!--Nav--> */}
    <section class="w-full bg-white border-b py-8">
      <div class="w-full container">
          <div  class="w-full container">
            <div class="flex flex-wrap flex-col-reverse sm:flex-row">
              <div class="w-full sm:w-1/2 p-6 mt-6">
                <div  className="bg-cover bg-center  h-auto text-slate-800 py-24 px-10 object-fill">
                  <div class="md:w-full p-">
                    <p class="text-3xl font-bold">Your Dietis office is now online</p>
                    <p class="font-bold text-sm mb-10">From primary care to mental health, get treated from home.</p>
                    <a href="#" onClick={handleTreate} class="bg-gray-800 mt-10 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800">Get Treated</a>
                  </div>  
                </div>
              </div>
              <div class="w-full sm:w-1/2 p-6 mt-6">
                  <img src={nutri} alt="" />
              </div>
            </div>
          </div>
      </div>

   {/* Second */}
      <div>
        <div class="container my-12 mx-auto px-4 md:px-12">
          <div class="flex flex-wrap -mx-1 lg:-mx-4">
            <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                <div class="overflow-hidden rounded-lg shadow-lg bg-cyan-100">
                    <a href="#">
                      <div className="flex flex-wrap flex-col-reverse sm:flex-row">
                        <div class="w-1/4 items-center justify-between leading-tight p-2 md:p-4-300">
                          <h1 class="">
                              <img class="block rounded-full" src={nutrition} alt="" />
                          </h1>
                        </div>
                        <div class="flex items-center justify-between leading-none p-2 md:p-4">
                                <p class="ml-2 text-sm text-slate-800">
                                    Nutrition
                                </p>
                        </div>
                      </div>
                    
                    </a>
                </div>
            </div>
            <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                <div class="overflow-hidden rounded-lg shadow-lg bg-emerald-200">
                    <a href="#">
                      <div className="flex flex-wrap flex-col-reverse sm:flex-row">
                        <div class="w-1/4 items-center justify-between leading-tight p-2 md:p-4">
                          <h1 class="">
                              <img class="block rounded-full" src={workshop} alt="" />
                          </h1>
                        </div>
                        <div class="flex items-center justify-between leading-none p-2 md:p-4">
                                <p class="ml-2 text-sm text-slate-800">
                                    Nutrition Workshop
                                </p>
                        </div>
                      </div>
                    
                    </a>
                </div>
            </div>
            <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                <div class="overflow-hidden rounded-lg shadow-lg bg-pink-200">
                    <a href="#">
                      <div className="flex flex-wrap flex-col-reverse sm:flex-row">
                        <div class="w-1/4 items-center justify-between leading-tight p-2 md:p-4">
                          <h1 class="">
                              <img class="block rounded-full" src={weightloss} alt="" />
                          </h1>
                        </div>
                        <div class="flex items-center justify-between leading-none p-2 md:p-4">
                                <p class="ml-2 text-sm text-slate-800">
                                    Weigth Loss 
                                </p>
                        </div>
                      </div>
                    
                    </a>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <a href="">
          <div className="w-full flex justify-center sm:flex-row items-center">
            <div class="flex justify-between leading-none p-2 md:p-4 ">
                    <p class="text-1xl font-bold text-slate-800">
                      Start a Visit
                    </p>
            </div>
            <div class="">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" 
              stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M20 12L16 8M20 12L16 16" stroke="#000000" stroke-width="2" stroke-linecap="round" 
              stroke-linejoin="round"></path> </g></svg>
            </div>
          </div>
        </a>
      </div>
      
    </section>
    </div>
    {/* About us */}
    <div id="about" class="relative bg-white overflow-hidden mt-16">
      <div class="max-w-7xl mx-auto">
          <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <svg class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                  fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <polygon points="50,0 100,0 50,100 0,100"></polygon>
              </svg>

              <div class="pt-1"></div>

              <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                  <div class="sm:text-center lg:text-left">
                      <h2 class="my-6 text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                          About Us
                      </h2>

                      <p>
                      To provide compassionate, holistic healthcare services that integrate the health message and plant-based nutrition that promote physical, emotional, and spiritual wellness for all patients.
                      </p>
                  </div>
              </main>
          </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img class="h-56 w-full object-cover object-top sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_960_720.jpg" alt=""/>
      </div>
    </div>
    {/* How it Works */}
      <div id="how" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center">
              <p class="text-sm font-bold uppercase tracking-widest text-gray-700">How It Works</p>
              <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">Get you Nitrition Check in 3 Steps
              </h2>
              <p class="mx-auto mt-4 max-w-2xl text-lg font-normal text-gray-700 lg:text-xl lg:leading-8">
                  get Nutritions help in 3 steps
              </p>
          </div>
          <ul class="mx-auto mt-12 grid max-w-md grid-cols-1 gap-10 sm:mt-16 lg:mt-20 lg:max-w-5xl lg:grid-cols-4">
              <li class="flex-start group relative flex lg:flex-col">
                  <span
                      class="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-300 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
                      aria-hidden="true"></span>
                  <div
                      class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 transition-all duration-200 group-hover:border-gray-900 group-hover:bg-gray-900">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-gray-600 group-hover:text-white">
                          <path
                              d="M21 12C21 13.6569 16.9706 15 12 15C7.02944 15 3 13.6569 3 12M21 5C21 6.65685 16.9706 8 12 8C7.02944 8 3 6.65685 3 5M21 5C21 3.34315 16.9706 2 12 2C7.02944 2 3 3.34315 3 5M21 5V19C21 20.6569 16.9706 22 12 22C7.02944 22 3 20.6569 3 19V5"
                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                  </div>
                  <div class="ml-6 lg:ml-0 lg:mt-10">
                      <h3
                          class="text-xl font-bold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
                          Complete Survey
                      </h3>
                      <h4 class="mt-2 text-base text-gray-700">Use your own Notion databases or duplicate ours.</h4>
                  </div>
              </li>
              <li class="flex-start group relative flex lg:flex-col">
                  <span
                      class="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-300 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
                      aria-hidden="true"></span>
                  <div
                      class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 transition-all duration-200 group-hover:border-gray-900 group-hover:bg-gray-900">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-gray-600 group-hover:text-white">
                          <path
                              d="M2 3L2 21M22 3V21M11.8 20H12.2C13.8802 20 14.7202 20 15.362 19.673C15.9265 19.3854 16.3854 18.9265 16.673 18.362C17 17.7202 17 16.8802 17 15.2V8.8C17 7.11984 17 6.27976 16.673 5.63803C16.3854 5.07354 15.9265 4.6146 15.362 4.32698C14.7202 4 13.8802 4 12.2 4H11.8C10.1198 4 9.27976 4 8.63803 4.32698C8.07354 4.6146 7.6146 5.07354 7.32698 5.63803C7 6.27976 7 7.11984 7 8.8V15.2C7 16.8802 7 17.7202 7.32698 18.362C7.6146 18.9265 8.07354 19.3854 8.63803 19.673C9.27976 20 10.1198 20 11.8 20Z"
                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                  </div>
                  <div class="ml-6 lg:ml-0 lg:mt-10">
                      <h3
                          class="text-xl font-bold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
                          BMI
                      </h3>
                      <h4 class="mt-2 text-base text-gray-700">Map your Notion fields with Feather fields.</h4>
                  </div>
              </li>
              <li class="flex-start group relative flex lg:flex-col">
                  <span
                      class="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-300 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
                      aria-hidden="true"></span>
                  <div
                      class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-300 bg-gray-50 transition-all duration-200 group-hover:border-gray-900 group-hover:bg-gray-900">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-gray-600 group-hover:text-white">
                          <path
                              d="M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47715 17.5228 2 12 2M22 12C22 9.79086 17.5228 8 12 8C6.47715 8 2 9.79086 2 12M22 12C22 14.2091 17.5228 16 12 16C6.47715 16 2 14.2091 2 12M12 22C6.47715 22 2 17.5228 2 12M12 22C14.2091 22 16 17.5228 16 12C16 6.47715 14.2091 2 12 2M12 22C9.79086 22 8 17.5228 8 12C8 6.47715 9.79086 2 12 2M2 12C2 6.47715 6.47715 2 12 2"
                              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                  </div>
                  <div class="ml-6 lg:ml-0 lg:mt-10">
                      <h3
                          class="text-xl font-bold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500">
                          Make Appointment
                      </h3>
                      <h4 class="mt-2 text-base text-gray-700">Choose a domain or a subdomain for your blog.</h4>
                  </div>
              </li>
          </ul>
      </div>

    {/* footer */}
    <Footer />

    </div>
  );
}

export default Home;
