import React from "react";
import Image from "next/image";
import {twMerge} from "tailwind-merge";
import clsx from "clsx";

export enum EStatus {
    TODO,
    IN_PROGRESS,
    COMPLETED,
    WONT_DO,
}

export enum EFunctionality {
    NORMAL,
    ADD_TASK,
}


export enum EIcon {
    WORKING,
    CHAT,
    COFFEE,
    WORKOUT,
    BOOK,
    CLOCK,
}

export const Icons = [
    "💻",
    "💬",
    "☕️",
    "🏋️",
    "📚",
    "⏰",
]

interface Props {
    name: string;
    description?: string;
    icon: EIcon | string;
    status?: EStatus;
    functionality?: EFunctionality;
}

const Task: React.FC<Props> = ({
                                   name,
                                   description = "",
                                   icon,
                                   status = EStatus.TODO,
                                   functionality = EFunctionality.NORMAL,
                               }) => {

    const styles = twMerge(clsx(
        {
            'bg-yellow': status === EStatus.IN_PROGRESS,
            'bg-light-green': status === EStatus.COMPLETED,
            'bg-pink': status === EStatus.WONT_DO,
            'bg-light-gray': status === EStatus.TODO,
            'bg-skin': functionality === EFunctionality.ADD_TASK,
        }
    ))
    
    const iconStyles = twMerge(clsx(
        'bg-white',
        {
            'bg-orange': functionality === EFunctionality.ADD_TASK,
        }
    ))
    return (
        <div className={`flex py-3 px-4 gap-x-4 rounded-xl ${styles}`}>
            <div className={`${iconStyles} rounded-xl w-12 h-12 flex aspect-square items-center justify-center`}>
                {icon in EIcon ? <span>{Icons[icon as EIcon]}</span> :
                    <Image src={icon as string} alt={`task icon`} width={24} height={24}/>}
            </div>

            <div className={`flex flex-col my-auto py-2`}>
                <span className={`grow text-task-title`}>{name}</span>
                <span className={`text-description-light`}>{description}</span>
            </div>
        </div>
    )
}

export default Task;