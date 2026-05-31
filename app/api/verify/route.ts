import { NextRequest, NextResponse } from "next/server";
import friends from "@/app/data/friends.json";

export async function POST(request: NextRequest) {
    try {
        const { name, answer } = await request.json();

        const friend = friends.friends.find(
            (f) => f.name.toLowerCase() === name.toLowerCase()
        );

        if (!friend) {
            return NextResponse.json(
                { error: "Friend not found" },
                { status: 404 }
            );
        }

        if (friend.secretAnswer.toLowerCase() !== answer.toLowerCase()) {
            return NextResponse.json(
                { error: "Incorrect answer", hint: friend.Hint },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            friendId: friend.id,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}