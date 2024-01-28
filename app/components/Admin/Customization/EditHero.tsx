import { useEditLayoutMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { FC, useEffect, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai';
import { styles } from '../../Styles/styles';
import toast from 'react-hot-toast';

type Props = {}

const EditHero:FC<Props> = (props: Props) => {
    const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
     refetchOnMountOrArgChange: true
  });

  const [editLayout,{ isSuccess, error}] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
    if(isSuccess){
        toast.success("Hero updated successfully");
        refetch();
    }
    if(error){
        if("data" in error){
            const errorData  = error as any;
            toast.error(errorData?.data?.message);
        }
    }

  }, [data,isSuccess,error]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if(file){
        const reader = new FileReader();
        reader.onload = (e:any)=>{
            if(reader.readyState === 2){
                setImage(e.target.result as string);
            }
        };
        reader.readAsDataURL(file);
    }
  };

  const handleEdit = async() => {
     await editLayout({
        type: "Banner",
        image,
        title,
        subTitle
     });
  };
  return (
    <>
<div className='w-full flex flex-col md:flex-row items-center mt-6 hero_animation hero_textColor'>
  <div className='relative flex items-center justify-end w-full md:w-[40%]'>
    <img
      src={image}
      alt=""
      className='object-contain max-w-full w-full h-auto z-[10]'
    />

    <input
      type='file'
      name=''
      id='banner'
      accept='image/*'
      onChange={handleUpdate}
      className='hidden'
    />

    <label htmlFor='banner' className='absolute bottom-0 right-0 z-20'>
      <AiOutlineCamera className='dark:text-white text-black text-[20px] cursor-pointer' />
    </label>
  </div>

  <div className='w-full md:w-[60%] flex flex-col items-start text-center md:items-start md:text-left mt-8 md:mt-0'>
    <textarea
      placeholder='Improve Your Online Learning Experience Better Instantly'
      className='dark:text-white text-black resize-none text-[#00000c7] text-[24px] md:text-[38px] lg:text-[44px] py-2 w-full md:w-[80%] lg:w-full font-Poppins bg-transparent'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      rows={2}
    ></textarea>

    <br />

    <textarea
      placeholder='We have 40k+ Online courses & 500k Online registered students. Find your desired course from them.'
      className='dark:text-white text-black resize-none text-[#00000c7] text-[16px] md:text-[24px] lg:text-[26px] py-2 w-full md:w-[74%] lg:w-[55%] font-Poppins bg-transparent'
      value={subTitle}
      onChange={(e) => setSubTitle(e.target.value)}
      rows={4}
    ></textarea>
    <br />

    <div
      className={`${styles.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black dark:bg-[#cccccc34]  ${
        data?.layout?.banner?.title !== title ||
        data?.layout?.banner?.subTitle !== subTitle ||
        data?.layout?.banner?.image?.url !== image
          ? '!cursor-pointer !bg-[#42d383]'
          : '!cursor-not-allowed !bg-slate-400'
      } !rounded absolute bottom-12 right-12`}
      onClick={
        data?.layout?.banner?.title !== title ||
        data?.layout?.banner?.subTitle !== subTitle ||
        data?.layout?.banner?.image?.url !== image
          ? handleEdit
          : () => null
      }
    >
      Save
    </div>
  </div>
</div>





    </>
  )
}
export default EditHero;





