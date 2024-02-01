import CoursePlayer from '@/app/utils/CoursePlayer';
import React, { useEffect, useState } from 'react'
import { styles } from '../Styles/styles';
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useAddAnswerInQuestionMutation, useAddNewQuestionMutation, useAddReplyInReviewMutation, useAddReviewInCourseMutation, useGetCoursesDetailsQuery } from '@/redux/features/courses/coursesApi';
import { format } from 'timeago.js';
import { BiMessage } from 'react-icons/bi';
import { VscVerifiedFilled } from 'react-icons/vsc';
import Ratings from '@/app/utils/Ratings';

import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";

const socketId = socketIO(ENDPOINT, {transports: ["websocket"]});

type Props = {
    data:any;
    id:string;
    activeVideo: number;
    setActiveVideo: (activeVideo:number)=>void;
    user:any;
    refetch: any;
}

const CourseContentMedia = ({data, id, activeVideo, setActiveVideo,user, refetch}: Props) => {

    const [activeBar, setActiveBar] = useState(0);
    const [question, setQuestion] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);
    const [answer, setAnswer] = useState("");
    const [questionId, setQuestionId] = useState("");
    const [isReviewReply, setIsReviewReply] = useState(false);
    const [reply, setReply] = useState('');
    const [reviewId, setReviewId] = useState("");
    const [addNewQuestion,{isSuccess, error, isLoading:questionCreationLoading}] = useAddNewQuestionMutation();

    const {data:courseData, refetch: courseRefetch} = useGetCoursesDetailsQuery(id,{refetchOnMountOrArgChange:true});

    const [addAnswerInQuestion,{isSuccess:answerSuccess, error:answerError,isLoading:answerCreationLoading}] = useAddAnswerInQuestionMutation()

    const [addReviewInCourse,{isSuccess:reviewSuccess, error:reviewError,isLoading:reviewCreateLoading}] = useAddReviewInCourseMutation();

    const [addReplyInReview,{isSuccess:replySuccess, error:replyError,isLoading:replyCreateLoading}] = useAddReplyInReviewMutation();

    const course = courseData?.course;

    const isReviewExists = course?.reviews?.find(
        (item:any) => item.user._id === user._id
    );

    const handleQuestion = ()=>{
        if(question.length === 0){
            toast.error("Question can't be empty");
        }
        else{
            console.log({question,courseId:id,contentId:data[activeVideo]?._id});
            addNewQuestion({question,courseId:id,contentId:data[activeVideo]?._id});

        }
    };

    useEffect(()=>{
        if(isSuccess){
            setQuestion("");
            refetch();
            toast.success("Question added successfully");
            socketId.emit("notification",{
                title: "New Question Received",
                message: `You have a new question in ${data[activeVideo]?.title}`,
                userId:user._id,
            })
        }
        if(answerSuccess){
            setAnswer("");
            refetch();
            toast.success("Answer add successfully");

            if(user.role !== "admin"){
                socketId.emit("notification",{
                    title: "New Reply Received",
                    message: `You have a new question reply in  ${data[activeVideo]?.title}`,
                    userId:user._id,
                });
            };
        }
      
        if(error){
            if("data" in error){
               const errorMessage = error as any;
               toast.error(errorMessage.data.message); 
            }
        }
        if(answerError){
            if("data" in answerError){
                const errorMessage = error as any;
                toast.error(errorMessage.data.message); 
             }
        }
        if(reviewSuccess){
            setReview("");
            setRating(1);
            courseRefetch();
            toast.success("Review add successfully");
            socketId.emit("notification",{
                title: "New Review Received",
                message: `You have a new review in ${data[activeVideo]?.title}`,
                userId:user._id,
            })
        }
        if(reviewError){
            if("data" in reviewError){
                const errorMessage = error as any;
                toast.error(errorMessage?.data.message); 
             }
        }
        if(replySuccess){
            setReply('');
            courseRefetch();
            toast.success("Reply added successfully");
        }
        if(replyError){
            if("data" in replyError){
                const errorMessage = error as any;
                toast.error(errorMessage?.data.message); 
            }
        }


    },[isSuccess, error,answerSuccess, answerError, reviewSuccess,reviewError, replySuccess, replyError]);

    const handleAnswerSubmit = ()=>{
        addAnswerInQuestion({answer, courseId:id,contentId:data[activeVideo]?._id,questionId:questionId});
    };

    const handleReviewSubmit = async()=>{
        if(review.length === 0){
            toast.error("Review can't be empty");
        }
        else{
            addReviewInCourse({review,rating,courseId:id});
        }
    };

    const handleReviewReplySubmit = ()=>{
       if(!replyCreateLoading){
        if(reply === ""){
            toast.error("Reply can't be empty");
        }
        else{
            addReplyInReview({comment:reply, courseId: id, reviewId})
        }
    }

    };

  return (
    <div className='w-[95%] 800px:w-[86%] py-4 m-auto'>
        <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
        />
        <div className='w-full flex items-center justify-between my-3'>
            <div className={`${styles.button} text-black dark:text-white !w-[unset] !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[.8]"}`}
            onClick={()=> setActiveVideo(activeVideo === 0 ? 0 : activeVideo -1)}
            >
                <AiOutlineArrowLeft className="mr-2"/>
                Prev Lesson

            </div>
            <div className={`${styles.button} text-black dark:text-white !w-[unset] !min-h-[40px] !py-[unset] ${ data.length -1 === activeVideo  && "!cursor-no-drop opacity-[.8]"}`}
            onClick={()=> setActiveVideo(
                data && data.length -1 === activeVideo ? activeVideo : activeVideo + 1
            )}
            >
                Next Lesson
                <AiOutlineArrowRight className="ml-2"/>
            </div>
        </div>
        <h1 className='pt-2 text-[25px] font-[600] dark:text-white text-black'>{data[activeVideo]?.title}</h1>
        <br />
        <div className=' w-full p-4 flex text-white dark:text-white items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-salte-700] rounded shadow-inner'>
            {
                ["Overview","Resources","Q&A","Reviews"].map((text,index)=>(
                    <h5 key={index}
                    className={` 800px:text-[20px] cursor-pointer ${activeBar === index ? "text-red-500" : "dark:text-white text-black"}`}
                    onClick={()=> setActiveBar(index)}
                    >
                        {text}
                    </h5>
                ))
            }
        </div>
        <br />
        {
            activeBar === 0 && (
                <p className=' text-black dark:text-white text-[18px] whitespace-pre-line mb-3'>
                    {data[activeVideo]?.description}
                </p>
            )
        }

        {
            activeBar === 1 && (

                <div>
                    {data[activeVideo]?.links.map((item:any, index:number)=>(
                       // eslint-disable-next-line react/jsx-key
                       <div className='mb-5'>
                        <h2 className=' 800px:text-[20px] 800px:inline-block dark:text-white text-black'>
                            {item.title && item.title + ":"}
                        </h2>
                        <a className=' inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2'
                        href={item.url}
                        >
                            {item.url}
                        </a>

                       </div>
                    ))}
                </div>
            )
        }

        {
            activeBar === 2 && (
                <>
                 <div className='flex w-full'>
                    <Image src={user.avatar ? user.avatar.url : "https%3A%2F%2Fres.cloudinary.com%2Fdwtqcpdjr%2Fimage%2Fupload%2Fv1704382193%2Favatars%2Fa7hnxvo23p3kpz11b1eu.avif&w=32&q=75"} alt='' width={50} height={60}
                    className=' rounded-full object-cover w-[50px] h-[50px]'/>

                    <textarea name="" value={question}
                    onChange={(e)=> setQuestion(e.target.value)}
                    placeholder='Write your question...'
                    className=' outline-none bg-transparent ml-3 border boder-[#fffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins'
                    id="" cols={40} rows={5}>

                    </textarea>
                 </div>
                 <div className='w-full flex justify-end'>
                    <div 
                    className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${questionCreationLoading && "cursor-not-allowed"}`}
                   onClick={questionCreationLoading ? ()=>{}:handleQuestion} 
                    >
                        Submit
                    </div>
                 </div>
                 <br />
                 <br />
                 <div className=' w-full h-[1px] bg-[#ffffff3b]'></div>
                    <div>
                        {/* questions reply */}
                        <CommentReply
                        data={data}
                        activeVideo={activeVideo}
                        answer={answer}
                        setAnswer={setAnswer}
                        handleAnswerSubmit={handleAnswerSubmit}
                        answerCreationLoading={answerCreationLoading}
                        user={user}
                        setQuestionId={setQuestionId}
                        />
                    </div>

                </>
            )
        }
        
        {
            activeBar === 3 && (
                <div className='w-full'>
                    <>
                    {
                        !isReviewExists && (
                            <>
                            <div className="w-full flex">
                            <Image src={user?.avatar ? user?.avatar?.url : "https%3A%2F%2Fres.cloudinary.com%2Fdwtqcpdjr%2Fimage%2Fupload%2Fv1704382193%2Favatars%2Fa7hnxvo23p3kpz11b1eu.avif&w=32&q=75"} alt='' width={50} height={60}
                            className=' rounded-full object-cover w-[50px] h-[50px]'/>

                            <div className="w-full">
                                <h5 className=' pl-3 text-[20px] font-[500] dark:text-white text-black'>Give a Rating 
                                    <span className=' text-red-500'>*</span>
                                </h5>

                                <div className=' flex w-full ml-2 pb-3'>
                                    {[1,2,3,4,5].map((i)=>rating >= i ? (
                                        <AiFillStar
                                        key={i}
                                        color="rgb(246,186,0)"
                                        className="mr-1 cursor-pointer"
                                        size={25}
                                        onClick={()=> setRating(i)}
                                        />
                                    ):(
                                        <AiOutlineStar
                                        key={i}
                                        color="rgb(246,186,0)"
                                        className="mr-1 cursor-pointer"
                                        size={25}
                                        onClick={()=> setRating(i)}
                                        />
                                    ))}
                                </div>
                                <textarea name="" id=""
                                value={review}
                                onChange={(e)=> setReview(e.target.value)}
                                cols={40} rows={5}
                                placeholder='Write your comment...'
                                className=' outline-none bg-transparent 800px:ml-3 border border-[#ffffff57] w-[95%] 800px:w-full p-2 rounded text-[18px] font-Poppins'
                                ></textarea>
                            </div>
                         </div>
                         <div className='w-full flex justify-end'>
                    <div 
                    className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${reviewCreateLoading && 'cursor-not-allowed'}`}
                    onClick={reviewCreateLoading ? () => {} : handleReviewSubmit}
                    >
                        Submit
                    </div>
                 </div>   
                  </>
                  )
                }
                <div className=' w-full h-[1px] bg-[#ffffff3b]'>
                </div>
                   <div className='w-full'>
                      {(course?.reviews && [...course.reviews].reverse())?.map((item:any, index:number)=>(
                        // eslint-disable-next-line react/jsx-key
                        <div className="w-full my-5">
                            <div className="w-full flex">
                              <div>
                              <Image src={item.user.avatar ? item.user.avatar.url : "https%3A%2F%2Fres.cloudinary.com%2Fdwtqcpdjr%2Fimage%2Fupload%2Fv1704382193%2Favatars%2Fa7hnxvo23p3kpz11b1eu.avif&w=32&q=75"} alt='' width={50} height={60}
                    className=' rounded-full object-cover w-[50px] h-[50px]'/>
                              </div>
                                <div className="ml-2 text-black dark:text-[#f4f4f4]">
                                    <h1 className='text-[18px]'>
                                        {item?.user.name}
                                    </h1>
                                    <Ratings rating={item.rating}/>
                                    <p>{item.comment}</p>
                                    <small>
                                        {format(item.createdAt)} .
                                    </small>
                                </div>
                            </div>
                            {
                                user.role === "admin" && (
                                    <span className={`text-black dark:text-[#ffffff83]  !ml-14 !mt-2`}
                                    onClick={()=> {setIsReviewReply(true),
                                    setReviewId(item._id)}}
                                    >
                                        Add Reply

                                    </span>
                                )
                            }

                          {
                         isReviewReply && (
                         <div className="w-full flex relative">

<input type="text" placeholder='Enter your reply...' className=" block 800px:ml-12 mt-2 outline-none bg-transparent border-b dark:border-[#ffffff83] border-[#000000] p-[5px] w-[95%]"
value={reply}
onChange={(e:any)=> setReply(e.target.value)}
/>

<button type='submit'
className={`absolute right-0 bottom-1 text-black dark:text-white $`}
onClick={handleReviewReplySubmit}
>Submit</button>
                         </div>

                           )
                          }

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
                      ))}

                   </div>
                   
                    
                 </>
                </div>
            )
        }


    </div>
  );
};

