"use client"
import {use, useEffect, useState} from "react";
import useBoardStore from "@/stores/useBoardStore";
import TaskBoardWrapper from "@/app/_components/TaskBoardWrapper";
import TaskBoard from "@/app/_components/TaskBoard";
import Loader from "@/app/_components/Loader";


const Home = ({
                  params
              }: {
    params: Promise<{ boardId: string }>
}) => {
    const {boardId} = use(params)
    const {setBoardId, setBoardTasks} = useBoardStore()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/boards/${boardId}`)
            const json = await res.json()

            setBoardId(json.board._id)
            setBoardTasks(json.tasks)

            console.log(json.board, json.tasks)
            setLoading(false)
        })()
    }, [boardId])
    return (
        <TaskBoardWrapper>
            {loading ?
                <Loader/>
                :
                <TaskBoard/>
            }
        </TaskBoardWrapper>
    )
}

export default Home