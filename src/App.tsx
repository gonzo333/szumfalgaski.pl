/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Waves, 
  Dumbbell, 
  Thermometer, 
  Car, 
  Wifi, 
  Tv, 
  Coffee, 
  Wind, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronLeft, 
  ChevronRight,
  Star,
  Utensils,
  Bed,
  Bath,
  Maximize,
  Gamepad2,
  Trophy,
  Baby,
  Dog,
  Facebook
} from 'lucide-react';

// Images based on the user's provided photos
const getImageUrl = (name: string) => new URL(`./${name}`, import.meta.url).href;

const sliderImages = [
  {
    url: getImageUrl('20.jpg'),
    title: "Szum Fal",
    desc: "Luksusowy wypoczynek w kompleksie Let's Sea w Gąskach, zaledwie 50m od plaży."
  },
  {
    url: getImageUrl('11.jpg'),
    title: "Komfortowa Sypialnia",
    desc: "Zasypiaj przy kojącym szumie fal w elegancko urządzonym wnętrzu."
  },
  {
    url: getImageUrl('34.jpg'),
    title: "Strefa SPA & Wellness",
    desc: "Bezpłatny dostęp do basenu, sauny i jacuzzi dla naszych gości."
  },
  {
    url: getImageUrl('23.jpg'),
    title: "Widok na Morze",
    desc: "Prywatny taras z widokiem na Bałtyk – idealne miejsce na poranną kawę."
  }
];

const galleryImages = [
  { url: getImageUrl('1.jpg'), alt: "Salon - widok główny" },
  { url: getImageUrl('2.jpg'), alt: "Salon i strefa wypoczynkowa" },
  { url: getImageUrl('3.jpg'), alt: "Jadalnia" },
  { url: getImageUrl('4.jpg'), alt: "Salon z aneksem" },
  { url: getImageUrl('5.jpg'), alt: "Sypialnia - detale" },
  { url: getImageUrl('6.jpg'), alt: "Aneks kuchenny" },
  { url: getImageUrl('7.jpg'), alt: "Łazienka" },
  { url: getImageUrl('8.jpg'), alt: "Sypialnia - łóżko małżeńskie" },
  { url: getImageUrl('9.jpg'), alt: "Budynek kompleksu" },
  { url: getImageUrl('23.jpg'), alt: "Wejście do kompleksu" },
  { url: getImageUrl('11.jpg'), alt: "Architektura obiektu" },
  { url: getImageUrl('12.jpg'), alt: "Strefa Jacuzzi" },
  { url: getImageUrl('13.jpg'), alt: "Basen kryty" },
  { url: getImageUrl('14.jpg'), alt: "Sauna" },
  { url: getImageUrl('15.jpg'), alt: "Siłownia / Fitness" },
  { url: getImageUrl('16.jpg'), alt: "Hala sportowa" },
  { url: getImageUrl('17.jpg'), alt: "Plaża" },
  { url: getImageUrl('24.jpg'), alt: "Zejście na plażę" },
  { url: getImageUrl('25.jpg'), alt: "Widok okolicy" },
  { url: getImageUrl('20.jpg'), alt: "Okolica i zieleń" },
];

