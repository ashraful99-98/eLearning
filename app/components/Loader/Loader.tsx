import React from 'react'
import './Loader.css';
import Image from 'next/image';


const Loader = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        {/* <div className='loader'></div> */}
        <Image src={require("../../images/loader.webp")} alt='' className='loader' />
    </div>
  );
};
export default Loader;