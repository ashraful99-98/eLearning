import Image from "next/image";
import Link from "next/link";
import React,{FC, useState} from "react";
import { BiSearch } from "react-icons/bi";
import './Hero.css';
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";

type Props={};

const Hero: FC<Props>=(props)=>{

    const { data, isLoading } = useGetHeroDataQuery("Banner",{});

    const [search, setSearch] = useState("");

    const router = useRouter();

    const handleSearch = ()=>{
        if(search === ""){
            return
        }else{
            router.push(`/courses?title=${search}`)
        }
    }


return(
<>
{
    isLoading ? (
        <Loader/>
    ):(
        <div className="items-center hero-section relative  hero_animation hero_textColor pt-10 z-40 ">          

        <div className="absolute  1000px:top-[unset] hero-div justify-center ">

            <div className="w-[100%] h-[100%] pb-24 1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end 1000px:pt-[0] z-1 div-img">

                  <Image src={data?.layout?.banner?.image?.url} width={550}
                  height={550} alt="" className="img-box" />

            </div>

            <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left relative w-[100%] h-[100%] top-10 div-info z-0">

                <h2 className="dark:text-white text-[#000000c7]  font-Josefin font-[600] text-[50px] 1500px:w-[55%] 1100px:w-[78]% ">
                {data?.layout?.banner?.title}
                </h2>

                <br />

                <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:w-[55%] 1100px:w-[78]%">
                {data?.layout?.banner?.subTitle}
                </p>

                <br />
                <br />

                <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">

                    <input type="search"
                    placeholder="Search Course..."
                    className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin "
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}
                    onClick={handleSearch}
                    />

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

    </div> 
    )
}
</>
 
);

};

export default Hero;