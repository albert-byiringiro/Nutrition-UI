import React, { useEffect,useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import {  
  useSelector,
  useDispatch
} from 'react-redux'
import show from "../../image/eye-show.svg";
import hide from "../../image/eye-hide.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login, resetAuth } from "../../features/auth/authSlice";
import { getUserMeOrganization } from "../../features/auth/authSlice";
import Header from "../Header";
import jwt_decode from 'jwt-decode';

function Login() {
  const [pwd, setPwd] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const userOrganization = useSelector((state) => state.auths.userOrganization)
    const accountType = userOrganization?.account_type;
    console.log("!@@@@@@@@@@@@@@",accountType)
  

  const {
      email,
      password
  } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
      user,
      isLoading,
      isError,
      isSuccess,
      message
  } = useSelector(state => state.auths)

  useEffect(() => {
    dispatch(getUserMeOrganization());
    }, [dispatch]);
  useEffect(() => {
    if (isError) {
        toast.error(message)
    }
    
    // Redirect when logged in
    if (isSuccess) {
        dispatch(resetAuth)
        navigate("/patient");
        toast.success('Login successful', {
          position: "top-center",
          autoClose: 3000, // 3 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
    }

    
}, [isError, isSuccess, user, message, navigate, dispatch])

const onChange = (e) => {
  setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value || e.target.checked
  }))
}

const phoneNumberRegex = /^(078|079|072|073)\d{7}$/;

const handlePhoneChange = (event) => {
  const newPhoneNumber = event.target.value;
  setInputPhone(newPhoneNumber);
  setIsValidPhone(phoneNumberRegex.test(newPhoneNumber));
};



const onSubmit = (e) => {
  e.preventDefault() 
  const userData = {
      phone_number: inputPhone,
      password: pwd
  }
  console.log("==========", userData);
  dispatch(login(userData))
}

const handleSignup = () => {
  navigate('/signup');
};

const img = "https://res.cloudinary.com/basha18/image/upload/v1685934785/login-removebg-preview_zcpc2m.png"
    return (
      <div>
        <ToastContainer />
        <Header />
        <div className='w-4/5 h-screen m-auto  flex'>
          <div className='w-2/5 m-auto'>
              <img src={img} alt="BigCo Inc. logo"/>
              <div className='text-center my-4'>
                  <p className='text-3xl'>Login to access your Dashboard</p>
              </div>
          </div>
          <div className="w-3/5 h-screen container mx-auto  flex items-center justify-center">
            <div class="w-full md:w-4/5 bg-white px-8 pt-6 pb-8 mb-4 flex flex-col">
              <form onSubmit={onSubmit} >
              <div class="py-4 px-8 text-black text-xl border-b border-grey-lighter mb-8">Login</div>
                  <div class="mb-4">
                    <label class="block text-sm font-bold mb-2" for="username">
                      Phone
                    </label>
                    <input placeholder="Enter your Phone number" className="px-3 py-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                      rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 w-full pr-10"
                      type="text"
                      value={inputPhone}
                      onChange={handlePhoneChange}
                      />
                  </div>
                  {!isValidPhone && <p style={{ color: 'red' }}>Invalid phone number</p>}
                  <div class="mb-6">
                    <label class="block text-sm font-bold mb-2" for="password">
                      Password
                    </label>
                    <div className="relative flex w-full flex-wrap items-stretch mb-3">
                      <input placeholder="Enter your password" className="px-3 py-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                      rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 w-full pr-10"
                      type={isRevealPwd ? "text" : "password"}
                      value={pwd}
                      onChange={e => setPwd(e.target.value)}
                      />
                      <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                          <img
                              title={isRevealPwd ? "Hide password" : "Show password"}
                              src={isRevealPwd ? hide : show}
                              onClick={() => setIsRevealPwd(prevState => !prevState)}
                              />
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center justify-start mt-8">
                    <button class="bg-gray-800 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded" type="submit">
                      Sign In
                    </button>
                    <div>
                        <p class="text-center m-4">
                            <a onClick={handleSignup} class="text-grey-dark text-sm no-underline hover:text-grey-darker cursor-pointer">create account</a>
                        </p>
                    </div>
                  </div>
              </form>    
            </div>
          </div>
        </div>
      </div>
    );
  }
  export default Login;