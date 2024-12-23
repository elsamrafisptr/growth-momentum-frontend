import Link from "next/link";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  stats: string;
  icon: ReactNode;
  route: string;
}

const StatsCard = ({ title, stats, icon, route }: StatsCardProps) => {
  return (
    <article className="aspect-[4/3] border border-gray-200 bg-white hover:border-gray-700">
      <div className="flex items-center gap-4">
        <div>{icon}</div>
        <span className="flex flex-col gap-2">
          <h1>{stats}</h1>
          <h2>{title}</h2>
        </span>
      </div>
      <Link href={route} className="flex items-center justify-between">
        <p>View details</p>
        <i></i>
      </Link>
    </article>
  );
};

export default StatsCard;
