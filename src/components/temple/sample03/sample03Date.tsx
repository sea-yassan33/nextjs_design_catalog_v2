// --- Types ---
export type Intensity = "warm-up" | "main" | "cool-down";
export type Category = "strength" | "cardio" | "flexibility" | "core";

export interface Exercise {
  id: number;
  name: string;
  sets?: number;
  reps?: string;
  duration?: string;
  rest?: string;
  weight?: string;
  note?: string;
  category: Category;
  intensity: Intensity;
  completed: boolean;
}

// --- Data ---
export const initialExercises: Exercise[] = [
  // Warm-up
  {
    id: 1,
    name: "軽いジョギング",
    duration: "5分",
    category: "cardio",
    intensity: "warm-up",
    completed: false,
    note: "心拍数を徐々に上げる",
  },
  {
    id: 2,
    name: "ダイナミックストレッチ",
    duration: "5分",
    category: "flexibility",
    intensity: "warm-up",
    completed: false,
    note: "肩・股関節・ふくらはぎ中心",
  },

  // Main
  {
    id: 3,
    name: "バーベルスクワット",
    sets: 4,
    reps: "8〜10回",
    rest: "90秒",
    weight: "60kg",
    category: "strength",
    intensity: "main",
    completed: false,
  },
  {
    id: 4,
    name: "デッドリフト",
    sets: 3,
    reps: "6〜8回",
    rest: "120秒",
    weight: "80kg",
    category: "strength",
    intensity: "main",
    completed: false,
  },
  {
    id: 5,
    name: "ベンチプレス",
    sets: 4,
    reps: "10回",
    rest: "90秒",
    weight: "50kg",
    category: "strength",
    intensity: "main",
    completed: false,
  },
  {
    id: 6,
    name: "プランク",
    sets: 3,
    duration: "60秒",
    rest: "30秒",
    category: "core",
    intensity: "main",
    completed: false,
    note: "体幹をしっかり意識",
  },
  {
    id: 7,
    name: "ケーブルロウ",
    sets: 3,
    reps: "12回",
    rest: "60秒",
    weight: "40kg",
    category: "strength",
    intensity: "main",
    completed: false,
  },

  // Cool-down
  {
    id: 8,
    name: "静的ストレッチ",
    duration: "8分",
    category: "flexibility",
    intensity: "cool-down",
    completed: false,
    note: "各部位30秒キープ",
  },
  {
    id: 9,
    name: "腹式呼吸・瞑想",
    duration: "2分",
    category: "flexibility",
    intensity: "cool-down",
    completed: false,
  },
];