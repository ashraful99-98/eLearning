import React from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {Box, Button} from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import {FiEdit2} from 'react-icons/fi';
import { useTheme } from 'next-themes';
import Loader from '../../Loader/Loader';
import {format} from "timeago.js";
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';

type Props = {}

const AllCourses = (props: Props) => {
  const {theme, setTheme} = useTheme();

  const {isLoading, data, error} = useGetAllUsersQuery({});



  const columns = [
    {field: "id", headerName: "ID", flex: 0.3},
    {field: "name", headerName: "Name", flex: .5},
    {field: "email", headerName: "Email", flex: 0.5},
    {field: "role", headerName: "Role", flex: 0.5},
    {field: "courses", headerName: "Purchased Courses", flex: 0.5},
    {field: "created_at", headerName: "Joined At", flex: 0.5},
    {
      field: " ",
      headerName:"Delete",
      flex: 0.2,
      renderCell: (params:any)=>{
        return (
          <>

          <a href={`mailto:${params.row.email}`}>
            <AiOutlineDelete
            className="dark:text-white text-black"
            size={20}
            />
          </a>
          </>
        );
      },
    },
    {
      field: "  ",
      headerName:"Email",
      flex: 0.2,
      renderCell: (params:any)=>{
        return (
          <>
          <Button>
            <AiOutlineMail
            className="dark:text-white text-black"
            size={20}
            />
          </Button>
          </>
        );
      },
    },
  ];

  const rows:any = [
 
  ];
  {
    data && data.users.forEach((item:any) => {
      rows.push({
      id: item._id,
      name: item.name,
      email: item.email,
      role:item.role,
      courses: item.courses.length,
      created_at: format(item.createdAt),
    });
    });
  }


  return (
    <div className='mt-[120px]'>
     {
      isLoading ? (
        <Loader/>
      ):(
        <Box m="20px">
        <Box
        m="40px 0 0 0"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root":{
            border:"none",
            outline:"none"
          },
          "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon":{
            color: theme === "dark"? "#fff" :"#000",
          },
          "& .MuiDataGrid-sortIcon":{
            color: theme === "dark"? "#fff" :"#000",
          },
          "& .MuiDataGrid-row":{
            color: theme === "dark"? "#fff" :"#000",
            borderBottom:theme === "dark"? "1px soild #fffff30 !important" : "1px soild #ccc !important",
          },
          "& .MuiTablePagination-root":{
            color: theme === "dark"? "#fff" :"#000",
          },
          "& .MuiDataGrid-cell":{
            borderBottom:"none",
          },
          "& .name-column-cell":{
            color: theme === "dark"? "#fff" :"#000",
          },
          "& .MuiDataGrid-columnHeaders":{
            backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
            borderBottom:"none",
            color: theme === "dark" ? "#fff" :"#000",
          },
          "& .MuiDataGrid-virtualScroller":{
            backgroundColor: theme === "dark"? "#1F2A40" :"#F2F0F0",
          },
          "& .MuiDataGrid-footerContainer":{
            color: theme === "dark" ? "#fff" :"#000",
            borderTop:"none",
            backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC"
          },
          "& MuiCheckbox-root":{
            color: theme === "dark"? "#b7ebde !important" :"#000 !important",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
            color: "#fff !important",
          },
        }}
        >
          <DataGrid checkboxSelection rows={rows} columns={columns} />

        </Box>

      </Box>
      )
     }


    </div>
  )
}
export default AllCourses;