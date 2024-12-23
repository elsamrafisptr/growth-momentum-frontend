import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center px-5">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center text-xl font-bold">
          Welcome to Growth Momentum Website Apps
        </h1>
        <p className="text max-w-2xl text-center text-xs font-light italic md:text-sm">
          This website is used for final project research with the title
          “Evaluation of Diversity and Novelty of Recommendation Systems on
          Digital Learning Platforms Based on Usability and User Satisfaction”.
        </p>
        <span className="flex items-center gap-6">
          <Button asChild>
            <Link href={"/register"}>Register</Link>
          </Button>
          <Button asChild variant={"outline"}>
            <Link href={"/login"}>Login</Link>
          </Button>
        </span>
      </div>
    </main>
  );
};

export default Home;
