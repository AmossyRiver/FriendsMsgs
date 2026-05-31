import FriendForm from "./components/FriendForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full border border-purple-600">
        <h1 className="text-3xl font-bold text-center mb-2 text-purple-400">
          Friend Messages
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Enter your name and answer the question to see your personalized message
        </p>
        <FriendForm />
      </div>
    </div>
  );
}