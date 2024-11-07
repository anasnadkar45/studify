import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar } from "../components/global/Sidebar";
import { Navbar } from "../components/global/Navbar";

export default async function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-screen h-screen flex custom-scrollbar scroll-smooth">
            <Sidebar />
            <div className="w-full">
                <Navbar />
                <ScrollArea className="h-[calc(100vh-4rem)]">
                    {children}
                </ScrollArea>
            </div>
        </div>
    );
}