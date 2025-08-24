import {
  CalendarCheck,
  CalendarCheck2,
  CheckCircle,
  Clock,
  LucideBookOpenText,
  LucideCalendarRange,
  LucideClockFading,
  LucideHeartHandshake,
  User,
  XCircle,
} from "lucide-react";

type CardStatus = "base" | "accepted" | "pending" | "declined";

export interface StatsCard {
  status: CardStatus;
  label: string;
  value: number;
}

export default function StatsCard({ status, label, value }: StatsCard) {
  const iconColor: Record<CardStatus, string> = {
    base: "text-[#FFD700]",
    accepted: "text-emerald-400",
    declined: "text-rose-400",
    pending: "text-yellow-400",
  };

  return (
    <div className="bg-black/50 backdrop-blur-sm border border-[#FFD700]/10 rounded-2xl p-6 flex items-center gap-4">
      <div className="p-3 bg-black/60 border border-[#FFD700]/20 rounded-full">
        {status === "base" && (
          <LucideBookOpenText className={`h-8 w-8 ${iconColor[status]}`} />
        )}
        {status === "accepted" && (
          <CalendarCheck className={`h-8 w-8 ${iconColor[status]}`} />
        )}
        {status === "declined" && (
          <LucideHeartHandshake className={`h-8 w-8 ${iconColor[status]}`} />
        )}
        {status === "pending" && (
          <LucideClockFading className={`h-8 w-8 ${iconColor[status]}`} />
        )}
      </div>
      <div>
        <p className="text-[#FFD700]/80 text-sm font-medium">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
