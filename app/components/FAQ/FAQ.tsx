import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react'
import { styles } from '../Styles/styles';
import { HiMinus, HiPlus } from 'react-icons/hi';
import Image from 'next/image';

type Props = {}

const FAQ = (props: Props) => {
    
    const { data } = useGetHeroDataQuery("FAQ",{});
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(()=>{

        if(data){
            setQuestions(data.layout.faq);
        }
    },[data]);

    const toggleQuestion = (id:any)=>{
        setActiveQuestion(activeQuestion === id ? null : id);
    }

  return (
    <div className='w-[92%] 800px:w-[85%] m-auto py-10 800px:flex items-center'>
           <div className='800px:w-[50%] w-full mr-3'>
     <Image src={require("../../images/download (7).svg")} 
                alt="" width={700} height={700} className=' rounded-full items-end border-b-4 border-purple-400 '/>
     </div>
     <div className='800px:w-[50%] w-full'>
     <h1 className={`${styles.title} 800px:text-[40px]`}>
            Frequently Asked Question
        </h1>
        <div className="mt-12">
        <dl className='space-y-8'>
      {questions.map((q) => (
        <div key={q.id} className={`${q._id !== questions[0]?._id && "border-t"} border-gray-200 pt-6`}>
          <dt className='text-lg'>
            <button
              className='flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none'
              onClick={() => toggleQuestion(q._id)}
            >
              <span
                className=" font-medium text-black dark:text-white"
              >{q.question}</span>

              <span className='ml-6 flex-shrink-0'>
                {activeQuestion === q._id ? (
                  <HiMinus className='h-6 w-6  text-black dark:text-white' />
                ) : (
                  <HiPlus className='h-6 w-6  text-black dark:text-white' />
                )}
              </span>
            </button>
          </dt>
          {activeQuestion === q._id && (
            <dd className='mt-2 pr-12'>
              <p className=' text-base font-Poppins text-black dark:text-white'>{q.answer}</p>
            </dd>
          )}
        </div>
      ))}
    </dl>
        </div>
     </div>

    </div>
  )
}
export default FAQ;