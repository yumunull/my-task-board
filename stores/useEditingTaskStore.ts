import {create} from "zustand";
import {EStatus, TaskProps} from "@/app/_components/Task";

interface EditingTaskStore {
    editingTask: TaskProps,
    updateEditingTask: (updated: Partial<TaskProps>) => void,
}

const useEditingTaskStore = create<EditingTaskStore>(set => ({
    editingTask: {
        name: "",
        description: "",
        icon: "",
        status: EStatus.TODO,
    },
    
    updateEditingTask: (updated) => set((state => ({
        editingTask: {...state.editingTask, ...updated}
    }))),
    
    
}))

export default useEditingTaskStore