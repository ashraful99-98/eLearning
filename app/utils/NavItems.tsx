import Link from 'next/link';
import React from 'react'

export const navItemsData =[
    {
        name:"Home",
        url:"/"
    },
    {
        name:"Courses",
        url: "/courses",
    },
    { name: "About",
      url:"/about"
    },
    {
        name:"Policy",
        url:"/policy"
    },
    {
        name:"FAQ",
        url:"/faq"
    },
    {
        name:"Contact",
        url:"/contact"
    },
];

type Props = {
    activeItem : number;
    isMobile: boolean;
}

const  NavItems:React.FC<Props>=({activeItem, isMobile}) =>{
  return (
    <>
    <div className='hidden 800px:flex'>
        {
            navItemsData && navItemsData.map((i,index)=>(
                <Link href={`${i.url}`} key={index} passHref>
                    
                    <span
                    className={`${activeItem === index ? "dark:text-[#6b6bff] text-[crimson]" : "dark:text-white text-black"} text-[18px] xl:px-6 lg:px-5 md:px-3 sm:px-2 font-Poppins font-[400]`}
                    >
                       {i.name} 
                    </span>

                </Link>
            ))
        }

    </div>
    {
        isMobile && (
            <div className='800px:hidden mt-5'>
             
               {
               navItemsData && navItemsData.map((i,index)=>(
                <Link href="/" key={index} passHref>
                    
                    <span
                    className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} text-[18px] px-6 font-Poppins font-[400] flex flex-col py-2`}
                    >
                      {i.name}
                    </span>

                </Link>
            ))

               }
             

            </div>
        )

    }
    </>
  )
}
export default NavItems;