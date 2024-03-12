"use client"
import React from 'react'
import AdminSidebar from '../../../components/Admin/sidebar/AdminSidebar';
import Heading from '@/app/utils/Heading';
import EditCourse from "../../../components/Admin/Course/EditCourse";
import DashboardHero from '@/app/components/Admin/DashboardHero';

type Props = {
  
    title:string;
    to:string;
    icon: any;
    selected:any;
    setSelected:any;
  }
  

const Page = ({params,title, to, icon, selected, setSelected}:any) => {
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
            <AdminSidebar title={title} to={to} icon={icon} selected={selected} setSelected={setSelected} />


            </div>

            <div className='w-[83%]'>
                <DashboardHero/>
                <EditCourse id={id}/>

            </div>

        </div>
    </div>
  )
}
export default Page;