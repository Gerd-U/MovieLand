export function Home() {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section con video de fondo o imagen animada */}
      <div 
        className="relative h-screen flex flex-col items-center justify-center text-center p-8 text-white"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1470&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', // Efecto parallax
        }}
      >
        {/* Overlay oscuro con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black"></div>

        {/* Contenido */}
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-red-600 text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-2xl animate-fade-in">
            🎬 Bienvenido a MovieLand
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-8 mx-auto leading-relaxed">
            Descubre reseñas, noticias y recomendaciones de tus películas favoritas. 
            Vive la magia del cine desde la comodidad de tu pantalla.
          </p>
          
          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/movies" 
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg text-lg shadow-xl shadow-red-600/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-red-600/70"
            >
              Explorar Películas
            </a>
            <a 
              href="/profile" 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105"
            >
              Ver Perfil
            </a>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 animate-bounce">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Sección de características */}
      <div className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            ¿Por qué <span className="text-red-600">MovieLand</span>?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800 p-8 rounded-xl border border-red-600/20 hover:border-red-600 transition-all hover:scale-105 hover:shadow-xl hover:shadow-red-600/20">
              <div className="text-5xl mb-4">🎥</div>
              <h3 className="text-2xl font-bold text-red-600 mb-3">Amplio Catálogo</h3>
              <p className="text-gray-400">
                Miles de películas de todos los géneros y épocas. Desde clásicos hasta estrenos.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800 p-8 rounded-xl border border-red-600/20 hover:border-red-600 transition-all hover:scale-105 hover:shadow-xl hover:shadow-red-600/20">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold text-red-600 mb-3">Reseñas Reales</h3>
              <p className="text-gray-400">
                Calificaciones y reseñas de usuarios reales. Encuentra tu próxima película favorita.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800 p-8 rounded-xl border border-red-600/20 hover:border-red-600 transition-all hover:scale-105 hover:shadow-xl hover:shadow-red-600/20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-red-600 mb-3">Búsqueda Fácil</h3>
              <p className="text-gray-400">
                Encuentra cualquier película rápidamente con nuestro potente buscador.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de estadísticas */}
      <div className="py-16 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">1000+</div>
            <div className="text-gray-400">Películas</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">500+</div>
            <div className="text-gray-400">Usuarios</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">4.8/5</div>
            <div className="text-gray-400">Rating Promedio</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">24/7</div>
            <div className="text-gray-400">Disponible</div>
          </div>
        </div>
      </div>

      {/* Call to action final */}
      <div className="py-20 px-4 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para empezar?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Explora nuestro catálogo completo de películas y descubre tu próxima favorita.
          </p>
          <a 
            href="/movies" 
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-12 py-5 rounded-lg text-xl shadow-xl shadow-red-600/50 transition-all hover:scale-105"
          >
            Ver Todas las Películas →
          </a>
        </div>
      </div>
    </div>
  );
}