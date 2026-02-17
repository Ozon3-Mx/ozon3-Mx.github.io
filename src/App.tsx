import { useState, useEffect, useRef } from 'react'
import { 
  Wind, 
  Droplets, 
  Leaf, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Menu, 
  X,
  ArrowRight,
  Star,
  Shield,
  Clock,
  Zap,
  MessageCircle,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import './App.css'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1, rootMargin: '-50px' }
    )

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const openWhatsApp = (message: string = '') => {
    const phoneNumber = '525569123847' // Replace with actual number
    const encodedMessage = encodeURIComponent(message || 'Hola, me interesa cotizar un generador de ozono Ozon3')
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
  }

  const beneficios = [
    {
      icon: <Wind className="w-10 h-10 text-[#00C2B5]" />,
      titulo: 'Adiós Malos Olores',
      descripcion: 'Elimina olores persistentes de tabaco, mascotas, cocina y humedad de forma natural y efectiva.',
      color: 'from-[#E0F7F5] to-[#F5FFFE]'
    },
    {
      icon: <Droplets className="w-10 h-10 text-[#00C2B5]" />,
      titulo: 'Desinfección de Alimentos',
      descripcion: 'Lava frutas y verduras con agua ozonizada para eliminar pesticidas, bacterias y contaminantes.',
      color: 'from-[#E8F8F6] to-[#F5FFFE]'
    },
    {
      icon: <Leaf className="w-10 h-10 text-[#00C2B5]" />,
      titulo: 'Menos Químicos',
      descripcion: 'Reduce drásticamente el uso de cloro y productos químicos en tu hogar. 100% ecológico.',
      color: 'from-[#E0F7F5] to-[#F0FAF9]'
    }
  ]

  const productos = [
    {
      id: 'basic',
      nombre: 'Ozon3 Basic',
      potencia: '10W',
      descripcion: 'El esencial para autos y closets. Control manual, 1000mg/h. Incluye kit para agua.',
      precio: '$499',
      caracteristicas: ['1000 mg/h', 'Control Manual', 'Kit Agua Incluido', 'Portátil'],
      imagen: '/product-basic.png',
      popular: false
    },
    {
      id: 'timer',
      nombre: 'Ozon3 Timer Pro',
      potencia: '20W',
      descripcion: 'Con Temporizador Inteligente. Programa tus ciclos de limpieza y despreocúpate. Ideal para habitaciones y desinfeccion de verduras.',
      precio: '$799',
      caracteristicas: ['Temporizador Digital', 'Programable', '2000 mg/h', 'Pantalla LED'],
      imagen: '/product-timer.png',
      popular: true
    },
    {
      id: 'hydro',
      nombre: 'Ozon3 HydroFlow',
      potencia: '25W',
      descripcion: 'Para Flujo de Agua. Conexión directa a lavadoras y mangueras. Lava ropa en frío y desinfecta pisos.',
      precio: '$7199',
      caracteristicas: ['Flujo Continuo', 'Conexión Directa', '3000 mg/h', 'Uso Profesional'],
      imagen: '/product-hydro.png',
      popular: false
    }
  ]

  const seguridadItems = [
    'Úsalo siempre en espacios vacíos',
    'Ventila después de cada ciclo',
    'No mezclar con aromatizantes',
    'Mantén alejado del alcance de niños',
    'No respires directamente el ozono'
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-soft' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <div className="w-10 h-10 bg-gradient-teal rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-lg">O₃</span>
              </div>
              <span className="text-2xl font-bold text-[#1A2B2A]">Ozon3</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('beneficios')} className="text-[#5A6B6A] hover:text-[#00C2B5] font-medium transition-colors duration-300">Beneficios</button>
              <button onClick={() => scrollToSection('productos')} className="text-[#5A6B6A] hover:text-[#00C2B5] font-medium transition-colors duration-300">Productos</button>
              <button onClick={() => scrollToSection('seguridad')} className="text-[#5A6B6A] hover:text-[#00C2B5] font-medium transition-colors duration-300">Seguridad</button>
              <button onClick={() => scrollToSection('contacto')} className="text-[#5A6B6A] hover:text-[#00C2B5] font-medium transition-colors duration-300">Contacto</button>
              <Button 
                onClick={() => openWhatsApp()}
                className="bg-[#00C2B5] hover:bg-[#00A99D] text-white px-6 rounded-full font-medium transition-all duration-300 hover:shadow-glow"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Cotizar en WhatsApp
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-[#1A2B2A]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-[#E0F7F5]">
            <div className="px-4 py-6 space-y-4">
              <button onClick={() => scrollToSection('beneficios')} className="block w-full text-left py-3 text-[#5A6B6A] font-medium">Beneficios</button>
              <button onClick={() => scrollToSection('productos')} className="block w-full text-left py-3 text-[#5A6B6A] font-medium">Productos</button>
              <button onClick={() => scrollToSection('seguridad')} className="block w-full text-left py-3 text-[#5A6B6A] font-medium">Seguridad</button>
              <button onClick={() => scrollToSection('contacto')} className="block w-full text-left py-3 text-[#5A6B6A] font-medium">Contacto</button>
              <Button 
                onClick={() => openWhatsApp()}
                className="w-full bg-[#00C2B5] hover:bg-[#00A99D] text-white rounded-full"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Cotizar en WhatsApp
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative min-h-screen pt-20 bg-gradient-radial overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-10 w-96 h-96 bg-[#00C2B5]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#00C2B5]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#E0F7F5]/50 to-transparent rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)]">
            {/* Text Content */}
            <div className="text-center lg:text-left pt-12 lg:pt-0">
              <div className="inline-flex items-center gap-2 bg-[#E0F7F5] text-[#00A99D] px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
                <Star className="w-4 h-4 fill-[#00C2B5]" />
                Tecnología de Punta en Purificación
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A2B2A] leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Purifica tu Espacio con{' '}
                <span className="text-gradient">Tecnología Ozon3</span>
              </h1>
              
              <p className="text-lg text-[#5A6B6A] mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Elimina olores, desinfecta agua, verduras y superficies sin químicos. Tecnología de ozono inteligente para tu hogar y negocio.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <Button 
                  onClick={() => scrollToSection('productos')}
                  className="bg-[#00C2B5] hover:bg-[#00A99D] text-white px-8 py-6 text-base font-semibold rounded-full shadow-glow transition-all duration-300 hover:scale-105"
                >
                  Ver Modelos
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  onClick={() => scrollToSection('beneficios')}
                  variant="outline"
                  className="border-2 border-[#00C2B5] text-[#00C2B5] hover:bg-[#E0F7F5] px-8 py-6 text-base font-semibold rounded-full transition-all duration-300"
                >
                  Saber Más
                </Button>
              </div>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.4s' }}>
                {[
                  { icon: <Leaf className="w-4 h-4" />, text: '100% Natural' },
                  { icon: <Shield className="w-4 h-4" />, text: 'Sin Químicos' },
                  { icon: <Zap className="w-4 h-4" />, text: 'Ecológico' }
                ].map((badge, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft border border-[#E0F7F5]"
                  >
                    <span className="text-[#00C2B5]">{badge.icon}</span>
                    <span className="text-sm font-medium text-[#1A2B2A]">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Image */}
            <div className="relative flex items-center justify-center">
              <div className="relative z-10 float-animation">
                <img 
                  src="/hero-product.png" 
                  alt="Generador de Ozono Ozon3" 
                  className="w-full max-w-lg h-auto object-contain drop-shadow-2xl"
                />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute bottom-10 left-0 bg-white rounded-2xl shadow-xl p-4 z-20 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-teal rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1A2B2A] text-lg">99.9%</p>
                    <p className="text-sm text-[#5A6B6A]">Eficacia</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-20 right-0 bg-white rounded-2xl shadow-xl p-4 z-20 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#E0F7F5] rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#00C2B5]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1A2B2A] text-lg">Desinfección</p>
                    <p className="text-sm text-[#5A6B6A]">Ciclo Rápido</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section id="beneficios" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('beneficios') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge className="mb-4 bg-[#E0F7F5] text-[#00A99D] hover:bg-[#E0F7F5] px-4 py-1.5 text-sm font-medium">
              Beneficios
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#1A2B2A] mb-4">
              Tres Soluciones en Un Solo <span className="text-gradient">Dispositivo</span>
            </h2>
            <p className="text-lg text-[#5A6B6A] max-w-2xl mx-auto">
              Nuestros generadores de ozono ofrecen múltiples aplicaciones para mantener tu hogar limpio, seguro y saludable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {beneficios.map((beneficio, index) => (
              <Card 
                key={index} 
                className={`group overflow-hidden hover-lift border-0 shadow-soft bg-gradient-to-br ${beneficio.color} transition-all duration-700 ${visibleSections.has('beneficios') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-soft group-hover:shadow-glow transition-shadow duration-300">
                    {beneficio.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#1A2B2A] mb-3">{beneficio.titulo}</h3>
                  <p className="text-[#5A6B6A] leading-relaxed">{beneficio.descripcion}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Section */}
      <section id="productos" className="py-24 bg-[#F5F7FA] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('productos') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge className="mb-4 bg-[#E0F7F5] text-[#00A99D] hover:bg-[#E0F7F5] px-4 py-1.5 text-sm font-medium">
              Catálogo
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#1A2B2A] mb-4">
              Elige tu <span className="text-gradient">Ozon3 Ideal</span>
            </h2>
            <p className="text-lg text-[#5A6B6A] max-w-2xl mx-auto">
              Tenemos el modelo perfecto para tus necesidades, desde uso doméstico hasta profesional.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {productos.map((producto, index) => (
              <Card 
                key={index} 
                className={`group relative overflow-hidden hover-lift border-0 shadow-soft bg-white transition-all duration-700 ${producto.popular ? 'ring-2 ring-[#00C2B5] shadow-glow' : ''} ${visibleSections.has('productos') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {producto.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-teal text-white px-3 py-1">
                      <Star className="w-3 h-3 mr-1 fill-white" />
                      Más Vendido
                    </Badge>
                  </div>
                )}
                
                <div className="h-56 bg-gradient-to-br from-[#F5FFFE] to-[#E0F7F5] flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-500">
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    className="max-h-full max-w-full object-contain drop-shadow-lg"
                  />
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-[#1A2B2A]">{producto.nombre}</h3>
                    <span className="text-sm text-[#00C2B5] font-medium bg-[#E0F7F5] px-2 py-1 rounded">{producto.potencia}</span>
                  </div>
                  
                  <p className="text-[#5A6B6A] text-sm mb-4 min-h-[40px]">{producto.descripcion}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {producto.caracteristicas.map((caracteristica, i) => (
                      <span key={i} className="text-xs text-[#5A6B6A] bg-[#F5F7FA] px-2 py-1 rounded-full">
                        {caracteristica}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[#E0F7F5]">
                    <div>
                      <span className="text-2xl font-bold text-[#00C2B5]">{producto.precio}</span>
                      <span className="text-sm text-[#5A6B6A]"> MXN</span>
                    </div>
                    <Button 
                      onClick={() => openWhatsApp(`Hola, me interesa cotizar el ${producto.nombre}`)}
                      className="bg-[#00C2B5] hover:bg-[#00A99D] text-white rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:shadow-glow"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Cotizar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seguridad Section */}
      <section id="seguridad" className="py-24 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/safety-bg.jpg" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/80"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${visibleSections.has('seguridad') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div>
              <Badge className="mb-4 bg-[#E0F7F5] text-[#00A99D] hover:bg-[#E0F7F5] px-4 py-1.5 text-sm font-medium">
                Seguridad
              </Badge>
              <h2 className="text-3xl lg:text-5xl font-bold text-[#1A2B2A] mb-6">
                Uso Responsable y <span className="text-gradient">Seguro</span>
              </h2>
              <p className="text-lg text-[#5A6B6A] mb-8">
                El ozono es un poderoso oxidante natural. Sigue estas recomendaciones para un uso seguro y efectivo.
              </p>
              
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-soft border border-white/50">
                <ul className="space-y-4">
                  {seguridadItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gradient-teal rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[#1A2B2A] font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 pt-6 border-t border-[#E0F7F5] flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#E0F7F5] rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#00C2B5]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#5A6B6A]">Incluye</p>
                    <p className="font-semibold text-[#1A2B2A]">Manual de Usuario Detallado</p>
                  </div>
                </div>
              </div>
            </div>
            
            
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-teal relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            ¿Listo para Respirar Aire Puro?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Únete a miles de familias que ya disfrutan de un ambiente más limpio, seguro y saludable con Ozon3.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => openWhatsApp()}
              className="bg-white text-[#00C2B5] hover:bg-white/90 px-8 py-6 text-base font-semibold rounded-full shadow-xl transition-all duration-300 hover:scale-105 sonar-pulse"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Cotizar vía WhatsApp
            </Button>
            <Button 
              onClick={() => window.open('mailto:info@ozon3.com', '_blank')}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-base font-semibold rounded-full transition-all duration-300"
            >
              <Mail className="w-5 h-5 mr-2" />
              Envíanos un Email
            </Button>
          </div>
        </div>
      </section>

      {/* Contacto & Footer */}
      <section id="contacto" className="bg-[#1A2B2A] text-white">
        {/* Contact Info */}
        <div className="py-16 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#00C2B5]/20 rounded-2xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#00C2B5]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Teléfono</p>
                  <p className="font-semibold">+52 556 912 3847</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#00C2B5]/20 rounded-2xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#00C2B5]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <p className="font-semibold">info@ozon3.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#00C2B5]/20 rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-[#00C2B5]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">WhatsApp</p>
                  <p className="font-semibold">+52 123 456 7890</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-teal rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">O₃</span>
                  </div>
                  <span className="text-2xl font-bold">Ozon3</span>
                </div>
                <p className="text-white/60 max-w-sm mb-6">
                  Líderes en tecnología de ozono para hogares y negocios. Purificamos tu mundo de forma natural y efectiva.
                </p>
                <div className="flex gap-4">
                  {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                    <a 
                      key={social} 
                      href="#" 
                      className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#00C2B5] transition-colors duration-300"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
                <ul className="space-y-3 text-white/60">
                  <li><button onClick={() => scrollToSection('beneficios')} className="hover:text-[#00C2B5] transition-colors">Beneficios</button></li>
                  <li><button onClick={() => scrollToSection('productos')} className="hover:text-[#00C2B5] transition-colors">Productos</button></li>
                  <li><button onClick={() => scrollToSection('seguridad')} className="hover:text-[#00C2B5] transition-colors">Seguridad</button></li>
                  <li><button onClick={() => scrollToSection('contacto')} className="hover:text-[#00C2B5] transition-colors">Contacto</button></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-3 text-white/60">
                  <li><a href="#" className="hover:text-[#00C2B5] transition-colors">Política de Privacidad</a></li>
                  <li><a href="#" className="hover:text-[#00C2B5] transition-colors">Términos de Uso</a></li>
                  <li><a href="#" className="hover:text-[#00C2B5] transition-colors">Garantía</a></li>
                  <li><a href="#" className="hover:text-[#00C2B5] transition-colors">Envíos</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/40 text-sm">© 2024 Ozon3. Todos los derechos reservados.</p>
              <p className="text-white/40 text-sm flex items-center gap-2">
                Hecho con <span className="text-[#00C2B5]">♥</span> para un mundo más limpio
              </p>
            </div>
          </div>
        </footer>
      </section>

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => openWhatsApp()}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-xl z-50 transition-all duration-300 hover:scale-110 sonar-pulse"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </button>
    </div>
  )
}

export default App
