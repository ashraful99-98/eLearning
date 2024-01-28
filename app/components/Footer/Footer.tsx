import Link from 'next/link';
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className='py-8 border border-[white] dark:border-[#1a1a1a] hero_animation hero_textColor'>
        <div className=''>
            <br />
            <div className='w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8'>
                <div className=' grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4'>
                <div className=' space-y-3'>
                <h3 className='text-[20px] font-[600] text-black dark:text-white'>
                        About
                    </h3>

                    <ul className="space-y-4">
                        <li>
                            <Link href="/about"
                            className=' text-base text-black dark:text-gray-300 dark:hover:text-white'>
                                Our Story
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy-policy"
                            className=' text-base text-black dark:text-gray-300 dark:hover:text-white'>
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/faq"
                            className=' text-base text-black dark:text-gray-300 dark:hover:text-white'>
                                FAQ
                            </Link>
                        </li>
                    </ul>
                    
                </div>
                <div className=' space-y-3'>
                    <h3 className='text-[20px] font-[600] text-black dark:text-white'>
                        Quick Links
                    </h3>
                    <ul className=' space-y-4'>
                        <li>
                        <Link href="/courses"
                            className=' text-base text-black dark:text-gray-300 dark:hover:text-white'>
                                Courses
                            </Link>
                        </li>

                        <li>
                        <Link href="/profile"
                            className=' text-base text-black dark:text-gray-300 dark:hover:text-white'>
                               My Account
                            </Link>
                        </li>

                        <li>
                        <Link href="/course-dashboard"
                            className=' text-base text-black dark:text-gray-300 dark:hover:text-white'>
                               Course Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className=' space-y-3'>
                    <h3 className='text-[20px] font-[600] text-black dark:text-white'>Social Links</h3>

                    <ul className=' space-y-4'>
                    <li>
                        <Link href=""
                            className=' text-base text-black dark:text-gray-300 dark:hover:text-white'>
                               Youtube
                            </Link>
                    </li>
                    <li>
                        <Link href=""
                            className=' text-base text-black dark:text-gray-300 dark:hover:text-white'>
                               Instagram
                            </Link>
                    </li>
                    <li>
                        <Link href=""
                            className=' text-base text-black dark:text-gray-300 dark:hover:text-white'>
                               github
                            </Link>
                    </li>
                    </ul>
                </div>

                <div>
                <h3 className='text-[20px] font-[600] text-black dark:text-white'>Contact Info</h3>
                <p className='text-base text-black dark:text-gray-300 dark:hover:text-white pb-2'>
                    Call Us: 017-XXX-000-XXX
                </p>
                <p className='text-base text-black dark:text-gray-300 dark:hover:text-white pb-2'>
                    Address : sylhet,Bangladesh
                </p>
                <p className='text-base text-black dark:text-gray-300 dark:hover:text-white pb-2'>
                    Mail Us: elearning23&24@gmail.com
                </p>
                </div>

                </div>
                <br />
            </div>
            <br />
            
            <p className=' text-center text-black dark:text-white'>
                Copyright @ 2023 & 2024 ELearning | All Rights Reserved
            </p>
        

        </div>
        <br />
     </footer>

  )
}
export default Footer;