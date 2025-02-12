import { getAllTags } from "@/services/arkham";
import { NextResponse } from "next/server";

export const GET = async () => {
    const tokenTopFlow = await getAllTags();

    return NextResponse.json(tokenTopFlow);
}