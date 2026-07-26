export interface WorkoutExercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  loadKg?: number;
}

export const LEG_WORKOUT_EXERCISES: WorkoutExercise[] = [
  { id: "1", name: "Agachamento", sets: 3, reps: 10, loadKg: 60 },
  { id: "2", name: "Leg Press", sets: 3, reps: 12, loadKg: 120 },
  { id: "3", name: "Mesa Flexora", sets: 3, reps: 12, loadKg: 45 },
  { id: "4", name: "Cadeira Extensora", sets: 3, reps: 12 },
  { id: "5", name: "Panturrilha", sets: 4, reps: 15, loadKg: 80 },
  { id: "6", name: "Afundo", sets: 3, reps: 10, loadKg: 20 },
];

export const CHEST_WORKOUT_EXERCISES: WorkoutExercise[] = [
  { id: "1", name: "Supino reto", sets: 4, reps: 8, loadKg: 70 },
  { id: "2", name: "Supino inclinado", sets: 3, reps: 10, loadKg: 55 },
  { id: "3", name: "Crucifixo", sets: 3, reps: 12, loadKg: 14 },
  { id: "4", name: "Crossover", sets: 3, reps: 15 },
  { id: "5", name: "Tríceps pulley", sets: 3, reps: 12, loadKg: 25 },
];
