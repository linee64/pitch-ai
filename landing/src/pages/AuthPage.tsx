import React, { useState, useEffect } from 'react';
import { Play, Mail, Lock, ArrowRight } from 'lucide-react';
import { DarkVeil } from '../components/DarkVeil';
import { Link } from 'react-router-dom';

const slides = [
  {
    title: "Добро пожаловать \nв сообщество",
    description: "Тренируй свои питчи, побеждай страх сцены и закрывай раунды уверенно вместе с ИИ."
  },
  {
    title: "Анализ \nв реальном времени",
    description: "Наш ИИ-аватар анализирует вашу скорость речи, эмоции, уверенность и зрительный контакт."
  },
  {
    title: "Готовность \nна 100%",
    description: "Отрепетируйте ответы на самые каверзные вопросы перед живым выступлением."
  }
];

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(false); // Default to register for waitlist
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-darker text-gray-100 font-sans selection:bg-primary selection:text-black relative flex flex-col justify-center items-center py-6 px-4 overflow-y-auto w-full">
      {/* Background DarkVeil Component, positioned fixed so scrolling works over it */}
      <div className="fixed inset-[-1%] w-[102%] h-[102%] z-0 pointer-events-none" style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
        <DarkVeil
          hueShift={55}
          noiseIntensity={0.04}
          scanlineIntensity={0.2}
          speed={0.8}
          warpAmount={0.5}
        />
      </div>

      {/* Decorative Background Glows */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none z-0"></div>

      {/* Main Content Card Container - REDUCED SCALE */}
      <div className="z-10 w-full max-w-[850px] sm:rounded-[2rem] rounded-2xl overflow-hidden bg-white/[0.03] backdrop-blur-2xl border border-white/10 flex flex-col md:flex-row shadow-[0_20px_80px_-20px_rgba(251,191,36,0.15)] relative min-h-[480px]">
        
        {/* Subtle inner top highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none z-20"></div>

        {/* === Left Side: Decor / PitchAI Branding === */}
        <div className="w-full md:w-[45%] relative bg-gradient-to-br from-primary/10 via-transparent to-transparent flex flex-col p-6 sm:p-8 border-b md:border-b-0 md:border-r border-white/10 overflow-hidden min-h-[280px] md:min-h-auto flex-shrink-0">
          
          {/* Abstract background shapes */}
          <div className="absolute top-[-20%] left-[-20%] w-60 h-60 bg-primary/20 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-48 h-48 bg-primary/10 blur-[60px] rounded-full pointer-events-none"></div>
          
          {/* Waves pattern tailored for dark mode */}
          <div 
            className="absolute -bottom-10 left-0 w-[150%] h-[50%] opacity-[0.03] pointer-events-none origin-bottom-left"
            style={{ 
              background: 'repeating-linear-gradient(0deg, #ffffff 0px, #ffffff 2px, transparent 2px, transparent 24px)',
              transform: 'skewY(-8deg) scale(1.5)'
            }}
          />

          <div className="relative z-10 flex flex-col h-full">
            <Link to="/" className="flex items-center gap-3 mb-8 w-max group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:scale-105 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                <Play className="w-4 h-4 text-black fill-black ml-0.5" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white group-hover:text-primary transition-colors">PitchAI</span>
            </Link>
            
            <div className="mt-auto bg-black/20 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/30 transition-colors"></div>
              
              {/* Animated text section */}
              <div className="relative min-h-[120px] w-full">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 transform ${
                      index === currentSlide ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-4 pointer-events-none'
                    }`}
                  >
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight font-sans relative z-10 whitespace-pre-line">
                      {slide.title}
                    </h2>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed relative z-10 max-w-sm">
                      {slide.description}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Pagination Dots */}
              <div className="flex justify-start gap-2 mt-2 relative z-10 items-center">
                {slides.map((_, index) => (
                  <div 
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer shadow-[0_0_8px_rgba(251,191,36,0.5)]
                      ${index === currentSlide ? 'w-6 bg-primary' : 'w-2 bg-primary/30 hover:bg-primary/50'}
                    `}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* === Right Side: Form === */}
        <div className="w-full md:w-[55%] p-6 sm:p-8 lg:p-10 relative flex flex-col justify-center bg-black/20 md:bg-transparent">
          <div className="w-full max-w-[320px] mx-auto">
            <h1 className="text-2xl font-extrabold text-white mb-6 text-center md:text-left tracking-tight">
              {isLogin ? 'С возвращением!' : 'Создайте аккаунт'}
            </h1>

            <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
              {/* Email Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                </div>
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 hover:border-white/20 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none text-sm"
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                </div>
                <input 
                  type="password" 
                  placeholder="Пароль" 
                  className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 hover:border-white/20 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none text-sm"
                />
              </div>

              <div className="flex justify-end pt-0.5">
                <a href="#" className="text-xs font-medium text-gray-400 hover:text-primary transition-colors">
                  Забыли пароль?
                </a>
              </div>

              <button className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3 rounded-xl shadow-[0_0_15px_rgba(251,191,36,0.2)] hover:shadow-[0_0_20px_rgba(251,191,36,0.35)] transition-all transform active:scale-[0.98] mt-2 flex justify-center items-center gap-2 outline-none text-sm">
                {isLogin ? 'Войти' : 'Продолжить'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Social Authentication */}
            <div className="mt-6 text-center">
              <div className="relative flex items-center mb-5">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink-0 mx-4 text-[10px] font-semibold text-gray-500 uppercase tracking-widest whitespace-nowrap">Или продолжить через</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>
              
              <button className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors py-3 rounded-xl group text-white font-medium text-sm">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.74 0 3.3.6 4.53 1.76l3.39-3.39C17.85 1.53 15.15 0 12 0 7.31 0 3.25 2.69 1.25 6.6l3.96 3.07C6.15 7.15 8.85 5.04 12 5.04z"/><path fill="#FBBC05" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.89 3.02c2.27-2.1 3.53-5.2 3.53-8.84z"/><path fill="#4285F4" d="M5.21 14.73c-.25-.76-.39-1.56-.39-2.4 0-.84.14-1.64.39-2.4L1.25 6.6C.45 8.21 0 10.05 0 12s.45 3.79 1.25 5.4l3.96-3.07z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.89-3.02c-1.11.75-2.53 1.19-4.04 1.19-3.15 0-5.85-2.11-6.8-5.04L1.25 17.4C3.25 21.31 7.31 24 12 24z"/>
                </svg>
                Google
              </button>
            </div>

            <div className="mt-8 text-center pt-2">
              <p className="text-xs text-gray-500 font-medium">
                {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
                <button 
                  onClick={() => setIsLogin(!isLogin)} 
                  className="text-primary font-bold hover:text-yellow-400 hover:underline underline-offset-4 transition-all"
                >
                  {isLogin ? 'Зарегистрироваться' : 'Войти'}
                </button>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

