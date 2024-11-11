import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRight, Sparkles } from "lucide-react";

export const CallToAction = () => {
    return (
        <section className="relative py-16 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/10" />

            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-300" />
            </div>

            <div className="container relative mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm mb-8 border border-primary/20">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">
                            Try Studify Free for 14 Days
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
                        Start Your Personalized Study Journey Today
                    </h2>

                    <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
                        Join thousands of students who have transformed their learning experience with AI-powered study plans.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <RegisterLink>
                            <Button
                                size="lg"
                                className="group bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                Get Started Free
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                            </Button>
                        </RegisterLink>

                        {/* <Button
              size="lg"
              variant="secondary"
              className="border-primary/20 hover:bg-primary/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              Book a Demo
            </Button> */}
                    </div>

                    <div className="mt-10 flex items-center justify-center gap-8 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Cancel anytime</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};