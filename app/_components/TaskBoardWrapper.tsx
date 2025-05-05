import TaskBoard from "@/app/_components/TaskBoard";

const TaskBoardWrapper = () => {
    return (
        <div className={`min-h-screen min-w-screen flex flex-col justify-center items-center`}>
            <TaskBoard/>
        </div>
    )
}
export default TaskBoardWrapper;