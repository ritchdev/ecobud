export default function Hero() {
    return (
        <section className="w-screen h-[90vh] overflow-y-hidden relative">
            <div className="h-full bg-[url(src/assets/hero.jpg)] bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center text-white text-center back p-[0px]">
             <div className="absolute inset-0 bg-black/50 z-0"></div>
                <span className="flex">
                    <h1 className="text-4xl font-bold pb-8 z-1">Welcome to</h1>
                    <img src="src/assets/wordfont-logo.png" alt="EcoBud" className="h-11 ml-3 translate-y-[8px] brightness-140 z-1"/>
                </span>
                <p className="text-lg z-1">Recycle today for a better tomorrow 🌱</p>
            </div>

        </section>
    );
}
