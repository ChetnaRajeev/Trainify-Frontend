export const sendProgressToBackend = async ({
    user_name,
    exercise_name,
    date_exercised,
    reps,
    duration,
  }: {
    user_name: string;
    exercise_name: string;
    date_exercised: string,
    reps: number;
    duration: number;
  }) => {
    try {
      const res = await fetch("http://54.160.133.124:8000/save-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name,
          exercise_name,
          date_exercised,
          reps,
          duration,
        }),
      });
  
      return await res.json();
    } catch (err) {
      console.error("Error sending progress:", err);
      return { success: false };
    }
  };
  