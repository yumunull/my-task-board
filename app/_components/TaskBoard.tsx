"use client"
import Task, {EFunctionality, EIcon, EStatus} from "@/app/_components/Task";
import Image from "next/image";
import {ReactNode, useState} from "react";
import TaskWrapper from "@/app/_components/TaskWrapper";

const TaskBoard = () => {
    const [tasks, setTasks] = useState<ReactNode[]> ([
        <Task name={`Task in Progress`} status={EStatus.IN_PROGRESS} icon={EIcon.CLOCK}/>,
        <Task name={`Task Completed`} icon={EIcon.WORKOUT} status={EStatus.COMPLETED}/>,
        <Task name={`Task Won't Do`} icon={EIcon.COFFEE} status={EStatus.WONT_DO}/>,
        <Task name={`Task To Do`} description={`Work on a Challenge on devChallenges.io, learn TypeScript.`}
              icon={EIcon.BOOK} status={EStatus.TODO}/>,
    ])
    
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
                {tasks.map((task, index) => 
                    <TaskWrapper key={index}>
                        {task}
                    </TaskWrapper>)}
                <TaskWrapper>
                    <Task name={`Add new task`} icon={`/Add_round_duotone.svg`} functionality={EFunctionality.ADD_TASK}/>
                </TaskWrapper>
            </div>
        </div>
    )
}


export default TaskBoard;