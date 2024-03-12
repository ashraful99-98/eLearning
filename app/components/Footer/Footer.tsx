import Link from 'next/link';
import React from 'react'
import { FiGithub, FiLinkedin, FiYoutube } from 'react-icons/fi';

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className='py-6  hero_animation bg-[#9393ff] dark:bg-[#272727] hero_textColor'>
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
                            <Link href="/policy"
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
                        <Link href="/courses"
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
                        <Link href="https://www.youtube.com/channel/UCejBxEuExRZKA0HSrwdvvFw"
                            className=' text-base text-black dark:text-gray-300 dark:hover:text-white flex items-center'>
                               <span className='mr-1'><FiYoutube /></span>Youtube
                            </Link>
                    </li>
                    <li>
                        <Link href="https://www.linkedin.com/in/ashraful-islam-kamran/"
                            className=' text-base text-black dark:text-gray-300 dark:hover:text-white flex items-center'>
                              <span className='mr-1'><FiLinkedin /></span> Linkedin
                            </Link>
                    </li>
                    <li>
                        <Link href="https://github.com/ashraful99-98"
                            className=' text-base text-black dark:text-gray-300 dark:hover:text-white flex items-center'>
                              <span className='mr-1'><FiGithub /></span> github
                            </Link>
                    </li>
                    </ul>
                </div>

                <div>
                <h3 className='text-[20px] font-[600] text-black dark:text-white pb-3'>Contact Info</h3>
                <p className='text-base text-black dark:text-gray-300 dark:hover:text-white pb-2'>
                    Call Us: 017-211-000-355
                </p>
                <p className='text-base text-black dark:text-gray-300 dark:hover:text-white pb-2'>
                    Address : Sylhet-3100,Bangladesh
                </p>
                <p className='text-base text-black dark:text-gray-300 dark:hover:text-white pb-2'>
                    Mail Us:  CodeCanvas23&24@gmail.com
                </p>
                </div>

                </div>
                <br />
            </div>
            <br />
            
                <div className=''>
                <p className=' text-center text-black dark:text-white'>
                Copyright @ 2023 & 2024 CodeCanvas | All Rights Reserved
            </p>
                </div>
        

        </div>
        <br />
     </footer>

  )
}
export default Footer;