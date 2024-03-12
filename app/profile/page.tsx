'use client'
import React, {  FC, useState,  } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import Footer from "../components/Footer/Footer";

// import dynamic from 'next/dynamic';

// const Heading = dynamic(() => import("../utils/Heading"), {
//   ssr: false,
// });
// const Protected = dynamic(() => import("../hooks/useProtected"), {
//   ssr: false,
// });
// const Header = dynamic(() => import("../components/Header"), {
//   ssr: false,
// });
// const Profile = dynamic(() => import("../components/Profile/Profile"), {
//   ssr: false,
// });
// const Footer = dynamic(() => import("../components/Footer/Footer"), {
//   ssr: false,
// });


type Props = {};

const Page: FC<Props> = (props) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(6);
  const [route, setRoute] = useState("Login");
  const {user} = useSelector((state:any)=> state.auth);  

  return (
    <div className="min-h-screen">
    <Protected >
      <Heading
         title={`${user?.name} Profile - CodeCanvas`}
         description="CodeCanvas is a platform for students to learn and get help from teachers"
         keywords="Programing,MERN,Redux,Machine Learning"
       />
 
       <Header
         open={open}
         setOpen={setOpen}
         activeItem={activeItem}
         setRoute={setRoute}
         route={route}
       />
       <br />
       <Profile user={user}></Profile>
       
       <Footer/>
 
    </Protected>
   </div>
  );
};

export default Page;