const CommentReply = ({data, activeVideo, answer,setAnswer,setQuestionId,AnswerId, handleAnswerSubmit, user,answerCreationLoading}:any)=>{
    return(
        <>
        <div className="w-full my-3">
            {
                data[activeVideo].questions.map((item:any,index:any)=>(
                    <CommentItem
                    key={index}
                    data={data}
                    activeVideo={activeVideo}
                    item={item}
                    index={index}
                    setAnswer={setAnswer}
                    answer={answer}
                    setQuestionId={setQuestionId}
                    handleAnswerSubmit={handleAnswerSubmit}
                    answerCreationLoading={answerCreationLoading}
                    />
                ))
            }


        </div>
        </>
    )
}


const CommentItem = ({data, activeVideo, answer,setAnswer,setQuestionId, handleAnswerSubmit, item,answerCreationLoading}:any)=>{
    const [replyActive, setResplyActive] = useState(false);
    return(
        <>
        <div className='my-4'>
            <div className="flex mb-2">
             <div>
                <Image
                src={item.user.avatar ? item.user.avatar.url  : "https%3A%2F%2Fres.cloudinary.com%2Fdwtqcpdjr%2Fimage%2Fupload%2Fv1704382193%2Favatars%2Fa7hnxvo23p3kpz11b1eu.avif&w=32&q=75"} alt='' width={50} height={60}
                className=' rounded-full object-cover w-[50px] h-[50px]'
                />

             </div>
                <div className='pl-3 dark:text-white text-black'>
                    <h5 className='text-[20px]'>
                        {item?.user.name}
                    </h5>
                    <p>{item.question}</p>
                    <small className='dark:text-[#ffffff83] text-black'>{!item.createdAt ? "" : format(item.createdAt)}.</small>
                </div>
            </div>
            <div className="w-full flex">
                <span className=' 800px:pl-16 text-[#211f1f] dark:text-[#ffffff83] cursor-pointer mr-2'
                onClick={()=>
                {setResplyActive(!replyActive) 
                 setQuestionId(item._id)
                 }
                 }>

                    {!replyActive ? item.questionReplies.length !== 0 ? "All Replies" : "Add Reply" : "Hide Replies"}

                </span>
                <BiMessage size={20} className=" cursor-pointer text-[#211f1f] dark:text-[#ffffff83]"/>
                <span className=' pl-1 mt-[-4px] cursor-pointer text-[#211f1f] dark:text-[#ffffff83]'>
                     {item.questionReplies.length}
                </span>
            </div>
            {
                replyActive && (
                    <>
                    {item.questionReplies.map((item:any)=>(
                        // eslint-disable-next-line react/jsx-key
                        <div className=' w-full flex 800px:ml-16 my-5 text-black dark:text-white'>
                            <div>
                            <Image
                src={item.user.avatar ? item.user.avatar.url  : "https%3A%2F%2Fres.cloudinary.com%2Fdwtqcpdjr%2Fimage%2Fupload%2Fv1704382193%2Favatars%2Fa7hnxvo23p3kpz11b1eu.avif&w=32&q=75"} alt='' width={50} height={60}
                className=' rounded-full object-cover w-[50px] h-[50px]'
                />
               </div>
               <div className='pl-2 dark:text-white text-black'>
                   <div className="flex w-full items-center">
                   <h5 className='text-[20px]'>
                        {item?.user.name}
                    </h5>{item.user.role === "admin" && <VscVerifiedFilled className=" text-[20px] ml-1 text-[#4747f9]"/>}
                   </div>
                    <p>{item.answer}</p>
                    <small className='dark:text-[#ffffff83] text-black'>{format(item.createdAt)}.</small>
                </div>
              </div>
                    ))
                    }
                    <>
                    <div className="w-full flex relative">
                        <input type="text"
                        placeholder='Enter your answer...'
                        value={answer}
                        onChange={(e:any)=>setAnswer(e.target.value)}
                        className={` block 800px:ml-12 mt-2 outline-none bg-transparent border-b dark:border-[#fff] border-[#00000027] dark:text-white text-black p-[5px] w-[95%] ${answer === ""|| answerCreationLoading && 'cursor-not-allowed'}`}
                        />
                        <button type='submit'
                        className=' absolute right-0 bottom-1 text-black dark:text-white'
                        onClick={handleAnswerSubmit}
                        disabled={answer === "" || answerCreationLoading}
                        >
                            Submit
                        </button>

                    </div>
                    <br />


                    
                    </>



                    </>
                )
            }
        </div>

        </>

    )
}

export default CourseContentMedia;