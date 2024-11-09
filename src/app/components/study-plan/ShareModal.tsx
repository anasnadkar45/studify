'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Share2, Copy, Check } from "lucide-react"
import { useState } from "react"

interface ShareModalProps {
    studyPlanId: string
}

export function ShareModal({ studyPlanId }: ShareModalProps = { studyPlanId: '' }) {
    const [copied, setCopied] = useState(false)
    const shareUrl = `${window.location.origin}/community/${studyPlanId}`

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share Study Plan</DialogTitle>
                    <DialogDescription>
                        Anyone with this link will be able to view this study plan.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue={shareUrl}
                            readOnly
                            className="w-full"
                        />
                    </div>
                    <Button
                        type="button"
                        size="icon"
                        onClick={copyToClipboard}
                        variant="secondary"
                    >
                        {copied ? (
                            <Check className="h-4 w-4" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogDescription>
                        You can revoke access to this study plan at any time from your settings.
                    </DialogDescription>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}