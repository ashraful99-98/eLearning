import React, { FC } from 'react'
import { styles } from '../../Styles/styles';
import { MdAddCircle } from 'react-icons/md';
import toast from 'react-hot-toast';

type Props = {
    benefits:{title: string}[];
    setBenefits:(benefits:{title:string}[])=>void;
    prerequisites:{title:string}[];
    setPrerequisites:(prerequisites:{title:string}[])=>void;

    active:number;
    setActive: (active:number)=>void;


}

const CourseData:FC<Props> = ({
    benefits,setBenefits,prerequisites,setPrerequisites,active,setActive
}) => {
    const handleBenefitChange=(index:number,value:any)=>{
        const updateBenefits = [...benefits];
        updateBenefits[index].title = value;
        setBenefits(updateBenefits);
    };

    const handleAddBenefit= ()=>{
        setBenefits([...benefits,{title:""}]);
    };
    const handlePrerequisitesChange=(index:number,value:any)=>{
        const updatePrerequisites = [...prerequisites];
        updatePrerequisites[index].title = value;
        setPrerequisites(updatePrerequisites);
    };

    const handleAddPrerequisites= ()=>{
        setPrerequisites([...prerequisites,{title:""}]);
    };

    const prevButton = ()=>{
        setActive(active -1);
    }

    const handleOptions = ()=>{
        if(benefits[benefits.length-1]?.title !== "" && prerequisites[prerequisites.length -1]?.title !== ""){
            setActive(active +1);
        }else{
            toast.error("Please fill the fields for go to next!")
        }
    };
  return (
    <div className='w-[80%] m-auto mt-24 block'>
        <div>
            <label htmlFor="email" className={`${styles.label} text-[20px]`}>
                What are the benefits for students in this course?
            </label>
            <br />
            {
                benefits.map((benefits:any,index:number)=>(
                    <input type="text"
                    key={index}
                    name="Benefit"
                    placeholder='You will be able to build a full stack ELearning platfrom...'
                    required
                    className={`${styles.input} my-2`}
                    value={benefits.title}
                    onChange={(e)=>handleBenefitChange(index, e.target.value)}
                     />
                ))

            }
            <MdAddCircle
            style={{margin:"10px 0px",cursor:"pointer", width:"30px"}}
            onClick={handleAddBenefit}
            />
        </div>
        <div>
            <label htmlFor="email" className={`${styles.label} text-[20px]`}>
               What are the prerequisites for starting this course?
            </label>
            <br />
            {
                prerequisites.map((prerequisites:any,index:number)=>(
                    <input type="text"
                    key={index}
                    name="Benefit"
                    placeholder='You need basic knowledge of MERN stack'
                    required
                    className={`${styles.input} my-2`}
                    value={prerequisites.title}
                    onChange={(e)=>handlePrerequisitesChange(index, e.target.value)}
                     />
                ))

            }
            <MdAddCircle
            style={{margin:"10px 0px",cursor:"pointer", width:"30px"}}
            onClick={handleAddPrerequisites}
            />
        </div>
        <div className='w-full flex items-center justify-between'>
            <div className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8'
            onClick={()=>prevButton()}
            >
                Previous

            </div>
            <div className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8'
            onClick={()=>handleOptions()}
            >
                Next

            </div>

        </div>
        
    </div>
  )
}
export default CourseData;