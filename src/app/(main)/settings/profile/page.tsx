import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { unstable_noStore as noStore } from 'next/cache'

const Profile = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    noStore()

    if (!user) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>
    }

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
                    {/* <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea 
                            id="bio" 
                            className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            placeholder="Tell us about yourself"
                        />
                    </div> */}
                </CardContent>
                {/* <CardFooter className="flex justify-end">
                    <Button>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                    </Button>
                </CardFooter> */}
            </Card>
        </div>
    )
}

export default Profile