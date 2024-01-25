'use client'
import  { FC, useEffect, useState } from 'react';
import {ProSidebar,Menu,MenuItem} from "react-pro-sidebar";
import avatarDefault from "../../../images/149071.png";
import 'react-pro-sidebar/dist/css/styles.css';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Box, IconButton,Typography } from '@mui/material';
import { MdArrowBackIos, MdArrowForwardIos, MdBarChart, MdGroups, MdHome, MdManageHistory, MdOndemandVideo, MdOutlineMap, MdOutlineReceipt, MdPeopleOutline, MdQuiz, MdSettings, MdVideoCall, MdWeb, MdWysiwyg } from 'react-icons/md';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiExit } from 'react-icons/bi';
import { Props } from 'react-pro-sidebar/dist/ProSidebar/ProSidebar';


interface itemProps {
    title: string;
    to: string;
    icon: JSX.Element;
    selected: string;
    setSelected: any;
} 

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
    return (
        <MenuItem
            active={selected === title}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
            <Link href={to}/>
            
        </MenuItem>
    );
};

const Sidebar:FC<itemProps> = () => {
    const { user } = useSelector((state: any) => state.auth);

    const [logout, setLogout] = useState(false);

    const [isCollapsed, setIsCollapsed] = useState(false);

    const [selected,setSelected] = useState("Dashboard");

    const [mounted, setMounted] = useState(false);

    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null;
    }

    const logoutHandler = () => {
       setLogout(true);
    };

    return (
        <Box
         sx={{
            "& .pro-sidebar-inner": {
                background: `${
                    theme === "dark" ? "#111C43 !important" : "#f4f4f4 !important"
                }`,
            },
            "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important",
            },

            "& .pro-inner-item:hover": {
                color: "#868dfb !important",
            },
            
            "& .pro-menu-item.active": {
                color: "#6870fa !important",
            },

            "& .pro-inner-item": {
                padding: "5px 20px 5px 20px !important",
                opacity: 1,
            },

            "& .pro-menu-item": {
                color: `${theme !== "dark" && "#000"}`,
            },
            "& .pro-icon":{
                fontSize: "20px",
            }
        }}
            className="!bg-white dark:bg-[#111C43]"
        >

      <ProSidebar 
        
        collapsed={isCollapsed}
        style={{
            position:"fixed",
            top:0,
            left:0,
            height:"100vh",
            width: isCollapsed ? "0%" : "16%",
            fontSize: "24px",
        }}
        >

            <Menu iconShape='square'>

                <MenuItem
                    onClick={() => setIsCollapsed(!isCollapsed)}

                    icon={isCollapsed ? <MdArrowForwardIos /> : undefined}
                    style={{
                        margin: "10px 0 20px 0",
                    }}
                >

                    {!isCollapsed && (
                        <Box display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            ml="15px"
                        >
                            <Link href="/">
                                <h3 className='text-[20px] font-Poppins uppercase dark:text-white text-black'>ELearning</h3>
                            </Link>
                            <IconButton onClick={() => setIsCollapsed(!isCollapsed)} className='inline-block'>
                                <MdArrowBackIos className="text-black dark:text-[#ffffffc1]" />
                            </IconButton>
                        </Box>
                    )}

                </MenuItem>

                {!isCollapsed && (
                    <Box mb="25px">
                        <Box display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Image
                                alt='profile-user'
                                width={100}
                                height={100}
                                src={user.avatar ? user.avatar.url : avatarDefault}
                                style={{
                                    cursor: "pointer",
                                    borderRadius: "50%",
                                    border: "3px solid #5b6fe6"
                                }}
                            />
                        </Box>

                        <Box textAlign="center">
                            <Typography
                                variant='h4'
                                className='!text-[18px] text-black dark:text-[#ffffffc1]'
                                sx={{ m: "10px 0 0 0" }}
                            >
                                {user?.name}
                            </Typography>

                            <Typography variant='h6'
                                sx={{ m: "10px 0 0 0" }}
                                className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize'>
                                - {user?.role}
                            </Typography>
                        </Box>
                    </Box>
                )}

                <Box paddingLeft={isCollapsed ? undefined : "10%"} >
                 
                  <Item title="Dashboard"
                        to="/admin"
                        icon={<MdHome />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                  

                    <Typography variant='h5'
                        sx={{ m: "15px 0 5px 25px" }}
                        className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'>
                        {!isCollapsed && "Data"}</Typography>

                   
                <Item
                    title='Users'
                    to="/admin/users"
                    icon={<MdGroups />}
                    selected={selected}
                    setSelected={setSelected}
                />

                    <Item
                        title='Invoices'
                        to='/admin/invoices'
                        icon={<MdOutlineReceipt />}
                        selected={selected}
                        setSelected={setSelected}
                    />

                    <Typography
                        variant='h5'
                        className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
                        sx={{ m: "15px 0 5px 25px" }}
                    >
                        {!isCollapsed && "Content"}
                    </Typography>

                    <Item
                        title='Create Course'
                        to='/admin/create-course'
                        icon={<MdVideoCall />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                   

                    <Item
                        title='Live Courses'
                        to='/admin/courses'
                        icon={<MdOndemandVideo />}
                        selected={selected}
                        setSelected={setSelected}
                    />

                    


                    <Typography
                        variant='h5'
                        className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
                        sx={{ m: "15px 0 5px 25px" }}
                    >
                        {!isCollapsed && "Customization"}
                    </Typography>

                    <Item
                        title='Hero'
                        to='/admin/hero'
                        icon={<MdWeb />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    

                    <Item
                        title='FAQ'
                        to='/admin/faq'
                        icon={<MdQuiz />}
                        selected={selected}
                        setSelected={setSelected}
                    />



                    <Item
                        title='Categories'
                        to='/admin/categories'
                        icon={<MdWysiwyg />}
                        selected={selected}
                        setSelected={setSelected}
                    />

                    
                  



                    <Typography
                        variant='h5'
                        className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
                        sx={{ m: "15px 0 5px 25px" }}
                    >
                        {!isCollapsed && "Controllers"}
                    </Typography>

                    <Item
                        title='Manage Team'
                        to='/admin/team'
                        icon={<MdPeopleOutline />}
                        selected={selected}
                        setSelected={setSelected}
                    />


                    <Typography
                        variant='h6'
                        className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
                        sx={{ m: "15px 0 5px 20px" }}
                    >
                        {!isCollapsed && "Analytics"}
                    </Typography>

                    <Item
                        title='Courses Analytics'
                        to='/admin/courses-analytics'
                        icon={<MdBarChart />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                   

                    <Item
                        title='Orders Analytics'
                        to='/admin/orders-analytics'
                        icon={<MdOutlineMap />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    
                    <Item
                        title='Users Analytics'
                        to='/admin/users-analytics'
                        icon={<MdManageHistory />}
                        selected={selected}
                        setSelected={setSelected}
                    />

                    <Typography
                        variant='h6'
                        className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
                        sx={{ m: "15px 0 5px 20px" }}
                    >
                        {!isCollapsed && "Extras"}
                    </Typography>

                    <Item
                        title='Settings'
                        to='/admin/settings'
                        icon={<MdSettings />}
                        selected={selected}
                        setSelected={setSelected}
                    />

                    <div
                     onClick={logoutHandler}
                       >
                        <Item
                        title='Exit'
                        to='/'
                        icon={<BiExit/>}
                        selected={selected}
                        setSelected={setSelected}
                        />

                    </div>
                </Box>


            </Menu>

            </ProSidebar>

        </Box>
    );
};

export default Sidebar;
