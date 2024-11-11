'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Clock, Mail } from 'lucide-react'

export default function Goals() {
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        const target = new Date("2024-12-31T23:59:59")

        const interval = setInterval(() => {
            const now = new Date()
            const difference = target.getTime() - now.getTime()

            const d = Math.floor(difference / (1000 * 60 * 60 * 24))
            setDays(d)

            const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            setHours(h)

            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
            setMinutes(m)

            const s = Math.floor((difference % (1000 * 60)) / 1000)
            setSeconds(s)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">Coming Soon</CardTitle>
                    <CardDescription className="text-center">Our new site is on its way</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-4 gap-4 my-8">
                        <div className="flex flex-col items-center">
                            <div className="text-4xl font-bold">{days}</div>
                            <div className="text-sm">Days</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-4xl font-bold">{hours}</div>
                            <div className="text-sm">Hours</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-4xl font-bold">{minutes}</div>
                            <div className="text-sm">Minutes</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-4xl font-bold">{seconds}</div>
                            <div className="text-sm">Seconds</div>
                        </div>
                    </div>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Get notified when we launch</Label>
                            <div className="flex space-x-2">
                                <Input id="email" type="email" placeholder="Enter your email" required />
                                <Button type="submit">
                                    <Mail className="mr-2 h-4 w-4" />
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Launching on December 31, 2024</span>
                </CardFooter>
            </Card>
        </main>
    )
}