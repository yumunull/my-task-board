"use client"
import Task, {EFunctionality, EIcon, EStatus, TaskProps} from "@/app/_components/Task";
import Image from "next/image";
import {ReactNode, useState} from "react";
import TaskWrapper from "@/app/_components/TaskWrapper";

const TaskBoard = () => {
    const [tasksProps, setTasksProps] = useState<TaskProps[]>([
        {
            name: `Task in Progress`,
            description: ``,
            status: EStatus.IN_PROGRESS,
            icon: EIcon.CLOCK,
        },
        {
            name: `Task Completed`,
            description: ``,
            icon: EIcon.WORKOUT,
            status: EStatus.COMPLETED,
        },
        {
            name: `Task Won't Do`,
            description: ``,
            icon: EIcon.COFFEE,
            status: EStatus.WONT_DO,
        },
        {
            name: `Task to Do`,
            description: `Work on a Challenge on devChallenge.io, learn TypeScript.`,
            icon: EIcon.BOOK,
            status: EStatus.TODO,
        }
    ])
    
    // useEffect(()=>{
    //     (async ()=>{
    //         const res = await fetch(`/api/boards`, {
    //             method: 'POST',
    //         })
    //         const json = await res.json()
    //         console.log(json)
    //     })()
    // },[])
    
    return (
        <div className={`flex flex-col justify-center items-center h-full gap-y-8 font-outfit`}>
            <div className={`flex gap-4 self-start items-start`}>
                <Image src={`/Logo.svg`} alt={`logo`} width={48} height={48} className={``}/>
                <div className={`flex flex-col gap-4`}>
                    <h1 className={`text-title leading-none`}>My Task Board</h1>
                    <p className={`text-description`}>Tasks to keep organised</p>
                </div>
            </div>
            <div className={`flex flex-col gap-4 max-w-[600px]`}>
                {tasksProps.map((props, index) => 
                    <TaskWrapper key={index}>
                        <Task {...props}/>
                    </TaskWrapper>)}
                <TaskWrapper>
                    <Task name={`Add new task`} icon={`/Add_round_duotone.svg`} functionality={EFunctionality.ADD_TASK} description={``}/>
                </TaskWrapper>
            </div>
        </div>
    )
}


export default TaskBoard;