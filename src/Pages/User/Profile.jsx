import { useSelector, useDispatch } from 'react-redux';
import HomeLayout from '../../Layouts/HomeLayout.jsx';
import { Link } from 'react-router-dom';
import { cancelCourseBundle } from '../../Redux/Slices/RazorpaySlice.js'
import { getUserData } from '../../Redux/Slices/AuthSlice.js';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


function Profile() {

const dispatch = useDispatch();
const navigate = useNavigate();
const userData = useSelector((state) => state?.auth?.data);

async function handleCancellation() {
 toast("Initiating cancellation");
 await dispatch(cancelCourseBundle());
 await dispatch(getUserData());
 toast.success("Cancellation completed");
 navigate("/");
}

 return (
    <HomeLayout>
      <div className='min-h-[90vh] flex items-center justify-center'>
         <div className='my-10 flex flex-col gap-4 p-4 text-white w-120 shadow-[0_0_10px_black] rounded-lg'>
              <img 
              src={userData?.avatar?.secure_url}
              className='w-40 m-auto rounded-full border border-black'
              />
              <h3 className='text-xl font-semibold text-center capitalize'>
                {userData?.fullName}
              </h3>
              <div className='grid grid-cols-2'>
                <p>Email: </p><p>{userData?.email}</p>
               
                <p>Role: </p><p>{userData?.role}</p>
                
                 <p>Subscription: </p><p>{userData?.subscription?.status === "active" ? "Active" : "Inactive"}</p>
              </div>
              <div className='flex items-center justify-between gap-2'>
               <Link 
               to="/changepassword" className='w-1/3 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-white items-center justify-center text-center'>
                <button >Change password</button>

               </Link>

                <Link 
               to="/user/editprofile" className='w-1/3 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-white items-center justify-center text-center'>
                <button >Edit Profile</button>

               </Link>
              </div>
              {userData?.subscription?.status === 'created' && (
                <button onClick={(handleCancellation)} className='w-full bg-red-600 hover:bg-red-500 py-2'>
                    Cancel Subscription
                </button>
              )}
         </div>
      </div>
    </HomeLayout>
 );
}

export default Profile;