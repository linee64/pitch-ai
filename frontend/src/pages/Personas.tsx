import { AppShell } from "@/components/confly/AppShell";
import { personas } from "@/data/confly";
import { Plus, Flame } from "lucide-react";
import { useI18n } from "@/i18n/i18n";

const Personas = () => {
  const { t } = useI18n();
  return (
    <AppShell
      title={t("per.title")}
      subtitle={t("per.subtitle")}
      action={
        <button className="h-10 px-5 rounded-lg bg-foreground text-background font-semibold text-sm flex items-center gap-2">
          <Plus className="size-4" /> {t("per.custom")}
        </button>
      }
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {personas.map((p) => (
          <div key={p.id} className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/40 transition-all">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img src={p.image} alt={p.name} loading="lazy" width={768} height={960} className="size-full object-cover mix-blend-luminosity opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
            </div>
            <div className="p-5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-primary">{t(`p.${p.id}.arc`)}</div>
              <h3 className="font-display text-xl font-bold mt-1.5 tracking-tight">{p.name}</h3>
              <div className="text-xs text-muted-foreground mt-0.5">{t(`p.${p.id}.role`)}</div>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed line-clamp-2">{t(`p.${p.id}.style`)}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {p.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}

        <button className="rounded-2xl border-2 border-dashed border-border bg-card/30 hover:border-primary/40 hover:bg-card/60 transition-all aspect-[4/5] sm:aspect-auto min-h-[440px] flex flex-col items-center justify-center gap-3 text-muted-foreground hover:text-foreground">
          <div className="size-12 rounded-full bg-secondary grid place-items-center">
            <Plus className="size-5" />
          </div>
          <div className="font-display text-lg font-semibold">{t("per.uploadTitle")}</div>
          <p className="text-xs text-center max-w-[24ch] leading-relaxed">{t("per.uploadHint")}</p>
        </button>
      </div>
    </AppShell>
  );
};

export default Personas;
