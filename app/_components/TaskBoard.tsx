"use client"
import Task, {EFunctionality} from "@/app/_components/Task";
import Image from "next/image";
import TaskWrapper from "@/app/_components/TaskWrapper";
import useBoardStore from "@/stores/useBoardStore";

const TaskBoard = () => {
    const {boardInfo} = useBoardStore()
    
    
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
        <div className={`flex flex-col justify-center items-center h-full gap-y-8 font-outfit min-w-[320px] p-8 w-full max-w-[600px]`}>
            <div className={`flex gap-4 self-start items-start`}>
                <Image src={`/Logo.svg`} alt={`logo`} width={48} height={48} className={``}/>
                <div className={`flex flex-col gap-4`}>
                    <h1 className={`text-title leading-none`}>My Task Board</h1>
                    <p className={`text-description`}>Tasks to keep organised</p>
                </div>
            </div>
            <div className={`flex flex-col gap-4 w-full`}>
                {boardInfo.tasks.map((props, index) => 
                    <TaskWrapper key={index}>
                        <Task {...props} index={index}/>
                    </TaskWrapper>)}
                <TaskWrapper>
                    <Task name={`Add new task`} icon={`/Add_round_duotone.svg`} functionality={EFunctionality.ADD_TASK} description={``} index={boardInfo.tasks.length}/>
                </TaskWrapper>
            </div>
        </div>
    )
}


export default TaskBoard;