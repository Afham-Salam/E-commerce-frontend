import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
 import { Formik, Form, Field, ErrorMessage } from "formik";
 import * as Yup from "yup";
import APIClientPrivate from "../utils/axios";
import Loader from "../components/Loader";

export default function Signup() {
   const navigate = useNavigate();
   const [message, setMessage] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const { name, email, password } = values;
    const formData = { name, email, password };
  
    try {
      const response = await APIClientPrivate.post("/api/auth/register", formData);
      setMessage(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || "Registration failed User already exist.";
        setMessage(errorMessage);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <>
      {loading && <Loader fullScreen={true} size="xl" text="Creating your account..." />}
      <div className=" flex h-screen flex-col bgimage bg pt-1">
        <div className="w-full    text-white flex justify-between px-6 py-1">
          <img src="/logo.webp" className="h-8 w-auto"  alt="" />
          <Link
            to={"/login"}
            className="bg-[#B88E2F] border-2 border-[#B88E2F] text-white text-sm hover:text-[#B88E2F]  hover:bg-transparent px-3 py-1  font-semibold"
          >
            Login
          </Link>
        </div>

       <div className="w-full h-screen flex lg:flex-row flex-col justify-center items-center ">
        
         
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            
          >
           
            {({ setFieldValue }) => (
              <Form className="md:p-10 p-7 rounded-lg bg-white bg-opacity-30 backdrop-blur-md shadow-2xl border-2 border-transparent hover:border-[#B88E2F] hover:shadow-[0_0_20px_rgba(184,142,47,0.5)] transition-all duration-300 ease-in-out">
                 <h1 className="text-3xl font-extrabold tracking-wide text-center">Register Now !</h1>
                {/* Email Input */}
                <div className="lg:mb-3 mb-2">
                  <label className="block text-sm text-black mb-2">
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="md:w-[22rem] w-full px-4 py-2 bg-[#fff3e3] border-2 text-black border-opacity-45 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white transition duration-200 ease-in-out"
                    placeholder="Name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-[12px] lg:mt-2"
                  />
                </div>
                <div className="lg:mb-3 mb-2">
                  <label className="block text-sm text-black mb-2">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="md:w-[22rem] w-full px-4 py-2 bg-[#fff3e3] border-2 text-black border-opacity-45 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white transition duration-200 ease-in-out"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-[12px] lg:mt-2"
                  />
                </div>

                {/* Password Input */}
                <div className="lg:mb-5 mb-3 relative">
                  <label className="block text-sm text-black  mb-2">
                    Password
                  </label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="md:w-[22rem] w-full px-4 py-2 bg-[#fff3e3] border-2 text-black border-opacity-45 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-white transition duration-200 ease-in-out"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute top-11 right-4 flex items-center text-[20px] text-white text-opacity-80"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash className="text-black" /> : <FaEye className="text-black" />}
                  </button>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-[12px] lg:mt-2 "
                  />
                </div>

                {/* Submit Button */}
                <button
                  className="w-full lg:py-3 py-2  border-2 border-[#B88E2F] bg-[#B88E2F] text-white text-sm hover:bg-white hover:text-[#B88E2F] transition duration-200 ease-in-out disabled:opacity-70"
                  type="submit"
                  disabled={loading}
                >
                  Signup
                </button>

                <div className="flex items-center my-2 text-black">
                  <hr className="flex-1 border-black opacity-40" />
                  <span className="mx-4 text-black">or</span>
                  <hr className="flex-1 border-black opacity-40" />
                </div>

                {/* Google Signup Button */}
               

                {/* Login Link */}
                <p className="text-center text-black text-opacity-80 text-sm mt-3">
                  Already have an account?{" "}
                  <Link to="/login" className=" text-[#B88E2F] hover:underline text-b">
                    Login
                  </Link>
                </p>

                {/* Error/Success Message */}
                {message && (
                  <div
                    className={`text-center mt-4 p-3 rounded-lg ${
                      message.includes("failed") || message.includes("exist") || message.includes("error")
                        ? "bg-red-100 text-red-700 border border-red-300"
                        : "bg-green-100 text-green-700 border border-green-300"
                    }`}
                  >
                    {message}
                  </div>
                )}
              </Form>
            )}
          </Formik>

           {/* Right Section */}
          <div className=" lg:flex items-center hidden">
           <img src="/public/sofa.jpg"></img>
          </div>
        </div>



        
      </div>
    </>
  );
}