import React from "react";
import Image from "next/image";
import {twMerge} from "tailwind-merge";
import clsx from "clsx";
import {cn} from "@/lib/utils";

export enum EStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    WONT_DO = "WONT_DO",
}


interface IStatus {
    display: string,
    status: EStatus,
    icon: string,
}

export const statusMap = new Map<EStatus, IStatus>([
    [EStatus.IN_PROGRESS, {display: "In Progress", status: EStatus.IN_PROGRESS, icon: "/Time_atack_duotone.svg"}],
    [EStatus.COMPLETED, {display: "Completed", status: EStatus.COMPLETED, icon: "/Done_round_duotone.svg"}],
    [EStatus.WONT_DO, {display: "Won't do", status: EStatus.WONT_DO, icon: "/close_ring_duotone.svg"}],
])


export enum EFunctionality {
    NORMAL,
    ADD_TASK,
}


export enum EIcon {
    WORKING = "💻",
    CHAT = "💬",
    COFFEE = "☕️",
    WORKOUT = "🏋️",
    BOOK = "📚",
    CLOCK = "⏰",
}

export interface TaskProps {
    _id?: string;
    boardId?: string;
    name: string;
    description: string;
    icon: EIcon | string;
    status?: EStatus;
    index?: number;
    functionality?: EFunctionality;
}

const Task: React.FC<TaskProps> = ({
                                       name,
                                       description = "",
                                       icon,
                                       status = EStatus.TODO,
                                       functionality = EFunctionality.NORMAL,
                                   }) => {

    const styles = twMerge(clsx(
        `bg-light-gray`,
        {
            'bg-yellow': status === EStatus.IN_PROGRESS,
            'bg-light-green': status === EStatus.COMPLETED,
            'bg-pink': status === EStatus.WONT_DO,
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
        <div className={`flex py-3 px-4 gap-x-4 ${styles} w-full`}>
            <div className={`${iconStyles} rounded-xl w-12 h-12 flex aspect-square items-center justify-center`}>
                {Object.values(EIcon).includes(icon as EIcon) || icon == "" ? <span>{icon}</span> :
                    <Image src={icon as string} alt={`task icon`} width={24} height={24}/>}
            </div>

            <div className={`flex flex-col my-auto py-2`}>
                <span className={`grow text-task-title`}>{name}</span>
                <span className={`text-description-light`}>{description}</span>
            </div>

            <div className={`w-12 h-12 ml-auto`}>
                <Status status={status}/>
            </div>
        </div>
    )
}

export const Status = ({status}: { status: EStatus }) => {
    const styles = cn("bg-transparent", {
        "bg-orange": status === EStatus.IN_PROGRESS,
        "bg-green": status === EStatus.COMPLETED,
        "bg-red": status === EStatus.WONT_DO,
    })
    return (
        <div className={`${styles} w-full h-full flex aspect-square items-center justify-center rounded-xl`}>
            {statusMap.has(status) ?
                <Image src={statusMap.get(status)?.icon ?? ""} alt={`status icon`} width={24} height={24}/> : <>{}</>
            }
        </div>
    )
}

export default Task;