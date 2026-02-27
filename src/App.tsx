// ============================================================
// App.tsx — Landing Page Ozon3
// ============================================================
// ESTRUCTURA GENERAL DE LA PÁGINA:
//  1. Imports           → librerías y componentes externos
//  2. Datos Globales    → constantes editables (contacto, productos, etc.)
//  3. ImageCarousel     → componente auxiliar del carrusel
//  4. App               → componente principal que renderiza toda la página
//     ├── Navbar        → barra de navegación fija
//     ├── Hero          → sección de bienvenida
//     ├── Beneficios    → 3 tarjetas de usos del producto
//     ├── Productos     → catálogo de 3 modelos
//     ├── Seguridad     → recomendaciones de uso + carrusel
//     ├── CTA           → llamada a la acción final
//     └── Footer        → contacto, links y derechos
// ============================================================

import { useState, useEffect, useRef } from 'react'
// useState  → para manejar variables que cambian (ej: menú abierto/cerrado)
// useEffect → para ejecutar código en momentos específicos (ej: al cargar, al scrollear)
// useRef    → para referenciar elementos del DOM sin re-renderizar

import {
  Wind,          // ícono de viento     → beneficio olores
  Droplets,      // ícono de gotas      → beneficio alimentos
  Leaf,          // ícono de hoja       → beneficio ecológico
  CheckCircle2,  // ícono de check      → lista de seguridad
  //Phone,         // ícono de teléfono   → contacto
  Mail,          // ícono de email      → contacto
  Menu,          // ícono hamburguesa   → abrir menú móvil
  X,             // ícono de X          → cerrar menú móvil
  ArrowRight,    // ícono de flecha     → botón "Ver Modelos"
  Star,          // ícono de estrella   → badge "Más Vendido"
  Shield,        // ícono de escudo     → seguridad / certificaciones
  Clock,         // ícono de reloj      → stat flotante en hero
  Zap,           // ícono de rayo       → badge "Ecológico"
  MessageCircle, // ícono de WhatsApp   → botones de cotización
  ExternalLink,  // ícono de enlace     → redes sociales en footer
  ChevronLeft,   // ícono flecha izq    → carrusel botón anterior
  ChevronRight,  // ícono flecha der    → carrusel botón siguiente
  Instagram      // ícono de Instagram  → contacto/redes
} from 'lucide-react'

// Componentes de UI de shadcn (botones, tarjetas, badges estilizados)
// Están en src/components/ui/ — se instalaron con: npx shadcn-ui@latest add ...
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Estilos personalizados: animaciones (float, slide-up, fade-in, sonar-pulse)
// y clases de utilidad que Tailwind no tiene por defecto (shadow-glow, bg-gradient-teal, etc.)
import './App.css'


// ============================================================
// SECCIÓN 1: DATOS GLOBALES
// ============================================================
// ✏️  EDICIÓN RÁPIDA: Todo lo que necesitas cambiar está aquí.
//     No tienes que buscar dentro del JSX para actualizar textos,
//     precios, imágenes o colores de los productos.
// ============================================================


// --- Información de contacto ---
// Se usa en: Navbar (WhatsApp), Footer (teléfono, email, WA), CTA (email)
const CONTACT_INFO = {
  phone: '+52 556 912 3847',   // Teléfono mostrado en footer
  whatsapp_display: '+52 556 912 3847',   // WhatsApp mostrado en footer (puede ser diferente al link)
  whatsapp_link: '525569123847',       // Número real para wa.me — sin +, sin espacios, con código país
  email: 'ozon3.mx@gmail.com',      // Email de contacto
  instagram: '@ozon3.mx',       // Instagram handle
  instagram_link: 'https://www.instagram.com/ozon3.mx/' // Link a IG
}


// --- Beneficios (Sección "Tres Soluciones en Un Solo Dispositivo") ---
// Array de 3 objetos. Cada uno genera una tarjeta en la sección de beneficios.
// Propiedades:
//   icon        → componente SVG de lucide-react
//   titulo      → título en negrita de la tarjeta
//   descripcion → texto descriptivo bajo el título
//   color       → clases Tailwind para el gradiente de fondo de la tarjeta
//                 Formato: 'from-[#COLOR_INICIO] to-[#COLOR_FIN]'
const BENEFICIOS = [
  {
    icon: <Leaf className="w-10 h-10 text-[#00C2B5]" />,
    titulo: 'Menos Químicos',
    descripcion: 'Reduce drásticamente el uso de cloro y productos químicos en tu hogar. 100% ecológico.',
    color: 'from-[#E0F7F5] to-[#F0FAF9]'
  },
  {
    icon: <Droplets className="w-10 h-10 text-[#00C2B5]" />,
    titulo: 'Desinfección de Alimentos',
    descripcion: 'Lava frutas y verduras con agua ozonizada para eliminar pesticidas, bacterias y contaminantes.',
    color: 'from-[#E8F8F6] to-[#F5FFFE]'
  },
  {
    icon: <Wind className="w-10 h-10 text-[#00C2B5]" />,
    titulo: 'Adiós Malos Olores',
    descripcion: 'Elimina olores persistentes de tabaco, mascotas, cocina y humedad de forma natural y efectiva.',
    color: 'from-[#E0F7F5] to-[#F5FFFE]'
  }

]


