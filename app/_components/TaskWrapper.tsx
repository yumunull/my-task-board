import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import React, {isValidElement, useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {EIcon, EStatus, Status, statusMap, TaskProps} from "./Task"
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import useEditingTaskStore from "@/stores/useEditingTaskStore";
import useBoardStore from "@/stores/useBoardStore";
import {getEdgeInstrumentationModule} from "next/dist/server/web/globals";
import UseEditingTaskStore from "@/stores/useEditingTaskStore";
import {Edit} from "lucide-react";

const statusList = [
    EStatus.IN_PROGRESS,
    EStatus.COMPLETED,
    EStatus.WONT_DO,
]

const iconList = [
    EIcon.WORKING,
    EIcon.CHAT,
    EIcon.COFFEE,
    EIcon.WORKOUT,
    EIcon.BOOK,
    EIcon.CLOCK,
]

const TaskWrapper = ({children}: React.PropsWithChildren) => {
    const {editingTask, setEditingTask} = useEditingTaskStore()
    const {boardInfo, setBoardId, setBoardTasks, setBoardTaskId, setBoardTask, deleteBoardTask} = useBoardStore()
    const createBoard = async () => {
        const res = await fetch("/api/boards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const json = await res.json()
        setBoardId(json.id)

        await Promise.all(boardInfo.tasks.map(async (task, index) => {
            const res = await fetch("/api/tasks", {
                method: "POST",
                body: JSON.stringify(task),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const json = await res.json()
            setBoardTaskId(index, json.id)

            if (index === editingTask.index) {
                setEditingTask({...editingTask, id: json.id})
            }
        }))
    }

    const createTask = async () => {
        const res = await fetch("/api/tasks", {
            method: "POST",
            body: JSON.stringify(editingTask),
            headers: {
                "Content-Type": "application/json",
            }
        })
        const json = await res.json()
        console.log(json)
        setEditingTask({
            ...editingTask,
            id: json.id
        })
        setBoardTask(editingTask.index as number, json)
    }
    
    const updateTask = async () => {
        const currentEditingTask = useEditingTaskStore.getState().editingTask
        const res = await fetch(`/api/tasks/${currentEditingTask.id}`, {
            method: "PUT",
            body: JSON.stringify(editingTask),
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (res.ok)
        {
            setBoardTask(editingTask.index as number, editingTask)
        }
    }
    
    const deleteTask = async () => {
        const currentEditingTask = useEditingTaskStore.getState().editingTask
        const res = await fetch(`/api/tasks/${currentEditingTask.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (res.ok) {
            deleteBoardTask(editingTask.index as number)
        }
    }

    const handleSaveTask = async () => {

        if (boardInfo.id === undefined) {
           await createBoard()
        }
        
        const currentEditingTask = useEditingTaskStore.getState().editingTask
        
        if (currentEditingTask.id === undefined) {
            await createTask()
        } else {
            await updateTask()
        }
    }
    
    const handleDeleteTask = async () => {
        if (boardInfo.id === undefined) {
            await createBoard()
        }
        
        const currentEditingTask = useEditingTaskStore.getState().editingTask
        
        if (currentEditingTask.id !== undefined) {
            await deleteTask()
        }
        
    }

    const handleSendTaskPropsToStore = () => {
        if (isValidElement(children)) {
            setEditingTask(children.props as TaskProps)
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div
                    className={`flex cursor-pointer hover:scale-110 hover:shadow-lg duration-150 rounded-xl overflow-hidden`}
                    onClick={() => handleSendTaskPropsToStore()}
                >
                    {children}
                </div>
            </SheetTrigger>
            <SheetContent
                className={`sm:max-w-[600px] h-[calc(100%-32px)] my-auto mr-4 rounded-lg p-6 font-outfit [&_Label]:text-input-label [&_Label]:text-gray-blue **:placeholder:text-gray-blue`}>
                <SheetHeader className={`p-0 text-task-title `}>
                    <SheetTitle>Task details</SheetTitle>
                </SheetHeader>
                <div className={`flex flex-col gap-y-6
                [&>div]:flex [&>div]:flex-col [&>div]:gap-2
                `}>
                    <div>
                        <Label htmlFor={"name"}>Task name</Label>
                        <Input id={"name"} placeholder={"Enter your task name"} className={`focus-visible:ring-blue`}
                               value={editingTask.name}
                               onChange={(e) => setEditingTask({...editingTask, name: e.target.value})}/>
                    </div>

                    <div>
                        <Label htmlFor={"description"}>Description</Label>
                        <Textarea id={"description"} placeholder={"Enter a short description"} rows={8}
                                  className={`resize-none focus-visible:ring-blue`} value={editingTask.description}
                                  onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}/>
                    </div>

                    <div>
                        <Label>Icon</Label>
                        <ToggleGroup type={"single"} className={`flex gap-4 rounded-none`} value={editingTask.icon}
                                     onValueChange={(value) => setEditingTask({...editingTask, icon: value as EIcon})}>
                            {iconList.map((icon, index) =>
                                <ToggleGroupItem key={icon} id={index.toString()} value={icon}
                                                 className={`h-12 aspect-square rounded-lg bg-light-gray data-[state=on]:bg-yellow`}>
                                    {icon}
                                </ToggleGroupItem>
                            )}
                        </ToggleGroup>
                    </div>

                    <div>
                        <Label>Status</Label>
                        <ToggleGroup type={"single"} className={`w-full gap-4 grid grid-cols-2`}
                                     value={editingTask.status} onValueChange={(value) => setEditingTask({
                            ...editingTask,
                            status: value as EStatus
                        })}>
                            {statusList.map((status, index) =>
                                <ToggleGroupItem value={status}
                                                 className={`w-full group h-14 flex justify-start !rounded-2xl p-[0.15em] border-light-gray border-2 data-[state=on]:border-blue`}
                                                 key={status}>

                                    <div className={`h-full rounded-xl overflow-hidden`}>
                                        <Status status={status}/>
                                    </div>

                                    <span>{statusMap.get(status)?.display}</span>

                                    <div
                                        className={`group-data-[state=on]:opacity-100 group-data-[state=off]:opacity-0 rounded-full p-1 aspect-square bg-blue flex justify-center items-center ml-auto mr-2`}>
                                        <Image src={`Done_round.svg`} alt={`status icon`} width={12} height={12}/>
                                    </div>
                                </ToggleGroupItem>
                            )}
                        </ToggleGroup>
                    </div>
                </div>
                <SheetFooter className={`flex-row gap-4 ml-auto`}>
                    <Button className={`bg-gray-blue rounded-full w-28`} onClick={() => handleDeleteTask()}>
                        Delete
                        <Image src={`Trash.svg`} alt={`delete icon`} width={20} height={20}/>
                    </Button>
                    <Button className={`bg-blue rounded-full w-28`} onClick={() => handleSaveTask()}>
                        Save
                        <Image src={`Done_round.svg`} alt={`save icon`} width={20} height={20}/>
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}


export default TaskWrapper;