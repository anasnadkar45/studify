import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        author: "Emma Johnson",
        date: "Oct 10",
        role: "High School Junior",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&h=200&auto=format&fit=crop",
        content: "Studify has totally changed the way I study! It breaks down my subjects into daily goals, so I’m never overwhelmed. Love that I can share my plans with friends too!",
        school: "L"
    },
    {
        author: "Carlos Ramirez",
        date: "Sep 22",
        role: "College Freshman",
        avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200&h=200&auto=format&fit=crop",
        content: "As a new college student, Studify has been a lifesaver. The AI study plan from my uploaded notes helped me cover all the topics before exams. Huge help for my busy schedule!",
        school: "U"
    },
    {
        author: "Lily Chen",
        date: "Sep 15",
        role: "Self-Learner",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&h=200&auto=format&fit=crop",
        content: "Studify’s AI planner organizes my study materials into a perfect schedule. The daily quizzes are great for keeping my focus, and it’s super motivating to see my progress!",
        school: "S"
    },
    {
        author: "Jake Thompson",
        date: "Aug 30",
        role: "Test Prep Student",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop",
        content: "Preparing for the SAT was a lot easier with Studify. I uploaded my textbooks and got a plan with summaries and quizzes. Saved me so much time!",
        school: "H"
    }
];


export const Testimonials = () => {
    return (
        <section className="pb-24 bg-gradient-to-b from-background via-background/95 to-background/90 overflow-hidden">
            <div className="container px-4 mx-auto max-w-6xl">
                <div className="flex flex-col items-center text-center mb-16">
                    <Quote className="w-12 h-12 text-primary/50 mb-6" />
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                        Why Students Love Studify
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="group relative rounded-2xl bg-card p-8 hover:bg-card/50 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative">
                                    <div className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-blue-500/20">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.author}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-[#12122A] group-hover:bg-[#16163A] transition-colors duration-300 flex items-center justify-center">
                                        <span className="text-xs font-semibold text-blue-500">
                                            {testimonial.school}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-gray-200">
                                            {testimonial.author}
                                        </h3>
                                        <span className="text-sm text-gray-500">
                                            · {testimonial.date}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                {testimonial.content}
                            </p>
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 transition-all duration-300 group-hover:ring-white/20" />
                            <div className="absolute -inset-px rounded-2xl bg-gradient-to-t from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};