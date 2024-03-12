import React, { FC, useEffect, useState } from 'react'
import { styles } from '../Styles/styles';
import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type Props = {}

const ChangePassword:FC<Props>= (props:Props) => {
    
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [show,setShow] = useState(false);
    const [show1,setShow1] = useState(false);
    const [show2,setShow2] = useState(false);

    const [updatePassword,{isSuccess,error}] = useUpdatePasswordMutation();

    const passwordChangeHandler = async (e:any)=>{

        e.preventDefault();

        if(newPassword !== confirmPassword){
             toast.error("Passwords do not match");
       }
       else{
            
            // console.log(oldPassword,newPassword);
            await updatePassword({oldPassword, newPassword});
        }
       
     
    };

    useEffect(() => {
        if(isSuccess){
            toast.success("Password changed successfully");
        }
        if(error){
            if("data" in error){
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }

    },[isSuccess,error]);


  return (
    <div className='w-full pl-7 px-2 800px:px-5 800px:pl-0'>
        <h1 className='block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-black dark:text-[#fff] py-2'>Change Password</h1>

        <div className='w-full'>
            <form onSubmit={passwordChangeHandler} className='flex flex-col items-center'>

                <div className='w-[100%] 800px:w-[60%] mt-2 relative mb-1 dark:text-white text-black'>
                      <label className='block pb-2 text-black dark:text-[#fff]'>Enter your old password</label>
                    <input type={!show ? "password":"text"} className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff] !border dark:border-[#ffff] border-[#000]`}
                    required 
                    value={oldPassword}
                    onChange={(e)=>setOldPassword(e.target.value)}
                    />
                     {
                !show ? (
                    <AiOutlineEyeInvisible
                    className="absolute bottom-3 right-10  z-1 cursor-pointer dark:text-white text-black"
                    size={20}
                    onClick={()=>setShow(true)} />
                ):(
                    <AiOutlineEye
                    className="absolute bottom-3 right-10 z-1 cursor-pointer dark:text-white text-black"
                    size={20}
                    onClick={()=>setShow(false)} />
                )
            }

                </div>
        
                <div className='w-[100%] 800px:w-[60%] mt-5 relative mb-1 dark:text-white text-black'>

                    <label className='block pb-2 text-black dark:text-[#fff]'>Enter your new password</label>
                    <input type={!show1 ? "password":"text"} className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff] !border dark:border-[#ffff] border-[#000]`}
                    required 
                    value={newPassword}
                    onChange={(e)=> setNewPassword(e.target.value)}
                    />

{
                !show1 ? (
                    <AiOutlineEyeInvisible
                    className="absolute bottom-3 right-10  z-1 cursor-pointer dark:text-white text-black"
                    size={20}
                    onClick={()=>setShow1(true)} />
                ):(
                    <AiOutlineEye
                    className="absolute bottom-3 right-10 z-1 cursor-pointer dark:text-white text-black"
                    size={20}
                    onClick={()=>setShow1(false)} />
                )
            }

                </div>
                <div className='w-[100%] 800px:w-[60%] mt-5 relative mb-1 dark:text-white text-black'>

                    <label className='block pb-2 text-black dark:text-[#fff]'>Enter your confirm password</label>
                    <input type={!show2 ? "password":"text"} className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff] !border dark:border-[#ffff] border-[#000]`}
                    required 
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                    />
                    
{
                !show2 ? (
                    <AiOutlineEyeInvisible
                    className="absolute bottom-3 right-10  z-1 cursor-pointer dark:text-white text-black"
                    size={20}
                    onClick={()=>setShow2(true)} />
                ):(
                    <AiOutlineEye
                    className="absolute bottom-3 right-10 z-1 cursor-pointer dark:text-white text-black"
                    size={20}
                    onClick={()=>setShow2(false)} />
                )
            }

                </div>

                <div className='w-[100%] 800px:w-[60%] relative  dark:text-white text-black'>
                <input className={`w-[95%] h-[40px] border border-[#37a39a] text-center text-black  dark:text-white  dark:bg-transparent bg-[#37a39a] rounded-[5px] my-6 cursor-pointer`} required value="Update" type="submit" />
                </div>

            </form>

        </div>

    </div>
  )
}
export default ChangePassword;