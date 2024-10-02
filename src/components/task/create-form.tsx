import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import { DateTimePicker, TimePicker } from "@/components/ui/datetime-picker";
import { useTaskForm } from "@/hooks/forms/useTaskForm";
import { TaskSchema } from "@/schema";
import { cn } from "@/lib/utils";
import { getPriorities } from "@/actions/priority";
import { getUsers } from "@/actions/user";

interface TaskCreateFormProps {
  setDate: (date: Date | undefined) => void;
  data: any;
}

export default function TaskCreateForm({ setDate, data }: TaskCreateFormProps) {
  const { id } = useParams();
  const [priorities, setPriorities] = useState<Option[]>([]);
  const { form, onSubmit } = useTaskForm({
    formSchema: TaskSchema,
    defaultValues: {
      type: "Call",
      modelId: Array.isArray(id) ? id[0] : id?.toString(),
      priorityId: "",
      contactId: data?.contact.id,
      accountId: data?.company.id,
      description: "",
      userId: [],
    }
  })

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
  }

  useEffect(() => {
    getPriorities({ perPage: 100 }).then(({ data }) => {
      setPriorities(data.map((priority) => ({
        label: priority.name,
        value: priority.id,
      })));
    });
  }, []);

  return (
    <div className="w-8/12">
      <Form {...form}>
        <form
          className="flex flex-col space-y-4 lg:pr-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Input task description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    className="flex space-x-1"
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormItem className="flex items-center relative space-y-0">
                      <FormControl>
                        <RadioGroupItem className="aspect-video w-14 rounded-md h-auto" value="Call" />
                      </FormControl>
                      <FormLabel className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-normal cursor-pointer">Call</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center relative space-y-0">
                      <FormControl>
                        <RadioGroupItem className="aspect-video w-14 rounded-md h-auto" value="Meet" />
                      </FormControl>
                      <FormLabel className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-normal cursor-pointer">Meet</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center relative space-y-0">
                      <FormControl>
                        <RadioGroupItem className="aspect-video w-14 rounded-md h-auto" value="Task" />
                      </FormControl>
                      <FormLabel className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-normal cursor-pointer">Task</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center relative space-y-0">
                      <FormControl>
                        <RadioGroupItem className="aspect-video w-14 rounded-md h-auto" value="Email" />
                      </FormControl>
                      <FormLabel className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-normal cursor-pointer">Email</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="md:basis-1/3">
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                        id="date"
                        variant={"outline"}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0">
                      <Calendar
                        initialFocus
                        mode="single"
                        onSelect={(date) => {
                          field.onChange(date);
                          handleDateChange(date);
                        }}
                        selected={field.value}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between gap-4">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="md:basis-1/3">
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <TimePicker
                      date={field.value}
                      granularity="minute"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="md:basis-1/3">
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <TimePicker
                      date={field.value}
                      granularity="minute"
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="priorityId"
            render={({ field }) => (
              <FormItem className="md:basis-1/3">
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority.value} value={`${priority.value}`}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    emptyIndicator={
                      <p className="text-center text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                    hideClearAllButton
                    loadingIndicator={
                      <p className="py-2 text-center text-lg leading-10 text-muted-foreground">loading...</p>
                    }
                    onSearch={async (value) => {
                      const res = await getUsers({ name: value });
                      return res.data.map((user) => ({
                        label: user.name,
                        value: user.userId,
                      }));
                    }}
                    placeholder="Select People"
                    triggerSearchOnFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="contactId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Contact"
                    type="text"
                    {...field}
                    readOnly
                  // value={opty?.contact.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Account"
                    type="text"
                    {...field}
                    readOnly
                  // value={opty?.company.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <Button type="submit">Create Task</Button>
        </form>
      </Form>
    </div>
  );
}