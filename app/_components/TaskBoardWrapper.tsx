import {PropsWithChildren} from "react";

const TaskBoardWrapper = ({children}: PropsWithChildren) => {
    return (
        <div className={`min-h-screen min-w-screen flex flex-col justify-center items-center`}>
            {children}
        </div>
    )
}
export default TaskBoardWrapper;