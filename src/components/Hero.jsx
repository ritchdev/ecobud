export default function Hero() {
    return (
        <section className="w-screen h-[90vh]">
            <div className="h-full bg-[url(src/assets/hero.jpg)] bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center text-white text-center back p-[0px]">
                <h1 className="text-4xl font-bold pb-8">Welcome to GreenDrop</h1>
                <p className="text-lg">Recycle today for a better tomorrow 🌱</p>
            </div>

        </section>
    );
}
