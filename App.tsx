import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { 
  Zap, 
  Home, 
  ShieldCheck, 
  BatteryCharging, 
  Wrench, 
  Lightbulb, 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  ChevronRight,
  Menu,
  X,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth Scrolling Setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href === '#') {
          e.preventDefault();
          lenis.scrollTo(0, { duration: 1.5 });
        } else if (href && href.startsWith('#') && href.length > 1) {
          const id = href.substring(1);
          const element = document.getElementById(id);
          if (element) {
            e.preventDefault();
            lenis.scrollTo(element, { offset: -80, duration: 1.5 });
            setMobileMenuOpen(false);
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      // 💡 POUR ACTIVER LE FORMULAIRE EN PRODUCTION :
      // 1. Allez sur https://web3forms.com/ ou https://formspree.io/
      // 2. Créez un compte gratuit et obtenez votre clé d'accès (Access Key) ou URL
      // 3. Décommentez le code ci-dessous et remplacez 'VOTRE_CLE_ACCESS_ICI'
      
      /*
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: 'VOTRE_CLE_ACCESS_ICI',
          ...formData
        })
      });
      
      if (!response.ok) throw new Error('Erreur réseau');
      */

      // Simulation d'un envoi (à supprimer quand vous activez la vraie API)
      await new Promise(resolve => setTimeout(resolve, 1500));

      setFormStatus('success');
      setFormData({ name: '', phone: '', service: '', message: '' }); // Reset form
      
      // Revenir à l'état normal après 5 secondes
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 selection:bg-electric-yellow selection:text-night-blue">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-light py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <a href="#" className="relative flex items-center justify-center cursor-pointer group">
              <Zap className="absolute w-12 h-12 text-electric-yellow opacity-80 group-hover:opacity-100 transition-opacity" fill="currentColor" stroke="none" />
              <span className={`relative z-10 text-2xl font-black tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-electric-yellow transition-colors ${isScrolled ? 'text-slate-900 drop-shadow-none' : 'text-white'}`}>
                RK ELECTRICITE
              </span>
            </a>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className={`text-sm font-medium hover:text-electric-yellow transition-colors ${isScrolled ? 'text-slate-700' : 'text-white'}`}>Services</a>
              <a href="#zone" className={`text-sm font-medium hover:text-electric-yellow transition-colors ${isScrolled ? 'text-slate-700' : 'text-white'}`}>Zone d'intervention</a>
              <a href="#portfolio" className={`text-sm font-medium hover:text-electric-yellow transition-colors ${isScrolled ? 'text-slate-700' : 'text-white'}`}>Réalisations</a>
              <a href="#contact" className={`text-sm font-medium hover:text-electric-yellow transition-colors ${isScrolled ? 'text-slate-700' : 'text-white'}`}>Contact</a>
              <a href="#contact" className="px-5 py-2.5 bg-electric-yellow text-night-blue font-semibold rounded-full hover:bg-electric-yellow-hover transition-all flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>07 82 80 05 52</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className={`md:hidden ${isScrolled ? 'text-slate-900' : 'text-white'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-light absolute top-full left-0 w-full border-t border-slate-200">
            <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-800 hover:text-electric-yellow">Services</a>
              <a href="#zone" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-800 hover:text-electric-yellow">Zone d'intervention</a>
              <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-800 hover:text-electric-yellow">Réalisations</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-slate-800 hover:text-electric-yellow">Contact</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="mt-4 px-5 py-3 bg-electric-yellow text-night-blue font-semibold rounded-lg text-center flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                <span>07 82 80 05 52</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-night-blue text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544885935-98dd03b09034?q=80&w=2000&auto=format&fit=crop" 
            alt="Montagnes du Jura" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-night-blue/80 via-night-blue/60 to-night-blue"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 md:mt-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-dark mb-6">
                <span className="w-2 h-2 rounded-full bg-electric-yellow animate-pulse"></span>
                <span className="text-xs font-medium uppercase tracking-wider text-gray-300">Électricien Morez, Morbier, Les Rousses</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Artisan électricien sur <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-yellow to-yellow-200">Morez & Les Rousses.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
                Intervention rapide et mise aux normes pour particuliers et entreprises. Dépannage électrique sur le secteur de Morez, Morbier, Les Rousses et tout le Haut-Jura.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="px-8 py-4 bg-electric-yellow text-night-blue font-bold rounded-full hover:bg-electric-yellow-hover transition-all text-center flex items-center justify-center gap-2 group">
                  <span>Obtenir un devis gratuit</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#services" className="px-8 py-4 glass-dark text-white font-medium rounded-full hover:bg-white/10 transition-all text-center">
                  Découvrir nos services
                </a>
              </div>
            </motion.div>

            {/* Glassmorphism Info Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="glass-dark p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-electric-yellow/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <h3 className="text-2xl font-semibold mb-6">Intervention d'urgence</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-electric-yellow/20 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-electric-yellow" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">Réactivité maximale</h4>
                      <p className="text-gray-400 text-sm mt-1">Dépannage rapide sur Morez, Les Rousses et Saint-Laurent-en-Grandvaux.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-electric-yellow/20 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6 text-electric-yellow" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">Garantie Décennale</h4>
                      <p className="text-gray-400 text-sm mt-1">Toutes nos interventions sont couvertes et certifiées.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-sm text-gray-400 mb-2">Besoin d'un dépannage immédiat ?</p>
                  <a href="tel:0782800552" className="text-2xl font-bold text-electric-yellow hover:text-electric-yellow-hover transition-colors">
                    07 82 80 05 52
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-200/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-24">
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-slate-800">Nos Services Électriques</h2>
            <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed">
              Des solutions électriques modernes, pensées pour votre confort et votre sécurité, <span className="text-electric-yellow font-medium">adaptées aux exigences de Morez, Morbier et des Rousses.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Service 1 */}
            <div className="bg-slate-50 p-10 rounded-3xl hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group border border-slate-200">
              <div className="w-16 h-16 rounded-2xl bg-electric-yellow/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-8 h-8 text-electric-yellow" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Tableau Électrique & Mise aux normes</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Le cœur de votre installation. Diagnostic complet, remplacement de tableaux vétustes et mise en conformité stricte avec la norme NF C 15-100 pour garantir la sécurité absolue de votre foyer contre les risques électriques.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-slate-50 p-10 rounded-3xl hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group border border-slate-200">
              <div className="w-16 h-16 rounded-2xl bg-electric-yellow/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Home className="w-8 h-8 text-electric-yellow" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Chauffage Électrique & Confort</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Affrontez l'hiver jurassien en toute sérénité. Installation de radiateurs intelligents à inertie, planchers chauffants et systèmes de climatisation réversible pour un confort thermique optimal et des économies d'énergie.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-slate-50 p-10 rounded-3xl hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group border border-slate-200">
              <div className="w-16 h-16 rounded-2xl bg-electric-yellow/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-electric-yellow" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Domotique & Vidéosurveillance</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Vers une maison 100% connectée et sécurisée. Pilotage à distance de vos volets et de votre chauffage, couplé à l'installation d'alarmes et de caméras de vidéosurveillance pour garder un œil sur votre propriété où que vous soyez.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-slate-50 p-10 rounded-3xl hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group border border-slate-200">
              <div className="w-16 h-16 rounded-2xl bg-electric-yellow/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-8 h-8 text-electric-yellow" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Éclairage & Luminaires</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Sublimez vos espaces intérieurs et extérieurs. Création d'ambiances lumineuses sur-mesure : pose de spots encastrés, lustres design, points lumineux muraux et éclairage architectural pour mettre en valeur votre habitat.
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-slate-50 p-10 rounded-3xl hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group border border-slate-200">
              <div className="w-16 h-16 rounded-2xl bg-electric-yellow/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Wrench className="w-8 h-8 text-electric-yellow" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Prises & Électroménager</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Adaptation de votre réseau à vos nouveaux besoins. Ajout de prises de courant, raccordement sécurisé de gros électroménager (fours, plaques) et diagnostic rapide en cas de dysfonctionnement ou de courts-circuits.
              </p>
            </div>

            {/* Service 6 */}
            <div className="bg-slate-50 p-10 rounded-3xl hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group border border-slate-200">
              <div className="w-16 h-16 rounded-2xl bg-electric-yellow/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BatteryCharging className="w-8 h-8 text-electric-yellow" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800">Bornes de recharge IRVE</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Passez à la mobilité électrique en toute sérénité. Installation certifiée de bornes de recharge à domicile ou pour votre entreprise, vous garantissant une charge rapide et sécurisée pour votre véhicule.
              </p>
            </div>
          </div>

          {/* Standout CTA */}
          <div className="mt-16 text-center">
            <motion.div 
              className="inline-block relative group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Pulsing glow effect */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-electric-yellow to-yellow-500 rounded-full blur-md opacity-40 group-hover:opacity-100 animate-pulse transition duration-500"></div>
              
              <a href="#contact" className="relative flex items-center gap-4 px-10 py-5 bg-night-blue text-white rounded-full text-lg font-bold overflow-hidden border border-white/10 group-hover:border-electric-yellow/50 transition-all duration-300">
                {/* Background fill animation on hover */}
                <div className="absolute inset-0 bg-electric-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                
                <span className="relative z-10 group-hover:text-night-blue transition-colors duration-300">Un projet spécifique ? Parlons-en</span>
                
                {/* Icon container with its own hover state */}
                <div className="relative z-10 bg-white/10 group-hover:bg-night-blue/10 p-2 rounded-full transition-colors duration-300">
                  <ChevronRight className="w-5 h-5 group-hover:text-night-blue group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 relative bg-slate-200/50">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-800">Pourquoi nous choisir ?</h2>
            <p className="text-slate-600 text-lg">
              L'exigence et le savoir-faire au service de votre sécurité électrique dans le Haut-Jura (Secteur Morez - Les Rousses).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Card 1 */}
            <div className="bg-slate-50 p-10 rounded-2xl border-l-4 border-l-electric-yellow shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-electric-yellow/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-electric-yellow" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Électricien professionnel certifié</h3>
              </div>
              <p className="text-slate-600 leading-relaxed pl-16">
                Faire appel à un expert certifié, c'est la garantie absolue d'une installation sécurisée et parfaitement conforme aux exigences strictes de la norme NF C 15-100. Nous ne laissons aucune place au hasard quand il s'agit de protéger votre foyer.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 p-10 rounded-2xl border-l-4 border-l-electric-yellow shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-electric-yellow/20 flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6 text-electric-yellow" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Adepte des technologies dernier cri</h3>
              </div>
              <p className="text-slate-600 leading-relaxed pl-16">
                Nous maîtrisons les solutions de demain : domotique avancée pour une maison intelligente, installation de bornes de recharge IRVE pour véhicules électriques, et utilisation systématique de matériel de pointe pour des performances optimales.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 p-10 rounded-2xl border-l-4 border-l-electric-yellow shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-electric-yellow/20 flex items-center justify-center shrink-0">
                  <Wrench className="w-6 h-6 text-electric-yellow" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Qualité et services garantis</h3>
              </div>
              <p className="text-slate-600 leading-relaxed pl-16">
                Nous sélectionnons rigoureusement du matériel électrique de marques reconnues pour leur fiabilité. Notre engagement ne s'arrête pas à la fin du chantier : nous assurons un suivi client irréprochable et garantissons la pérennité de nos interventions.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-50 p-10 rounded-2xl border-l-4 border-l-electric-yellow shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-electric-yellow/20 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-electric-yellow" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Disponibilité 24/24h 7/7j</h3>
              </div>
              <p className="text-slate-600 leading-relaxed pl-16">
                Une panne totale en pleine nuit ? Un problème de chauffage en plein hiver jurassien ? Notre service de dépannage d'urgence intervient avec une réactivité immédiate sur le secteur de Morez et l'ensemble du Haut-Jura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intervention Area & Values */}
      <section id="zone" className="py-32 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800">Zone d'intervention</h2>
              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                Artisan électricien basé près de Morez, j'interviens quotidiennement sur le secteur de Morbier et de la station des Rousses. Le climat montagnard exige des installations robustes et un chauffage électrique performant.
              </p>
              
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 shadow-sm mb-6">
                  <MapPin className="w-4 h-4 text-electric-yellow" />
                  <span className="font-medium text-slate-800">Déplacement dans un rayon de 35 km autour de Morez</span>
                </div>
                
                <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                  {[
                    "Les Rousses",
                    "Morbier",
                    "Bellefontaine",
                    "Saint-Laurent-en-Grandvaux",
                    "La Chaumusse",
                    "Bois-d'Amont",
                    "La Chaux-du-Dombief",
                    "Fort-du-Plasne"
                  ].map((city) => (
                    <div key={city} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-electric-yellow"></div>
                      <span className="text-slate-600">{city}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-l-electric-yellow shadow-sm">
                <p className="italic text-slate-600 text-sm">
                  "Mon engagement : une transparence totale sur les devis et un travail soigné qui respecte votre intérieur."
                </p>
              </div>
            </div>

            <div className="relative h-[400px] rounded-3xl overflow-hidden bg-slate-50 shadow-xl p-2 border border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1635335874521-7987db781153?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Fils électriques et boîtier de commutation" 
                className="w-full h-full object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-slate-50/90 backdrop-blur-md p-4 rounded-xl flex items-center justify-between shadow-lg border border-slate-200/50">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Disponibilité</p>
                  <p className="font-medium text-slate-800">Lundi - Vendredi : 8h - 18h</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-electric-yellow flex items-center justify-center">
                  <Zap className="w-5 h-5 text-night-blue" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 bg-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-800">Nos Réalisations</h2>
              <p className="text-slate-600 text-lg">
                Découvrez la qualité de nos interventions à travers nos récents chantiers dans le Haut-Jura.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Project 1 */}
            <div className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFibGVhdSUyMCVDMyVBOWwlQzMlQTljdHJpcXVlfGVufDB8fDB8fHww" 
                alt="Tableau électrique neuf" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-blue via-night-blue/40 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-electric-yellow text-sm font-medium mb-1">Mise en sécurité (Morez)</p>
                <h3 className="text-xl font-bold text-white">Remplacement de tableau</h3>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1619140099965-06d74aaf51fa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGhlcm1vc3RhdHxlbnwwfHwwfHx8MA%3D%3D" 
                alt="Chauffage électrique et thermostat" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-blue via-night-blue/40 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-electric-yellow text-sm font-medium mb-1">Chauffage (Les Rousses)</p>
                <h3 className="text-xl font-bold text-white">Radiateurs à inertie & Thermostat</h3>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1721045028160-3637f5063047?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMxfHx8ZW58MHx8fHx8" 
                alt="Éclairage intérieur" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-blue via-night-blue/40 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-electric-yellow text-sm font-medium mb-1">Rénovation (Morbier)</p>
                <h3 className="text-xl font-bold text-white">Éclairage LED & Prises</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden bg-night-blue text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-yellow/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-dark p-10 md:p-16 rounded-3xl">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à démarrer votre projet ?</h2>
                <p className="text-gray-300 mb-8 text-lg">
                  Demandez votre devis gratuit. Nous vous recontactons sous 24h pour discuter de vos besoins électriques.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-electric-yellow" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Appelez-nous directement</p>
                      <a href="tel:0782800552" className="text-xl font-semibold hover:text-electric-yellow transition-colors">07 82 80 05 52</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-electric-yellow" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Envoyez-nous un email</p>
                      <a href="mailto:contact@rk-electricite-39.fr" className="text-xl font-semibold hover:text-electric-yellow transition-colors">contact@rk-electricite-39.fr</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Nom complet *</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full bg-night-blue/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electric-yellow focus:ring-1 focus:ring-electric-yellow transition-colors"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-300">Téléphone *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full bg-night-blue/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electric-yellow focus:ring-1 focus:ring-electric-yellow transition-colors"
                      placeholder="06 00 00 00 00"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium text-gray-300">Type de projet</label>
                  <select 
                    id="service" 
                    value={formData.service}
                    onChange={handleFormChange}
                    className="w-full bg-night-blue/50 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-yellow focus:ring-1 focus:ring-electric-yellow transition-colors appearance-none"
                  >
                    <option value="">Sélectionnez un service...</option>
                    <option value="depannage">Dépannage d'urgence</option>
                    <option value="renovation">Rénovation / Mise aux normes</option>
                    <option value="neuf">Installation neuve</option>
                    <option value="domotique">Domotique</option>
                    <option value="irve">Borne de recharge IRVE</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">Votre message *</label>
                  <textarea 
                    id="message" 
                    required
                    value={formData.message}
                    onChange={handleFormChange}
                    rows={4}
                    className="w-full bg-night-blue/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-electric-yellow focus:ring-1 focus:ring-electric-yellow transition-colors resize-none"
                    placeholder="Décrivez brièvement votre besoin..."
                  ></textarea>
                </div>

                {/* Status Messages */}
                {formStatus === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-emerald-200 text-sm">Votre message a été envoyé avec succès. Nous vous recontacterons très rapidement !</p>
                  </motion.div>
                )}

                {formStatus === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-red-200 text-sm">Une erreur est survenue lors de l'envoi. Veuillez nous contacter directement par téléphone.</p>
                  </motion.div>
                )}

                <button 
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-4 bg-electric-yellow text-night-blue font-bold rounded-xl hover:bg-electric-yellow-hover transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <span>Envoyer ma demande</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-night-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="relative flex items-center justify-center">
              <Zap className="absolute w-10 h-10 text-electric-yellow opacity-80" fill="currentColor" stroke="none" />
              <span className="relative z-10 text-xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                RK ELECTRICITE
              </span>
            </div>
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} RK ELECTRICITE - Artisan Électricien intervenant sur Morez, Morbier, Les Rousses (39400, 39220). Tous droits réservés.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
                <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
              </div>
              <span className="hidden md:inline text-gray-600">|</span>
              <p>
                Création site web par <a href="https://k-vizion.fr" target="_blank" rel="noopener noreferrer" className="text-electric-yellow hover:text-electric-yellow-hover font-semibold transition-colors">K-VIZION</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
