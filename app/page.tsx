'use client'
import React, { FC, useState } from "react";
// import Heading from "./utils/Heading";
// import Header from "./components/Header";
// import Hero from "./components/Route/Hero";
// import Courses from "./components/Route/Courses";
// import Reviews from "./components/Route/Reviews";
// import FAQ from "./components/FAQ/FAQ";
// import Footer from "./components/Footer/Footer";

import dynamic from 'next/dynamic';

const Heading = dynamic(() => import("./utils/Heading"), {
  ssr: false,
});
const Header = dynamic(() => import("./components/Header"), {
  ssr: false,
});
const Hero = dynamic(() => import("./components/Route/Hero"), {
  ssr: false,
});
const Courses = dynamic(() => import("./components/Route/Courses"), {
  ssr: false,
});
const Reviews = dynamic(() => import("./components/Route/Reviews"), {
  ssr: false,
});
const Footer = dynamic(() => import("./components/Footer/Footer"), {
  ssr: false,
});


interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <>
      <Heading
        title="CodeCanvas"
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
      <Hero />
      <Courses/>
      <Reviews/>
      {/* <FAQ/> */}
      <Footer/>
    </>
  );
};

export default Page;
