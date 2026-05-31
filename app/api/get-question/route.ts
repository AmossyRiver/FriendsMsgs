import { NextRequest, NextResponse } from "next/server";
import friends from "@/app/data/friends.json";

export async function POST(request: NextRequest) {
    try {
        const { name } = await request.json();

        const friend = friends.friends.find(
            (f) => f.name.toLowerCase() === name.toLowerCase()
        );

        if (!friend) {
            return NextResponse.json(
                { error: "Friend not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            question: friend.secretQuestion,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}