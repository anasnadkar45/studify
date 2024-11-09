"use server";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { parseWithZod } from '@conform-to/zod';
import { deleteStudyPlanSchema, publishStudyPlanSchema, studyPlanSchema } from "./lib/zodSchemas";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export async function StudyPlanAction(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // Validate the form data using the study plan schema
    const submission = parseWithZod(formData, {
        schema: studyPlanSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const { title, content } = submission.value;

    try {
        // Step 1: Check if the user has reached the maximum number of study plans (3)
        const userStudyPlansCount = await prisma.studyPlan.count({
            where: {
                userId: user.id,
            },
        });

        // Step 2: If user has 3 study plans, prevent further creation
        if (userStudyPlansCount >= 2) {
            return submission.reply({
                formErrors: ["You can only create up to 3 study plans."],
            });
        }

        // Step 3: Parse the content string into a JSON object
        const parsedContent = JSON.parse(content);

        // Step 4: Create a new study plan in the database
        await prisma.studyPlan.create({
            data: {
                title,
                content: parsedContent, // Prisma will handle the JSON conversion
                userId: user.id,
            },
        });

        // Step 5: Revalidate the page after creating the study plan
        revalidatePath("/study-plan");
    } catch (error) {
        console.error("Error creating study plan:", error);
        return submission.reply({
            formErrors: ["Failed to create study plan. Please try again."],
        });
    }

    // Step 6: Redirect after successful creation
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

        // Revalidate the path after deleting the study plan
        revalidatePath('/study-plan');
        return undefined;
    } catch (error) {
        return {
            error: { general: ["Failed to delete the study plan."] },
        };
    }
}

export async function publishStudyPlan(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const submission = parseWithZod(formData, {
        schema: publishStudyPlanSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const { studyPlanId } = submission.value;

    try {
        // Create a new community if it doesn't exist
        const community = await prisma.community.create({
            data: {},
        });

        // Update the study plan with the community ID
        const updatedStudyPlan = await prisma.studyPlan.update({
            where: {
                id: studyPlanId,
                userId: user.id,
            },
            data: {
                communityId: community.id,
            },
        });

        // Revalidate the path after updating the study plan
        revalidatePath(`/study-plan/${studyPlanId}`);
        return {
            status: "success",
            message: "Your study plan has been published to the community.",
            studyPlan: updatedStudyPlan,
        };
    } catch (error) {
        console.error("Error publishing study plan:", error);
        return {
            status: "error",
            message: "Failed to publish the study plan.",
            error: error instanceof Error ? error.message : String(error),
        };
    }
}
