"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ToastButtonProps {
    userStudyPlansCount: number;
}

export function ToastButton({ userStudyPlansCount }: ToastButtonProps) {
    const handleClick = () => {
        if (userStudyPlansCount >= 2) {
            toast("You cannot create more than 2 study plans. Your free quota is finished.", {
                description: "Consider upgrading your plan for more study plans.",
                action: {
                    label: "Upgrade",
                    onClick: () => console.log("Upgrade action triggered"),
                },
            });
        }
    };

    return (
        <Button onClick={handleClick}>
            <Link className="space-x-2 flex items-center" href={userStudyPlansCount < 2 ? "/study-plan/create" : "#"}>
                <Plus className="w-4 h-4" />
                <span>{userStudyPlansCount < 2 ? "New Study Plan" : "Limit Reached"}</span>
            </Link>
        </Button>
    );
}

export function ToastButton2({ userStudyPlansCount }: ToastButtonProps) {
    const handleClick = () => {
        if (userStudyPlansCount >= 2) {
            toast("You cannot create more than 2 study plans. Your free quota is finished.", {
                description: "Consider upgrading your plan for more study plans.",
                action: {
                    label: "Upgrade",
                    onClick: () => console.log("Upgrade action triggered"),
                },
            });
        }
    };

    return (
        <Button onClick={handleClick} className="flex bg-transparent items-center justify-center min-h-48 border-2 border-dashed border-primary/50 hover:border-primary hover:bg-primary/10 transition-colors cursor-pointer">
            <Link href={userStudyPlansCount < 2 ? "/study-plan/create" : "#"} className="flex flex-col items-center text-primary">
                <Plus className="w-8 h-8 mb-2" />
                <span className="font-medium">Create New Plan</span>
            </Link>
        </Button>
    );
}

export function ToastButton3({ userStudyPlansCount }: ToastButtonProps) {
    const handleClick = () => {
      if (userStudyPlansCount >= 2) {
        toast("You cannot create more than 2 study plans. Your free quota is finished.", {
          description: "Consider upgrading your plan for more study plans.",
          action: {
            label: "Upgrade",
            onClick: () => console.log("Upgrade action triggered"),
          },
        });
      }
    };
  
    return (
      <Card
        className="col-span-full bg-card text-center border-2 border-dashed border-primary/50 hover:border-primary transition-colors cursor-pointer"
        onClick={handleClick}
      >
        <Link href={userStudyPlansCount < 2 ? "/study-plan/create" : "#"} className="flex flex-col items-center text-primary">
          <CardHeader>
            <CardTitle className="text-2xl flex flex-col items-center text-primary">
              <Plus className="w-8 h-8 mb-2" />
              <span className="font-medium">{userStudyPlansCount < 2 ? "Create New Plan" : "Limit Reached"}</span>
            </CardTitle>
            <CardDescription>Start your learning journey today</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Organize your study materials, set goals, and track your progress with our intuitive study planner.</p>
          </CardContent>
        </Link>
      </Card>
    );
  }