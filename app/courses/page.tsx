'use client'
import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import Header from '../components/Header'
import Heading from '../utils/Heading'
import { styles } from '../components/Styles/styles'
import CourseCard from '../components/Course/CourseCard'
import Footer from '../components/Footer/Footer'

type Props = {}

const page = (props: Props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const searchParams = useSearchParams();

    const search = searchParams?.get('title');

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data, isLoading} = useGetUsersAllCoursesQuery(undefined,{});
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data:categoriesData} = useGetHeroDataQuery("Categories",{});
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [route, setRoute] = useState("Login");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [courses, setCourses] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [category, setCategory] = useState("All");

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{

        if(category === "All"){
            setCourses(data?.courses);
        }
        if(category !== "All"){
            setCourses(
                data?.courses.filter((item:any)=> item.categories === category)
            );
        }
        if(search){
            setCourses(
                data?.courses.filter((item:any)=> item.name.toLowerCase().includes(search.toLowerCase()))
            );
        }
        

    },[data, category, search]);

    const categories = categoriesData?.layout.categories;


  return (
    <>
    {
        isLoading ? (
            <Loader/>
        ):(
            <>
            <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
            />
            <div className=' w-[95%] 800px:w-[85%] m-auto min-h-[70vh]'>
                <Heading
                title={"All courses - ELearning"}
                description={"ELearning is a programming community."}
                keywords={"programming community, coding skills, export insights, collaboration, growth"}
                />
                <br />
                <div className=' w-full flex items-center flex-wrap mt-20'>
                    <div className={` h-[35px] ${category === "All" ? "bg-[crimson]": "bg-[#5050cd]"} m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer font-[600]`}
                    onClick={()=> setCategory("All")}
                    >
                        All
                    </div>
                    {
                        categories && categories.map((item:any, index:number)=>(
                            <div key={index}>
                                <div className={` h-[35px] ${category === item.title ? "bg-[crimson]": "bg-[#5050cd]"} m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer font-[600]`}
                    onClick={()=> setCategory(item.title)}>
                        {item.title}

                                </div>

                            </div>
                        ))
                    }
                    </div>
                    {
                        courses && courses.length === 0 && (
                            <p className={`${styles.label} justify-center min-h-[50vh] flex items-center`}>
                                {search ? "No courses found": "No courses found in this category. Please try another one!"}
                            </p>
                        )
                    }
                    <br />
                    <br />
                    <div className=' grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[30px] mb-12 border-0  '>
                        {
                            courses && courses.map((item:any, index:any)=>(
                                <CourseCard
                                item={item}
                                key={index}
                                />
                            ))
                        }

                </div>

            </div>

            <Footer/>
            
            </>
        )
    }
    </>
  )
}
export default page;