const amenities = [
  { icon: <Waves className="w-6 h-6" />, label: "Basen & Jacuzzi" },
  { icon: <Thermometer className="w-6 h-6" />, label: "Sauna" },
  { icon: <Dumbbell className="w-6 h-6" />, label: "Siłownia" },
  { icon: <Trophy className="w-6 h-6" />, label: "Kort Tenisowy" },
  { icon: <Gamepad2 className="w-6 h-6" />, label: "Pokój Gier" },
  { icon: <Baby className="w-6 h-6" />, label: "Plac Zabaw" },
  { icon: <Car className="w-6 h-6" />, label: "Garaż Podziemny" },
  { icon: <Dog className="w-6 h-6" />, label: "Zwierzęta Mile Widziane" },
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Imię jest wymagane';
    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Niepoprawny format email';
    }
    if (!formData.message.trim()) newErrors.message = 'Wiadomość jest wymagana';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    setStatus('sending');
    
    try {
      // Zmieniamy na FormSubmit.co - często bardziej niezawodne przy pierwszym uruchomieniu
      const response = await fetch('https://formsubmit.co/ajax/szumfalgaski@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify({
          Imię: formData.name,
          Email: formData.email,
          Wiadomość: formData.message,
          _subject: "Nowa wiadomość ze strony Szum Fal"
        }),
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Błąd serwera');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 bg-white shadow-sm py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Placeholder for the logo image */}
            <div className="relative w-24 h-24 border-2 border-stone-900 flex items-center justify-center overflow-hidden bg-white">
              <img 
                src={getImageUrl('logo_transp.png')} 
                alt="Szum Fal Logo" 
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="text-stone-900 font-bold">SF</div>';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl leading-none tracking-tight text-stone-900">Szum Fal</span>
              <span className="text-[8px] uppercase tracking-[0.2em] mt-1 text-stone-500">Apartament Premium • Gąski</span>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-stone-600">
            <a href="#o-nas" className="hover:text-stone-900 transition-colors">O nas</a>
            <a href="#udogodnienia" className="hover:text-stone-900 transition-colors">Udogodnienia</a>
            <a href="#galeria" className="hover:text-stone-900 transition-colors">Galeria</a>
            <a href="#mapa" className="hover:text-stone-900 transition-colors">Mapa</a>
            <a href="#kontakt" className="hover:text-stone-900 transition-colors">Kontakt</a>
          </div>
          <a 
            href="#kontakt" 
            className="bg-stone-900 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-stone-800 transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            Zarezerwuj
          </a>
        </div>
      </nav>

      {/* Hero Slider */}
      <section className="relative h-[calc(100vh-88px)] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src={sliderImages[currentSlide].url} 
              alt={sliderImages[currentSlide].title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white font-serif text-5xl md:text-7xl mb-4"
              >
                {sliderImages[currentSlide].title}
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-white/90 text-lg md:text-xl max-w-2xl font-light mb-8"
              >
                {sliderImages[currentSlide].desc}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <a 
                  href="#kontakt" 
                  className="bg-white text-stone-900 px-12 py-5 rounded-full text-xl font-bold hover:bg-stone-100 transition-all hover:scale-105 active:scale-95 shadow-2xl inline-block"
                >
                  Zarezerwuj teraz
                </a>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all">
          <ChevronRight className="w-8 h-8" />
        </button>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {sliderImages.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${currentSlide === i ? 'bg-white w-8' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="o-nas" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-stone-400 font-medium tracking-[0.2em] uppercase text-sm mb-4 block">Szum Fal</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Rodzinne wakacje przy samej plaży</h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                Zapraszamy do apartamentu Szum Fal, położonego w nowoczesnym kompleksie Let’s Sea w Gąskach – miejscu stworzonym z myślą o tych, którzy pragną wypoczynku blisko natury, ale z pełnym komfortem i dostępem do udogodnień na najwyższym poziomie.
              </p>
              <p className="text-stone-600 leading-relaxed mb-8">
                Apartament pomieści do 5 osób, oferując przestrzeń idealną zarówno dla rodzin z dziećmi, jak i par czy grup przyjaciół. Znajduje się zaledwie kilkadziesiąt metrów od kameralnej plaży, dzięki czemu każdego ranka możesz budzić się przy szumie fal.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-900">
                    <Maximize className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 uppercase font-bold">Pojemność</p>
                    <p className="font-medium">Do 5 osób</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-900">
                    <Bed className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 uppercase font-bold">Sypialnie</p>
                    <p className="font-medium">1 + Salon</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src={getImageUrl('1.jpg')} 
                alt="Wnętrze apartamentu" 
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -left-8 bg-stone-900 text-white p-8 rounded-2xl hidden lg:block">
                <p className="text-3xl font-serif mb-1">50m</p>
                <p className="text-stone-400 text-sm uppercase tracking-wider">Do plaży</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section id="udogodnienia" className="py-24 bg-stone-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Luksusowa Strefa Relaksu</h2>
            <p className="text-stone-500 max-w-xl mx-auto">Goście apartamentu Szum Fal mają bezpłatny dostęp do pełnej infrastruktury kompleksu Let's Sea.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {amenities.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center group"
              >
                <div className="text-stone-400 group-hover:text-stone-900 transition-colors mb-4">
                  {item.icon}
                </div>
                <span className="font-medium text-stone-700">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-serif mb-2">Galeria</h2>
              <p className="text-stone-500">Autentyczne zdjęcia apartamentu i jego otoczenia.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.1 }}
                className="aspect-square overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all"
              >
                <img 
                  src={img.url} 
                  alt={img.alt} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="mapa" className="py-24 bg-stone-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Lokalizacja</h2>
            <p className="text-stone-500">Znajdziesz nas w samym sercu Gąsek, w kompleksie Let's Sea Baltic Park.</p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px] relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2331.4064639908606!2d15.886368299999999!3d54.243692599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47003b97818d5f5f%3A0xb464c986d9d3c74!2sSzum%20Fal%20Apartament%20G%C4%85ski!5e0!3m2!1spl!2spl!4v1773401334605!5m2!1spl!2spl" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa Szum Fal Gąski"
            ></iframe>
            <div className="absolute bottom-6 left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
              <h3 className="font-serif text-lg mb-2">Szum Fal</h3>
              <p className="text-sm text-stone-500 mb-4">ul. Nadbrzeżna 52E, Gąski</p>
              <a 
                href="https://maps.app.goo.gl/JGEJq1Vx8TeaVEan9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-stone-900 font-bold text-sm flex items-center gap-2 hover:underline"
              >
                Otwórz w Google Maps <Maximize className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-24 bg-stone-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-serif mb-8">Zarezerwuj swój pobyt</h2>
              <p className="text-stone-400 mb-6 leading-relaxed">
                Rezerwacji dokonujemy bezpośrednio poprzez kontakt mailowy lub telefoniczny. Skontaktuj się z nami, aby sprawdzić dostępność terminów.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-stone-500 text-xs uppercase font-bold">Lokalizacja</p>
                    <p>ul. Nadbrzeżna 52E, Gąski</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-stone-500 text-xs uppercase font-bold">Telefon</p>
                    <p>573 032 343</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-stone-500 text-xs uppercase font-bold">Email</p>
                    <p>szumfalgaski@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-stone-500 text-xs uppercase font-bold">Facebook</p>
                    <a 
                      href="https://www.facebook.com/profile.php?id=61583768026089" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      facebook.com/szumfal
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 text-stone-900">
              <h3 className="text-xl font-serif mb-6">Wyślij zapytanie</h3>
              
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-white border-2 border-stone-900 flex items-center justify-center mx-auto mb-6 overflow-hidden">
                    <img 
                      src={getImageUrl('logo_transp.png')} 
                      alt="Szum Fal Logo" 
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <h4 className="text-2xl font-serif mb-2">Wiadomość wysłana!</h4>
                  <p className="text-stone-500">Dziękujemy za kontakt. Ekipa SZUM FAL odezwie się do Ciebie najszybciej jak to możliwe.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-stone-900 font-bold hover:underline"
                  >
                    Wyślij kolejną wiadomość
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-stone-400">Imię</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg bg-stone-50 border-none focus:ring-2 focus:ring-stone-900 transition-all ${errors.name ? 'ring-2 ring-red-500' : ''}`} 
                        placeholder="Twoje imię"
                      />
                      {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-stone-400">Email</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-lg bg-stone-50 border-none focus:ring-2 focus:ring-stone-900 transition-all ${errors.email ? 'ring-2 ring-red-500' : ''}`} 
                        placeholder="Twój adres email"
                      />
                      {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-stone-400">Wiadomość / Termin</label>
                    <textarea 
                      rows={4} 
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg bg-stone-50 border-none focus:ring-2 focus:ring-stone-900 transition-all ${errors.message ? 'ring-2 ring-red-500' : ''}`} 
                      placeholder="Podaj interesujący Cię termin pobytu..."
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.message}</p>}
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-stone-900 text-white py-6 rounded-lg font-bold text-xl hover:bg-stone-800 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Wysyłanie...
                      </>
                    ) : 'Wyślij zapytanie'}
                  </button>
                  
                  {status === 'error' && (
                    <p className="text-red-500 text-center text-sm font-medium">Wystąpił błąd. Spróbuj ponownie później.</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-stone-950 text-stone-500 text-sm border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 border border-white/20 flex items-center justify-center bg-white">
              <img 
                src={getImageUrl('logo_transp.png')} 
                alt="Szum Fal Logo" 
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div class="text-white font-bold text-xs">SF</div>';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-white leading-none tracking-tight">Szum Fal</span>
              <span className="text-[6px] uppercase tracking-[0.2em] mt-1 text-stone-500">Apartament Premium • Gąski</span>
            </div>
          </div>
          <p>© 2026 Szum Fal - Apartament Premium. Wszystkie prawa zastrzeżone.</p>
          <div className="flex gap-6 items-center">
            <a 
              href="https://www.facebook.com/profile.php?id=61583768026089" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              title="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a href="mailto:szumfalgaski@gmail.com" className="hover:text-white transition-colors">szumfalgaski@gmail.com</a>
            <a href="#" className="hover:text-white transition-colors">Polityka prywatności</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
