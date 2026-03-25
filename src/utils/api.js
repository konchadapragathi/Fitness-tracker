// src/utils/api.js
const API_KEY = "Uez4mfjEZ4cbE1WhzidmgQ==yxg4RAF2Yf9tJiMv";

export async function fetchStrengthExercises(muscle) {
  const res = await fetch(
    `https://api.api-ninjas.com/v1/exercises?muscle=${encodeURIComponent(muscle)}`,
    { headers: { "X-Api-Key": API_KEY } }
  );
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchCaloriesBurned(activity) {
  const res = await fetch(
    `https://api.api-ninjas.com/v1/caloriesburned?activity=${encodeURIComponent(activity)}`,
    { headers: { "X-Api-Key": API_KEY } }
  );
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// Local workout plan JSON
export const workoutPlan = {
  biceps: [
    { name: "Bicep Curl", sets: 3, reps: 12, instructions: "Keep elbows pinned to your waist and curl the weight up. Squeeze the bicep at the top." },
    { name: "Hammer Curl", sets: 3, reps: 10, instructions: "Hold dumbbells with a neutral grip and curl upwards. This hits the brachialis." },
    { name: "Concentration Curl", sets: 3, reps: 12, instructions: "Rest elbow on your inner thigh and isolate the bicep. Control the negative." },
    { name: "Preacher Curl", sets: 3, reps: 10, instructions: "Use a preacher bench to remove momentum and fully stretch." },
    { name: "Cable Curl", sets: 3, reps: 15, instructions: "Use constant tension from the cable machine and squeeze hard." }
  ],
  chest: [
    { name: "Push-Up", sets: 3, reps: 15, instructions: "Keep core tight and lower chest to the floor. Explosive push up." },
    { name: "Bench Press", sets: 4, reps: 10, instructions: "Lie flat, grip slightly wider than shoulders, press the bar vertically." },
    { name: "Incline Dumbbell Press", sets: 3, reps: 12, instructions: "Set bench to 30 degrees, press dumbbells over upper chest." },
    { name: "Chest Fly", sets: 3, reps: 12, instructions: "Keep a slight bend in the elbows and perform a hugging motion." },
    { name: "Cable Crossover", sets: 3, reps: 15, instructions: "Squeeze the chest at the bottom of the movement. Flex hard." }
  ],
  back: [
    { name: "Pull-Up", sets: 4, reps: "To failure", instructions: "Pull your chin over the bar, focus on engaging your lats." },
    { name: "Lat Pulldown", sets: 3, reps: 12, instructions: "Pull the bar down to your upper chest. Keep your torso upright." },
    { name: "Barbell Row", sets: 4, reps: 10, instructions: "Keep back flat, hinge at hips, and pull the bar to your stomach." },
    { name: "Seated Cable Row", sets: 3, reps: 12, instructions: "Squeeze shoulder blades together forcefully on every rep." },
    { name: "Face Pulls", sets: 3, reps: 15, instructions: "Pull rope towards your face, separate hands to hit rear delts." }
  ],
  legs: [
    { name: "Barbell Squat", sets: 4, reps: 8, instructions: "Break at the hips and knees, squat below parallel. Keep chest up." },
    { name: "Leg Press", sets: 3, reps: 10, instructions: "Press the weight up, avoid fully locking your knees at the top." },
    { name: "Romanian Deadlift", sets: 3, reps: 12, instructions: "Hinge at the hips keeping a slight bend in your knees until you feel a hamstrings stretch." },
    { name: "Leg Extension", sets: 3, reps: 15, instructions: "Squeeze your quads hard at the top of the movement and hold for 1 sec." },
    { name: "Calf Raises", sets: 4, reps: 20, instructions: "Rise up onto your toes and pause at the top for maximum contraction." }
  ],
  triceps: [
    { name: "Tricep Pushdown", sets: 3, reps: 12, instructions: "Keep elbows stationary at your sides and push the cable down." },
    { name: "Skull Crushers", sets: 3, reps: 10, instructions: "Lie on a bench, lower weight to your forehead, then extend." },
    { name: "Overhead Tricep Extension", sets: 3, reps: 12, instructions: "Extend the dumbbell fully overhead to stretch the long head." },
    { name: "Close-Grip Bench Press", sets: 3, reps: 10, instructions: "Grip shoulder-width apart, tuck elbows, and press." },
    { name: "Dips", sets: 3, reps: "To failure", instructions: "Keep body perfectly upright to place maximum emphasis on the triceps rather than chest." }
  ],
  shoulders: [
    { name: "Overhead Press", sets: 4, reps: 8, instructions: "Press the bar directly overhead without using leg drive." },
    { name: "Lateral Raise", sets: 4, reps: 15, instructions: "Raise dumbbells to the sides, keep a slight bend in your arms." },
    { name: "Front Raise", sets: 3, reps: 12, instructions: "Raise one dumbbell at a time strictly to the front without swinging." },
    { name: "Reverse Pec Deck", sets: 3, reps: 15, instructions: "Focus on isolating the rear delts. Do not squeeze shoulder blades together." },
    { name: "Shrugs", sets: 4, reps: 15, instructions: "Shrug shoulders straight up towards your ears. Hold at the top." }
  ]
};
