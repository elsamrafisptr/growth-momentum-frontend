import Dashboard from "@/components/layouts/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Dashboard | Growth Momentum`,
  description:
    "Dashboard for showing online courses material recommendation for users",
};

const DashboardPage = async () => {
  return <Dashboard />;
};

export default DashboardPage;
