export default function FarcasterEmbed() {
  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-purple-400 mb-4">Caster Card</h2>
      <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-gray-300 mb-3">Your Farcaster stats card</p>
          <div className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition">
            Generate Card
          </div>
        </div>
      </div>
      <p className="text-gray-400 mt-4 text-sm">
        Share this card on Farcaster to show your stats
      </p>
    </div>
  );
}
