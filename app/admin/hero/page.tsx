'use client'
import DashboardHero from '@/app/components/Admin/DashboardHero'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import EditHero from '../../components/Admin/Customization/EditHero';

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
     <div className='flex h-screen'>
         <div className='1500px:w-[16%] w-1/5'>

            
         <AdminSidebar title={title} to={to} icon={icon} selected={selected} setSelected={setSelected} />

         </div>
         <div className='w-[85%]  h-[100%] ml-8 '>
              
              <DashboardHero/>
              
              <EditHero/>

         </div>

     </div>

    </AdminProtected>
 </div>
  )
}
export default Page;