// --- Catálogo de productos ---
// Array de 3 objetos. Cada uno genera una tarjeta en la sección de productos.
// Propiedades estándar:
//   id              → identificador único del producto (string)
//   nombre          → nombre visible en la tarjeta
//   potencia        → badge de watts en la esquina derecha del nombre
//   descripcion     → texto descriptivo corto
//   precio          → precio como string (incluye el símbolo $)
//   caracteristicas → array de strings → se renderizan como pills
//   imagen          → ruta del archivo PNG en /public (ej: '/product-basic.png')
//   popular         → true = muestra badge "Más Vendido" en esquina superior derecha
//
// Propiedades de estética (únicas por producto):
//   nivel        → etiqueta de categoría sobre la imagen (ej: 'Doméstico', 'Profesional')
//   imageBg      → gradiente CSS del fondo del contenedor de imagen
//                  Cambia esto para modificar el fondo de la foto del producto
//   accentColor  → color hexadecimal de acento: borde superior, precio, botón Cotizar,
//                  badge de potencia y etiqueta de nivel
//   cardRing     → clases Tailwind para el ring/glow del card completo (solo popular=true)
const PRODUCTOS = [
  {
    id: 'basic',
    nombre: 'Ozon3 Basic',
    potencia: '10W',
    descripcion: 'El esencial para autos, closets y espacios reducidos. Control manual, 1000mg/h. Incluye kit para agua.',
    precio: '$499',
    caracteristicas: ['1000 mg/h', 'Control Manual', 'Kit de Agua', 'Portátil'],
    imagen: '/product-basic.png',
    popular: false,
    nivel: 'Doméstico',
    // Gradiente azul claro → gris: fondo tipo estudio fotográfico neutro
    imageBg: 'radial-gradient(ellipse at 50% 50%, #F0F7FF 0%, #C8DAE8 45%, #9AB5C8 100%)',
    accentColor: '#2aaba2',   // Teal brand color
    cardRing: ''
  },
  {
    id: 'timer',
    nombre: 'Ozon3 Analog Timer',
    potencia: '20W',
    descripcion: 'Programa tus ciclos de limpieza y despreocúpate. Ideal para habitaciones, baños, cocina y desinfección de verduras.',
    precio: '$799',
    precioAnterior: '$1099',
    caracteristicas: ['2000 mg/h', 'Temporizador Digital', 'Desinfección de Alimentos', 'Uso Doméstico'],
    imagen: '/product-timer.png',
    popular: true,  // ← Este producto muestra el badge "Más Vendido"
    nivel: 'Hogar & Cocina',
    imageBg: 'radial-gradient(ellipse at 50% 50%, #F0F7FF 0%, #C8DAE8 45%, #9AB5C8 100%)',
    accentColor: '#e49d22',   // Ámbar/dorado → diferencia al más vendido
    cardRing: 'ring-2 ring-[#00C2B5] shadow-glow'  // Ring teal alrededor de la tarjeta completa
  },
  {
    id: 'hydro',
    nombre: 'Ozon3 HydroFlow',
    potencia: '25W',
    descripcion: 'Para Flujo de Agua en lavadoras y mangueras. Lava ropa en frío y desinfecta pisos y superficies amplias.',
    precio: '$7199',
    caracteristicas: ['Flujo Continuo', 'Conexión Directa', 'Pantalla LED', 'Uso Profesional'],
    imagen: '/product-hydro.png',
    popular: false,
    nivel: 'Profesional',
    imageBg: 'radial-gradient(ellipse at 50% 50%, #F0F7FF 0%, #C8DAE8 45%, #9AB5C8 100%)',
    accentColor: '#0099DD',   // Azul → evoca agua y nivel profesional
    cardRing: ''
  }
]


// --- Items de la sección Seguridad ---
// Lista de strings → se renderizan como lista con ícono de check
// Para agregar o quitar recomendaciones solo edita este array
const SEGURIDAD_ITEMS = [
  'Úsalo siempre en espacios vacíos',
  'Ventila después de cada ciclo',
  'No mezclar con aromatizantes',
  'Mantén alejado del alcance de niños',
  'No respires directamente el ozono'
]


