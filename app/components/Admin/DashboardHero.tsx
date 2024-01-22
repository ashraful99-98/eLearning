"use client"
import React, { useState } from 'react'
import DashboardHeader from "./DashboardHeader";
import DeshboardWidgets from "../../components/Admin/Widgets/DeshboardWidgets";
type Props = {
  isDashboard?: boolean;
}

const DashboardHero = ({isDashboard}:Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <DashboardHeader open={open} setOpen={setOpen}/>
      {
        isDashboard && (
          <DeshboardWidgets open={open}/>
        )
      }
    </div>
  )
}
export default DashboardHero;