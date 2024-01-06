"use client"
import React from 'react'
import AdminSidebar from '../../components/Admin/sidebar/AdminSidebar';
import Heading from '@/app/utils/Heading';
import CreateCourse from '../../components/Admin/Course/CreateCourse';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Heading
           title='ELearning - Admin'
           description='ELearning is a platform for students to learn and get help form teachers'
           keywords='Programming,MERN,Redux,Machine Learning'
        />
        <div className='flex'>
            <div className='1500px:w-[15%] w-1/5'>
                <AdminSidebar/>


            </div>

            <div className='w-[83%]'>
                <DashboardHeader/>
                <CreateCourse/>

            </div>

        </div>
    </div>
  )
}
export default page;