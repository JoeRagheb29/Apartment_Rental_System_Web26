import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";

function Slider({ slides }) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="hero-carousel">
      <div className="carousel-items-container">
        {slides.map((imgSrc, index) => (
          <div
            key={index}
            className="carousel-item-wrapper"
            style={{
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
            }}
          >
            <img
              src={imgSrc}
              alt={`Slide ${index + 1}`}
              className="hero-slide"
              style={{
                width: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
            {/* Overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35))',
                zIndex: 1,
              }}
            />
          </div>
        ))}
      </div>

      <div className="hero-content text-white text-center">
        <h1 className="fw-bold display-3">Find Your Dream Apartment</h1>

        <p className="lead mt-3 mb-4">
          Discover modern apartments in the best locations in Egypt
        </p>

        <button
          className="btn btn-lg px-4 py-2 hero-btn"
          onClick={() => navigate("/apartments")}
        >
          Browse Apartments
        </button>
      </div>

      <button className="carousel-control carousel-control-prev"
        onClick={handlePrevSlide}>
        <span className="carousel-control-icon">❮</span>
      </button>
      <button className="carousel-control carousel-control-next"
        onClick={handleNextSlide}>
        <span className="carousel-control-icon">❯</span>
      </button>

      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider;