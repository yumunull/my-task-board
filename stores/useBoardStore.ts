import {EIcon, EStatus, TaskProps} from "@/app/_components/Task";
import {create} from "zustand";
import {immer} from "zustand/middleware/immer";

interface BoardInfo {
    id?: string,
    tasks: TaskProps[],
}

interface State {
    boardInfo: BoardInfo,
}

interface Actions {
    setBoardId: (id: string) => void,
    setBoardTasks: (tasks: TaskProps[]) => void,
    setBoardTaskId: (index: number, id: string) => void,
    setBoardTask: (idnex: number, task: TaskProps) => void,
}


const useBoardStore = create<State & Actions>()(
    immer((set) => ({
        boardInfo: {
            tasks: [
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
            ]
        },
        
        setBoardTasks: (tasks) => set((state) => {state.boardInfo.tasks = tasks}),
        
        setBoardId: (id) => set((state)=>{state.boardInfo.id = id}),

        setBoardTaskId: (index, id) => set((state) => {state.boardInfo.tasks[index].id = id}),
        
        setBoardTask: (index, task) => set((state) => {state.boardInfo.tasks[index] = task}),
    })))

export default useBoardStore