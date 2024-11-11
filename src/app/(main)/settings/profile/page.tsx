import { cookies } from 'next/headers'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default async function Profile() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  const cookieStore = cookies()
  const lastVisit = (await cookieStore).get('lastVisit')

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user.picture || ''} alt={user.given_name || 'User'} />
            <AvatarFallback>{user.given_name?.[0] || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{user.given_name} {user.family_name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" defaultValue={user.given_name || ''} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" defaultValue={user.family_name || ''} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={user.email || ''} disabled />
          </div>
          {lastVisit && (
            <div className="text-sm text-muted-foreground">
              Last visit: {new Date(lastVisit.value).toLocaleString()}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}