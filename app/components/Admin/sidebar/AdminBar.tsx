import React, { FC, useEffect, useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import avatarDefault from '../../../images/149071.png';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Box, IconButton, Typography } from '@mui/material';
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdBarChart,
  MdGroups,
  MdHome,
  MdManageHistory,
  MdOndemandVideo,
  MdOutlineMap,
  MdOutlineReceipt,
  MdPeopleOutline,
  MdQuiz,
  MdSettings,
  MdVideoCall,
  MdWeb,
  MdWysiwyg,
} from 'react-icons/md';
import { AiOutlineLogout } from 'react-icons/ai';

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Item: FC<ItemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <Link href={to} passHref>
      <MenuItem
        active={selected === title}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      </MenuItem>
    </Link>
  );
};

const Sidebar: FC = () => {
  const { user } = useSelector((state: any) => state.auth);

  const [logout, setLogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');
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
            theme === 'dark' ? '#111C43 !important' : '#fff !important'
          }`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: 'transparent !important',
        },
        "& .pro-inner-item:hover": {
          color: '#86870fa !important',
        },
        "& .pro-menu-item.active": {
          color: '#6870fa !important',
        },
        "& .pro-inner-item": {
          padding: '5px 35px 5px 20px !important',
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: `${theme !== 'dark' && '#000'}`,
        },
      }}
      className="!bg-white dark:bg-[#111C43]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: isCollapsed ? '0%' : '18%',
        }}
      >
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MdArrowForwardIos /> : undefined}
            style={{
              margin: '10px 0 20px 0',
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Link href="/">
                  <h3 className="text-[20px] font-Poppins uppercase dark:text-white text-black">
                    ELearning
                  </h3>
                </Link>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block"
                >
                  <MdArrowBackIos className="text-black dark:text-[#fffffc1]" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  alt="profile-user"
                  width={95}
                  height={95}
                  src={user?.avatar ? user.avatar.url : avatarDefault}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '50%',
                    border: '3px solid #5b6fe6',
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="!text-[18px] text-black dark:text-[#ffffffc1]"
                  sx={{ m: '10px 0 0 0' }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ m: '10px 0 0 0' }}
                  className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize"
                >
                  - {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : '8%'}>
            {/* ... other menu items ... */}

            <Item
              title="Settings"
              to="/admin/settings"
              icon={<MdSettings />}
              selected={selected}
              setSelected={setSelected}
            />

            <div
              className="w-full flex items-center px-3 py-4 cursor-pointer"
              onClick={() => logoutHandler()}
            >
              <AiOutlineLogout size={20} className="text-black dark:text-white" />
              <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
                Logout
              </h5>
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
