import Home from "@/components/layouts/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Home | Growth Momentum`,
  description:
    "Dashboard for showing online courses material recommendation for users",
};

const HomePage = () => {
  return <Home />;
};

export default HomePage;
