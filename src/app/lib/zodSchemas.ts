import { z } from "zod";

export const studyPlanSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(50, { message: "Title must be no longer than 50 characters" }),
    content: z
        .string()
        .min(1, { message: "Content is required" })
        .refine(
            (value) => {
                try {
                    JSON.parse(value)
                    return true
                } catch {
                    return false
                }
            },
            { message: "Content must be valid JSON" }
        ),
})

export const deleteStudyPlanSchema = z.object({
    studyPlanId: z.string().nonempty("Study Plan ID is required"),
});

export const publishStudyPlanSchema = z.object({
    studyPlanId: z.string().nonempty("Study Plan ID is required"),
})