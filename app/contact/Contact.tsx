import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  } from "@chakra-ui/react";
import { styles } from '../components/Styles/styles';
import {  useContactHandlerMutation } from '@/redux/features/contact/contactApi';
import toast from 'react-hot-toast';
import Image from 'next/image';


type Props = {
  user:any;
};


const Contact = ({user}: Props) => {
  
const initValues = {
  name: user.name,
  email:user.email,
  subject: "",
  message: ""
};

const initState = {values:initValues};
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});
  const [contactHandler,{isSuccess, error, isLoading}] = useContactHandlerMutation();
  const { values,
     } = state;

     const onBlur = ({ target }: React.FocusEvent<HTMLInputElement>) => 
     setTouched((prev: any) => ({
       ...prev,
       [target.name]: true,
     }));
   
   const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => 
     setState((prev: any) => ({
       ...prev,
       values: {
         ...prev.values,
         [target.name]: target.value,
       },
     }));
   
  
  useEffect(()=>{
    if(isSuccess){
      toast.success("Message set");
    }
    if(error){
      if("data" in error){
        const errorData = error as any;
        toast.error(errorData.data.message);
    }
    }
  },[isSuccess, error]);

  const onSubmit = async()=>{
          setState((prev) => ({
      ...prev,
      isLoading: true
    }));
    
    try {
      await contactHandler(values);
      setTouched({});
      setState(initState);
    }
     catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    
        const errorData = error as any;
        toast.error(errorData.data.message);
    
    } 
  }
 
  return (
    <div className=' mt-28 mb-14 flex justify-center items-center text-center  w-[90%]'>
      <div className='w-[45%] hero_animation  rounded-full p-14 z-1 div-img hero_animation xl:ml-24 lg:ml-6 md:ml-0 sm:ml-0 xl:mt-10 lg:mt-0 md:mt-0 sm:mt-0 mr-4 '>

      <Image src={require("../images/contactUs.svg")} width={500}
         height={500} alt="" className=" items-center text-center justify-center"/>

      </div>
      <div className='w-[45%] ml-4 font-Poppins'>
      <Container className=' p-4 bg-[#f0f0f9] dark:bg-[#1c1c4d] text-black dark:text-white font-Poppins w-[100%] rounded'>
       <Heading className=' text-[28px]'>Contact Us</Heading>
       <FormControl isRequired isInvalid={ !user.name} mb={5}>

        
           <FormLabel className={`${styles.label}`}>Name</FormLabel>
           <Input type='text'
           name="name"
           required
           errorBorderColor='red.300'
           value={user.name || values.name}
           onChange={handleChange}
           onBlur={onBlur}
           className={`${styles.input} !border !border-[#525050] dark:!border-[#ffff]
             `}
           />
           <FormErrorMessage className=' text-red-500'>required</FormErrorMessage>

       </FormControl>

       <FormControl isRequired isInvalid={ !user.email} mb={5}>
           <FormLabel className={`${styles.label}`}>Email</FormLabel>
           <Input type='email'
            name="email"
            required
            value={ user.email || values.email}
            onChange={handleChange}
            onBlur={onBlur}
            errorBorderColor='red.300'
            className={`${styles.input} !border !border-[#525050] dark:!border-[#ffff] `}  
            />
           <FormErrorMessage className=' text-red-500'>required</FormErrorMessage>
           
       </FormControl>
       <FormControl isRequired isInvalid={ !values.subject} mb={5}>
       
           <FormLabel className={`${styles.label}`}>Subject</FormLabel>
           <Input type='text'
            name="subject"
           value={values.subject}
           onChange={handleChange}
           required
           onBlur={onBlur}
          className={`${styles.input} !border !border-[#525050] dark:!border-[#ffff] `} errorBorderColor='red.300' />
           <FormErrorMessage className=' text-red-500'>required</FormErrorMessage>
           

       </FormControl>
       <FormControl isRequired isInvalid={!values.message} mb={5}>
     
           <FormLabel className={`${styles.label}`}>Message</FormLabel>
           <Textarea rows={6} name="message" value={values.message} onChange={handleChange}     onBlur={onBlur}  className={`${styles.input} !border !border-[#525050] dark:!border-[#ffff]`} errorBorderColor='red.300'  />
           <FormErrorMessage className=' text-red-500'>required</FormErrorMessage>
           
       </FormControl>
       <Button
       variant="outline"
       colorScheme='blue'
       isLoading={isLoading}
       disabled={!user.name || !user.email || !values.subject || !values.message}
       onClick={onSubmit}
       className={`${styles.button} !w-[150px]`}
       >Submit</Button>
    </Container>

      </div>
   </div> 
    );
};

export default Contact;