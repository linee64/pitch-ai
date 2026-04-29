import { useParams, Link, useNavigate } from "react-router-dom";
import { AppShell } from "@/components/confly/AppShell";
import { scenarios, personas } from "@/data/confly";
import { Upload, FileText, Check, ArrowRight, Flame, Clock } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/i18n/i18n";

const Setup = () => {
  const { t } = useI18n();
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const scenario = scenarios.find(s => s.id === scenarioId) ?? scenarios[0];
  const [picked, setPicked] = useState(scenario.recommendedPersonaIds[0] ?? personas[0].id);
  const [intensity, setIntensity] = useState(scenario.intensity || 7);
  const [uploaded, setUploaded] = useState(false);
  const pickedPersona = personas.find(p => p.id === picked)!;

  const intensityLabel = (key: "interrupt" | "tone") => {
    if (key === "interrupt") return intensity > 7 ? t("setup.frequent") : intensity > 4 ? t("setup.moderate") : t("setup.rare");
    return intensity > 7 ? t("setup.hostile") : intensity > 4 ? t("setup.skeptical") : t("setup.curious");
  };

  return (
    <AppShell title={t(`sc.${scenario.id}.t`)} subtitle={t(`sc.${scenario.id}.d`)}>
      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card/60 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="size-7 rounded-md bg-fluid text-background grid place-items-center font-display text-sm font-bold">1</div>
              <h3 className="font-display text-xl font-bold tracking-tight">{t("setup.step1")}</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {personas.map(p => {
                const active = picked === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPicked(p.id)}
                    className={`relative text-left rounded-xl overflow-hidden border transition-all ${active ? "border-primary shadow-glow-cyan" : "border-border hover:border-primary/40"}`}
                  >
                    <div className="flex gap-4 p-3">
                      <div className="relative size-20 rounded-lg overflow-hidden shrink-0 bg-secondary">
                        <img src={p.image} alt={p.name} loading="lazy" width={768} height={960} className="size-full object-cover mix-blend-luminosity opacity-90" />
                      </div>
                      <div className="flex-1 min-w-0 py-1">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-primary truncate">{t(`p.${p.id}.arc`)}</div>
                        <div className="font-display font-bold mt-0.5 truncate">{p.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{t(`p.${p.id}.role`)}</div>
                        <div className="flex items-center gap-1.5 mt-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                          <Flame className="size-3 text-primary" /> {p.hostility}/10
                        </div>
                      </div>
                      {active && <div className="size-5 rounded-full bg-primary text-background grid place-items-center"><Check className="size-3" strokeWidth={3} /></div>}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card/60 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="size-7 rounded-md bg-fluid text-background grid place-items-center font-display text-sm font-bold">2</div>
              <h3 className="font-display text-xl font-bold tracking-tight">{t("setup.step2")}</h3>
            </div>
            {!uploaded ? (
              <button
                onClick={() => setUploaded(true)}
                className="w-full rounded-xl border-2 border-dashed border-border bg-secondary/20 hover:border-primary/40 hover:bg-secondary/40 transition-all py-12 flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground"
              >
                <div className="size-12 rounded-full bg-secondary grid place-items-center"><Upload className="size-5" /></div>
                <div className="font-display text-lg font-semibold">{t("setup.drop")}</div>
                <div className="text-xs">{t("setup.dropHint")}</div>
              </button>
            ) : (
              <div className="rounded-xl border border-border bg-secondary/40 p-4 flex items-center gap-4">
                <div className="size-12 rounded-lg bg-fluid grid place-items-center text-background"><FileText className="size-5" /></div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">pitch_deck_v8.pdf</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t("setup.slidesLoaded")}</div>
                </div>
                <div className="size-6 rounded-full bg-primary text-background grid place-items-center"><Check className="size-3.5" strokeWidth={3} /></div>
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-border bg-card/60 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="size-7 rounded-md bg-fluid text-background grid place-items-center font-display text-sm font-bold">3</div>
              <h3 className="font-display text-xl font-bold tracking-tight">{t("setup.step3")}</h3>
            </div>
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
              <span>{t("setup.mentor")}</span>
              <span className="text-primary">{t("idx.intensity")} {intensity}/10</span>
              <span>{t("setup.brutal")}</span>
            </div>
            <input type="range" min="1" max="10" value={intensity} onChange={(e) => setIntensity(+e.target.value)} className="w-full accent-primary" />
            <div className="grid grid-cols-3 gap-3 mt-6 text-xs">
              <div className="rounded-lg bg-secondary/40 border border-border p-3">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{t("setup.interrupt")}</div>
                <div className="font-display text-lg font-bold mt-1">{intensityLabel("interrupt")}</div>
              </div>
              <div className="rounded-lg bg-secondary/40 border border-border p-3">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{t("setup.tone")}</div>
                <div className="font-display text-lg font-bold mt-1">{intensityLabel("tone")}</div>
              </div>
              <div className="rounded-lg bg-secondary/40 border border-border p-3">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{t("setup.followups")}</div>
                <div className="font-display text-lg font-bold mt-1">{Math.max(1, Math.round(intensity / 2))}/min</div>
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-32 h-fit">
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="relative aspect-[4/5]">
              <img src={pickedPersona.image} alt="" loading="lazy" width={768} height={960} className="size-full object-cover mix-blend-luminosity opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-[10px] font-mono uppercase tracking-widest text-primary">{t("setup.locked")}</div>
                <div className="font-display text-2xl font-bold mt-1">{pickedPersona.name}</div>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">{t("setup.scenario")}</span><span className="font-medium">{t(`sc.${scenario.id}.t`)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">{t("setup.duration")}</span><span className="font-mono flex items-center gap-1.5"><Clock className="size-3.5" />{scenario.duration}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">{t("idx.intensity")}</span><span className="text-primary font-mono">{intensity}/10</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">{t("setup.slides")}</span><span className="font-medium">{uploaded ? "12" : "—"}</span></div>
              <button onClick={() => navigate(`/session/${scenario.id}?p=${picked}`)} className="w-full h-12 rounded-xl bg-fluid text-background font-semibold text-sm grid place-items-center shadow-glow-cyan hover:scale-[1.01] transition-transform">
                {t("setup.enter")} <ArrowRight className="inline ml-2 size-4" />
              </button>
              <Link to="/" className="block text-center text-xs text-muted-foreground hover:text-foreground">{t("setup.cancel")}</Link>
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
};

export default Setup;
