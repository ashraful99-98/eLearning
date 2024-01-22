import React, { useEffect, useState } from 'react'
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useTheme } from 'next-themes';
import { useGetAllOrdersQuery } from '@/redux/features/orders/orderApi';
import Loader from '../../Loader/Loader';
import {format} from  "timeago.js";
import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';
import { AiOutlineMail } from 'react-icons/ai';
type Props = {
    isDashboard?: boolean; 
}

const AllInvoices = ({isDashboard}: Props) => {
    const {theme, setTheme} = useTheme();
    const {isLoading, data} = useGetAllOrdersQuery({});
    const {data: usersData} = useGetAllUsersQuery({});
    const {data: coursesData} = useGetAllCoursesQuery({});

    const [orderData, setOrderData] = useState<any>([]);

    useEffect(()=>{
        if(data){
            const temp = data.orders.map((item:any)=>{
                const user = usersData?.users.find(
                    (user:any)=> user._id === item.userId
                );
                const course = coursesData?.courses.find(
                    (course:any)=> course._id === item.courseId
                );

                return{
                    ...item,
                    userName: user?.name,
                    userEmail: user?.email,
                    title: course?.name,
                    price: "$" + course?.price,
                };
            });
            setOrderData(temp);
        }

    },[ data, usersData, coursesData]);

    const columns:any = [
        {field: "id", haderName: "ID", flex:0.3},
        {field: "userName", haderName: "Name", flex: isDashboard ? .6 : .5},
        ...(isDashboard 
            ? [] : [
                {field: "userEmail", haderName: "Email", flex:1},
                {field: "title", haderName: "Course Title", flex:1},
            ]
            ),
            {field: "price", haderName: "Price", flex:.5},
            ...(isDashboard 
                ? [{
                    field: "created_at", haderName: "Created At", flex:.5,
                }] : [
                    {
                        field: '',
                        headerName: "Email",
                        flex: 0.2,
                        renderCell:(params:any)=>{
                            return (
                                <a href={`mailto:${params.row.userEmail}`}>
                                <AiOutlineMail className="dark:text-white text-black"
                                size={20}/>
                                </a>
                            );
                        },
                    },
                ]),
    ];
    const rows: any = [
      {
        id: "112345566",
        userName: "MAX",
        userEmail: "max@gmail.com",
        title: "Programing boss",
        price: "1200",
        created_at: "2 days ago",
      },
      {
        id: "112345566",
        userName: "MAX",
        userEmail: "max@gmail.com",
        title: "Programming Boss",
        price: "1200",
        created_at: "2 days ago",
      },
      {
        id: "223456677",
        userName: "Alex",
        userEmail: "alex@example.com",
        title: "Web Developer",
        price: "800",
        created_at: "1 week ago",
      },
      {
        id: "334567788",
        userName: "Sophie",
        userEmail: "sophie@gmail.com",
        title: "Data Scientist",
        price: "1500",
        created_at: "3 days ago",
      },
      // Add 7 more objects with different values
      {
        id: "445678899",
        userName: "John",
        userEmail: "john@example.com",
        title: "Mobile App Developer",
        price: "1000",
        created_at: "4 days ago",
      },
      {
        id: "556789900",
        userName: "Emma",
        userEmail: "emma@gmail.com",
        title: "UI/UX Designer",
        price: "900",
        created_at: "5 days ago",
      },
      {
        id: "667890011",
        userName: "Daniel",
        userEmail: "daniel@example.com",
        title: "Software Engineer",
        price: "1300",
        created_at: "6 days ago",
      },
      {
        id: "778901122",
        userName: "Lily",
        userEmail: "lily@gmail.com",
        title: "Cybersecurity Analyst",
        price: "1400",
        created_at: "1 day ago",
      },
      {
        id: "889012233",
        userName: "Chris",
        userEmail: "chris@example.com",
        title: "Database Administrator",
        price: "1100",
        created_at: "2 weeks ago",
      },
      {
        id: "990123344",
        userName: "Mia",
        userEmail: "mia@gmail.com",
        title: "Full Stack Developer",
        price: "1600",
        created_at: "3 weeks ago",
      },
      {
        id: "101234455",
        userName: "Oliver",
        userEmail: "oliver@example.com",
        title: "Network Engineer",
        price: "950",
        created_at: "4 weeks ago",
      },
   
    ];

    orderData && orderData.forEach((item:any)=>{
        rows.push({
            id: item._id,
            userName: item.userName,
            userEmail: item.userEmail,
            title: item.title,
            price: item.price,
            created_at: format(item.createdAt),
        });
    });

  return (
    <div className={!isDashboard ? 'mt-[120px]' : 'mt-[0px]'}>
      {
        isLoading ? (
          <Loader/>
        ):(
          <Box m={isDashboard ? "0" : "40px"}>
            <Box m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "35vh" : "90vh"}
            overflow={"hidden"}
            sx={{
              "& .MuiDataGrid-root":{
                border: "none",
                outline:"none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon":{
                color: theme === "dark" ? "#fff" : "#000",
              },
              
                "& .MuiDataGrid-sortIcon":{
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-row":{
                  color: theme === "dark" ? "#fff" : "#000",
                  borderBottom: theme === "dark" ? "1px solid #ffffff30 !important"
                  : "1px solid #ccc !important"
                },

                "& .MuiTablePagination-root": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-cell":{
                  borderBottom: "none !important"
                },
                "& .name-column-cell":{
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-columnHeaders":{
                  borderBottom: "none !important",
                  color: theme === "dark" ? "#fff" : "#000",
                  backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                },

                "& .MuiDataGrid-virtualScroller":{
                  backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                },
                
                "& .MuiDataGrid-footerContainer":{
                  backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                  borderTop: "none",
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiCheckbox-root":{
                  color: theme === "dark" ? "#b7ebde !important" : "#000 !important",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
                  color: `#fff !important`,
                },
              
            }}>
              <DataGrid
              checkboxSelection={isDashboard ? false : true}
              rows={rows}
              columns={columns}
              components={isDashboard ? {} : {Toolbar:GridToolbar}}
              />

            </Box>

          </Box>
        )
      }

    </div>
  )
}
export default AllInvoices;