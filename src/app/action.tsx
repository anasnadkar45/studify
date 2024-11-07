"use server"
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { parseWithZod } from '@conform-to/zod';
import { studyPlanSchema } from "./lib/zodSchemas";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function StudyPlanAction(prevState: any, formData: FormData) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    // Validate the form data using Zod schema
    const submission = parseWithZod(formData, {
        schema: studyPlanSchema,
    });

    // If validation fails, return the errors
    if (submission.status !== "success") {
        return submission.reply();
    }

    // Extract the validated data
    const { title,content } = submission.value;

    // Create a new study plan in the database
    await prisma.studyPlan.create({
        data: {
            title: title,
            content: content,  // Assuming `content` is already in a JSON format
            userId: user.id,  // Link to the currently logged-in user
        }
    });

    // Redirect to the study plan overview page after successful creation
    return redirect("/study-plan");
}