import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function useTaskForm<TSchema extends z.ZodType<any, any>>(options: {
  // mode: 'create' | 'edit';
  onSuccess?: () => void;
  formSchema: TSchema;
  defaultValues?: z.infer<TSchema>;
}) {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<TSchema>>({
    resolver: zodResolver(options.formSchema),
    defaultValues: options.defaultValues ? {
      ...options.defaultValues,
    } : undefined,
  })

  const onSubmit = async (data: z.infer<TSchema>) => {
    setLoading(true);
    try {
      // NOTE: This should be replaced with the actual API call
      // eslint-disable-next-line no-console
      console.log(data);
      options.onSuccess?.();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    loading,
    onSubmit,
  }
}