import Bookmark from "@/components/layouts/Bookmark";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Bookmark | Growth Momentum`,
  description: "Bookmark for saved online courses material",
};

const BookmarkPage = () => {
  return <Bookmark />;
};

export default BookmarkPage;
