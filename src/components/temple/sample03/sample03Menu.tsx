"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Intensity, Category } from "./sample03Date";
import { IconCheck,IconClock,IconDumbbell } from "@/components/common/icons/icons";
import { Exercise,initialExercises } from "./sample03Date";

// --- Config ---
const intensityConfig: Record<
  Intensity,
  { label: string; color: string; accent: string; dot: string }
> = {
  "warm-up": {
    label: "ウォームアップ",
    color: "bg-amber-50 border-amber-200",
    accent: "text-amber-600",
    dot: "bg-amber-400",
  },
  main: {
    label: "メイントレーニング",
    color: "bg-red-50 border-red-200",
    accent: "text-red-600",
    dot: "bg-red-500",
  },
  "cool-down": {
    label: "クールダウン",
    color: "bg-sky-50 border-sky-200",
    accent: "text-sky-600",
    dot: "bg-sky-400",
  },
};
const categoryConfig: Record<
  Category,
  { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
> = {
  strength: { label: "筋力", variant: "destructive" },
  cardio: { label: "有酸素", variant: "default" },
  flexibility: { label: "柔軟", variant: "secondary" },
  core: { label: "体幹", variant: "outline" },
};

// --- Exercise Row ---
function ExerciseRow({
  exercise,
  onToggle,
  index,
}: {
  exercise: Exercise;
  onToggle: (id: number) => void;
  index: number;
}) {
  const cat = categoryConfig[exercise.category];
  return (
    <div
      className={`
        group relative flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer
        ${exercise.completed
          ? "bg-gray-50 border-gray-200 opacity-60"
          : "bg-white border-gray-100 hover:border-gray-300 hover:shadow-sm"
        }
      `}
      onClick={() => onToggle(exercise.id)}
    >
      {/* Index + Checkbox */}
      <div className="flex-shrink-0 mt-0.5">
        <div
          className={`
            w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all
            ${exercise.completed
              ? "bg-emerald-500 border-emerald-500 text-white"
              : "border-gray-300 text-gray-400 group-hover:border-gray-400"
            }
          `}
        >
          {exercise.completed ? <IconCheck /> : <span>{index + 1}</span>}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span
            className={`font-semibold text-sm ${
              exercise.completed ? "line-through text-gray-400" : "text-gray-800"
            }`}
            style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            {exercise.name}
          </span>
          <Badge variant={cat.variant} className="text-[10px] px-1.5 py-0 h-4">
            {cat.label}
          </Badge>
        </div>
        {/* Params */}
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {exercise.sets && (
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <IconDumbbell />
              {exercise.sets}セット
            </span>
          )}
          {exercise.reps && (
            <span className="text-xs text-gray-500">× {exercise.reps}</span>
          )}
          {exercise.duration && (
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <IconClock />
              {exercise.duration}
            </span>
          )}
          {exercise.weight && (
            <span className="text-xs font-medium text-indigo-600">{exercise.weight}</span>
          )}
          {exercise.rest && (
            <span className="text-xs text-gray-400">休憩 {exercise.rest}</span>
          )}
        </div>
        {exercise.note && (
          <p className="mt-1 text-[11px] text-gray-400 italic">{exercise.note}</p>
        )}
      </div>
    </div>
  );
}

// --- Section ---
function Section({
  intensity,
  exercises,
  onToggle,
}: {
  intensity: Intensity;
  exercises: Exercise[];
  onToggle: (id: number) => void;
}) {
  const cfg = intensityConfig[intensity];
  const completedCount = exercises.filter((e) => e.completed).length;
  return (
    <div className={`rounded-2xl border p-4 ${cfg.color}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
          <h2 className={`text-sm font-bold tracking-wide ${cfg.accent}`} style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
            {cfg.label}
          </h2>
        </div>
        <span className="text-xs text-gray-400">
          {completedCount}/{exercises.length}
        </span>
      </div>
      {/* Exercise List */}
      <div className="flex flex-col gap-2">
        {exercises.map((ex, i) => (
          <ExerciseRow key={ex.id} exercise={ex} onToggle={onToggle} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function Sample03Menu() {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const totalCount = exercises.length;
  const completedCount = exercises.filter((e) => e.completed).length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const toggleExercise = (id: number) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, completed: !ex.completed } : ex))
    );
  };

  const intensities: Intensity[] = ["warm-up", "main", "cool-down"];
  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-5 space-y-4">
        {/* Progress Card */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-2 pt-4 px-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">本日の達成率</p>
                <p className="text-3xl font-black text-gray-900 leading-none">
                  {progressPercent}
                  <span className="text-lg font-semibold text-gray-400">%</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">
                  {completedCount}
                  <span className="text-sm text-gray-400 font-normal"> / {totalCount}</span>
                </p>
                <p className="text-xs text-gray-400">完了 / 全種目</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <Progress value={progressPercent} className="h-2.5 rounded-full" />
            {completedCount === totalCount && (
              <p className="mt-3 text-center text-sm font-bold text-emerald-600">
                🎉 全メニュー完了！お疲れ様でした！
              </p>
            )}
          </CardContent>
        </Card>
        <Separator />
        {/* Sections */}
        {intensities.map((intensity) => {
          const sectionExercises = exercises.filter(
            (ex) => ex.intensity === intensity
          );
          return (
            <Section
              key={intensity}
              intensity={intensity}
              exercises={sectionExercises}
              onToggle={toggleExercise}
            />
          );
        })}
        {/* Footer Note */}
        <p className="text-center text-xs text-gray-300 pb-6">
          種目をタップして完了チェック ✓
        </p>
      </div>
    </>
  );
}