import AllCourses from "@/components/layouts/AllCourses";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `All Courses | Growth Momentum`,
  description: "All online courses materials",
};

const AllCoursePage = async () => {
  return <AllCourses />;
};

export default AllCoursePage;
