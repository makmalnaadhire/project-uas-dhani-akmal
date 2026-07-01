"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Briefcase,
  Palette,
  Code2,
  Gamepad2,
  Film,
  Wallet,
  PackageCheck,
  Sparkles,
  RefreshCcw,
  ArrowRight,
  ArrowLeft,
  Check,
  Cpu,
  MemoryStick,
  HardDrive,
  MonitorSmartphone,
  Star,
} from "lucide-react";
import laptopsData from "@/data/laptops.json";

/* ---------------------------------- Types ---------------------------------- */

type NeedId = "office" | "desain" | "programming" | "gaming" | "multimedia";
type ConditionId = "baru" | "second" | "bebas";

type Laptop = {
  id: string;
  name: string;
  brand: string;
  price: number;
  condition: "baru" | "second";
  needs: string[];
  specs: { processor: string; ram: string; storage: string; gpu: string };
  screen: string;
  rating: number;
  description: string;
};

type Answers = {
  need: NeedId | null;
  budget: string | null;
  condition: ConditionId | null;
};

const laptops = laptopsData as Laptop[];

/* --------------------------------- Options ---------------------------------- */

const STEPS = [
  { id: "kebutuhan", n: 1, label: "Kebutuhan" },
  { id: "budget", n: 2, label: "Budget" },
  { id: "kondisi", n: 3, label: "Kondisi" },
  { id: "hasil", n: 4, label: "Hasil" },
] as const;

const needOptions: { id: NeedId; label: string; desc: string; icon: typeof Briefcase }[] = [
  { id: "office", label: "Kuliah & Kerja Kantoran", desc: "Dokumen, browsing, video call, Office sehari-hari.", icon: Briefcase },
  { id: "desain", label: "Desain & Konten Kreator", desc: "Edit foto, video ringan, layout, ilustrasi.", icon: Palette },
  { id: "programming", label: "Programming & Development", desc: "Coding, compile project, menjalankan banyak tools.", icon: Code2 },
  { id: "gaming", label: "Gaming", desc: "Main game AAA atau kompetitif dengan frame rate tinggi.", icon: Gamepad2 },
  { id: "multimedia", label: "Hiburan & Multimedia", desc: "Nonton, streaming, browsing santai, penggunaan ringan.", icon: Film },
];

const budgetOptions: { id: string; label: string; sub: string; min: number; max: number }[] = [
  { id: "b1", label: "< Rp 5 juta", sub: "Hemat, kebutuhan dasar", min: 0, max: 5 },
  { id: "b2", label: "Rp 5 - 8 juta", sub: "Standar kuliah/kerja", min: 5, max: 8 },
  { id: "b3", label: "Rp 8 - 12 juta", sub: "Produktif & kreatif ringan", min: 8, max: 12 },
  { id: "b4", label: "Rp 12 - 18 juta", sub: "Performa tinggi", min: 12, max: 18 },
  { id: "b5", label: "> Rp 18 juta", sub: "Kelas atas / profesional", min: 18, max: 999 },
];

const conditionOptions: { id: ConditionId; label: string; desc: string; icon: typeof PackageCheck }[] = [
  { id: "baru", label: "Baru", desc: "Bergaransi resmi, kondisi 100% baru.", icon: Sparkles },
  { id: "second", label: "Second", desc: "Bekas layak pakai, harga lebih hemat.", icon: RefreshCcw },
  { id: "bebas", label: "Keduanya", desc: "Tampilkan baru maupun second terbaik.", icon: PackageCheck },
];

const STORAGE_KEY = "laptoppintar_recommendation";

/* --------------------------------- Scoring ---------------------------------- */

