'use client'
import React, { useState } from 'react'

type Props = {}

const CreateCourse = (props: Props) => {
    const [active, setActive] = useState(0);
    const [courseId, setCourseInfo] = useState({
        name: "",
        desceiption:"",
        price:"",
        estimatedprice:"",
        tags:"",
        level:"",
        demoUrl:"",
        thumbnali:"",
    })
  return (

    <div>CreateCourse</div>
  )
}

export default CreateCourse;