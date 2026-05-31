"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FriendForm() {
    const [name, setName] = useState("");
    const [answer, setAnswer] = useState("");
    const [question, setQuestion] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        setQuestion("");
        setError("");

        if (newName.trim()) {
            try {
                const res = await fetch("/api/get-question", {
                    method: "POST",
                    body: JSON.stringify({ name: newName }),
                });
                const data = await res.json();
                if (data.question) {
                    setQuestion(data.question);
                }
            } catch {
                // Handle error silently
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, answer }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Verification failed");
                return;
            }

            router.push(`/friend/${data.friendId}`);
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <div>
                <label className="block text-sm font-medium mb-2 text-white">Your Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Example: River A"
                    className="w-full px-4 py-2 border border-purple-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                />
            </div>

            {question && (
                <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                        {question}
                    </label>
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Your answer"
                        className="w-full px-4 py-2 border border-purple-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                    />
                </div>
            )}

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
                type="submit"
                disabled={!question || loading}
                className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50"
            >
                {loading ? "Verifying..." : "Verify"}
            </button>
        </form>
    );
}