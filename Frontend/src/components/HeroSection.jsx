import './HeroSection.css'

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Explora el Mundo de las
            <span className="highlight"> Bases de Datos</span>
          </h1>
          <p className="hero-subtitle">
            Descubre tutoriales, guías y las mejores prácticas en SQL, NoSQL y mucho más
          </p>
          <div className="hero-badges">
            <span className="badge sql">SQL</span>
            <span className="badge nosql">NoSQL</span>
            <span className="badge optimization">Optimización</span>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="/src/assets/images/central.svg" 
            alt="Database Central" 
            className="central-image"
          />
        </div>
      </div>
      <div className="hero-wave">
        <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,96L48,80C96,64,192,32,288,32C384,32,480,64,576,74.7C672,85,768,75,864,69.3C960,64,1056,64,1152,80L1200,96L1200,120L1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" 
                fill="#f5f5f5"/>
        </svg>
      </div>
    </section>
  )
}

export default HeroSection
