import { Button } from "@/components/ui/button";
import { ModeToggle } from "./components/theme/ModeToggle";
import { LoginLink, LogoutLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { getUser } = await getKindeServerSession()
  const user = await getUser();
  if(user.id){
    redirect('/dashboard')
  }
  return (
    <div>
      <Button>
        <LoginLink>Sign in</LoginLink>
      </Button>
      <Button>
        <RegisterLink>Sign up</RegisterLink>
      </Button>
      <Button variant={"destructive"}>
        <LogoutLink>Log out</LogoutLink>
      </Button>
      <ModeToggle />
      <p>{user?.email}</p>
    </div>
  );
}
