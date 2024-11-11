import { FileText, Share2, BarChart2, Layout, HelpCircle, Crown } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: "AI-Generated Study Plans from Your PDFs",
    description: "Upload any PDF with study content, and Studify will transform it into a daily study plan with essential resources, quizzes, Q&As, and summaries for each topic."
  },
  {
    icon: Share2,
    title: "Community Sharing",
    description: "Share your study plans with the Studify community, or explore others' plans for inspiration and new approaches."
  },
  {
    icon: BarChart2,
    title: "Easy Progress Tracking",
    description: "Receive daily updates on your progress and easily pick up where you left off. Each day's content is ready and waiting for you!"
  },
  {
    icon: Layout,
    title: "Engaging & Simple Interface",
    description: "Studify's intuitive design makes it easy to focus on your goals without distraction."
  }
];

export const Features = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex rounded-xl bg-primary/5 p-3 shadow-lg ring-1 ring-primary/10">
            <Crown className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
            Why Choose Studify?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border group relative overflow-hidden rounded-2xl bg-gradient-to-b from-card/50 to-card p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div className="relative z-10">
                <div className="mb-6 inline-flex rounded-xl bg-background/90 p-3 shadow-lg ring-1 ring-primary/5">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-primary/5 blur-3xl transition-all duration-500 group-hover:bg-primary/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}