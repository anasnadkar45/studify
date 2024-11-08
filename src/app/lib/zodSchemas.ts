import { z } from "zod";

export const studyPlanSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(50, { message: "Title must be no longer than 50 characters" }),
    content: z
        .string()
    // .object({})
    // .passthrough() // To allow any kind of content in the JSON
});

export const deleteStudyPlanSchema = z.object({
    studyPlanId: z.string().nonempty("Study Plan ID is required"),
});