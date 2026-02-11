export function Home() {
  return (
    <div 
      className="relative min-h-screen flex flex-col items-center justify-center text-center p-8 text-white"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1470&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Contenido */}
      <div className="relative z-10">
        <h1 className="text-red-600 text-5xl font-extrabold mb-4 drop-shadow-lg">
          🎬 Bienvenido a MovieLand
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mb-8">
          Descubre reseñas, noticias y recomendaciones de tus películas favoritas. 
          Vive la magia del cine desde la comodidad de tu pantalla.
        </p>
      </div>
    </div>
  )
}
