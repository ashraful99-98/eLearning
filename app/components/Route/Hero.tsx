import Image from "next/image";
import Link from "next/link";
import React,{FC} from "react";
import { BiSearch } from "react-icons/bi";
import './Hero.css';

type Props={};

const Hero: FC<Props>=(props)=>{
return(

    <section className="items-center hero-section ">

        <div className="absolute  1000px:top-[unset] hero-div">

            <div className="w-[100%] h-[100%] 1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-1 p-5  div-img">


                  <Image src={require("../../images/solar-system-animation.svg")} alt="" className="" />

            </div>

            <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left relative w-[100%] h-[100%] top-10 div-info">

                <h2 className="dark:text-white text-[#000000c7]  font-Josefin font-[600] text-[50px] 1500px:w-[55%] 1100px:w-[78]% ">
                    Improve Your Online Learning Experience Better Instantly
                </h2>

                <br />

                <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:w-[55%] 1100px:w-[78]%">
                    We have 40k+ Online course & 500k Online registered student. Find your desired Course from them.
                </p>

                <br />
                <br />

                <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">

                    <input type="search"
                    placeholder="Search Course..."
                    className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin " />

                    <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
                        <BiSearch size={30}/>

                    </div>
                </div>
                <br />
                <br />
                <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] relative flex items-center my-[-17px]">
                  <div className="  flex image-box mr-8">
                     <Image src={require("../../images/photo-1539571696357-5a69c17a67c6.avif")}alt="" className="rounded-full"/>

                     <Image src={require("../../images/hero-banner-2.jpg")} alt="" className=" ml-[-10px] rounded-full" />

                     <Image src={require("../../images/hero-banner-1.jpg")}  alt="" className="ml-[-10px] rounded-full " />

                  </div>

                    <p className=" dark:text-[#ffffffe6] text-[#0000007c]">500k+ People already trusted us.{""}
                    <Link href="/courses"
                    className="dark:text-[#46e256] text-[crimson]"
                    >
                        View Courses
                    </Link>{""}
                    </p>

                </div>
                <br />

            </div>

        </div>

    </section> 
);

};

export default Hero;