import {NextRequest, NextResponse} from "next/server";
import Board from "@/models/Boards"
import Task from "@/models/Tasks"
import dbConnect from "@/lib/dbConnect";

export const GET = async (req: NextRequest, {params}: {params: Promise<{boardId: string}>}) => {
    await dbConnect()
    const {boardId} = await params
    const board = await Board.findById(boardId)
    const tasks = await Task.find({boardId: boardId}).sort({index: 1})
    return NextResponse.json({board, tasks})
}

export const PUT = async (req: NextRequest, {params}: {params: Promise<{boardId: string}>}) => {

}

export const DELETE = async (req: NextRequest, {params}: {params: Promise<{boardId: string}>}) => {
    await dbConnect()
    const {boardId} = await params
    const board = await Board.findByIdAndDelete(boardId)
    await Task.deleteMany({boardId: boardId})
    return NextResponse.json(board)
}

