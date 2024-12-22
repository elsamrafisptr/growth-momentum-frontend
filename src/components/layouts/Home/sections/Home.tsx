import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <main className="w-full h-screen flex justify-center items-center px-5">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="font-bold text-xl text-center">
          Welcome to Growth Momentum Website Apps
        </h1>
        <p className="text text-xs md:text-sm font-light italic text-center max-w-2xl">
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
