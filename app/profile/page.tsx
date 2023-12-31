'use client'
import React, {  FC, useState,  } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";


type Props = {};

const page: FC<Props> = (props) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const {user} = useSelector((state:any)=> state.auth);  

  return <>
   <Protected >
     <Heading
        title={`${user?.name} Profile`}
        description="ELearning is a platform for students to learn and get help from teachers"
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

   </Protected>
  </>;
};

export default page;
