'use client'
import DashboardHero from '@/app/components/Admin/DashboardHero'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import AllUsers from '@/app/components/Admin/Users/AllUsers'
import AllAdminTeam from '@/app/components/Admin/Users/AllAdminTeam'



type Props = {}

const page = (props: Props) => {
  return (
    <div>
    <AdminProtected>

    <Heading
     title='ELearning - Admin'
     description='ELearning is a platform for students to learn and get help form teachers'
     keywords='Programming,MERN,Redux,Machine Learning'
     />
     <div className='flex h-screen'>
         <div className='1500px:w-[16%] w-1/5'>

             <AdminSidebar/>

         </div>
         <div className='w-[85%] ml-8'>
              <DashboardHero/>
              <AllAdminTeam isTeam={true}/>

         </div>

     </div>

    </AdminProtected>
 </div>
  )
}
export default page;