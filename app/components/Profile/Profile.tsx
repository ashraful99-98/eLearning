'use client'
import React, { FC, useEffect, useState } from 'react'
import SideBarProfile from './SideBarProfile';
import { useLogOutQuery } from '@/redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import ProfileInfo from './ProfileInfo';
import ChangePassword from './ChangePassword';
import CourseCard from '../Course/CourseCard';
import {  useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi';
type Props = {
    user:any;
  
}

const Profile:FC<Props> = ({user}) => {
    const [scroll,setScroll] = useState(false);
    const [avatar, setAvatar]= useState(null);
    const [active, setActive] = useState(1);
    const [logout, setLogout] = useState(false);
    const [courses, setCourses] = useState([]);
    const {} = useLogOutQuery(undefined,{
        skip: !logout ? true : false,
    });
    const {data, isLoading} = useGetUsersAllCoursesQuery(undefined,{})

    const logoutHandler =async () => {
        await signOut();
        setLogout(true);
    }

    if(typeof window !== "undefined"){
        window.addEventListener("scroll", ()=>{
            if(window.scrollY>85){
                setScroll(true);
            }else{
                setScroll(false);
            }
        });
    };

    useEffect(()=>{
        if(data){
            const filteredCourses = user.courses
            .map((userCourses:any)=> data.courses.find((course:any)=> course._id === userCourses._id))
            .filter((course:any)=> course !== undefined);
            setCourses(filteredCourses);
        }
 
    },[data]);


  return (
    <div className='w-full  relative
    '>
    <div className='w-[85%] h-full flex mx-auto mt-4'>
        <div className={`w-[60px] 800px:w-[310px] h-[460px] dark:bg-slate-900 bg-[#f3f3f3] bg-opacity-90 border-2 dark:border-[#ffffff1d] border-[#ffffff16] rounded-[5px] dark:shadow-sm shadow-sm mt-[80px] mb-[80px] sticky ${scroll ? "top-[130px]" : "top-[30px]"}`}>

            <SideBarProfile
            user={user}
            active={active}
            avatar={avatar}
            setActive={setActive}
            logoutHandler={logoutHandler}

            />

        </div>
            {
                active === 1 && (
                   <div className='w-full h-[460px] dark:bg-slate-900 bg-[#f3f3f3]  mt-[80px] bg-opacity-90 border-2  dark:border-[#ffffff1d] border-[#ffffff16] rounded-[5px] ml-4 z-[9] '>
                    <ProfileInfo avatar={avatar} user={user}/>

                   </div>
                )
            }

            {
                active === 2 && (
                   <div className='w-full h-[460px] dark:bg-slate-900  bg-[#f3f3f3]  mt-[80px] bg-opacity-90 border-2  dark:border-[#ffffff1d] border-[#ffffff16] rounded-[5px] ml-4 z-[9] '>

                    <ChangePassword/>
                   

                   </div>
                )
            }
            {
                active === 3 && (
                   <div className='w-full pl-7 px-2 800px:px-10 800px:pl-8 mt-20 mb-4'>
                    <div className=' grid grid-cols-1 gap-[20px] md:grid-cols-1 md:gap-[25px] lg:grid-cols-2
                     lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px] '>
                       {
                        courses && courses.map((item:any, index:number)=>(
                            <CourseCard item={item} key={index} 
                            // user={user}
                            isProfile={true}/>
                        ))
                       }
                    </div>
                    {
                        courses.length === 0 && (
                            <h1 className=' text-center text-[18px] font-Poppins'>
                                You do not have any purchased courses
                            </h1>
                        )
                    }
                   </div>
                )
            }



    </div>
    </div>
  );
}
export default Profile;