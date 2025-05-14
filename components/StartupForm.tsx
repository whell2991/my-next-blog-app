"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MDEditor from "@uiw/react-md-editor";
import { Send } from "lucide-react";
import { formschema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [error, setError] = useState<Record<string, string>>({}); // Error state
  const [pitch, setPitch] = React.useState(""); // Pitch state
  const { toast } = useToast(); // Toast state
  const router = useRouter(); // Router state

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    // Form submit handler
    try {
      // Validate form data
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formschema.parseAsync(formValues); // Parse form data

      const result = await createPitch(prevState, formData, pitch); // Create pitch
      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your pitch has been submitted successfully",
        });
        router.push(`/startup/${result.data._id}`); // Redirect to startup page
      }
      return result;
    } catch (error) {
      // Handle errors
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setError(fieldErrors as unknown as Record<string, string>);

        toast({
          variant: "destructive",
          title: "Error",
          description: "Please check your input fields",
        });
        return { ...prevState, error: "Validation Field", status: "ERROR" };
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
      return { ...prevState, error: "Something went wrong", status: "ERROR" };
    }
  };
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />
        {error.title && <p className="startup-form_error">{error.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />
        {error.description && (
          <p className="startup-form_error">{error.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Health, Education, or Etc...)"
        />
        {error.category && (
          <p className="startup-form_error">{error.category}</p>
        )}
      </div>
      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
        />
        {error.link && <p className="startup-form_error">{error.link}</p>}
      </div>
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch || ""}
          onChange={(value) => setPitch((value as string) || "")}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Briefly describe your startup idea and how it works.",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
          className="startup-form_editor"
        />
        {error.pitch && <p className="startup-form_error">{error.pitch}</p>}
      </div>
      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit your Pitch"}
        <Send className="size-6 ml-2" strokeWidth={2.5} />
      </Button>
    </form>
  );
};

export default StartupForm;
