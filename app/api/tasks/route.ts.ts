import {NextRequest} from "next/server";

export const PUT = async (req: NextRequest) => {
    const json = await req.json() 
    console.log(json)
}