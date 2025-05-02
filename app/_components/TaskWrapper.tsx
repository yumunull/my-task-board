import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet"
import React from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Icons, Status} from "./Task"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";

const TaskWrapper = ({children}: React.PropsWithChildren) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div
                    className={`flex cursor-pointer hover:scale-110 hover:shadow-lg duration-150 rounded-xl overflow-hidden`}>
                    {children}
                </div>
            </SheetTrigger>
            <SheetContent
                className={`sm:max-w-[600px] m-4 rounded-lg p-6 font-outfit [&_Label]:text-input-label [&_Label]:text-gray-blue **:placeholder:text-gray-blue`}>
                <SheetHeader className={`p-0 text-task-title `}>
                    <SheetTitle>Task details</SheetTitle>
                </SheetHeader>
                <div className={`flex flex-col gap-y-6
                [&>div]:flex [&>div]:flex-col [&>div]:gap-2
                `}>
                    <div>
                        <Label htmlFor={"name"}>Task name</Label>
                        <Input id={"name"} placeholder={"Enter your task name"} className={`focus-visible:ring-blue`}/>
                    </div>

                    <div>
                        <Label htmlFor={"description"}>Description</Label>
                        <Textarea id={"description"} placeholder={"Enter a short description"} rows={8} className={`resize-none focus-visible:ring-blue`}/>
                    </div>

                    <div>
                        <Label>Icon</Label>
                        <ToggleGroup type={"single"} className={`flex gap-4 rounded-none`}>
                            {Icons.map((icon, index) =>
                                    <ToggleGroupItem id={index.toString()} value={icon} className={`h-12 aspect-square rounded-lg bg-light-gray`}>
                                        {icon}
                                    </ToggleGroupItem>
                            )}
                        </ToggleGroup>
                    </div>

                    <div>
                        <Label>Status</Label>
                        <ToggleGroup type={"single"} className={`w-full gap-4 grid grid-cols-2`}>
                            {Status.map((status, index) =>
                                <ToggleGroupItem value={status.status.toString()}
                                                 className={`w-full group h-14 flex justify-start rounded-lg p-[0.15em] border-light-gray border-2`}
                                                 key={status.display}>
                                    <div
                                        className={`aspect-square bg-gray-600 rounded-lg h-full flex justify-center items-center`}>
                                        <Image src={`Add_round_duotone.svg`} alt={`status icon`} width={24}
                                               height={24}/>
                                    </div>

                                    <span>
                                    {status.display}
                                </span>

                                    <div
                                        className={`group-data-[state=on]:opacity-100 group-data-[state=off]:opacity-0 rounded-full p-1 aspect-square bg-blue flex justify-center items-center ml-auto mr-2`}>
                                        <Image src={`Done_round.svg`} alt={`status icon`} width={12} height={12}/>
                                    </div>
                                </ToggleGroupItem>
                            )}
                        </ToggleGroup>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}


export default TaskWrapper;