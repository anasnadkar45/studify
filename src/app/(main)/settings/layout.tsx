import { ScrollArea } from "@/components/ui/scroll-area";

export default function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full">
            <ScrollArea className="h-[100vh] md:h-[100vh] pb-16 md:pb-0">
                {children}
            </ScrollArea>
        </div>
    );
}