"use client";

import CardModule, { CardProps } from "@/components/elements/CardModule";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axiosInstance from "@/lib/axios";
import React, { useEffect, useState } from "react";

const AllCourses = () => {
  const [courses, setCourses] = useState<[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "10",
          ...(searchQuery && { search: searchQuery }),
        });

        const res = await axiosInstance.get(`/courses?${params.toString()}`);
        if (!(res.status === 200)) {
          throw new Error("Failed to fetch courses");
        }

        const data = res.data.data;
        setCourses((prevCourses) =>
          page === 1 ? data : [...prevCourses, ...data],
        );
      } catch (err) {
        setError("Error fetching courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [page, searchQuery]);

  const loadMoreCourses = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  return (
    <>
      <div className="relative flex h-full w-full flex-col p-12">
        {/* Search Bar and Filter */}
        <div className="flex gap-6">
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full"
          />
          <DropdownMenu>
            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={() => {
              setSearchQuery("");
              setPage(1);
            }}
          >
            Reset Filters
          </Button>
        </div>

        {/*  */}
        <section>
          <h1>All Courses</h1>
          <div className="grid grid-cols-3 gap-6">
            {courses.map((course: any, index: number) => {
              return (
                <CardModule
                  key={index}
                  title={course.Title}
                  short_intro={course["Short Intro"]}
                  url={course.URL}
                  category={course.Category}
                  sub_category={course["Sub-Category"]}
                  skills={course.Skills}
                  rating={course.Rating}
                  number_of_viewers={course["Number of viewers"]}
                  duration={course.Duration}
                  level={course.Level}
                  preference={course.preference}
                />
              );
            })}
          </div>
        </section>

        <button
          onClick={loadMoreCourses}
          disabled={loading}
          className="bg-white p-4"
        >
          Load More
        </button>
      </div>
    </>
  );
};

export default AllCourses;
