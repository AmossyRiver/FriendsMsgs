import { notFound } from "next/navigation";
import friends from "@/app/data/friends.json";

export const dynamicParams = true;

export default async function FriendPage({
                                             params,
                                         }: {
    params: Promise<{ friendId: string }>;
}) {
    const { friendId } = await params;

    const friend = friends.friends.find((f) => f.id === friendId);

    if (!friend) {
        notFound();
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl w-full border border-purple-600">
                <h1 className="text-4xl font-bold text-center mb-6 text-purple-400">
                    Hey {friend.name}! 👋
                </h1>

                <div className="mb-8">
                    <p className="text-lg text-gray-200 leading-relaxed mb-6">
                        {friend.message}
                    </p>
                </div>

                <div className="border-t border-purple-600 pt-8">
                    <h2 className="text-2xl font-bold mb-4 text-center text-purple-400">
                        🎵 Your Song Recommendation
                    </h2>
                    <div className="flex justify-center">
                        <iframe
                            style={{
                                borderRadius: "12px",
                            }}
                            src={`${friend.spotifyTrackUrl}?utm_source=generator`}
                            width="100%"
                            height="152"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}