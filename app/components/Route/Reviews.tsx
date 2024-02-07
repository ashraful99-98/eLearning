import Image from 'next/image'
import React from 'react'
import { styles } from '../Styles/styles'
import ReviewCard from '../Review/ReviewCard';
type Props = {}

export const reviews=[
{
  name:" Guru Bhai",
  avatar:`https://ibb.co/xXtDGGf`,
  profession:"Student | Cambridge university",
  comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod augue ut metus interdum, vel condimentum velit tincidunt."
},
{
    name: "Tech Enthusiast",
    avatar: "https://ibb.co/Rvk9F8Z",
    profession: "Developer | Tech Institute",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod augue ut metus interdum, vel condimentum velit tincidunt."
  },
  {
    name: "Tech Enthusiast",
    avatar: "https://ibb.co/s3JyQd7",
    profession: "Developer | Tech Institute",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod augue ut metus interdum, vel condimentum velit tincidunt."
  },
  { name: "Tech Enthusiast",
  avatar: "https://ibb.co/xXtDGGf",
  profession: "Developer | Tech Institute",
  comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod augue ut metus interdum, vel condimentum velit tincidunt."
  },
  {
    name: "Tech Enthusiast",
    avatar: "https://ibb.co/Rvk9F8Z",
    profession: "Developer | Tech Institute",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod augue ut metus interdum, vel condimentum velit tincidunt."
  },
  {
    name: "Tech Enthusiast",
    avatar: "https://ibb.co/s3JyQd7",
    profession: "Developer | Tech Institute",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod augue ut metus interdum, vel condimentum velit tincidunt."
  },
  {
    name: "Tech Enthusiast",
    avatar: "https://ibb.co/xXtDGGf",
    profession: "Developer | Tech Institute",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod augue ut metus interdum, vel condimentum velit tincidunt."
  },
  {
    name: "Tech Enthusiast",
    avatar: "https://ibb.co/Rvk9F8Z",
    profession: "Developer | Tech Institute",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod augue ut metus interdum, vel condimentum velit tincidunt."
  },
  {
    name: "Tech Enthusiast",
    avatar: "https://ibb.co/s3JyQd7",
    profession: "Developer | Tech Institute",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod augue ut metus interdum, vel condimentum velit tincidunt."
  },
  {
    name: "Tech Enthusiast",
    avatar: "https://ibb.co/xXtDGGf",
    profession: "Developer | Tech Institute",
    comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod augue ut metus interdum, vel condimentum velit tincidunt."
  }

]
const Reviews = (props: Props) => {
  return (
    <div className='dark:bg-[#24244e] bg-[rgb(244,222,208)]'>

    <div className='w-[90%] 800px:w-[85%] m-auto py-4'>
        <div className='w-full 800px:flex items-center'>
            <div className='800px:w-[50%] w-full'>
                <Image src={require("../../images/download (5).svg")} 
                alt="" width={700} height={700}/>
            </div>
            <div className='800px:w-[50%] w-full'>
                <h3 className={`${styles.title} 800px:!text-[40px]`}>
                    Our Students Are <span className=' text-blue-500'>Our Strength</span>
                    <br /> See What They Say About Us
                </h3>
                <br />
                <p className={`${styles.label}`}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eaque, explicabo neque commodi sequi voluptatibus ipsum nesciunt natus? Laboriosam ad ipsum libero magni possimus!
                </p>
            </div>
            <br />
            <br />
        </div>
            <div className='grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[25px] mb-12 border-0'
            //   md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-40px]
             >
                {
                    reviews && reviews.map((i, index)=> <ReviewCard item={i} key={index}/>)
                }

            </div>

    </div>
    </div>
  )
}
export default Reviews;