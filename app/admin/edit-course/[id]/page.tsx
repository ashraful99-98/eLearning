"use client"
import React from 'react'
import AdminSidebar from '../../../components/Admin/sidebar/AdminSidebar';
import Heading from '@/app/utils/Heading';

import DashboardHeader from '@/app/components/Admin/DashboardHeader';

import EditCourse from "../../../components/Admin/Course/EditCourse";
type Props = {}

const page = ({params}:any) => {
    const id = params?.id;
  return (
    <div>
        <Heading
           title='CodeCanvas - Admin'
           description='CodeCanvas is a platform for students to learn and get help form teachers'
           keywords='Programming,MERN,Redux,Machine Learning'
        />
        <div className='flex'>
            <div className='1500px:w-[15%] w-1/5'>
                <AdminSidebar/>


            </div>

            <div className='w-[83%]'>
                <DashboardHeader/>
                <EditCourse id={id}/>

            </div>

        </div>
    </div>
  )
}
export default page;