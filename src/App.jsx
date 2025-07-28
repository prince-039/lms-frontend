import './App.css';
import './index.css';
import Footer from './Components/Footer';
import React from 'react'
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import HomePage from './Pages/HomePage.jsx';
import AboutUs from './Pages/AboutUs.jsx';
import NotFound from './Pages/NotFound.jsx';
import Signup from './Pages/Signup.jsx';
import { Toaster } from "react-hot-toast";
import Login from './Pages/Login.jsx';
import CourseList from './Pages/Course/CourseList.jsx';
import Contact from './Pages/Contact.jsx';
import Denied from './Pages/Denied.jsx';
import CourseDescription from './Pages/Course/CourseDescription.jsx';
import RequireAuth from './Components/Auth/RequireAuth.jsx';
import CreateCourse from './Pages/Course/CreateCourse.jsx';
import Profile from './Pages/User/Profile.jsx';
import EditProfile from './Pages/User/EditProfile.jsx';
import Checkout from './Pages/Payment/Checkout.jsx';
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess.jsx';
import CheckoutFail from './Pages/Payment/CheckoutFailure.jsx';
import Displaylectures from './Pages/Dashboard/Displaylecture.jsx';
import AddLecture from './Pages/Dashboard/Addlecture.jsx';
import AdminDashboard from './Pages/Dashboard/AdminDashboard.jsx';


function App() {

  return (
    <>
     <Toaster position="top-right" />
      <Routes>
           <Route path="/" element={<HomePage />}></Route>

           <Route path="/about" element={<AboutUs />}></Route>

          <Route path="/courses" element={<CourseList />}></Route>

            <Route path="/signup" element={<Signup />}></Route>

            <Route path="/login" element={<Login />}></Route>

            <Route path="/course/description" element={<CourseDescription />} />

            <Route path="/contact" element={<Contact />}></Route>

            <Route path="/denied" element={<Denied />} />

            <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>

            <Route path="/course/create" element={<CreateCourse />} />

            <Route path="/course/addlecture" element={<AddLecture />} />

            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

             <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
            <Route path='/user/profile' element={<Profile />} />
           
            <Route path='/user/editprofile'  element={<EditProfile />}/>

            <Route path='/checkout'  element={<Checkout />}/>
            <Route path='/checkout/success'  element={<CheckoutSuccess />}/>
            <Route path='/checkout/fail'  element={<CheckoutFail />}/>
            <Route path='/course/displaylectures'  element={<Displaylectures />}/>
            </Route>
           <Route path="*" element={<NotFound/>}></Route>
          
      </Routes>  
    </>
  );
}

export default App;
