import React, { useState } from 'react';
import {
  Play, ArrowRight, Star, Brain, Menu, X,
  Heart, Shield, Users, Sparkles, MoveRight,
  CheckCircle2, ChevronDown, Mail, Phone, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Assets (Placeholders - Replace with your local images) ---
const IMAGES = {
  // NEW: Abstract calming illustration for the hero section
  heroIllustration: "https://i.pinimg.com/1200x/60/41/e7/6041e73b5114c7116fd8fe855a3689e6.jpg",
  // A calming office space
  about: "https://i.pinimg.com/736x/da/0c/09/da0c09a1b42e80d403a9d6613e195d5c.jpg",
  // Professional headshots
  therapist1: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
  therapist2: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
  therapist3: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
};

// --- Utility Components ---

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const AnimatedBadge = ({ children, className }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`flex items-center gap-2 border border-black/10 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase bg-white/50 backdrop-blur-sm shadow-sm ${className}`}
  >
    {children}
  </motion.div>
);

const AccordionItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-black/10 last:border-0">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center py-6 text-left hover:text-purple-600 transition-colors"
    >
      <span className="text-xl font-medium font-serif">{question}</span>
      <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <p className="pb-6 opacity-60 leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// --- Modal Component ---
const BookingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white w-full max-w-lg rounded-3xl p-8 relative z-10 shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
        <h3 className="text-3xl font-serif mb-2">Let's Talk</h3>
        <p className="opacity-60 mb-6">Fill out this quick form and a care coordinator will reach out within 2 hours.</p>
        <form className="space-y-4">
          <input type="text" placeholder="Your Name" className="w-full p-4 bg-gray-50 rounded-xl border-transparent focus:border-black focus:ring-0 transition" />
          <input type="email" placeholder="Email Address" className="w-full p-4 bg-gray-50 rounded-xl border-transparent focus:border-black focus:ring-0 transition" />
          <select className="w-full p-4 bg-gray-50 rounded-xl border-transparent focus:border-black focus:ring-0 transition opacity-60">
            <option>I'm feeling anxious</option>
            <option>I'm feeling depressed</option>
            <option>I need relationship advice</option>
            <option>Just need to talk</option>
          </select>
          <button className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-purple-600 transition">Request Consultation</button>
        </form>
      </motion.div>
    </div>
  );
};

// --- Main Application ---

const RaftFullPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(0);

  // Smooth Scroll Helper
  const scrollTo = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F7] font-sans text-[#1A1A1A] overflow-x-hidden selection:bg-purple-200">
      <AnimatePresence>
        {isModalOpen && <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>

      <nav className="fixed top-0 w-full z-50 bg-[#F0F4F7]/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 z-50 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <div className="w-4 h-2 bg-white rounded-full opacity-80"></div>
            </div>
            <span className="text-2xl font-bold tracking-tight font-serif">Raft</span>
          </div>


          <div className="hidden md:flex gap-10 text-sm font-medium opacity-70">
            {['About', 'Services', 'Team', 'FAQ'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="hover:opacity-100 hover:text-black transition-colors">
                {item}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="font-semibold text-sm hover:opacity-70">Log In</button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition transform hover:-translate-y-0.5"
            >
              Get Started <ArrowRight size={16} />
            </button>
          </div>

          <button className="md:hidden z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full h-screen bg-[#F0F4F7] pt-24 px-6 flex flex-col gap-8 md:hidden"
            >
              {['About', 'Services', 'Team', 'FAQ'].map((item) => (
                <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-3xl font-serif font-medium text-left">{item}</button>
              ))}
              <hr className="border-black/10" />
              <button onClick={() => { setIsMobileMenuOpen(false); setIsModalOpen(true); }} className="w-full py-4 bg-black text-white rounded-full font-bold">Get Started</button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <header className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-4 items-center min-h-[90vh]">
        <div className="lg:col-span-3 order-2 lg:order-1">
          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <div className="relative w-20 h-20">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-dashed border-black rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center"><Star fill="black" size={24} /></div>
              </div>
              <p className="text-xl font-medium leading-tight">You <span className="font-bold">don't</span> have to <span className="underline decoration-wavy decoration-orange-400">struggle</span> in silence.</p>
              <button className="flex items-center gap-3 text-sm font-bold group">
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center group-hover:scale-110 transition"><Play fill="white" size={14} /></div>
                WATCH INTRO
              </button>
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-center text-center relative z-10">
          <FadeIn>
            <h1 className="text-7xl md:text-9xl font-serif mb-6 leading-[0.85] tracking-tight">
              Mental <span className="text-yellow-500 inline-block animate-pulse">✦</span><br />Health
            </h1>
          </FadeIn>

          
          <motion.div
            className="relative w-full max-w-md h-auto md:w-[500px] md:h-[500px] -mt-4 md:-mt-12"
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}
          >
  
            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full flex items-center justify-center"
            >
              <img
                src={IMAGES.heroIllustration}
                alt="Mental Health Illustration"
                className="w-full h-full object-cover shadow-2xl border-8 border-white/30"
                style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="lg:col-span-3 order-3 flex flex-col justify-end items-end text-right h-full">
          <FadeIn delay={0.4}>
            <h3 className="text-4xl font-serif italic mb-2">Balance</h3>
            <p className="text-sm opacity-60 leading-relaxed max-w-[200px]">Finding stability between your inner peace and the chaotic outer world.</p>
          </FadeIn>
        </div>
      </header>

      <div className="bg-white py-8 border-y border-black/5 overflow-hidden">
        <div className="flex gap-12 animate-scroll whitespace-nowrap min-w-full justify-center opacity-40 grayscale">
          {['Global Health', 'Mindful Corp', 'TechCare', 'Wellness IO', 'Balance Sheet', 'Zenith', 'Nova Care'].map((logo, i) => (
            <span key={i} className="text-xl font-bold font-serif px-8">{logo}</span>
          ))}
        </div>
      </div>

      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="relative">
              <img src={IMAGES.about} alt="Office" className="rounded-[3rem] shadow-2xl w-full object-cover h-[500px]" />
              <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
                <p className="font-serif text-lg italic">"The first step towards healing is realizing you don't have to take it alone."</p>
              </div>
            </div>
          </FadeIn>
          <div className="space-y-8">
            <AnimatedBadge className="w-fit">Our Mission</AnimatedBadge>
            <h2 className="text-5xl font-serif leading-tight">Bridging the gap between <span className="italic text-purple-600">chaos</span> and clarity.</h2>
            <p className="text-lg opacity-70 leading-relaxed">
              Raft was born from a simple idea: mental healthcare shouldn't feel like a clinical transaction. It should feel like a conversation with a trusted friend who happens to be an expert.
            </p>
            <ul className="space-y-4">
              {[
                "Compassion-first methodology",
                "Science-backed cognitive therapies",
                "Accessible from anywhere, anytime"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-medium">
                  <CheckCircle2 className="text-green-500" size={20} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 px-6 max-w-7xl mx-auto bg-white rounded-[3rem] my-12 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Ways we can help</h2>
          <p className="opacity-60">We offer a variety of therapeutic approaches tailored to your unique mind.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Individual Therapy", icon: Users, desc: "One-on-one sessions aimed at personal growth and healing." },
            { title: "Couples Counseling", icon: Heart, desc: "Navigate relationship dynamics with a neutral mediator." },
            { title: "Emergency Support", icon: Shield, desc: "Immediate resources when things feel overwhelming." },
            { title: "Psychiatry", icon: Brain, desc: "Medical medication management for chemical imbalances." },
            { title: "Group Workshops", icon: Sparkles, desc: "Learn coping mechanisms alongside peers." },
            { title: "Digital Tools", icon: Play, desc: "Access our library of meditations and journals." }
          ].map((service, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-[#F0F4F7] hover:bg-black hover:text-white transition-all duration-300 group cursor-pointer h-full"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 text-black group-hover:bg-gray-800 group-hover:text-white transition">
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="opacity-60 group-hover:opacity-80 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8 sticky top-32 h-fit">
            <h2 className="text-5xl font-serif">Your journey, <br /> simplified.</h2>
            <p className="opacity-60 text-lg">We've removed the hurdles. Getting help is now as easy as booking a cab.</p>
            <button onClick={() => setIsModalOpen(true)} className="bg-black text-white px-8 py-4 rounded-full font-bold">Start Matching</button>
          </div>
          <div className="space-y-12">
            {[
              { step: "01", title: "The Assessment", desc: "Take a 5-minute quiz to help us understand your needs, preferences, and goals." },
              { step: "02", title: "The Match", desc: "Our algorithm pairs you with 3 therapists who fit your profile. You choose the vibe." },
              { step: "03", title: "The Session", desc: "Meet via video, audio, or text. Whatever makes you feel most safe." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 border-b border-black/10 pb-12 last:border-0">
                <span className="text-4xl font-serif text-purple-400 opacity-50">{item.step}</span>
                <div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="opacity-60 leading-relaxed max-w-md">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-24 bg-black text-[#F0F4F7] rounded-t-[3rem] md:rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-yellow-400 font-bold tracking-widest text-sm uppercase mb-2 block">Our Specialists</span>
              <h2 className="text-5xl font-serif">Meet the minds.</h2>
            </div>
            <p className="text-gray-400 max-w-sm text-right">Licensed, vetted, and deeply empathetic experts ready to guide you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Dr. Sarah Jenkins", role: "Clinical Psychologist", img: IMAGES.therapist1 },
              { name: "Marc Thompson", role: "Family Therapist", img: IMAGES.therapist2 },
              { name: "Elena Rodriguez", role: "Mindfulness Coach", img: IMAGES.therapist3 },
            ].map((member, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="group">
                <div className="overflow-hidden rounded-2xl mb-6 relative">
                  <img src={member.img} alt={member.name} className="w-full h-[400px] object-cover grayscale group-hover:grayscale-0 transition duration-500" />
                  <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition">
                    <MoveRight className="text-white" size={20} />
                  </div>
                </div>
                <h3 className="text-2xl font-serif">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-24 px-6 max-w-3xl mx-auto">
        <h2 className="text-4xl font-serif text-center mb-12">Common Questions</h2>
        <div className="space-y-2">
          {[
            { q: "Is Raft covered by insurance?", a: "Yes, we accept most major insurance providers including Aetna, Cigna, and BlueCross. We also offer sliding scale options." },
            { q: "Can I switch therapists if it's not a match?", a: "Absolutely. The relationship is key. If you don't click, you can switch instantly via your dashboard, no awkward conversations needed." },
            { q: "Is my data 100% private?", a: "We are fully HIPAA compliant. Your sessions are encrypted and never recorded without explicit consent." },
            { q: "How long are the sessions?", a: "Standard sessions are 50 minutes, but we also offer 30-minute check-ins and 90-minute intensive sessions." }
          ].map((faq, i) => (
            <AccordionItem
              key={i}
              question={faq.q}
              answer={faq.a}
              isOpen={openAccordion === i}
              onClick={() => setOpenAccordion(i === openAccordion ? null : i)}
            />
          ))}
        </div>
      </section>

      <footer className="bg-[#121212] text-white pt-24 pb-12 px-6 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-5 space-y-8">
            <h2 className="text-6xl font-serif">Let's connect.</h2>
            <p className="text-gray-400 max-w-md">Ready to start? Or just have a question? We're here.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-300"><Mail size={20} /> hello@raft.health</div>
              <div className="flex items-center gap-4 text-gray-300"><Phone size={20} /> +1 (555) 252-1234</div>
              <div className="flex items-center gap-4 text-gray-300"><MapPin size={20} /> 123 Wellness Blvd, NY</div>
            </div>
          </div>

          <div className="md:col-span-7 bg-white/5 p-8 rounded-3xl border border-white/10">
            <form className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Name" className="bg-transparent border-b border-white/20 p-4 focus:border-white outline-none transition" />
                <input type="email" placeholder="Email" className="bg-transparent border-b border-white/20 p-4 focus:border-white outline-none transition" />
              </div>
              <textarea placeholder="How can we help?" rows="4" className="bg-transparent border-b border-white/20 p-4 focus:border-white outline-none transition"></textarea>
              <button className="bg-white text-black py-4 rounded-xl font-bold hover:bg-purple-200 transition mt-4">Send Message</button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between text-sm text-gray-500">
          <p>© 2025 Raft Mental Health Inc.</p>
          <p className='mt-3'>Developed By Akinremi Daniel</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RaftFullPage;