import React, { FC, useEffect, useState } from 'react'
import UserAnalytics from '../Analytics/UserAnalytics';
import { BiBorderLeft } from 'react-icons/bi';
import {PiUsersFourLight} from 'react-icons/Pi';
import { Box, CircularProgress } from '@mui/material';
import OrderAnalytics from '../Analytics/OrderAnalytics';
import AllInvoices from '../Order/AllInvoices';
import { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';

type Props = {
    open?: boolean;
    value?:number;
}

 const CircularProgressWithLabel:FC<Props>=({open, value})=>{
  return(
    <Box sx={{position:"relative", display:"inline-flex"}}>
      <CircularProgress
      variant='determinate'
      value={value}
      size={45}
      color={value && value > 99 ? "info" : "error"}
      thickness={4}
      style={{zIndex: open ? -1 : 1}}
      />
      <Box 
      sx={{
        top:0,
        left: 0,
        bottom:0,
        right:0,
        position:"absolute",
        display: "flex",
        alignItems: "center",
        justifyContent:"center"
      }}
      >

      </Box>
    </Box>
  )
 }

const DeshboardWidgets:FC<Props> = ({open}) => {
  const [orderComparePrecentenge, setOrderComparePrecentenge] = useState<any>();
  const [userComparePrecentenge, setuserComparePrecentenge] = useState<any>();

  const {data, isLoading}  = useGetUsersAnalyticsQuery({});
  const {data: orderdata, isLoading:loadingOrder}  = useGetOrdersAnalyticsQuery({});
  
  useEffect(()=>{
     if(isLoading && loadingOrder){
      return;
     }
     else{
      if(data && orderdata){
        const usersLastTwoMounths = data.users.last12Months.slice(-2);
        const ordersLastTwoMounths = orderdata.orders.last12Months.slice(-2);

        if(usersLastTwoMounths.length === 2 && ordersLastTwoMounths.length === 2 ){
          const usersCurrentMonth = usersLastTwoMounths[1].count;
          const usersPrviouseMonth = usersLastTwoMounths[0].count; 
          const ordersCurrentMonth = ordersLastTwoMounths[1].count;
          const ordersPrviouseMonth = ordersLastTwoMounths[0].count; 

          const usersPrecentChange = usersPrviouseMonth !== 0 ? ((usersCurrentMonth - usersPrviouseMonth) / usersPrviouseMonth) * 100 : 100;

          const ordersPrecentChange = ordersPrviouseMonth !== 0 ? ((ordersCurrentMonth - ordersPrviouseMonth) / ordersPrviouseMonth) * 100 : 100;


          setuserComparePrecentenge({
            currentMonth : usersCurrentMonth,
            previousMonth : usersPrviouseMonth,
            percentChange : usersPrecentChange,
          });
          
          setOrderComparePrecentenge({
            currentMonth : ordersCurrentMonth,
            previousMonth : ordersPrviouseMonth,
            percentChange : ordersPrecentChange,
          });

        }
        }

      }
     
  },[isLoading,loadingOrder,data,orderdata]);
  return (
    <div className='mt-[30px] min-h-screen'>
      <div className='grid grid-cols-[75%,25%] mx-2'>
        <div className='p-8 rounded'>
          <UserAnalytics isDashboard={true}/>
        </div>

        <div className='pt-[80px] pr-8'>
          <div className='w-full dark:bg-[#111C34] rounded-sm shadow'>
            <div className='flex items-center p-3 justify-between'>
              <div className=''>
                <BiBorderLeft className="dark:text-[#39a37a] text-black text-[30px]"/>
                <h5 className='pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]'>
                {
                    orderComparePrecentenge?.currentMonth
                  }
              
                </h5>
                <h5 className='py-2 font-Poppins dark:text-[#39a37a] text-black text-[20px] font-[400]'>
                  Sales Obtained

                </h5>

              </div>
              <div>
                <CircularProgressWithLabel value={
                   orderComparePrecentenge?.percentChange > 0 ? 100 : 0
                } open={open}/>
                <h5 className='text-center pt-4'>
                  {/* {
                    orderComparePrecentenge.percentChange > 0 ? "+" + orderComparePrecentenge.percentChange.toFixed(2) :
                   "-" + orderComparePrecentenge.percentChange.toFixed(2)
                  } */}
                  100 %
                </h5>
              </div>
            
            </div>

            </div>

              <div className='w-full dark:bg-[#111C34] rounded-sm shadow my-6'>
                <div className='flex items-center p-3 justify-between'>
                  <div className=''>
                    <PiUsersFourLight className="dark:text-[#39a37a] text-black text-[30px]"/>

                    <h5 className='pt-2 font-Poppins dark:text-[#39a37a] text-black text-[20px]'>
                  {
                    userComparePrecentenge?.currentMonth
                  }

                </h5>
                    <h5 className='py-2 font-Poppins dark:text-[#39a37a] text-black text-[20px] font-[400]'>
                  New Users

                </h5>
                  </div>
                  <div>
                  <CircularProgressWithLabel value={
                    userComparePrecentenge?.percentChange > 0 ? 100 : 0
                  } open={open}/>

                  <h5 className='text-center pt-4'>
                    {
                      userComparePrecentenge?.percentChange > 0 
                      ? '+' + userComparePrecentenge?.percentChange.toFixed(2)  : '-' + userComparePrecentenge?.percentChange.toFixed(2)
                    } %
                  </h5>

                  </div>

                </div>

               </div>

      

        </div>

      </div>

      <div className='grid grid-cols-[65%,35%] mt-[20px] mx-5'>
        <div className='dark:bg-[#111c43] w-[94%] mt-[30px] h-[40vh] shadow-sm m-auto'>
          <OrderAnalytics isDashboard={true}/>
        </div>
        <div className="p-5">
        <h5 className='pb-3 font-Poppins dark:text-[#fff] text-black text-[20px] font-[400]'>
                  Recent Transactions

                </h5>
                <AllInvoices isDashboard={true}/>
        </div>

      </div>

    </div>
  )
}
export default DeshboardWidgets;