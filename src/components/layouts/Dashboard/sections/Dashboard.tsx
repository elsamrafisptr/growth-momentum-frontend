"use client";

import CardModule, { CardProps } from "@/components/elements/CardModule";
import React from "react";
import NewUserModal from "./newUserModal/NewUserModal";
import { NewUserModalProvider } from "@/context/NewUserModalContext";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Dashboard = ({
  profile,
  recommendations,
}: {
  profile: any;
  recommendations: CardProps[];
}) => {
  const plugin = React.useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: true,
    })
  );
  return (
    <>
      <NewUserModalProvider profile={profile}>
        <NewUserModal />
      </NewUserModalProvider>

      {/* flex gap-6 overflow-x-scroll w-[1071px] h-[408px] */}
      {/* Dashboard content */}
      <div className="w-full h-full flex p-12">
        <div className="flex flex-col gap-4 items-center">
          {/* Recommendations For You */}
          <div className="flex flex-col gap-4 w-full">
            <h1 className="font-bold text-2xl">Recommendations For You</h1>
            <div className="grid grid-cols-3 gap-6">
              {recommendations.map((course: CardProps, index: number) => {
                return (
                  <CardModule
                    key={index}
                    title={course.title}
                    short_intro={course.short_intro}
                    url={course.url}
                    category={course.category}
                    sub_category={course.sub_category}
                    skills={course.skills}
                    rating={course.rating}
                    number_of_viewers={course.number_of_viewers}
                    duration={course.duration}
                    level={course.level}
                    preference={course.preference}
                  />
                );
              })}
            </div>
            {/* <Carousel
              plugins={[plugin.current]}
              className="w-full max-w-4xl overflow-x-auto"
              opts={{
                align: "start",
              }}
            >
              <CarouselContent className="-ml-4">
                {recommendations.map((course: CardProps, index: number) => {
                  return (
                    <CarouselItem key={index} className="pl-2 md:basis-1/3">
                      <div className="p-1">
                        <CardModule
                          title={course.title}
                          short_intro={course.short_intro}
                          url={course.url}
                          category={course.category}
                          sub_category={course.sub_category}
                          skills={course.skills}
                          rating={course.rating}
                          number_of_viewers={course.number_of_viewers}
                          duration={course.duration}
                          level={course.level}
                          preference={course.preference}
                        />
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 z-10" />
              <CarouselNext className="absolute right-0 z-10" />
            </Carousel> */}

            {/* Recommendations Genre Based */}
            <div className="flex flex-col gap-4 w-full">
              <h1 className="font-bold text-2xl">
                Recommendations of Your Genre
              </h1>
              <div className="flex gap-6 overflow-x-scroll w-[1071px] h-[800px]"></div>
            </div>
            {/* Most Favourites */}
            <div className="flex flex-col gap-4 w-full">
              <h1 className="font-bold text-2xl">
                Most Favourite Courses
              </h1>
              <div className="flex gap-6 overflow-x-scroll w-[1071px] h-[800px]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
