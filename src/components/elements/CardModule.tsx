"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useRouter } from "next/navigation";

export interface CardProps {
  title: string;
  short_intro: string;
  url: string;
  category: string;
  sub_category: string;
  skills: string;
  rating: number;
  number_of_viewers: number;
  duration: number;
  level: number;
  preference: string;
}

const CardModule = ({
  title,
  short_intro,
  url,
  category,
  sub_category,
  rating,
  number_of_viewers,
  duration,
}: CardProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`${url}`);
  };
  return (
    <Card
      onClick={handleClick}
      className="aspect-[5/4] h-max border-none bg-transparent shadow-none hover:cursor-pointer"
    >
      <CardHeader className="p-0">
        <div className="flex aspect-video h-40 items-end rounded bg-gray-600 p-3">
          <div className="flex flex-wrap gap-1">
            <div className="w-fit rounded-full bg-white px-2 py-0.5 text-xs">
              {category}
            </div>
            <div className="w-fit rounded-full bg-white px-2 py-0.5 text-xs">
              {sub_category}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 px-0 py-2">
        <CardTitle className="">{title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {short_intro}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex gap-4 px-0">
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 fill-yellow-400"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>
          {rating}
        </span>
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 fill-blue-500"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
              clipRule="evenodd"
            />
          </svg>
          {duration} Hours
        </span>
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 fill-green-600"
          >
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path
              fillRule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
              clipRule="evenodd"
            />
          </svg>
          {number_of_viewers}
        </span>
      </CardFooter>
    </Card>
  );
};

export default CardModule;
