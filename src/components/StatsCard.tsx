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
  const color: Record<CardStatus, any> = {
    base: {
      background: "bg-blue-50",
      label: "text-blue-500",
      value: "text-blue-900",
      icon: "bg-blue-100",
    },
    accepted: {
      background: "bg-green-50",
      label: "text-green-500",
      value: "text-green-800",
      icon: "bg-green-100",
    },
    declined: {
      background: "bg-red-50",
      label: "text-red-500",
      value: "text-red-800",
      icon: "bg-red-100",
    },
    pending: {
      background: "bg-yellow-50",
      label: "text-yellow-500",
      value: "text-yellow-800",
      icon: "bg-yellow-100",
    },
  };
  return (
    <div
      className={`${color[status].background} shadow rounded-2xl p-6 flex items-center gap-4`}>
      <div className={`p-3 ${color[status].icon} rounded-full`}>
        {status === "base" && (
          <LucideBookOpenText className="h-8 w-8 text-blue-600" />
        )}
        {status === "accepted" && (
          <CalendarCheck className="h-8 w-8 text-green-700" />
        )}
        {status === "declined" && (
          <LucideHeartHandshake className="h-8 w-8 text-red-700" />
        )}
        {status === "pending" && (
          <LucideClockFading className="h-8 w-8 text-yellow-700" />
        )}
      </div>
      <div>
        <p className={`${color[status].label} text-sm font-medium`}>{label}</p>
        <p className={`text-3xl font-bold ${color[status].value}`}>{value}</p>
      </div>
    </div>
  );
}
