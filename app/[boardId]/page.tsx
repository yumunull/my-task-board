"use client"
import {use, useEffect} from "react";
import useBoardStore from "@/stores/useBoardStore";


const Home = ({
                  params
              }: {
    params: Promise<{ boardId: string }>
}) => {
    const {boardId} = use(params)
    const {setBoardId, setBoardTasks} = useBoardStore()
    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/boards/${boardId}`)
            const json = await res.json()
            
            setBoardId(json.board._id)
            setBoardTasks(json.tasks)
            
            console.log(json.board, json.tasks)
        })()
    }, [])
    return (
        <div>
            {boardId}
        </div>
    )
}

export default Home