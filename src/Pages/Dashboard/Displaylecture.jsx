import HomeLayout from "../../Layouts/HomeLayout";
import { useNavigate, useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getCourseLectures } from "../../Redux/Slices/LectureSlice.js";
import { deleteCourseLecture } from "../../Redux/Slices/LectureSlice.js";


function Displaylectures() {

 const navigate = useNavigate();
 const dispatch = useDispatch();
 const {state} = useLocation();
 //const state = location?.state;
   const {lectures} = useSelector((state) => state.lecture || {});
   const {role} = useSelector((state) => state.auth || {});

   const [currentVideo, setCurrentVideo] = useState(0);

   async function onLectureDelete(courseId, lectureId) {
   await dispatch(deleteCourseLecture({courseId: courseId, lectureId: lectureId}));
   await dispatch(getCourseLectures(courseId))
   }
 useEffect(() => {
    console.log(state);
  if(!state) navigate("/courses");
  dispatch(getCourseLectures(state._id));
 }, []);


 return (
  <HomeLayout>
     <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white px-10">
      <div className="text-center text-2xl font-semibold text-yellow-500">
        Course Name: {state?.title}
      </div>

      {(lectures && lectures.length > 0) ? (<div className="flex justify-center gap-10 w-full">
        {/* left section for playing videos and displaying course details to admin*/}
        <div className="space-y-5 e-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
            <video 
            src={lectures && lectures[currentVideo]?.lecture?.secure_url}
            className="object-fill rounded-tl-lg rounded-tr-lg w-full"
            controls
            disablePictureInPicture
            muted
            controlsList="nodownload"
            >

            </video>
               <div>
                 <h1>
                  <span className="text-yellow-500"> Title:{" "}
                    
                  </span>
                   {lectures && lectures[currentVideo]?.title}
                 </h1>
                 <p>
                    <span className="text-yellow-500 line-clamp-4">
                      Discription: {" "}
                    </span>
                    {lectures && lectures[currentVideo]?.description}
                 </p>
               </div>
        </div>
        {/* right section for playing list of lectures*/}
        <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
            <li className="font-semibold text-xl text-yellow flex items-center justify-between">
                <p>Lectures list</p>
                {role === 'ADMIN' && (
                    <button 
                    onClick={() => navigate("/course/addlecture", {state: {...state}})}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md font-semibold text-sm transition-all duration-200">
                        Add new lecture
                    </button>
                )}
            </li>
            {lectures && 
               lectures.map((lecture, idx) => {
                 return (
                      <li className="space-y-2" key={lecture._id}>
                       <p className="cursor-pointer onClick={() => setCurrentVideo(idx)}">
                         <span>
                            {" "} Lecture {idx + 1} : {" "}
                         </span>
                         {lecture?.title}
                       </p>
                         {role === 'ADMIN' && (
                    <button onClick={() => onLectureDelete(state?._id, lecture?._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md font-semibold text-sm transition-all duration-200">
                        Delete Lecture
                    </button>
                         )}
                      </li>
                 )
               })
            }
        </ul>
      </div>): (
         role === 'ADMIN' && (
                    <button 
                    onClick={() => navigate("/course/addlecture", {state: {...state}})}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md font-semibold text-sm transition-all duration-200">
                        Add new lecture
                    </button>
                )
      )}
     </div>
     
  </HomeLayout>
 );
}

export default Displaylectures;