"use server"
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { parseWithZod } from '@conform-to/zod';
import { deleteStudyPlanSchema, studyPlanSchema } from "./lib/zodSchemas";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

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


export async function DeleteStudyPlanAction(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // Validate the form data using the deletion schema
    const submission = parseWithZod(formData, {
        schema: deleteStudyPlanSchema,
    });

    // If validation fails, return the errors
    if (submission.status !== "success") {
        return submission.reply();
    }

    const { studyPlanId } = submission.value;

    try {
        // Attempt to delete the study plan
        await prisma.studyPlan.delete({
            where: {
                id: studyPlanId,
                userId: user.id,
            },
        });

        // If successful, return undefined to indicate no errors
        revalidatePath('/study-plan')
        return undefined;
    } catch (error) {
        // Return a structured error compatible with `SubmissionResult<string[]>`
        return {
            error: { general: ["Failed to delete the study plan."] }, // `general` is just an example key for an error field
        };
    }
}