function scoreLaptop(laptop: Laptop, answers: Answers, budgetRange: { min: number; max: number } | null) {
  let score = 0;

  if (answers.need && laptop.needs.includes(answers.need)) score += 4;

  if (budgetRange) {
    if (laptop.price >= budgetRange.min && laptop.price <= budgetRange.max) {
      score += 5;
    } else {
      const distance =
        laptop.price < budgetRange.min ? budgetRange.min - laptop.price : laptop.price - budgetRange.max;
      score += Math.max(0, 3 - distance * 0.4);
    }
  }

  score += laptop.rating * 0.5;
  return score;
}

/* ---------------------------------- Page ------------------------------------ */

export default function RecommendationsPage() {
  return (
    <Suspense fallback={null}>
      <RecommendationsWizard />
    </Suspense>
  );
}

function RecommendationsWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = searchParams.get("step") ?? "kebutuhan";
  const currentStep = STEPS.some((s) => s.id === stepParam) ? stepParam : "kebutuhan";

  const [answers, setAnswers] = useState<Answers>({ need: null, budget: null, condition: null });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setAnswers(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      /* ignore */
    }
  }, [answers, hydrated]);

  const goToStep = (id: string) => router.push(`/recommendations?step=${id}`);

  const canGoTo = (id: string) => {
    const idx = STEPS.findIndex((s) => s.id === id);
    if (idx <= 0) return true;
    if (id === "budget") return !!answers.need;
    if (id === "kondisi") return !!answers.need && !!answers.budget;
    if (id === "hasil") return !!answers.need && !!answers.budget && !!answers.condition;
    return true;
  };

  const resetAll = () => {
    setAnswers({ need: null, budget: null, condition: null });
    goToStep("kebutuhan");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold bg-orange-100 text-orange-600 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3 h-3" /> Rekomendasi Cerdas
          </span>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            Temukan Laptop yang Cocok untukmu
          </h1>
          <p className="mt-2 text-gray-500 text-sm leading-relaxed">
            Jawab 3 pertanyaan singkat, kami tunjukkan pilihan laptop terbaik sesuai
            kebutuhan, budget, dan kondisi yang kamu mau.
          </p>
        </div>

        {/* Stepper */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="flex items-center">
            {STEPS.map((step, i) => {
              const isActive = step.id === currentStep;
              const isDone = STEPS.findIndex((s) => s.id === currentStep) > i;
              const enabled = canGoTo(step.id);
              return (
                <div key={step.id} className="flex items-center flex-1 last:flex-none">
                  <button
                    onClick={() => enabled && goToStep(step.id)}
                    disabled={!enabled}
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                        isActive
                          ? "bg-emerald-500 text-white"
                          : isDone
                          ? "bg-emerald-100 text-emerald-600"
                          : enabled
                          ? "bg-white border border-gray-300 text-gray-500 group-hover:border-emerald-400"
                          : "bg-gray-100 text-gray-300 cursor-not-allowed"
                      }`}
                    >
                      {isDone ? <Check className="w-4 h-4" /> : step.n}
                    </span>
                    <span
                      className={`text-[11px] font-medium ${
                        isActive ? "text-emerald-600" : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 rounded-full ${
                        STEPS.findIndex((s) => s.id === currentStep) > i ? "bg-emerald-300" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {currentStep === "kebutuhan" && (
          <StepKebutuhan
            selected={answers.need}
            onSelect={(need) => {
              setAnswers((a) => ({ ...a, need }));
              goToStep("budget");
            }}
          />
        )}

        {currentStep === "budget" && (
          <StepBudget
            selected={answers.budget}
            onSelect={(budget) => {
              setAnswers((a) => ({ ...a, budget }));
              goToStep("kondisi");
            }}
            onBack={() => goToStep("kebutuhan")}
          />
        )}

        {currentStep === "kondisi" && (
          <StepKondisi
            selected={answers.condition}
            onSelect={(condition) => {
              setAnswers((a) => ({ ...a, condition }));
              goToStep("hasil");
            }}
            onBack={() => goToStep("budget")}
          />
        )}

        {currentStep === "hasil" && (
          <StepHasil answers={answers} onEdit={goToStep} onReset={resetAll} />
        )}
      </div>
    </div>
  );
}

/* ------------------------------- Step 1: Kebutuhan --------------------------- */

function StepKebutuhan({
  selected,
  onSelect,
}: {
  selected: NeedId | null;
  onSelect: (id: NeedId) => void;
}) {
  return (
    <div>
      <SectionHeading
        eyebrow="Langkah 1 dari 3"
        title="Laptop ini akan kamu pakai untuk apa?"
        desc="Pilih kebutuhan utama supaya rekomendasi lebih tepat sasaran."
      />
      <div className="space-y-3">
        {needOptions.map((opt) => {
          const Icon = opt.icon;
          const active = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`w-full flex items-center gap-4 text-left border rounded-xl p-4 transition-all ${
                active
                  ? "border-emerald-400 bg-emerald-50 ring-1 ring-emerald-400"
                  : "border-gray-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/30"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  active ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-500"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{opt.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
              </div>
              <ArrowRight
                className={`w-4 h-4 shrink-0 ${active ? "text-emerald-500" : "text-gray-300"}`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* --------------------------------- Step 2: Budget ---------------------------- */

function StepBudget({
  selected,
  onSelect,
  onBack,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <SectionHeading
        eyebrow="Langkah 2 dari 3"
        title="Berapa budget yang kamu siapkan?"
        desc="Kami akan menyaring laptop yang sesuai dengan rentang harga ini."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {budgetOptions.map((opt) => {
          const active = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`flex items-center gap-3 text-left border rounded-xl p-4 transition-all ${
                active
                  ? "border-emerald-400 bg-emerald-50 ring-1 ring-emerald-400"
                  : "border-gray-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/30"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  active ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-500"
                }`}
              >
                <Wallet className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{opt.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{opt.sub}</p>
              </div>
            </button>
          );
        })}
      </div>
      <BackButton onClick={onBack} />
    </div>
  );
}

/* -------------------------------- Step 3: Kondisi ---------------------------- */

function StepKondisi({
  selected,
  onSelect,
  onBack,
}: {
  selected: ConditionId | null;
  onSelect: (id: ConditionId) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <SectionHeading
        eyebrow="Langkah 3 dari 3"
        title="Mau laptop baru atau second?"
        desc="Kondisi second sudah kami kurasi supaya tetap layak pakai."
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {conditionOptions.map((opt) => {
          const Icon = opt.icon;
          const active = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`flex flex-col items-center text-center gap-2 border rounded-xl p-5 transition-all ${
                active
                  ? "border-emerald-400 bg-emerald-50 ring-1 ring-emerald-400"
                  : "border-gray-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/30"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  active ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-500"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-gray-900">{opt.label}</p>
              <p className="text-xs text-gray-500">{opt.desc}</p>
            </button>
          );
        })}
      </div>
      <BackButton onClick={onBack} />
    </div>
  );
}

/* --------------------------------- Step 4: Hasil ------------------------------ */

function StepHasil({
  answers,
  onEdit,
  onReset,
}: {
  answers: Answers;
  onEdit: (step: string) => void;
  onReset: () => void;
}) {
  const isComplete = answers.need && answers.budget && answers.condition;

  const budgetRange = useMemo(
    () => budgetOptions.find((b) => b.id === answers.budget) ?? null,
    [answers.budget]
  );
  const needInfo = needOptions.find((n) => n.id === answers.need);
  const conditionInfo = conditionOptions.find((c) => c.id === answers.condition);

  const results = useMemo(() => {
    if (!isComplete) return [];
    const filtered = laptops.filter(
      (l) => answers.condition === "bebas" || l.condition === answers.condition
    );
    return filtered
      .map((l) => ({ laptop: l, score: scoreLaptop(l, answers, budgetRange) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [isComplete, answers, budgetRange]);

  if (!isComplete) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-3">🧩</p>
        <p className="font-medium text-gray-700">Lengkapi dulu langkah sebelumnya</p>
        <p className="text-sm text-gray-500 mt-1">
          Kami butuh kebutuhan, budget, dan kondisi untuk kasih rekomendasi terbaik.
        </p>
        <button
          onClick={() => onEdit("kebutuhan")}
          className="mt-6 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          Mulai dari Langkah 1 <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <SectionHeading
        eyebrow={`${results.length} rekomendasi ditemukan`}
        title="Ini pilihan terbaik untukmu"
        desc="Diurutkan berdasarkan kecocokan kebutuhan, budget, dan rating."
      />

      <div className="flex flex-wrap gap-2 mb-8">
        <SummaryChip label={needInfo?.label ?? "-"} onClick={() => onEdit("kebutuhan")} />
        <SummaryChip label={budgetRange?.label ?? "-"} onClick={() => onEdit("budget")} />
        <SummaryChip label={conditionInfo?.label ?? "-"} onClick={() => onEdit("kondisi")} />
      </div>

      {results.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium text-gray-500">Belum ada laptop yang cocok persis</p>
          <p className="text-sm mt-1">Coba ubah budget atau kondisi untuk melihat lebih banyak pilihan.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map(({ laptop }) => (
            <LaptopResultCard key={laptop.id} laptop={laptop} matchedNeed={answers.need} />
          ))}
        </div>
      )}

      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold px-5 py-3 rounded-lg transition-colors"
        >
          <RefreshCcw className="w-4 h-4" /> Ulangi dari Awal
        </button>
        <Link
          href="/catalog"
          className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-5 py-3 rounded-lg transition-colors"
        >
          Lihat Semua Katalog <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function LaptopResultCard({ laptop, matchedNeed }: { laptop: Laptop; matchedNeed: NeedId | null }) {
  const isMatch = matchedNeed ? laptop.needs.includes(matchedNeed) : false;

  return (
    <div className="border border-gray-200 bg-white rounded-2xl p-5 hover:border-emerald-200 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-gray-900">{laptop.name}</h3>
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                laptop.condition === "baru"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-orange-50 text-orange-600"
              }`}
            >
              {laptop.condition === "baru" ? "Baru" : "Second"}
            </span>
            {isMatch && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                Cocok kebutuhanmu
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">{laptop.brand} - {laptop.screen}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-base font-bold text-gray-900">Rp {laptop.price.toLocaleString("id-ID")} jt</p>
          <div className="flex items-center justify-end gap-1 mt-0.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs text-gray-500">{laptop.rating}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-3 leading-relaxed">{laptop.description}</p>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <SpecBadge icon={Cpu} label={laptop.specs.processor} />
        <SpecBadge icon={MemoryStick} label={laptop.specs.ram} />
        <SpecBadge icon={HardDrive} label={laptop.specs.storage} />
        <SpecBadge icon={MonitorSmartphone} label={laptop.specs.gpu} />
      </div>

      <Link
        href={`/catalog/${laptop.id}`}
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
      >
        Lihat Detail Laptop <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

function SpecBadge({ icon: Icon, label }: { icon: typeof Cpu; label: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5">
      <Icon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
      <span className="text-[11px] text-gray-600 truncate">{label}</span>
    </div>
  );
}

/* -------------------------------- Small helpers ------------------------------- */

function SectionHeading({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">{eyebrow}</p>
      <h2 className="mt-1.5 text-xl font-bold text-gray-900">{title}</h2>
      <p className="mt-1.5 text-sm text-gray-500">{desc}</p>
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700"
    >
      <ArrowLeft className="w-4 h-4" /> Kembali
    </button>
  );
}

function SummaryChip({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 bg-white border border-gray-200 hover:border-emerald-300 text-xs font-medium text-gray-700 px-3 py-1.5 rounded-full transition-colors"
    >
      {label}
      <span className="text-gray-400">- Ubah</span>
    </button>
  );
}
