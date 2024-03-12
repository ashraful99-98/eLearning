'use client'
import React, { useState } from 'react'
// import Heading from '../utils/Heading'
// import Header from '../components/Header'
import { useSelector } from 'react-redux'
// import Footer from '../components/Footer/Footer'
// import Policy from "./Policy";
import dynamic from 'next/dynamic';

const Heading = dynamic(() => import("../utils/Heading"), {
  ssr: false,
});
const Header = dynamic(() => import("../components/Header"), {
  ssr: false,
});
const Footer = dynamic(() => import("../components/Footer/Footer"), {
  ssr: false,
});
const Policy = dynamic(() => import("./Policy"), {
  ssr: false,
});

type Props = {}

const Page = (props: Props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeItem, setActiveItem] = useState(3);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [route, setRoute] = useState("Login");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {user} = useSelector((state:any)=> state.auth);
  return (
    <>
        <Heading
        title='Policy -CodeCanvas'
        description='CodeCanvas is a learning management system for helping programmers.'
        keywords='programing, MERN, Redux, Machine Learning'
        />

        <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
        />
        <Policy/>

        <Footer/>

    </>
  )
}
export default Page;