import { useGetCoursesDetailsQuery } from '@/redux/features/courses/coursesApi';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import Footer from '../Footer/Footer';
import CourseDetails from "./CourseDetails";
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from '@/redux/features/orders/orderApi';
import {loadStripe} from "@stripe/stripe-js";
type Props = {
    id:string;
}

const CourseDetailsPage = ({id}: Props) => {
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const {data, isLoading} = useGetCoursesDetailsQuery(id);
    const {data: config} = useGetStripePublishableKeyQuery({});
    const [createPaymentIntent, {data: paymentIntentData, isSuccess}] = useCreatePaymentIntentMutation();
    const [stripePromis, setStripePromis] = useState<any>(null);
    const [clientSecret, setClientSecret]= useState('');

    useEffect(()=>{

        if(config){
            const publishableKey = config?.publishableKey;

            setStripePromis(loadStripe(publishableKey));
        }

        if(data){
            // const amount = Math.round(data.course.price * 100);
            const amount = Math.round(data.course.price);

            createPaymentIntent(amount);
        }

    },[config, data]);

    useEffect(()=>{

        if(paymentIntentData){
            setClientSecret(paymentIntentData?.client_secret);
        }
       
    },[paymentIntentData]);



  return (
    <>
    {
        isLoading ? (
            <Loader/>
        ) : (
            <div>
                <Heading
                title={data.course.name + "- CodeCanvas"}
                description={
                    "CodeCanvas is a programming community which is developed by Developer"
                }
                keywords={data?.course?.tags}
                />
                <Header
                route={route}
                setRoute={setRoute}
                open={open}
                setOpen={setOpen}
                activeItem={1}
                />
                {
                    stripePromis && (
                        <CourseDetails
                data={data.course} stripePromis={stripePromis} clientSecret={clientSecret}
                setRoute={setRoute}
                setOpen={setOpen}
                />
                    )
                }
                <Footer/>
            </div>

        )
    }

    </>
  )
}
export default CourseDetailsPage;