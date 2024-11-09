"use client"

import React, { useActionState, useState } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { CircleDashed, FileText, Upload } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useForm } from '@conform-to/react'
import { parseWithZod } from "@conform-to/zod"
import { studyPlanSchema } from "@/app/lib/zodSchemas"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/app/components/global/SubmitButton"
import { Textarea } from "@/components/ui/textarea"
import { StudyPlanAction } from "@/app/action"

const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY

export default function StudyPlanBuilder() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState<boolean>(false)
    const [studyPlan, setStudyPlan] = useState<string>('');
    const [title, setTitle] = useState<string>("")
    const [filetype, setFileType] = useState<string>("")
    const [lastResult, action] = useActionState(StudyPlanAction, undefined)
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: studyPlanSchema })
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setFileType(selectedFile.type)
            setFile(selectedFile)
        }
    }

    const readFileAsBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(file)
        })
    }

    const handleFileUpload = async () => {
        if (!file) {
            toast.error("Please upload a file before submitting.")
            return
        }

        setUploading(true)

        const genAI = new GoogleGenerativeAI(geminiApiKey!)

        try {
            const base64Data = await readFileAsBase64(file)
            const imageParts = [
                {
                    inlineData: {
                        data: base64Data.split(",")[1],
                        mimeType: filetype,
                    },
                },
            ]

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

            const prompt = `You are an expert educational planner. Based on the following content extracted from a PDF document, generate a personalized study plan in JSON format and 50 exam questions with their detailed answers in brief for each type of question, including fill-in-the-blanks, multiple-choice, short answers, and brief answers. The study plan should include the following fields:
      {
        "summary": "A concise summary of the key concepts and important details found in the text.",
        "studyPlan": {
          "dailySessions": [
            {
              "day": 1,
              "topics": ["Topic 1", "Topic 2"],
              "duration": "2 hours",
              "resources": [
                {
                  "topic": "Topic 1",
                  "website": "https://example.com/topic1",
                  "description": "Resource for deeper understanding of Topic 1."
                },
                {
                  "topic": "Topic 2",
                  "website": "https://example.com/topic2",
                  "description": "Resource for deeper understanding of Topic 2."
                }
              ],
              "quiz": {
                "questions": [
                  {
                    "question": "What is Topic 1?",
                    "answer": "Topic 1 is..."
                  }
                ]
              }
            },
            {
              "day": 2,
              "topics": ["Topic 3", "Topic 4"],
              "duration": "1.5 hours",
              "resources": [
                {
                  "topic": "Topic 3",
                  "website": "https://example.com/topic3",
                  "description": "Resource for deeper understanding of Topic 3."
                },
                {
                  "topic": "Topic 4",
                  "website": "https://example.com/topic4",
                  "description": "Resource for deeper understanding of Topic 4."
                }
              ]
            }
          ],
          "finalExamPreparation": {
            "revision": ["Topic 1", "Topic 2"],
            "mockExam": "Complete the mock exam covering all topics."
          }
        },
        "questions": [
          {
            "type": "multiple choice",
            "question": "What is the capital of France?",
            "options": ["Berlin", "Madrid", "Paris", "Lisbon"],
            "answer": "Paris",
            "details": "Paris is the capital city of France."
          },
          ...
        ]
      }
      Ensure the JSON structure is properly formatted and include relevant resource websites for each topic to help students find additional information.`

            const result = await model.generateContent([prompt, ...imageParts])
            const response = await result.response
            const rawContent = await response.text()
            // Clean the content and parse it to ensure it's valid JSON
            const cleanedContent = rawContent.replace(/```json/g, "").replace(/```/g, "").trim()
            try {
                // Validate that it's proper JSON
                const parsedJson = JSON.parse(cleanedContent)
                setStudyPlan(cleanedContent) // Store the cleaned JSON string
                setFile(null)
                setFileType("")
                toast.success("Study plan generated successfully!")
            } catch (error) {
                console.error("Invalid JSON received:", error)
                toast.error("Error: Invalid study plan format received")
            }
        } catch (error) {
            console.error("Error uploading file:", error)
            toast.error("Error generating study plan. Please try again.")
        } finally {
            setUploading(false)
        }
    }

    console.log(studyPlan)
    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Create Your Study Plan</CardTitle>
                </CardHeader>
                <CardContent>
                    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Plan Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter a title for your study plan"
                                name={fields.title.name}
                                defaultValue={fields.title.initialValue}
                                key={fields.title.key}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full"
                            />
                            {fields.title.errors && (
                                <p className="text-red-500 text-sm">{fields.title.errors}</p>
                            )}
                        </div>


                        <div className="space-y-2">
                            <Label htmlFor="content">Upload PDF</Label>
                            <div className="flex items-center justify-center w-full">
                                <label
                                    htmlFor="content"
                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/50 transition-colors duration-300"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <FileText className="w-8 h-8 mb-3 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-muted-foreground">PDF (MAX. 10MB)</p>
                                    </div>
                                    <Input
                                        id="content"
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {file && (
                                <p className="text-sm text-muted-foreground mt-2">
                                    Selected file: {file.name}
                                </p>
                            )}
                        </div>

                        <Input
                            type="hidden"
                            name={fields.content.name}
                            defaultValue={fields.content.initialValue as string}
                            key={fields.content.key}
                            value={studyPlan}
                        />

                        {!studyPlan ? (
                            <Button
                                className="w-full"
                                onClick={handleFileUpload}
                                disabled={uploading || !file}
                            >
                                {uploading ? (
                                    <>
                                        <CircleDashed className="mr-2 h-4 w-4 animate-spin" />
                                        Generating Plan...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mr-2 h-4 w-4" /> Generate Study Plan
                                    </>
                                )}
                            </Button>
                        ) : (
                            <SubmitButton className="w-full" text="Upload" />
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}