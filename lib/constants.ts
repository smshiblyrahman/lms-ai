export const TIER_OPTIONS = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "ultra", label: "Ultra" },
] as const;

export type Tier = (typeof TIER_OPTIONS)[number]["value"];

type TierColor = "emerald" | "violet" | "cyan";

const TIER_COLOR_MAP: Record<TierColor, { border: string; text: string }> = {
  emerald: {
    border: "border-emerald-500/20",
    text: "text-emerald-400",
  },
  violet: {
    border: "border-violet-500/30",
    text: "text-violet-400",
  },
  cyan: {
    border: "border-cyan-500/20",
    text: "text-cyan-400",
  },
};

export function getTierColorClasses(color: TierColor) {
  return TIER_COLOR_MAP[color];
}

export const TIER_FEATURES = [
  {
    tier: "Free",
    color: "emerald",
    features: [
      "Access to foundational courses",
      "Community Discord access",
      "Basic projects & exercises",
      "Email support",
    ],
  },
  {
    tier: "Pro",
    color: "violet",
    features: [
      "Everything in Free",
      "All Pro-tier courses",
      "Advanced real-world projects",
      "Priority support",
      "Course completion certificates",
    ],
  },
  {
    tier: "Ultra",
    color: "cyan",
    features: [
      "Everything in Pro",
      "Exclusive Ultra-only content",
      "Monthly 1-on-1 sessions",
      "Private Discord channel",
      "Early access to new courses",
      "Lifetime updates",
    ],
  },
] as const;
