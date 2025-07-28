import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllCourses } from '../../Redux/Slices/CourseSlice.js';
import HomeLayout from '../../Layouts/HomeLayout.jsx';
import CourseCard from '../../Components/CourseCard.jsx';


function CourseList() {

    const dispatch = useDispatch();

    const { courseData } = useSelector((state) => state?.course);

    async function loadCourses() {
        await dispatch(getAllCourses());
    }
    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <HomeLayout>
           <div className='min-h-[90vh] p-12 pl-20 flex flex-col gap-10 flex-white'>
            <h1 className='text-center text-3xl font-semibold mb-5'>
                Explore the courses made by
                <span className='font-bold text-yellow-500'>
                    Industry experts
                </span>
          </h1>
                <div className='mb-10 flex flex-wrap gap-14'>
                   {courseData?.map((element) => {
                    return <CourseCard key={element._id} data={element} />
                   })}
                </div>
            
           </div>

        </HomeLayout>
    )
}

export default CourseList;