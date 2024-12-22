import { useTransition } from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNewUserModal } from "@/context/NewUserModalContext";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const detailUserSchema = z.object({
  age: z.coerce
    .number()
    .min(1, "Age is required and should be a valid number")
    .max(120, "Please enter a valid age"),
  gender: z.string().min(1, "Gender is required"),
  job: z.string().min(1, "Job is required"),
  jobType: z.string().min(1, "Job type/major is required"),
  activity: z.string().min(1, "Activity level is required"),
});

const UserDetailForm = () => {
  const { formData, setFormData, currentStep, setCurrentStep } =
    useNewUserModal();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof detailUserSchema>>({
    resolver: zodResolver(detailUserSchema),
    defaultValues: {
      age: undefined,
      gender: "",
      job: "",
      jobType: "",
      activity: "",
    },
  });

  const isFormValid = form.formState.isDirty && form.formState.isValid;

  const handleNext = (data: any) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(currentStep + 1);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleNext)}>
        {/* Age Field */}
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="age">Age</FormLabel>
              <FormControl>
                <Input
                  id="age"
                  placeholder="Enter your age"
                  {...field}
                  type="number"
                  className="[&::-webkit-inner-spin-button]:appearance-none"
                  aria-invalid={!!form.formState.errors.age}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender Field */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="gender">Gender</FormLabel>
              <FormControl>
                <Controller
                  name="gender"
                  control={form.control}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="col-span-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Field */}
        <FormField
          control={form.control}
          name="job"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="job">Current Job</FormLabel>
              <FormControl>
                <Controller
                  name="job"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Student">Student</SelectItem>
                        <SelectItem value="Employee">Employee</SelectItem>
                        <SelectItem value="Educator">Educator</SelectItem>
                        <SelectItem value="None">None</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Type Field */}
        <FormField
          control={form.control}
          name="jobType"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="jobType">Job Type / Major</FormLabel>
              <FormControl>
                <Input
                  id="jobType"
                  placeholder="Enter your job type or major"
                  {...field}
                  type="text"
                  aria-invalid={!!form.formState.errors.jobType}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Activity Level Field */}
        <FormField
          control={form.control}
          name="activity"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="activity">Activity Level</FormLabel>
              <FormControl>
                <Controller
                  name="activity"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Your activity level on the e-learning platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Everyday">Everyday</SelectItem>
                        <SelectItem value="Often">Often</SelectItem>
                        <SelectItem value="Normal">Normal</SelectItem>
                        <SelectItem value="Rarely">Rarely</SelectItem>
                        <SelectItem value="Never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={!isFormValid}>
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserDetailForm;
