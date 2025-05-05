import {NextResponse} from "next/server";
import dbConnect from "@/lib/dbConnect";
import Board from "@/models/Boards"

export const POST = async () => {
    await dbConnect();
    
    const board = await Board.create({})
    await board.save()
    return NextResponse.json({id: board._id})
}