export default function Hero() {
  return (
    <section className="w-screen h-[55vh] ">
      <img
        src="src/assets/main1.avif"
        className="w-full max-w-full h-full object-cover brightness-75"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-4xl font-bold">Welcome to GreenDrop</h1>
        <p className="text-lg">Recycle today for a better tomorrow 🌱</p>
      </div>
    </section>
  );
}
