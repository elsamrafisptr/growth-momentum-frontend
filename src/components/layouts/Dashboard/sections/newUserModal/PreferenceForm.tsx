"use client";

import { useState, useMemo, startTransition, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNewUserModal } from "@/context/NewUserModalContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import axiosInstance from "@/lib/axios";
import useIsMobile from "@/hooks/useIsMobile";

const UserPreferenceForm = () => {
  const { formData, setFormData, setIsOpen, setCurrentStep } =
    useNewUserModal();
  const [searchTerm, setSearchTerm] = useState("");
  const [isListVisible, setIsListVisible] = useState(false);
  const [preferences, setPreferences] = useState<string[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchPreferences = async () => {
      const response = await axiosInstance.get("/preferences");

      setPreferences(response.data.data);
      return response;
    };
    fetchPreferences();
  }, []);

  const selectedPreferences: string[] = formData.preferences || [];

  const filteredGenres = useMemo(() => {
    return (
      preferences?.filter((genre) =>
        genre?.toLowerCase().includes(searchTerm.toLowerCase()),
      ) || []
    );
  }, [preferences, searchTerm]);

  const handleSelect = (genre: string) => {
    const updatedPreferences = selectedPreferences.includes(genre)
      ? selectedPreferences.filter((p: string) => p !== genre)
      : selectedPreferences.length < 5
        ? [...selectedPreferences, genre]
        : selectedPreferences;

    setFormData({ ...formData, preferences: updatedPreferences });
    setSearchTerm("");
  };

  const handleRemove = (genre: string) => {
    const updatedPreferences = selectedPreferences.filter(
      (p: string) => p !== genre,
    );
    setFormData({ ...formData, preferences: updatedPreferences });
  };

  async function onSubmit(values: any) {
    startTransition(async () => {
      try {
        const response = await axiosInstance.post(
          "/profile/register",
          {
            age: values.age,
            gender: values.gender,
            job_name: values.jobType,
            job_type: values.job,
            activity_level: values.activity,
            preferences: values.preferences,
          },
          {
            withCredentials: true,
          },
        );

        if (response.status === 201) {
          setIsOpen(false);
          setCurrentStep(1);
          window.location.reload();

          return;
        } else {
          throw new Error("Unexpected response from server.");
        }
      } catch (err: any) {
        console.error("Registration error: ", err);
        if (err.response?.data?.message) {
          alert(err.response.data.message);
        } else if (err.message) {
          alert(err.message);
        } else {
          alert("Registration failed, please try again.");
        }
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Label>
        Tags <span className="italic">(min: 3, max: 5)</span>
      </Label>

      <Popover open={isListVisible} onOpenChange={setIsListVisible}>
        <PopoverTrigger className="border p-6">
          {selectedPreferences.length === 0 ? (
            "Select Your Preference"
          ) : (
            <div>
              {selectedPreferences.map((preference: string, index: number) => {
                return (
                  <div
                    key={index}
                    className="mb-1 flex w-fit items-center gap-1 rounded bg-gray-200 px-2 py-1 text-left text-sm text-gray-800"
                  >
                    {preference}
                    <button
                      type="button"
                      className="p-1 text-left"
                      onClick={() => handleRemove(preference)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </PopoverTrigger>
        {isMobile ? (
          <Command className="border">
            <CommandInput placeholder="Search Preference" />
            <CommandList>
              <CommandEmpty>No Preference Found</CommandEmpty>
              <CommandGroup className="">
                <ScrollArea className="h-40">
                  {filteredGenres.map((preference: string | never, index) => {
                    return (
                      <CommandItem
                        key={index}
                        className={cn(
                          "flex items-center justify-between",
                          selectedPreferences.includes(preference) &&
                            "bg-gray-100",
                        )}
                        onSelect={() => handleSelect(preference)}
                      >
                        {preference}
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedPreferences.includes(preference)
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    );
                  })}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
        ) : (
          <PopoverContent side={isMobile ? "bottom" : "right"}>
            <Command>
              <CommandInput placeholder="Search Preference" />
              <CommandList>
                <CommandEmpty>No Preference Found</CommandEmpty>
                <CommandGroup className="">
                  <ScrollArea className="h-72">
                    {filteredGenres.map((preference: string | never, index) => {
                      return (
                        <CommandItem
                          key={index}
                          className={cn(
                            "flex items-center justify-between",
                            selectedPreferences.includes(preference) &&
                              "bg-gray-100",
                          )}
                          onSelect={() => handleSelect(preference)}
                        >
                          {preference}
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedPreferences.includes(preference)
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      );
                    })}
                  </ScrollArea>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        )}
      </Popover>

      <Button
        onClick={() => onSubmit(formData)}
        className="mt-4"
        disabled={
          selectedPreferences.length < 3 || selectedPreferences.length > 5
        }
      >
        Submit
      </Button>
    </div>
  );
};

export default UserPreferenceForm;
