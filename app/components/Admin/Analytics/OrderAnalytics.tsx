import { useGetOrdersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import React, { FC, useEffect } from 'react';
import {
    BarChart, Bar,ResponsiveContainer,
    XAxis, Label, YAxis,LabelList,Area, AreaChart,Tooltip,LineChart, CartesianGrid, Legend, Line
    } from "recharts";
import Loader from '../../Loader/Loader';
import { styles } from '../../Styles/styles';

type Props = {
    isDashboard?: boolean; 
}



const OrderAnalytics:FC<Props> = ({isDashboard}) => {

    const {data,isLoading} = useGetOrdersAnalyticsQuery({});

    const analyticsData: any = [];

    data && data.orders.last12Months.forEach((item:any)=>{
        analyticsData.push({name:item.name, Count:item.count});
    });


  return (
   <>
   {
    isLoading ? (
        <Loader/>
    ):(
        <div className={isDashboard ?"h-[30vh]" : "h-screen"}>
            <div className={isDashboard ? "mt-[0px] pl-[40px] mb-2": "mt-[50px]"}>

                <h1 className={`${styles.title} ${isDashboard && "!text-[20px]"} px-5 !text-start`}> 

                Orders Analytics

                </h1>
                {
                    !isDashboard && (
                        <p className={`${styles.label} px-5`}>Last 12 months analytics data{""}</p>
                    )
                }

            </div>
            <div className={`w-full ${!isDashboard ? "h-[90%]" : "h-full"} flex items-center justify-center`}>
                <ResponsiveContainer 
                 width={isDashboard ? '100%' :'90%'} height={isDashboard ? '90%' :'50%'} >
                    <LineChart
                    width={450}
                    height={250}
                    data={analyticsData}
                    margin={
                        {
                            top:5,
                            right:30,
                            left:20,
                            bottom:5,
                        }
                    }
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="none"/>
                        <YAxis/>
                        <Tooltip/>
                        {
                            !isDashboard && <Legend/>
                        }
                        <Line type="monotone" dataKey="Count" stroke='#82ca9d'/>

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    )
   }
   </>
  )
}
export default OrderAnalytics;