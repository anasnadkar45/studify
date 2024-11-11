import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar } from "../components/global/Sidebar";
import { BottomNav } from "../components/global/BottomNav";
import { getUser } from "../hooks/getUser";

export default async function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = await getUser();
    return (
        <div className="w-screen h-screen flex custom-scrollbar scroll-smooth">
            <div className="m-3 hidden md:flex flex-col">
                <Sidebar userId={user.id}/>
            </div>
            <div className="w-full">
                <ScrollArea className="h-[100vh] md:h-[100vh] pb-16 md:pb-0">
                    {children}
                </ScrollArea>
            </div>
            <BottomNav />
        </div>
    );
}