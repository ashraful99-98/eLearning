'use client'
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer/Footer'
import Policy from "./Policy"

type Props = {}

const page = (props: Props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeItem, setActiveItem] = useState(3);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [route, setRoute] = useState("Login");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {user} = useSelector((state:any)=> state.auth);
  return (
    <div>
        <Heading
        title='Policy -ELearning'
        description='ELearning is a learning management system for helping programmers.'
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

    </div>
  )
}
export default page;