// --- Imágenes del carrusel (Sección Seguridad) ---
// Archivos que deben existir en /public con exactamente estos nombres
// Para agregar más imágenes: agrega más rutas a este array
const CAROUSEL_IMAGES = [
  '/carrusel-1.jpeg',
  '/carrusel-2.jpeg',
  '/carrusel-3.jpeg'
]


// ============================================================
// SECCIÓN 2: COMPONENTE ImageCarousel
// ============================================================
// Componente independiente que renderiza el carrusel de imágenes
// en la sección de Seguridad (columna derecha).
//
// Características:
//   - Autoplay cada 5 segundos
//   - Botones de navegación que aparecen al hover
//   - Indicadores de punto (el activo se ensancha)
//   - Transición CSS con translateX
// ============================================================
const ImageCarousel = () => {

  // currentIndex: índice (0, 1, 2...) de la imagen actualmente visible
  // setCurrentIndex: función para cambiar qué imagen se muestra
  const [currentIndex, setCurrentIndex] = useState(0)

  // Autoplay: cada 5000ms (5s) avanza al siguiente slide
  // La dependencia [currentIndex] resetea el timer cuando el usuario
  // navega manualmente, evitando que salte demasiado rápido
  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 5000)
    return () => clearInterval(timer) // Limpieza: cancela el timer al desmontar el componente
  }, [currentIndex])

  // Avanza al siguiente slide
  // Si está en el último, vuelve al primero (comportamiento circular)
  const nextSlide = () =>
    setCurrentIndex(prev => (prev === CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1))

  // Retrocede al slide anterior
  // Si está en el primero, salta al último (comportamiento circular)
  const prevSlide = () =>
    setCurrentIndex(prev => (prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1))

  return (
    // Contenedor principal: rounded y overflow-hidden para que la imagen
    // no se salga de los bordes redondeados. "group" activa estilos hover en hijos.
    <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-xl group">

      {/* Contenedor deslizable:
          Todas las imágenes están en fila (flex).
          translateX mueve el contenedor para mostrar solo la imagen del índice actual.
          Ejemplo: índice 1 → translateX(-100%) → muestra la 2da imagen */}
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {CAROUSEL_IMAGES.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Uso seguro ${index + 1}`}
            // flex-shrink-0 evita que las imágenes se compriman — cada una ocupa 100% del ancho
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Botón izquierdo (←):
          opacity-0 por defecto, group-hover:opacity-100 lo hace visible al pasar el mouse */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full
                   opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-[#00C2B5]"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Botón derecho (→): mismo comportamiento que el izquierdo */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full
                   opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-[#00C2B5]"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicadores de posición (puntos):
          El activo tiene w-6 (más ancho) y es blanco opaco.
          Los inactivos son blancos semitransparentes y cuadrados (w-2.5).
          Al hacer clic en un punto, salta directamente a esa imagen. */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white w-6' : 'bg-white/50 w-2.5'
              }`}
          />
        ))}
      </div>
    </div>
  )
}


