'use client'
import React, { FC, useState } from 'react'
import SideBarProfile from './SideBarProfile';
import { useLogOutQuery } from '@/redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import ProfileInfo from './ProfileInfo';
type Props = {
    user:any;
  
}

const Profile:FC<Props> = ({user}) => {
    const [scroll,setScroll] = useState(false);
    const [avatar, setAvatar]= useState(null);
    const [active, setActive] = useState(1);
    const [logout, setLogout] = useState(false);
    const {} = useLogOutQuery(undefined,{
        skip: !logout ? true : false,
    });

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
    }
  return (
    <div className='w-full h-full relative hero_animation hero_textColor  '>

    <div className='w-[85%] h-full flex mx-auto'>
        <div className={`w-[60px] 800px:w-[310px] h-[460px] dark:bg-slate-900 bg-gray-400 bg-opacity-90 border-2 dark:border-[#ffffff1d] border-[#ffffff16] rounded-[5px] dark:shadow-sm shadow-sm mt-[80px] mb-[80px] sticky ${scroll ? "top-[130px]" : "top-[30px]"}`}>

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
                   <div className='w-full h-[460px] dark:bg-slate-900 bg-gray-400 mt-[80px] bg-opacity-90 border-2  dark:border-[#ffffff1d] border-[#ffffff16] rounded-[5px] ml-4 z-[9] '>
                    <ProfileInfo avatar={avatar} user={user}/>

                   </div>
                )
            }



    </div>
    </div>
  );
}
export default Profile;