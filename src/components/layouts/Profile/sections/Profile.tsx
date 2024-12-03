"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import React from "react";

const Profile = ({ profile, user }: { profile: any; user: any }) => {
  console.log(profile);
  console.log(user);

  const { username, email, roles } = user;
  const {
    age,
    activity_level,
    gender,
    job_name,
    job_type,
    preferences,
    id,
    user_id,
  } = profile;
  return (
    <div className="p-12 flex flex-col gap-6">
      <div className="w-full h-fit rounded-lg border border-gray-300 bg-white">
        <div className="w-full p-6 flex justify-between">
          <article className="flex gap-4">
            <Avatar className="w-24 h-24  rounded-lg">
              <AvatarImage src={username} />
              <AvatarFallback className="rounded-lg bg-green-300 text-2xl font-semibold">
                {username[0]}
              </AvatarFallback>
            </Avatar>
            <span className="flex flex-col justify-center">
              <h2 className="font-semibold text-2xl">{username}</h2>
              <p>{email}</p>
              <p>{roles}</p>
            </span>
          </article>
          <article className="flex flex-col justify-center text-right">
            <span>{age}</span>
            <span>{gender}</span>
            <span>{activity_level}</span>
          </article>
        </div>
        <Separator className="px-6" />
        <div className="grid grid-cols-2 gap-6 p-6">
          {/* Row 1 Col 1 */}
          <div className="w-full flex flex-col gap-4">
            <span className="flex gap-2 items-center">
              <h1 className="font-semibold">My Learning Preferences</h1>
              <button onClick={() => alert("check")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
            </span>
            <article className="flex flex-wrap gap-2">
              {preferences.map((val: string, index: number) => (
                <div
                  className="px-2 text-sm rounded py-0.5 bg-gray-300 w-fit"
                  key={index}
                >
                  {val}
                </div>
              ))}
            </article>
          </div>

          {/* Row 1 Col 2 */}
          <div className="w-full flex flex-col gap-4">
            <span className="flex gap-2 items-center">
              <h1 className="font-semibold">Current Career</h1>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
            </span>

            <article className="flex flex-wrap gap-2">
              {job_type} of {job_name}
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
