import CoursePlayer from '@/app/utils/CoursePlayer'
import Ratings from '@/app/utils/Ratings'
import Link from 'next/link'

import React, { useEffect, useState } from 'react'
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'
import { styles } from '../Styles/styles'
import CourseContentList from '../Course/CourseContentList';

import CheckOutFrom from "../Payment/CheckOutFrom";
import {Elements} from "@stripe/react-stripe-js";
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import Image from 'next/image'
import { VscVerifiedFilled } from 'react-icons/vsc'
type Props = {
    data:any;
    stripePromis:any;
    clientSecret:string;
    setRoute: any;
    setOpen:any;
}

const CourseDetails = ({data, stripePromis,clientSecret, setOpen:openAuthModal, setRoute}: Props) => {
  const {data:userData} = useLoadUserQuery(undefined,{});

  const [user, setUser] = useState<any>();
  
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    setUser(userData?.user);

  },[userData]);

  const discountPercentenge = (
    (data?.estimatedPrice - data.price)/data?.estimatedPrice) * 100;

   const discountPercentengePrice = discountPercentenge.
   toFixed(0);

   const isPurchased = user && user?.courses?.find((item:any)=> item._id === data._id);

   const handleOrder = (e:any)=>{
     if(user){
      setOpen(true);
     }
     else{
      setRoute("Login");
      openAuthModal(true);
     }
   };

  return (
    <div>
      <div className='w-[95%] 800px:w-[90%] m-auto py-5 pt-20'>
        <div className='w-full flex flex-col-reverse 800px:flex-row'>
          <div className='w-full 800px:w-[65%] 800px:pr-5'>
            <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
              {data.name}
            </h1>
            <div className='flex items-center justify-between pt-3'>
              <div className='flex items-center'>
                <Ratings rating={data?.ratings}/>
                <h5 className=' text-black dark:text-white'>
                  {data.reviews?.length} Reviews
                </h5>
              </div>
              <h5 className=' text-black dark:text-white'>{data.purchased} Students</h5>

            </div>
            <br />
            <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
              What you will learn from this course?
            </h1>
            <div>
              {data.benefits?.map((item:any, index:number)=>(
                <div className='w-full flex 800px:items-center py-2'
                key={index}>
                  <div className='w-[15px] mr-1'>
                    <IoMdCheckmarkCircleOutline size={20} className=" text-black dark:text-white"/>
                  </div>
                  <p className='pl-2 text-black dark:text-white'>{item.title}</p>
                </div>
              ))}
            </div>
            <br />
            <br />
          <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
              What are the prerequisites for starting this course?
            </h1>
            <div>
              {data.prerequisites?.map((item:any, index:number)=>(
                <div className='w-full flex 800px:items-center py-2'
                key={index}>
                  <div className='w-[15px] mr-1'>
                    <IoMdCheckmarkCircleOutline size={20} className=" text-black dark:text-white"/>
                  </div>
                  <p className='pl-2 text-black dark:text-white'>{item.title}</p>
                </div>
              ))}
              <br />
              <br />
              <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
              Course Overview
            </h1>
            <CourseContentList 
            data={data?.courseData}
            isDemo={true}/>
          </div>
          <br />
          <br />
          {/* Course description  */}
          <div className="w-full">
          <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
              Course Details
          </h1>
          <p className='text-[17px] mt-[20px] whitespace-pre-line w-full overflow-hidden font-Poppins font-[600] text-black dark:text-white'>
              {data.description}
          </p>
          </div>
          <br />
          <br />
          <div className="w-full">
            <div className='flex flex-col  items-start'>
             <div>
             <Ratings rating={data?.ratings}/>
              <div className='mb-2 800px:mb-[unset]'>
              <h5 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
              {Number.isInteger(data?.ratings) 
              ? data?.ratings.toFixed(1) : data?.ratings.toFixed(2) }{" "}
              Course Rating || {data?.reviews?.length} Reviews
              </h5>
              </div>
             </div> 
              <br />
              <div>
                
              {(
                data?.reviews && [...data.reviews].reverse()).map((item:any, index:number)=>(
                  <div className="w-full pb-4" key={index}>
                    <div className="flex border-b border-[#000000] dark:border-[#ffffff83] pb-1">
                      <div className='w-[50px] h-[50px]'>
                        <div className='w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer'>
                        <Image src={item.user?.avatar ? item.user?.avatar?.url : "https%3A%2F%2Fres.cloudinary.com%2Fdwtqcpdjr%2Fimage%2Fupload%2Fv1704382193%2Favatars%2Fa7hnxvo23p3kpz11b1eu.avif&w=32&q=75"} alt='' width={50} height={60}
                            className=' rounded-full object-cover w-[50px] h-[50px]'/>
                        </div>
                      </div>
                      <div className=' hidden 800px:block pl-2'>
                        <div className=' flex items-center'>
                        <h5 className='text-[18px] font-Poppins pr-2 text-black dark:text-white'>
                         {item.user.name}
                       </h5>
                       <Ratings rating={item.rating}/>
                        </div>
                        <p className=' text-black dark:text-white'>{item.comment}</p>
                        <small className=' text-[#000000d1] dark:text-[#ffffff83]'>
                          {format(item.createdAt)} .
                        </small>
                      </div>
                      <div className=' pl-2 flex 800px:hidden items-center'>
                      <h5 className='text-[18px] font-Poppins pr-2 text-black dark:text-white'>
                         {item.user.name}
                       </h5>
                       <Ratings rating={item.rating}/>

                      </div>
                    </div>

                    {
                            item.commentReplies.map((i:any,index:number)=>(
                                // eslint-disable-next-line react/jsx-key
                                <div className=' w-full flex 800px:ml-16 my-5'>
                                    <div className=' w-[50px] h-[50px]'>
                                    <Image
                src={i.user.avatar ? i.user.avatar.url  : "https%3A%2F%2Fres.cloudinary.com%2Fdwtqcpdjr%2Fimage%2Fupload%2Fv1704382193%2Favatars%2Fa7hnxvo23p3kpz11b1eu.avif&w=32&q=75"} alt='' width={50} height={60}
                className=' rounded-full object-cover w-[50px] h-[50px]'
                />
                                    </div>
                                    <div className='pl-3 dark:text-white text-black'>
                                    <div className="flex w-full items-center">
                   <h5 className='text-[20px]'>
                        {i.user.name}
                    </h5>{i.user.role === "admin" && <VscVerifiedFilled className=" text-[20px] ml-1 text-[#4747f9]"/>}
                   </div>
                    <p>{i.comment}</p>
                    <small className='dark:text-[#ffffff83] text-black'>{format(i.createdAt)}.</small>
                </div>
                                </div>
                            ))
                          }

                  </div>
                ))
                }
              </div>

            </div>
          </div>

          </div>

        <div className=' w-full 800px:w-[35%] relative'>
          <div className=' sticky top-[100px] 800px:top-[150px] left-0 z-[10] w-[110%]'>
            <CoursePlayer
            videoUrl={data?.demoUrl}
            title={data?.title}
            />
            <div className='flex items-center'>
              <h1 className='pt-5 text-[25px] text-black dark:text-white'>
                {data.price === 0 ? "Free" : data.price + "$"}
              </h1>
              <h5 className=' pl-2 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white'>
                  {data.estimatedPrice}$
              </h5>
              <h4 className=' pl-5 text-[22px] pt-2 text-black dark:text-white'>
                  {discountPercentengePrice}% Off
              </h4>
            </div>
            <div className=' flex items-center'>



              {isPurchased || user?.role === "admin" ?
               (
                <Link
                className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                href={`/course-access/${data._id}`}
                >
                  Enter to Course
                </Link>
              ):(
                <button
                className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                onClick={handleOrder}
                >
                  Buy Now {data.price}$
                </button>
              )}
            </div>
            <br />
            <br />
            <p className="pb-1 text-black dark:text-white"># Source code included</p>
          <p className="pb-1  text-black dark:text-white"># Full lifetime access</p>
          <p className="pb-1  text-black dark:text-white"># Certificate of completion</p>
          <p className="pb-1 800px:pb-1  text-black dark:text-white"># Premium Support</p>

          </div>

        </div>
        </div>
      </div>
      <>
      {
        open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="min-h-[500px] w-[500px] bg-white rounded-xl shadow p-3">
              <div className="w-full flex justify-end">
                <IoMdCloseCircleOutline
                size={40}
                className=" text-black cursor-pointer"
                onClick={()=> setOpen(false)}
                />
              </div>
              <div className="w-full">
                {
                  stripePromis && clientSecret && (
                    <Elements stripe={stripePromis} options={{clientSecret}}>
                      <CheckOutFrom setOpen={setOpen} data={data}
                      user={user}
                      />

                    </Elements>
                  )
                }
              </div>

            </div>

          </div>
        )
      }
      </>
    </div>
  )
}
export default CourseDetails;