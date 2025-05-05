import {create} from "zustand";
import {EIcon, EStatus, TaskProps} from "@/app/_components/Task";
import {immer} from "zustand/middleware/immer";

interface State {
    editingTask: TaskProps,
}

interface Actions {
    setName: (name: string) => void,
    setDescription: (description: string) => void,
    setIcon: (icon: EIcon) => void,
    setStatus: (status: EStatus) => void,
    setEditingTask: (task: TaskProps) => void,
    setIndex: (index: number) => void,
}

const useEditingTaskStore = create<State & Actions>()(
    immer((set) => ({
    editingTask: {
        name: "",
        description: "",
        icon: "",
        status: EStatus.TODO,
    },
        index: 0,
        setName: (name) => set((state) => {state.editingTask.name = name}),
        setStatus: (status => set(state => {state.editingTask.status = status})),
        setDescription: (description) => set((state) => {state.editingTask.description = description}),
        setIcon: (icon) => set((state) => {state.editingTask.icon = icon}),
        setEditingTask: (task) => set((state) => {state.editingTask = task}),
        setIndex: (index) => set((state) => {state.editingTask.index = index}),
})))

export default useEditingTaskStore