import { Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from '../../../../public/Logo.svg'

const footerLinks = {
    product: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Resources", href: "#" },
        { label: "Case Studies", href: "#" },
    ],
    company: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Press Kit", href: "#" },
    ],
    support: [
        { label: "Documentation", href: "#" },
        { label: "Help Center", href: "#" },
        { label: "Community", href: "#" },
        { label: "Contact", href: "#" },
    ],
    legal: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Security", href: "#" },
        { label: "Status", href: "#" },
    ],
};

export const Footer = () => {
    return (
        <footer className="border-t border-primary/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="grid grid-cols-2 md:grid-cols-12 gap-8 py-12">
                    {/* Brand Section */}
                    <div className="col-span-2 md:col-span-3">
                        <div className="flex items-center gap-2 text-xl font-bold text-primary mb-4">
                            <div className="flex p-1 items-center justify-center rounded-lg bg-teal-500">
                                <Image src={Logo} alt="Studify" className="size-8" />
                            </div>
                            Studify
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                            Transform your study materials into engaging, personalized learning experiences.
                        </p>
                        <div className="flex gap-4">
                            <Button variant="ghost" size="icon" className="hover:text-primary">
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:text-primary">
                                <Github className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:text-primary">
                                <Linkedin className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Links Sections */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title} className="col-span-1 md:col-span-2">
                            <h3 className="font-semibold mb-3 text-foreground capitalize">
                                {title}
                            </h3>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="border-t border-primary/10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Studify. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-primary">
                            Privacy Policy
                        </Button>
                        <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-primary">
                            Terms of Service
                        </Button>
                        <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-primary">
                            Cookies
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
};