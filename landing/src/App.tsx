import React, { useState, useEffect } from 'react';
import { Play, Users, Clock, ArrowRight, CheckCircle2, Star, Sparkles, MonitorPlay, GraduationCap, Briefcase, Users2 } from 'lucide-react';

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [queueNumber, setQueueNumber] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 8, minutes: 45, seconds: 0 });

  // Simulate countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate API call and get queue number
    setIsSubmitted(true);
    setQueueNumber(Math.floor(Math.random() * 100) + 34); // random number for demo
  };

  const scenarios = [
    { icon: <MonitorPlay className="w-6 h-6 text-primary" />, title: 'Стартап-питч', desc: 'Убеди инвесторов и закрой раунд' },
    { icon: <Users className="w-6 h-6 text-primary" />, title: 'Demo Day', desc: 'Выступи идеально перед акселератором' },
    { icon: <GraduationCap className="w-6 h-6 text-primary" />, title: 'Защита диплома', desc: 'Пройди комиссию без запинки' },
    { icon: <Briefcase className="w-6 h-6 text-primary" />, title: 'Корпоративный борд', desc: 'Защити стратегию перед советом директоров' },
    { icon: <Star className="w-6 h-6 text-primary" />, title: 'Хакатон', desc: 'Презентуй продукт за 3 минуты' },
    { icon: <Users2 className="w-6 h-6 text-primary" />, title: 'Школьная презентация', desc: 'Получи высший балл за проект' },
  ];

  return (
    <div className="min-h-screen bg-darker text-gray-100 font-sans selection:bg-primary selection:text-black">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Play className="w-5 h-5 text-black fill-black" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">PitchAI</span>
          </div>
          <a href="#waitlist" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">
            Присоединиться к Waitlist
          </a>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-primary)_0%,_transparent_20%)] opacity-10 blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                <span>Революция в подготовке к выступлениям</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                Тренажёр публичных <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">
                  выступлений с ИИ
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                Загрузи презентацию и фото жюри. ИИ оживит его в <strong className="text-white font-semibold">говорящий аватар</strong>. Выступай вживую — аватар смотрит слайды, слушает тебя и задаёт острые вопросы.
              </p>

              {/* Waitlist Form Area */}
              <div id="waitlist" className="max-w-md mx-auto bg-card border border-border rounded-2xl p-6 shadow-2xl relative">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-left mb-6">
                      <h3 className="text-lg font-semibold text-white">Получить ранний доступ</h3>
                      <p className="text-sm text-gray-400">Демо откроется совсем скоро</p>
                    </div>
                    
                    <div className="relative">
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="твой@email.com" 
                        required
                        className="w-full bg-darker border border-border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full bg-primary hover:bg-yellow-500 text-black font-bold rounded-xl px-4 py-3 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95"
                    >
                      Встать в очередь
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-6 space-y-4 animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Вы в списке!</h3>
                    <div className="bg-darker border border-border rounded-xl p-4 inline-block">
                      <p className="text-sm text-gray-400 mb-1">Ваше место в очереди</p>
                      <p className="text-4xl font-black text-primary">#{queueNumber}</p>
                    </div>
                    <p className="text-sm text-gray-400 mt-4">
                      Мы пришлем приглашение на {email}
                    </p>
                  </div>
                )}
              </div>

              {/* Stats & Timer */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto border-t border-border/50 pt-12">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Users className="w-5 h-5" />
                    <span className="font-medium">Уже ждут демо</span>
                  </div>
                  <span className="text-4xl font-bold text-white">1,284</span>
                  <span className="text-sm text-gray-500">пользователя зарегистрировано</span>
                </div>
                
                <div className="flex flex-col items-center justify-center space-y-2 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-border/50 hidden md:block"></div>
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">До открытия демо</span>
                  </div>
                  <div className="flex gap-3 text-center">
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-primary w-12">{timeLeft.days}</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider">Дней</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-600">:</span>
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-primary w-12">{timeLeft.hours.toString().padStart(2, '0')}</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider">Часов</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-600">:</span>
                    <div className="flex flex-col">
                      <span className="text-3xl font-bold text-primary w-12">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider">Минут</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Killer Feature Section */}
        <section className="py-24 bg-card border-y border-border relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Живой аватар из <span className="text-primary">любого фото</span>
                </h2>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  Такого нет ни у одного конкурента. Загрузи фото реального инвестора, профессора или строгого босса. ИИ проанализирует контекст твоей презентации и характер аудитории, чтобы задавать именно те вопросы, которых ты боишься больше всего.
                </p>
                <ul className="space-y-4">
                  {[
                    'Эмоциональная реакция на твой питч',
                    'Сложные вопросы в реальном времени',
                    'Анализ зрительного контакта и уверенности',
                    'Детальная скоркарта после выступления'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-darker border border-border p-4 relative shadow-2xl overflow-hidden">
                  {/* Mockup of UI */}
                  <div className="absolute inset-0 bg-gradient-to-br from-darker to-card z-0"></div>
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-4 border-b border-border pb-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                      </div>
                      <span className="text-xs font-mono text-gray-500">Live Session</span>
                    </div>
                    
                    <div className="flex-1 flex flex-col md:flex-row gap-4">
                      <div className="flex-1 bg-darker rounded-xl border border-border/50 flex items-center justify-center relative overflow-hidden">
                        <div className="text-gray-600 font-medium">Твоя камера</div>
                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-xs text-gray-400">Recording</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 bg-dark rounded-xl border border-primary/30 relative overflow-hidden shadow-[0_0_30px_rgba(251,191,36,0.1)]">
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <div className="w-24 h-24 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center mb-4 relative">
                              <Users className="w-10 h-10 text-primary/80" />
                              <div className="absolute -bottom-2 -right-2 bg-primary text-black text-[10px] font-bold px-2 py-1 rounded-md">AI Avatar</div>
                           </div>
                           <div className="bg-darker/80 backdrop-blur-sm border border-border px-4 py-2 rounded-lg max-w-[80%] text-center">
                              <p className="text-sm text-gray-300">"Ваша бизнес-модель выглядит рискованной. Как вы планируете снизить CAC?"</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scenarios Section */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Для любых сценариев</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">От школьной парты до зала заседаний совета директоров. Тренируйся перед той аудиторией, которая тебе нужна.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scenarios.map((scenario, idx) => (
                <div key={idx} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors group">
                  <div className="w-12 h-12 bg-darker rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {scenario.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{scenario.title}</h3>
                  <p className="text-gray-400">{scenario.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Play className="w-3 h-3 text-black fill-black" />
            </div>
            <span className="font-bold text-lg text-white">PitchAI</span>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} PitchAI. Все права защищены.
          </p>
          <div className="flex gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">Telegram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
