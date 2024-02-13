'use client'
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import CourseContent from "../../components/Course/CourseContent";

type Props = {
    params:any;
}

const page = ({params}: Props) => {
    const id = params.id;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {isLoading, error, data} = useLoadUserQuery(undefined,{});

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        if(data){
            const isPurchased = data.user.courses.find((item:any)=>item._id === id);
            // const admin = data.user.role === "admin" && item?._id === id;

            // if( admin){
            //     redirect(`/course-access/${data._id}`);
            // }

            if(!isPurchased){
                redirect("/");
            }
            if(error){
                redirect("/");
            }
        }

    },[data, error]);
  return (
    <>
    {
        isLoading ? (
            <Loader/>
        ): (
            <div>
                <CourseContent id={id} user={data.user}/>
            </div>
        )
    }

    </>
  )
}
export default page;