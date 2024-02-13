import React, { useState } from 'react';
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
  useToast
} from "@chakra-ui/react";
import { styles } from '../components/Styles/styles';
import { useContactHandlerMutation } from '@/redux/features/contact/contactApi';

type Props = {};

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initValues: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

const initState = {values:initValues};

const Contact = (props: Props) => {
  const toast = useToast();
  const [state, setState] = useState<{ values: FormValues, isLoading: boolean, error:any }>({ values: initValues, isLoading: false, error:null });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { values, isLoading, error } = state;
  const [contactHandler,{ isSuccess}] = useContactHandlerMutation();

  const onBlur = ({ target }: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => setTouched((prev) => ({
    ...prev,
    [target.name]: true,
  }));

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setState((prev) => ({
    ...prev,
    values: {
      ...prev.values,
      [target.name]: target.value,
    },
  }));

  const onSubmit = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true
    }));

    try {
      await contactHandler(values);
      setTouched({});
      setState(initState);
      toast({
        title: 'Message sent',
        status:"success",
        duration: 2000,
        position: "top",
      });

    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message
      }));
    } 
  };

  return (
    <div className=' mt-32 mb-20 flex flex-col items-center text-center justify-center'>
    <Container className=' p-4 bg-slate-200 dark:bg-[#1c1c4d] text-black dark:text-white font-Poppins w-[45%] '>
       <Heading className=' text-[28px]'>Contact Us</Heading>
       {
        error && (
          <Text
          color="red.300" my={4} fontSize="xl"
          >{error}</Text>
        )
       }
       <FormControl isRequired isInvalid={touched.name && !values.name} mb={5}>
        
           <FormLabel className={`${styles.label}`}>Name</FormLabel>
           <Input type='text'
           name="name"
           value={values.name}
           onChange={handleChange}
           onBlur={onBlur}
           className={`${styles.input} !border !border-[#525050] dark:!border-[#ffff]
             `}
           errorBorderColor='red.300'
           />
           <FormErrorMessage>Required</FormErrorMessage>

       </FormControl>

       <FormControl isRequired isInvalid={touched.email && !values.email} mb={5}>
           <FormLabel className={`${styles.label}`}>Email</FormLabel>
           <Input type='email'
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={onBlur}
            errorBorderColor='red.300'
            className={`${styles.input} !border !border-[#525050] dark:!border-[#ffff] `}  
            />
           <FormErrorMessage>Required</FormErrorMessage>
           
       </FormControl>
       <FormControl isRequired isInvalid={touched.subject && !values.subject} mb={5}>
       
           <FormLabel className={`${styles.label}`}>Subject</FormLabel>
           <Input type='text'
            name="subject"
           value={values.subject}
           onChange={handleChange}
           onBlur={onBlur}
          className={`${styles.input} !border !border-[#525050] dark:!border-[#ffff] `} errorBorderColor='red.300' />
           <FormErrorMessage>Required</FormErrorMessage>
           

       </FormControl>
       <FormControl isRequired isInvalid={touched.message && !values.message} mb={5}>
     
           <FormLabel className={`${styles.label}`}>Message</FormLabel>
           <Textarea  rows={4} name="message" value={values.message} onChange={handleChange} onBlur={onBlur} className={`${styles.input} !border !border-[#525050] dark:!border-[#ffff]`} errorBorderColor='red.300'  />
           <FormErrorMessage>Required</FormErrorMessage>
           
       </FormControl>
       <Button
       variant="outline"
       colorScheme='blue'
       isLoading={isLoading}
       disabled={!values.name || !values.email || !values.subject || !values.message}
       onClick={onSubmit}
       className={`${styles.button} !w-[150px]`}
       >Submit</Button>
    </Container>
   </div> 
    );
};

export default Contact;
