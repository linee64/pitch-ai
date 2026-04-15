import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Users, Clock, ArrowRight, CheckCircle2, Star, Sparkles, MonitorPlay, GraduationCap, Briefcase, Users2, Zap } from 'lucide-react';
import { DarkVeil } from '../components/DarkVeil';
import { DecryptedText } from '../components/DecryptedText';
import { CardStack } from "../components/ui/card-stack";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export function LandingPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 8, minutes: 45, seconds: 0 });
  const [typewriterWordIndex, setTypewriterWordIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const scenarioTitleRef = useRef<HTMLHeadingElement | null>(null);
  const typewriterWords = useMemo(
    () => ["выступлений с ИИ", "питчей с ИИ", "презентаций с ИИ"],
    []
  );

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

  useEffect(() => {
    const fullWord = typewriterWords[typewriterWordIndex];
    let timeoutId: ReturnType<typeof setTimeout>;

    if (typedText.length < fullWord.length) {
      timeoutId = setTimeout(() => {
        setTypedText(fullWord.slice(0, typedText.length + 1));
      }, 55);
    } else {
      timeoutId = setTimeout(() => {
        setTypedText("");
        setTypewriterWordIndex((prev) => (prev + 1) % typewriterWords.length);
      }, 1400);
    }

    return () => clearTimeout(timeoutId);
  }, [typedText, typewriterWordIndex, typewriterWords]);

  useEffect(() => {
    if (!scenarioTitleRef.current) return;
    const chars = scenarioTitleRef.current.querySelectorAll("span");
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { opacity: 0, y: 28, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.025,
          scrollTrigger: {
            trigger: scenarioTitleRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, scenarioTitleRef);

    return () => ctx.revert();
  }, []);

  const scenarios = [
    {
      id: 1,
      icon: <MonitorPlay className="w-6 h-6 text-primary" />,
      title: 'Стартап-питч',
      desc: 'Убеди инвесторов и закрой раунд с ИИ-аватаром, который задаст самые каверзные вопросы.'
    },
    {
      id: 2,
      icon: <Users className="w-6 h-6 text-primary" />,
      title: 'Demo Day',
      desc: 'Выступи идеально перед акселератором, заранее отработав стрессовые ситуации.'
    },
    {
      id: 3,
      icon: <GraduationCap className="w-6 h-6 text-primary" />,
      title: 'Защита диплома',
      desc: 'Пройди строгую комиссию без единой запинки. Прорепетируй свой доклад от и до.'
    },
    {
      id: 4,
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      title: 'Корпоративный борд',
      desc: 'Уверенно защити стратегию перед советом директоров, готовым к детальным расспросам.'
    },
    {
      id: 5,
      icon: <Star className="w-6 h-6 text-primary" />,
      title: 'Хакатон',
      desc: 'Презентуй продукт ровно за 3 минуты. Аватар проверит твой тайминг и уверенность подачи.'
    },
    {
      id: 6,
      icon: <Users2 className="w-6 h-6 text-primary" />,
      title: 'Школьная презентация',
      desc: 'Получи высший балл за проект, смело отрепетировав его с требовательным учителем.'
    },
  ];

  return (
    <div className="min-h-screen bg-darker text-gray-100 font-sans selection:bg-primary selection:text-black relative">
      {/* Background DarkVeil Component */}
      <div className="fixed inset-[-1%] w-[102%] h-[102%] z-0 pointer-events-none" style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
        <DarkVeil
          hueShift={55}
          noiseIntensity={0.04}
          scanlineIntensity={0.2}
          speed={0.8}
          warpAmount={0.5}
        />
      </div>

      {/* Navigation */}
      <nav className="border-b border-border/50 bg-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Play className="w-5 h-5 text-black fill-black" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">PitchAI</span>
          </div>
          <Link to="/auth" className="text-sm font-medium text-primary border border-primary/30 px-5 py-2.5 rounded-xl hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 shadow-[0_0_15px_rgba(251,191,36,0.05)] hover:shadow-[0_0_20px_rgba(251,191,36,0.15)]">
            Присоединиться к Waitlist
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-primary)_0%,_transparent_20%)] opacity-10 blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight min-h-[190px] md:min-h-[210px]">
                Тренажёр публичных <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200 inline-flex items-end gap-1">
                  {typedText}
                  <span className="inline-block w-[3px] h-[0.95em] bg-primary animate-pulse rounded-full" />
                </span>
              </h1>

              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                Загрузи презентацию и фото жюри. ИИ оживит его в <strong className="text-white font-semibold">говорящий аватар</strong>. Выступай вживую — аватар смотрит слайды, слушает тебя и задаёт острые вопросы.
              </p>

              {/* Stats & Timer */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto border-t border-border/50 pt-12">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="flex items-center gap-2 text-gray-400 mb-2 text-lg">
                    <Users className="w-6 h-6" />
                    <span className="font-medium tracking-wide">Уже ждут демо</span>
                  </div>
                  <span className="text-5xl md:text-6xl font-bold text-white tracking-tight">1,284</span>
                  <span className="text-base text-gray-500">пользователя зарегистрировано</span>
                </div>

                <div className="flex flex-col items-center justify-center space-y-3 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-border/50 hidden md:block"></div>
                  <div className="flex items-center gap-2 text-gray-400 mb-2 text-lg">
                    <Sparkles className="w-6 h-6 text-primary/80" />
                    <span className="font-medium tracking-wide">Ваше место в списке</span>
                  </div>
                  <span className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200 tracking-tight">#31</span>
                  <span className="text-base text-gray-500">среди всех ожидающих</span>
                </div>
                
                <div className="flex flex-col items-center justify-center space-y-3 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-border/50 hidden md:block"></div>
                  <div className="flex items-center gap-2 text-gray-400 mb-2 text-lg">
                    <Clock className="w-6 h-6" />
                    <span className="font-medium tracking-wide">До открытия демо</span>
                  </div>
                  <div className="flex gap-4 text-center items-center">
                    <div className="flex flex-col">
                      <span className="text-4xl md:text-5xl font-bold text-primary w-16 tracking-tight">{timeLeft.days}</span>
                      <span className="text-[11px] text-gray-500 uppercase tracking-widest mt-1">Дней</span>
                    </div>
                    <span className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">:</span>
                    <div className="flex flex-col">
                      <span className="text-4xl md:text-5xl font-bold text-primary w-16 tracking-tight">{timeLeft.hours.toString().padStart(2, '0')}</span>
                      <span className="text-[11px] text-gray-500 uppercase tracking-widest mt-1">Часов</span>
                    </div>
                    <span className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">:</span>
                    <div className="flex flex-col">
                      <span className="text-4xl md:text-5xl font-bold text-primary w-16 tracking-tight">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                      <span className="text-[11px] text-gray-500 uppercase tracking-widest mt-1">Минут</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Killer Feature Section */}
        <section className="py-24 relative">
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
          <div className="absolute top-10 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-8 sm:px-16 lg:px-24 relative z-10">
            <div className="grid md:grid-cols-2 gap-20 lg:gap-24 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                  Живой аватар из <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200 block md:inline">любого фото</span>
                </h2>
                <p className="text-lg text-gray-300 font-medium mb-8 leading-relaxed">
                  Загрузи фото реального инвестора, профессора или строгого босса. ИИ проанализирует контекст твоей презентации и характер аудитории, чтобы задавать именно те вопросы, которых ты боишься больше всего.
                </p>
                <ul className="space-y-4">
                  {[
                    'Эмоциональная реакция на твой питч',
                    'Сложные вопросы в реальном времени',
                    'Анализ зрительного контакта и уверенности',
                    'Детальная скоркарта после выступления'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300 group cursor-default">
                      <Zap className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 group-hover:text-yellow-400 transition-all duration-300" />
                      <span>
                        <DecryptedText
                          text={item}
                          animateOn="view"
                          speed={40}
                          maxIterations={10}
                          sequential={true}
                          className="text-gray-300"
                          encryptedClassName="text-gray-500 font-mono"
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl p-4 relative shadow-[0_20px_80px_rgba(0,0,0,0.35)] overflow-hidden">
                  {/* Mockup of UI */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent z-0"></div>
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                      </div>
                      <span className="text-xs font-mono text-gray-500">Live Session</span>
                    </div>

                    <div className="flex-1 flex flex-col md:flex-row gap-4">
                      <div className="flex-1 bg-black/20 rounded-xl border border-white/10 backdrop-blur-sm flex items-center justify-center relative overflow-hidden">
                        <div className="text-gray-600 font-medium">Твоя камера</div>
                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-xs text-gray-400">Recording</span>
                        </div>
                      </div>

                      <div className="flex-1 bg-black/25 rounded-xl border border-primary/30 relative overflow-hidden shadow-[0_0_30px_rgba(251,191,36,0.12)] backdrop-blur-sm">
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-black/30 border-2 border-primary/50 flex items-center justify-center mb-4 relative backdrop-blur-sm">
                            <Users className="w-10 h-10 text-primary/80" />
                            <div className="absolute -bottom-2 -right-2 bg-primary text-black text-[10px] font-bold px-2 py-1 rounded-md">AI Avatar</div>
                          </div>
                          <div className="bg-black/40 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-lg max-w-[80%] text-center">
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
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="text-left">
                <h2 ref={scenarioTitleRef} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                  {"Для любых сценариев".split("").map((char, index) => (
                    <span key={`${char}-${index}`} className="inline-block whitespace-pre opacity-0">
                      {char}
                    </span>
                  ))}
                </h2>
                <p className="text-xl text-gray-300 font-medium leading-relaxed mb-8">
                  От школьной парты до зала заседаний совета директоров. Тренируйся перед той аудиторией, которая тебе нужна.
                </p>
                <p className="text-primary font-medium flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Кликай по карточкам справа, чтобы посмотреть сценарии
                </p>
              </div>

              <div className="flex items-center justify-center h-[400px] relative">
                <CardStack items={scenarios} />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-white/[0.03] backdrop-blur-xl py-6">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <Play className="w-3 h-3 text-black fill-black" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">PitchAI</span>
          </div>
          <div className="text-sm text-gray-500">
            © 2026 PitchAI. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
