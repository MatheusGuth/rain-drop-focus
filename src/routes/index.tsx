import { createFileRoute } from "@tanstack/react-router";
import { PomodoroTimer } from "@/components/pomodoro-timer";
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Datarain cronômetro — Pomodoro timer" },
    { name: "description", content: "Make room for focus with Datarain's simple 25-minute Pomodoro timer." },
    { property: "og:title", content: "Datarain cronômetro — Pomodoro timer" },
    { property: "og:description", content: "One thing at a time. A calm, simple 25-minute focus timer." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PomodoroTimer,
});
