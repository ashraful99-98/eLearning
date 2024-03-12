'use client'
import React from 'react'
import Heading from '../utils/Heading'
import  AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import AdminProtected from '../hooks/adminProtected';
import DashboardHero from  "../components/Admin/DashboardHero";

type Props = {
  
  title:string;
  to:string;
  icon: any;
  selected:any;
  setSelected:any;
}


const Page = ({title, to, icon, selected, setSelected}: Props) => {
  return (
    <div>
       <AdminProtected>

       <Heading
        title='CodeCanvas - Admin'
        description='CodeCanvas is a platform for students to learn and get help form teachers'
        keywords='Programming,MERN,Redux,Machine Learning'
        />
        <div className='flex h-[200vh]'>
            <div className='1500px:w-[16%] w-1/5'>

               
         <AdminSidebar title={title} to={to} icon={icon} selected={selected} setSelected={setSelected} />

            </div>
            <div className='w-[85%]'>
                 <DashboardHero isDashboard={true}/>

            </div>

        </div>

       </AdminProtected>
    </div>
  )
}
export default Page;