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
 
  // xl:w-[50%] lg:w-[50%] md:[w-60%] sm:[w-80%] 1500px:w-[80%] 800px:w-[85%] 
  return (
    <div className=' mt-32 mb-20 flex flex-col items-center text-center justify-center'>
    <Container className=' p-4 bg-slate-200 dark:bg-[#1c1c4d] text-black dark:text-white font-Poppins w-[50%]'>
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
           <FormErrorMessage>Required</FormErrorMessage>

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
           <FormErrorMessage>Required</FormErrorMessage>
           
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
           <FormErrorMessage>Required</FormErrorMessage>
           

       </FormControl>
       <FormControl isRequired isInvalid={!values.message} mb={5}>
     
           <FormLabel className={`${styles.label}`}>Message</FormLabel>
           <Textarea rows={4} name="message" value={values.message} onChange={handleChange}     onBlur={onBlur}  className={`${styles.input} !border !border-[#525050] dark:!border-[#ffff]`} errorBorderColor='red.300'  />
           <FormErrorMessage>Required</FormErrorMessage>
           
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
    );
};

export default Contact;