import Feedback from "@/components/layouts/Feedback";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Feedback | Growth Momentum`,
  description: "Feedback form for researching recommendation for users",
};
const FeedbackPage = () => {
  return <Feedback />;
};

export default FeedbackPage;
