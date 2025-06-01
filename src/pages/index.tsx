import React, { useState, useEffect, useRef } from 'react';
import { Heart, Calendar, MapPin, Gift, Camera, Users, Star, Sparkles, Phone, Mail } from 'lucide-react';

const FloatingHearts = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <Heart
        key={i}
        className={`absolute text-pink-300/20 animate-bounce`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${3 + Math.random() * 2}s`
        }}
        size={20 + Math.random() * 20}
      />
    ))}
  </div>
);

const GoldParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: any[] = [];
    const particleCount = 100;
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      canvasWidth: number;
      canvasHeight: number;
      
      constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > this.canvasWidth) this.x = 0;
        if (this.x < 0) this.x = this.canvasWidth;
        if (this.y > this.canvasHeight) this.y = 0;
        if (this.y < 0) this.y = this.canvasHeight;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.3 }}
    />
  );
};

const CelebrationWebsite = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);
  const galleryRef = useRef(null);
  
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '1',
    message: ''
  });

  // Sample gallery images
  const galleryImages = [
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500',
    'https://images.unsplash.com/photo-1546484396-fb3fc6f95077?w=500',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=500',
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500'
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleRsvpSubmit = () => {
    if (!rsvpForm.name || !rsvpForm.email) {
      alert('Please fill in your name and email address.');
      return;
    }
    alert('Thank you for your RSVP! We\'ll be in touch soon.');
    setRsvpForm({ name: '', email: '', phone: '', guests: '1', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/10 via-transparent to-transparent opacity-30"></div>
        </div>
        
        <GoldParticles />
        
        <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="mb-16 space-y-12">
            {/* Main Title */}
            <div className="relative inline-block animate-fade-in">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] opacity-30 blur-xl"></div>
              <h1 className="relative">
                <span className="block text-[120px] md:text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] leading-none font-serif">
                  40
                </span>
                <span className="block text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700]/90 to-[#FFA500]/90 mt-4 font-serif">
                  Years
                </span>
              </h1>
            </div>
            
            {/* Subtitle */}
            <div className="space-y-6 animate-fade-in-delayed">
              <div className="h-px w-40 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
              <h2 className="text-3xl md:text-4xl font-light tracking-[0.2em] text-[#FFD700]/90 uppercase">
                Of Excellence
              </h2>
              <div className="h-px w-40 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
            </div>

            {/* Content */}
            <div className="space-y-12 animate-fade-in-delayed">
              <p className="text-xl md:text-2xl text-[#FFD700]/80 font-light tracking-wide max-w-3xl mx-auto">
                Join us in celebrating a remarkable journey of love, wisdom, and cherished moments
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="group flex items-center gap-3 bg-black/50 backdrop-blur-lg px-8 py-4 rounded-full border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-500">
                  <Calendar className="text-[#FFD700] transition-transform group-hover:scale-110 duration-300" size={24} />
                  <span className="text-lg font-light text-[#FFD700]/90 tracking-wider">December 2024</span>
                </div>
                <div className="group flex items-center gap-3 bg-black/50 backdrop-blur-lg px-8 py-4 rounded-full border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-all duration-500">
                  <MapPin className="text-[#FFD700] transition-transform group-hover:scale-110 duration-300" size={24} />
                  <span className="text-lg font-light text-[#FFD700]/90 tracking-wider">Lagos, Nigeria</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="#rsvp"
                  className="group relative px-10 py-5 overflow-hidden rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black transform hover:scale-105 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <span className="relative z-10 text-lg font-medium tracking-wider">RSVP Now</span>
                </a>
                <a
                  href="#gallery"
                  className="group px-10 py-5 rounded-full text-lg font-medium tracking-wider text-[#FFD700] border border-[#FFD700]/30 hover:border-[#FFD700] transition-colors duration-500 transform hover:scale-105"
                >
                  View Gallery
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#FFD700]/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#FFD700] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/gold-texture.png')] opacity-5"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20 fade-in">
            <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] mb-8 font-serif">
              A Legacy of Love
            </h2>
            <div className="h-px w-40 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mb-8"></div>
            <p className="text-xl text-[#FFD700]/80 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
              Join us in celebrating four decades of cherished memories and fifteen years of beautiful companionship.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="group bg-black/40 backdrop-blur-lg p-10 rounded-3xl shadow-2xl hover:shadow-[#FFD700]/10 transition-all duration-500 border border-[#FFD700]/10 hover:border-[#FFD700]/30 fade-in">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] p-4 rounded-2xl mr-6 transform group-hover:scale-110 transition-transform duration-500">
                  <Star className="text-black" size={32} />
                </div>
                <h3 className="text-3xl font-bold text-[#FFD700]">40 Years of Grace</h3>
              </div>
              <p className="text-[#FFD700]/70 leading-relaxed text-lg font-light">
                Four decades of wisdom, joy, and countless beautiful moments. Our beloved celebrant has been a beacon of inspiration, touching lives with grace and warmth.
              </p>
            </div>
            
            <div className="group bg-black/40 backdrop-blur-lg p-10 rounded-3xl shadow-2xl hover:shadow-[#FFD700]/10 transition-all duration-500 border border-[#FFD700]/10 hover:border-[#FFD700]/30 fade-in">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] p-4 rounded-2xl mr-6 transform group-hover:scale-110 transition-transform duration-500">
                  <Heart className="text-black" size={32} />
                </div>
                <h3 className="text-3xl font-bold text-[#FFD700]">15 Years United</h3>
              </div>
              <p className="text-[#FFD700]/70 leading-relaxed text-lg font-light">
                A journey of love that has blossomed into something extraordinary. Fifteen years of partnership, growth, and creating beautiful memories together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} id="gallery" className="py-32 px-6 bg-[#0a0a0a] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD700]/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 fade-in">
            <Camera className="mx-auto text-[#FFD700] mb-6 transform hover:scale-110 transition-transform duration-500" size={48} />
            <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] mb-8 font-serif">
              Cherished Moments
            </h2>
            <div className="h-px w-40 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mb-8"></div>
            <p className="text-xl text-[#FFD700]/80 font-light tracking-wide">
              A glimpse into our journey of love and celebration
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-square overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-700 cursor-pointer fade-in"
              >
                <img
                  src={image}
                  alt={`Celebration Moment ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[#FFD700] text-lg font-medium tracking-wide">
                      Precious Memory #{index + 1}
                    </p>
                    <p className="text-[#FFD700]/70 font-light mt-2">
                      A moment frozen in time, forever cherished
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-32 px-6 bg-[#0a0a0a] relative">
        <div className="absolute inset-0 bg-[url('/gold-pattern.png')] opacity-5"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] mb-8 font-serif">
              Join Our Celebration
            </h2>
            <div className="h-px w-40 mx-auto bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mb-8"></div>
            <p className="text-xl text-[#FFD700]/80 font-light tracking-wide">
              Be part of this momentous occasion
            </p>
          </div>
          
          <div className="rsvp-form bg-black/40 backdrop-blur-lg rounded-3xl shadow-2xl p-10 md:p-16 border border-[#FFD700]/10 fade-in">
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[#FFD700] font-medium mb-3">Full Name *</label>
                  <input
                    type="text"
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({...rsvpForm, name: e.target.value})}
                    className="w-full px-6 py-4 rounded-xl border border-[#FFD700]/20 bg-black/50 text-[#FFD700] placeholder-[#FFD700]/30 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-[#FFD700] font-medium mb-3">Email *</label>
                  <input
                    type="email"
                    value={rsvpForm.email}
                    onChange={(e) => setRsvpForm({...rsvpForm, email: e.target.value})}
                    className="w-full px-6 py-4 rounded-xl border border-[#FFD700]/20 bg-black/50 text-[#FFD700] placeholder-[#FFD700]/30 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[#FFD700] font-medium mb-3">Phone Number</label>
                  <input
                    type="tel"
                    value={rsvpForm.phone}
                    onChange={(e) => setRsvpForm({...rsvpForm, phone: e.target.value})}
                    className="w-full px-6 py-4 rounded-xl border border-[#FFD700]/20 bg-black/50 text-[#FFD700] placeholder-[#FFD700]/30 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-300"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="block text-[#FFD700] font-medium mb-3">Number of Guests</label>
                  <select
                    value={rsvpForm.guests}
                    onChange={(e) => setRsvpForm({...rsvpForm, guests: e.target.value})}
                    className="w-full px-6 py-4 rounded-xl border border-[#FFD700]/20 bg-black/50 text-[#FFD700] focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-300"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5+">5+ Guests</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-[#FFD700] font-medium mb-3">Special Message</label>
                <textarea
                  value={rsvpForm.message}
                  onChange={(e) => setRsvpForm({...rsvpForm, message: e.target.value})}
                  rows={4}
                  className="w-full px-6 py-4 rounded-xl border border-[#FFD700]/20 bg-black/50 text-[#FFD700] placeholder-[#FFD700]/30 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20 transition-all duration-300"
                  placeholder="Share your wishes or any special requests..."
                />
              </div>
              
              <button
                onClick={handleRsvpSubmit}
                className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black py-5 px-8 rounded-xl text-lg font-bold hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-[#FFD700]/25"
              >
                Send RSVP
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] mb-12 font-serif fade-in">
            Get In Touch
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-black/40 backdrop-blur-lg p-10 rounded-3xl shadow-2xl hover:shadow-[#FFD700]/10 transition-all duration-500 border border-[#FFD700]/10 hover:border-[#FFD700]/30 fade-in">
              <Phone className="mx-auto text-[#FFD700] mb-6 transform group-hover:scale-110 transition-transform duration-500" size={32} />
              <h3 className="text-2xl font-bold text-[#FFD700] mb-4">Call Us</h3>
              <p className="text-[#FFD700]/70 font-light">+234 xxx xxx xxxx</p>
            </div>
            
            <div className="group bg-black/40 backdrop-blur-lg p-10 rounded-3xl shadow-2xl hover:shadow-[#FFD700]/10 transition-all duration-500 border border-[#FFD700]/10 hover:border-[#FFD700]/30 fade-in">
              <Mail className="mx-auto text-[#FFD700] mb-6 transform group-hover:scale-110 transition-transform duration-500" size={32} />
              <h3 className="text-2xl font-bold text-[#FFD700] mb-4">Email Us</h3>
              <p className="text-[#FFD700]/70 font-light">celebration@example.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-[#0a0a0a] border-t border-[#FFD700]/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center mb-8">
            <Heart className="text-[#FFD700] mr-3" size={24} />
            <span className="text-2xl font-bold text-[#FFD700]">40 & 15 Years Celebration</span>
            <Heart className="text-[#FFD700] ml-3" size={24} />
          </div>
          <p className="text-[#FFD700]/60 mb-4 font-light">
            Creating timeless memories in Lagos, Nigeria
          </p>
          <p className="text-[#FFD700]/40 text-sm">
            © 2024 - Crafted with love for a golden celebration
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CelebrationWebsite;