// ============================================================
// SECCIÓN 3: COMPONENTE PRINCIPAL App
// ============================================================
// Contiene toda la estructura de la landing page.
// El orden de los elementos JSX define el orden visual en pantalla.
// ============================================================
function App() {

  // isScrolled: true cuando el usuario scrolleó más de 50px
  // → controla si el navbar tiene fondo transparente o sólido
  const [isScrolled, setIsScrolled] = useState(false)

  // mobileMenuOpen: true cuando el menú hamburguesa está abierto
  // → muestra/oculta el menú desplegable en móvil
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // visibleSections: Set de IDs de secciones que ya entraron al viewport
  // → activa las clases de animación (opacity-100, translate-y-0)
  // Se usa como: visibleSections.has('beneficios') ? 'opacity-100' : 'opacity-0'
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  // heroRef: referencia al elemento <section id="hero">
  // Disponible para usos futuros (ej: parallax, métricas de scroll)
  const heroRef = useRef<HTMLElement>(null)


  // ----------------------------------------------------------
  // EFECTO 1: Listener de scroll para el navbar
  // ----------------------------------------------------------
  // Se ejecuta UNA vez al montar el componente (array de dependencias vacío [])
  // Escucha el evento 'scroll' en la ventana y actualiza isScrolled
  // La función de retorno (cleanup) elimina el listener al desmontar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  // ----------------------------------------------------------
  // EFECTO 2: IntersectionObserver para animaciones de entrada
  // ----------------------------------------------------------
  // Observa todas las secciones con id (section[id]).
  // Cuando una sección entra al viewport (threshold: 10%, margen: -50px),
  // agrega su id a visibleSections.
  // Las secciones usan ese estado para aplicar clases de animación CSS.
  // threshold: 0.1  → se activa cuando el 10% de la sección es visible
  // rootMargin: -50px → la sección debe entrar 50px extra para activarse
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Agrega el ID de la sección visible al Set
            setVisibleSections(prev => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1, rootMargin: '-50px' }
    )
    // Observa todas las secciones con atributo id
    document.querySelectorAll('section[id]').forEach(section => observer.observe(section))
    // Cleanup: desconecta el observer al desmontar el componente
    return () => observer.disconnect()
  }, [])


  // ----------------------------------------------------------
  // FUNCIÓN: scrollToSection
  // ----------------------------------------------------------
  // Desplazamiento suave (smooth scroll) a cualquier sección por su id.
  // Además cierra el menú móvil si estaba abierto.
  // Uso: scrollToSection('productos') → baja hasta <section id="productos">
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }


  // ----------------------------------------------------------
  // FUNCIÓN: openWhatsApp
  // ----------------------------------------------------------
  // Abre WhatsApp Web con el número de CONTACT_INFO.whatsapp_link
  // y un mensaje pre-escrito (encodificado para URL).
  // Si no se pasa mensaje, usa el genérico.
  // Uso: openWhatsApp(`Hola, me interesa el ${producto.nombre}`)
  const openWhatsApp = (message: string = '') => {
    const text = encodeURIComponent(
      message || 'Hola, me interesa cotizar un generador de ozono Ozon3'
    )
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp_link}?text=${text}`, '_blank')
  }


  // ==========================================================
  // RENDER: JSX de la página completa
  // ==========================================================
  return (
    // Contenedor raíz: ocupa mínimo toda la pantalla, fondo blanco,
    // overflow-x-hidden evita scroll horizontal por elementos que sobresalen
    <div className="min-h-screen bg-white overflow-x-hidden">


      {/* ======================================================
          NAVBAR
          ======================================================
          Posición: fija (fixed) en la parte superior de la pantalla.
          z-50: siempre por encima de todo el contenido.
          Transición de fondo:
            - Sin scroll → bg-transparent (se ve el hero detrás)
            - Con scroll → bg-white/90 + blur (fondo sólido semiopaco)
      ====================================================== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-soft' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* LOGO: clic vuelve al inicio de la página */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollToSection('hero')}
            >
              {/* Cuadro teal con O₃ */}
              <div className="w-10 h-10 bg-gradient-teal rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-lg">O₃</span>
              </div>
              <span className="text-2xl font-bold text-[#1A2B2A]">Ozon3</span>
            </div>

            {/* MENÚ DESKTOP: oculto en móvil (hidden), visible en md+ (md:flex) */}
            <div className="hidden md:flex items-center gap-8">
              {/* Genera un botón por cada sección del menú */}
              {['beneficios', 'productos', 'seguridad', 'contacto'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-[#5A6B6A] hover:text-[#00C2B5] font-medium transition-colors duration-300 capitalize"
                >
                  {item}
                </button>
              ))}
              {/* Botón CTA de WhatsApp en el navbar */}
              <Button
                onClick={() => openWhatsApp()}
                className="bg-[#00C2B5] hover:bg-[#00A99D] text-white px-6 rounded-full font-medium transition-all duration-300 hover:shadow-glow"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Cotizar en WhatsApp
              </Button>
            </div>

            {/* BOTÓN HAMBURGUESA: visible solo en móvil
                Alterna entre ícono Menu (☰) e ícono X (✕) */}
            <button
              className="md:hidden p-2 text-[#1A2B2A]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MENÚ MÓVIL DESPLEGABLE:
            Solo se renderiza cuando mobileMenuOpen = true.
            Se muestra debajo del navbar con fondo semiopaco. */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-[#E0F7F5]">
            <div className="px-4 py-6 space-y-4">
              {['beneficios', 'productos', 'seguridad', 'contacto'].map(item => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  // scrollToSection ya cierra el menú al llamarse
                  className="block w-full text-left py-3 text-[#5A6B6A] font-medium capitalize"
                >
                  {item}
                </button>
              ))}
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


      {/* ======================================================
          HERO SECTION
          ======================================================
          Primera sección visible al cargar la página.
          Ocupa al menos 100vh (min-h-screen).
          pt-20 → padding top para que el contenido no quede bajo el navbar.
          bg-gradient-radial → gradiente definido en App.css o tailwind.config
          Estructura: grid de 2 columnas en desktop (lg:grid-cols-2)
            - Columna izquierda: texto, CTAs y badges
            - Columna derecha: imagen del producto + stats flotantes
      ====================================================== */}
      <section id="hero" ref={heroRef} className="relative min-h-screen pt-20 bg-gradient-radial overflow-hidden">

        {/* ELEMENTOS DECORATIVOS DE FONDO:
            Círculos difuminados (blur-3xl) que crean el efecto de luz suave.
            pointer-events-none → no interfieren con clics del usuario */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-10 w-96 h-96 bg-[#00C2B5]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#00C2B5]/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#E0F7F5]/50 to-transparent rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Grid: 1 columna en móvil, 2 columnas en desktop */}
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)]">

            {/* COLUMNA IZQUIERDA: contenido textual */}
            <div className="text-center lg:text-left pt-12 lg:pt-0">

              {/* Badge de categoría con estrella (animación fade-in desde App.css) */}
              <div className="inline-flex items-center gap-2 bg-[#E0F7F5] text-[#00A99D] px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
                <Star className="w-4 h-4 fill-[#00C2B5]" />
                Tecnología de Punta en Purificación
              </div>

              {/* H1: título principal de la página
                  animate-slide-up + animationDelay → entra desde abajo con retraso */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A2B2A] leading-tight mb-6 animate-slide-up"
                style={{ animationDelay: '0.1s' }}
              >
                Purifica tu Vida con{' '}
                {/* text-gradient: clase de App.css que aplica gradiente teal al texto */}
                <span className="text-gradient">Tecnología Ozon3</span>
              </h1>

              {/* Subtítulo descriptivo */}
              <p
                className="text-lg text-[#5A6B6A] mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up"
                style={{ animationDelay: '0.2s' }}
              >
                Elimina olores, desinfecta agua, verduras y superficies sin químicos.
                Tecnología de ozono inteligente para tu hogar y negocio.
              </p>

              {/* BOTONES CTA PRINCIPALES */}
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-slide-up"
                style={{ animationDelay: '0.3s' }}
              >
                {/* Botón primario: navega a la sección de productos */}
                <Button
                  onClick={() => scrollToSection('productos')}
                  className="bg-[#00C2B5] hover:bg-[#00A99D] text-white px-8 py-6 text-base font-semibold rounded-full shadow-glow transition-all duration-300 hover:scale-105"
                >
                  Ver Modelos
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                {/* Botón secundario (outline): navega a beneficios */}
                <Button
                  onClick={() => scrollToSection('beneficios')}
                  variant="outline"
                  className="border-2 border-[#00C2B5] text-[#00C2B5] hover:bg-[#E0F7F5] px-8 py-6 text-base font-semibold rounded-full transition-all duration-300"
                >
                  Saber Más
                </Button>
              </div>

              {/* BADGES DE PROPIEDADES:
                  Array inline de 3 elementos, cada uno con ícono y texto.
                  Para agregar un badge: agrega un objeto { icon, text } al array */}
              <div
                className="flex flex-wrap gap-4 justify-center lg:justify-start animate-slide-up"
                style={{ animationDelay: '0.4s' }}
              >
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

            {/* COLUMNA DERECHA: imagen y stats flotantes */}
            <div className="relative flex items-center justify-center">

              {/* Imagen hero del producto con animación float (sube/baja suavemente, desde App.css) */}
              <div className="relative z-10 float-animation">
                <img
                  src="/hero-product.png"  // ← Cambiar por tu imagen en /public
                  alt="Generador de Ozono Ozon3"
                  className="w-full max-w-lg h-auto object-contain drop-shadow-2xl"
                />
              </div>

              {/* STAT FLOTANTE INFERIOR IZQUIERDO: Eficacia */}
              <div
                className="absolute bottom-10 left-0 bg-white rounded-2xl shadow-xl p-4 z-20 animate-slide-up"
                style={{ animationDelay: '0.5s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-teal rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1A2B2A] text-lg">Máxima</p>
                    <p className="text-sm text-[#5A6B6A]">Eficacia</p>
                  </div>
                </div>
              </div>

              {/* STAT FLOTANTE SUPERIOR DERECHO: Ciclo Rápido */}
              <div
                className="absolute top-20 right-0 bg-white rounded-2xl shadow-xl p-4 z-20 animate-slide-up"
                style={{ animationDelay: '0.6s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#E0F7F5] rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#00C2B5]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1A2B2A] text-lg">Duración</p>
                    <p className="text-sm text-[#5A6B6A]">Ciclo Rápido</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ======================================================
          SECCIÓN: BENEFICIOS
          ======================================================
          Muestra 3 tarjetas con los beneficios del producto.
          Animación: al entrar al viewport pasan de
            opacity-0 translate-y-10 → opacity-100 translate-y-0
          Cada tarjeta tiene un retraso (transitionDelay) escalonado
          de 100ms para que aparezcan una tras otra.
      ====================================================== */}
      <section id="beneficios" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Encabezado animado: visible cuando visibleSections incluye 'beneficios' */}
          <div className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('beneficios') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <Badge className="mb-4 bg-[#E0F7F5] text-[#00A99D] hover:bg-[#E0F7F5] px-4 py-1.5 text-sm font-medium">
              Beneficios
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#1A2B2A] mb-4">
              Tres Soluciones en Un Solo <span className="text-gradient">Dispositivo</span>
            </h2>
            <p className="text-lg text-[#5A6B6A] max-w-2xl mx-auto">
              Nuestros generadores de ozono ofrecen múltiples aplicaciones para
              mantener tu hogar limpio, seguro y saludable.
            </p>
          </div>

          {/* Grid de tarjetas: 1 columna móvil, 3 columnas desktop */}
          <div className="grid md:grid-cols-3 gap-8">
            {BENEFICIOS.map((beneficio, index) => (
              <Card
                key={index}
                className={`group overflow-hidden hover-lift border-0 shadow-soft bg-gradient-to-br ${beneficio.color} transition-all duration-700 ${visibleSections.has('beneficios') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                // Retraso escalonado: tarjeta 0 → 0ms, tarjeta 1 → 100ms, tarjeta 2 → 200ms
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  {/* Caja del ícono: al hover del card (group-hover) gana shadow glow */}
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


      {/* ======================================================
          SECCIÓN: PRODUCTOS / CATÁLOGO
          ======================================================
          Cada tarjeta tiene identidad visual propia gracias a
          las propiedades accentColor, imageBg, nivel y cardRing
          definidas en el array PRODUCTOS arriba.

          ANATOMÍA DE CADA TARJETA:
          ┌──────────────────────────────┐ ← borderTop con accentColor
          │  [badge "Más Vendido"]       │ ← solo si popular=true
          │                              │
          │     [imagen del producto]    │ ← fondo imageBg + zoom hover
          │  [pill nivel]                │ ← etiqueta en esquina inferior
          ├──────────────────────────────┤
          │  Nombre          [potencia]  │ ← color con accentColor
          │  Descripción                 │
          │  [pill] [pill] [pill]        │ ← características técnicas
          ├──────────────────────────────┤
          │  $PRECIO MXN    [Cotizar →]  │ ← precio y botón con accentColor
          └──────────────────────────────┘
      ====================================================== */}
      <section id="productos" className="py-24 bg-[#F5F7FA] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Encabezado animado */}
          <div className={`text-center mb-16 transition-all duration-700 ${visibleSections.has('productos') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
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
            {PRODUCTOS.map((producto, index) => (
              <Card
                key={index}
                className={`
                  group relative overflow-hidden hover-lift border-0 shadow-soft bg-white
                  transition-all duration-700
                  ${producto.cardRing}
                  ${visibleSections.has('productos') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  // Borde superior de color único — identidad visual del modelo
                  borderTop: `4px solid ${producto.accentColor}`
                }}
              >

                {/* BADGE "MÁS VENDIDO": solo visible cuando popular = true */}
                {producto.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge
                      className="text-white px-3 py-1 shadow-md"
                      style={{ background: producto.accentColor }}
                    >
                      <Star className="w-3 h-3 mr-1 fill-white" />
                      Más Vendido
                    </Badge>
                  </div>
                )}

                {/* CONTENEDOR DE IMAGEN:
                    - background: gradiente radial único del producto (imageBg)
                    - Al hover del card: escala al 105% (zoom sutil)
                    - overflow-hidden recorta la imagen si sale del área */}
                <div
                  className="relative h-56 flex items-center justify-center p-6 overflow-hidden transition-transform duration-500 group-hover:scale-105"
                  style={{ background: producto.imageBg }}
                >
                  {/* Imagen del producto (PNG sin fondo) */}
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="max-h-full max-w-full object-contain drop-shadow-2xl relative z-10"
                  />

                  {/* PILL DE NIVEL: etiqueta en esquina inferior izquierda
                      Color y fondo semi-transparente tomados de accentColor.
                      ${producto.accentColor}18 → hexadecimal con 18 = ~10% opacidad
                      ${producto.accentColor}40 → hexadecimal con 40 = ~25% opacidad */}
                  <div
                    className="absolute bottom-3 left-3 z-20 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm"
                    style={{
                      color: producto.accentColor,
                      backgroundColor: `${producto.accentColor}18`,
                      border: `1px solid ${producto.accentColor}40`
                    }}
                  >
                    {producto.nivel}
                  </div>
                </div>

                {/* CUERPO DE LA TARJETA */}
                <CardContent className="p-6">

                  {/* Fila: nombre del producto + badge de potencia */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-[#1A2B2A]">{producto.nombre}</h3>
                    {/* Badge de potencia (ej: 10W) con color de acento */}
                    <span
                      className="text-xs font-bold px-2 py-1 rounded"
                      style={{
                        color: producto.accentColor,
                        backgroundColor: `${producto.accentColor}15`,
                        border: `1px solid ${producto.accentColor}30`
                      }}
                    >
                      {producto.potencia}
                    </span>
                  </div>

                  {/* Descripción: min-h garantiza altura mínima para alinear los botones */}
                  <p className="text-[#5A6B6A] text-sm mb-4 min-h-[40px]">
                    {producto.descripcion}
                  </p>

                  {/* PILLS DE CARACTERÍSTICAS TÉCNICAS:
                      Mapea el array caracteristicas[] del producto */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {producto.caracteristicas.map((caracteristica, i) => (
                      <span
                        key={i}
                        className="text-xs text-[#5A6B6A] bg-[#F5F7FA] px-2 py-1 rounded-full border border-[#E0F7F5]"
                      >
                        {caracteristica}
                      </span>
                    ))}
                  </div>

                  {/* FILA INFERIOR: precio y botón Cotizar */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#E0F7F5]">

                    {/* Precio con color de acento del producto */}
                    <div className="flex flex-col">
                      {/* Precio anterior (tacha) si existe */}
                      {producto.precioAnterior && (
                        <div className="flex items-center gap-1 opacity-60 mb-[-4px]">
                          <span className="text-sm text-[#5A6B6A] line-through font-black">
                            {producto.precioAnterior}
                          </span>
                          <span className="text-[10px] text-[#5A6B6A] line-through font-black uppercase">MXN</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <span
                          className="text-2xl font-bold"
                          style={{ color: producto.accentColor }}
                        >
                          {producto.precio}
                        </span>
                        <span className="text-[10px] font-bold text-[#5A6B6A] uppercase ml-1">MXN</span>
                      </div>
                    </div>

                    {/* Botón Cotizar: abre WhatsApp con el nombre del producto en el mensaje */}
                    <Button
                      onClick={() => openWhatsApp(`Hola, me interesa cotizar el ${producto.nombre}`)}
                      className="text-white rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                      style={{ backgroundColor: producto.accentColor }}
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


      {/* ======================================================
          SECCIÓN: SEGURIDAD
          ======================================================
          Dos columnas en desktop:
            - Izquierda: título, intro y lista de recomendaciones
            - Derecha: componente ImageCarousel
          Fondo: imagen /public/safety-bg.jpg con overlay degradado
          que asegura legibilidad del texto.
      ====================================================== */}
      <section id="seguridad" className="py-24 relative overflow-hidden">

        {/* IMAGEN DE FONDO + OVERLAY:
            La imagen ocupa todo el espacio absoluto.
            El overlay va de blanco/95 (izquierda) a blanco/80 (derecha)
            para que el texto sea legible y el carrusel se vea claro */}
        <div className="absolute inset-0">
          <img src="/safety-bg.jpg" alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/80" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${visibleSections.has('seguridad') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>

            {/* COLUMNA IZQUIERDA: recomendaciones de seguridad */}
            <div>
              <Badge className="mb-4 bg-[#E0F7F5] text-[#00A99D] hover:bg-[#E0F7F5] px-4 py-1.5 text-sm font-medium">
                Seguridad
              </Badge>
              <h2 className="text-3xl lg:text-5xl font-bold text-[#1A2B2A] mb-6">
                Uso Responsable y <span className="text-gradient">Seguro</span>
              </h2>
              <p className="text-lg text-[#5A6B6A] mb-8">
                El ozono es un poderoso oxidante natural. Sigue estas recomendaciones
                para un uso seguro y efectivo.
              </p>

              {/* Caja de recomendaciones con fondo semiopaco */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-soft border border-white/50">
                {/* Lista generada desde el array SEGURIDAD_ITEMS */}
                <ul className="space-y-4">
                  {SEGURIDAD_ITEMS.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {/* Ícono de check en círculo teal */}
                      <div className="w-6 h-6 bg-gradient-teal rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[#1A2B2A] font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Nota al pie: incluye Manual de Usuario */}
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

            {/* COLUMNA DERECHA: carrusel de imágenes de uso */}
            <div className="w-full flex justify-center lg:justify-end">
              <ImageCarousel />
            </div>
          </div>
        </div>
      </section>


      {/* ======================================================
          SECCIÓN: CTA (Call To Action)
          ======================================================
          Banner de conversión con fondo teal (bg-gradient-teal).
          Dos botones: WhatsApp (primario) y Email (secundario).
          sonar-pulse: animación de pulso definida en App.css.
      ====================================================== */}
      <section className="py-24 bg-gradient-teal relative overflow-hidden">

        {/* Elementos decorativos de fondo (círculos difuminados blancos) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            ¿Listo para Respirar Aire Puro?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Únete a miles de familias que ya disfrutan de un ambiente más limpio,
            seguro y saludable con Ozon3.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            {/* Botón primario: blanco con texto teal, animación de pulso */}
            <Button
              onClick={() => openWhatsApp()}
              variant="outline"
              className="bg-white text-[#00C2B5] hover:bg-white/10 px-8 py-6 text-base font-semibold rounded-full transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Cotizar vía WhatsApp
            </Button>

            {/* Botón secundario: borde blanco, abre cliente de correo */}
            <Button
              onClick={() => window.open(`mailto:${CONTACT_INFO.email}`, '_blank')}
              variant="outline"
              className="border-2 border-white text-[#00C2B5] hover:bg-white/10 px-8 py-6 text-base font-semibold rounded-full transition-all duration-300"
            >
              <Mail className="w-5 h-5 mr-2" />
              Envíanos un Email
            </Button>
          </div>
        </div>
      </section>


      {/* ======================================================
          SECCIÓN: CONTACTO & FOOTER
          ======================================================
          Fondo oscuro (#1A2B2A).
          Dividida en dos partes:
            1. Contact Info: 3 columnas con tel, email y WA
            2. Footer: logo, descripción, links rápidos y legal
      ====================================================== */}
      <section id="contacto" className="bg-[#1A2B2A] text-white">

        {/* PARTE 1: DATOS DE CONTACTO */}
        <div className="py-16 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">

              {/* Instagram */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#00C2B5]/20 rounded-2xl flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-[#00C2B5]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Instagram</p>
                  <a href={CONTACT_INFO.instagram_link} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-[#00C2B5] transition-colors">
                    {CONTACT_INFO.instagram}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#00C2B5]/20 rounded-2xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#00C2B5]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <p className="font-semibold">{CONTACT_INFO.email}</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#00C2B5]/20 rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-[#00C2B5]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">WhatsApp</p>
                  <p className="font-semibold">{CONTACT_INFO.whatsapp_display}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PARTE 2: FOOTER */}
        <footer className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-12">

              {/* COLUMNA DE MARCA (ocupa 2 columnas):
                  Logo, descripción de la empresa y redes sociales */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-teal rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">O₃</span>
                  </div>
                  <span className="text-2xl font-bold">Ozon3</span>
                </div>
                <p className="text-white/60 max-w-sm mb-6">
                  Líderes en tecnología de ozono para hogares y negocios.
                  Purificamos tu mundo de forma natural y efectiva.
                </p>
                {/* Redes sociales: actualmente usan ExternalLink como placeholder.
                    Para agregar íconos reales, instala react-icons o usa imágenes SVG */}
                <div className="flex gap-4">
                  {[
                    { icon: <Instagram className="w-5 h-5" />, link: CONTACT_INFO.instagram_link, label: 'Instagram' },
                    { icon: <ExternalLink className="w-5 h-5" />, link: '#', label: 'Facebook' }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#00C2B5] transition-colors duration-300"
                      title={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* COLUMNA ENLACES RÁPIDOS: navegan a secciones de la página */}
              <div>
                <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
                <ul className="space-y-3 text-white/60">
                  {['beneficios', 'productos', 'seguridad', 'contacto'].map(item => (
                    <li key={item}>
                      <button
                        onClick={() => scrollToSection(item)}
                        className="hover:text-[#00C2B5] transition-colors capitalize"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COLUMNA LEGAL: links a páginas legales
                  Por ahora apuntan a "#", reemplaza con las rutas reales */}
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-3 text-white/60">
                  {['Política de Privacidad', 'Términos de Uso', 'Garantía', 'Envíos'].map(item => (
                    <li key={item}>
                      <a href="#" className="hover:text-[#00C2B5] transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* BARRA INFERIOR: copyright y tagline */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/40 text-sm">© 2024 Ozon3. Todos los derechos reservados.</p>
              <p className="text-white/40 text-sm flex items-center gap-2">
                Hecho con <span className="text-[#00C2B5]">♥</span> para un mundo más limpio
              </p>
            </div>
          </div>
        </footer>
      </section>


      {/* ======================================================
          BOTÓN FLOTANTE DE WHATSAPP
          ======================================================
          Siempre visible (fixed) en la esquina inferior derecha.
          z-50: encima de todo el contenido.
          sonar-pulse: animación de anillos expansivos (App.css)
          que llama la atención del usuario para que cotice.
          bg-[#25D366]: color oficial de WhatsApp.
      ====================================================== */}
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
