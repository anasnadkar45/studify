import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { HelpCircle } from "lucide-react";
  
  const faqs = [
    {
      question: "How does Studify create study plans from PDFs?",
      answer: "Upload any PDF with study material, and Studify's AI will generate a daily study plan with resources, quizzes, summaries, and Q&As."
    },
    // {
    //   question: "Can I edit my AI-generated study plan?",
    //   answer: "Yes, you can customize the plan to suit your goals after it's generated."
    // },
    {
      question: "What types of files can I upload?",
      answer: "Any PDF containing study materials—textbooks, notes, or other educational content—works with Studify."
    },
    {
      question: "Can I share my study plans?",
      answer: "Yes! Publish your study plan to the Studify community to help others, or keep it private if you prefer."
    },
    {
      question: "Is there a free version of Studify?",
      answer: "Studify offers both a free version and a premium plan with advanced features. See our pricing for details."
    },
    {
      question: "How does progress tracking work?",
      answer: "Studify tracks each day's tasks as you complete them, showing your overall progress at a glance."
    },
    {
      question: "Can I access study plans shared by others?",
      answer: "Yes, explore a variety of community-created study plans for inspiration and additional resources."
    },
    {
      question: "Is Studify available on mobile?",
      answer: "Yes, Studify works seamlessly on all devices."
    },
    {
      question: "Are my study plans private?",
      answer: "All plans are private by default; sharing is optional."
    }
  ];
  
  export const FAQ = () => {
    return (
      <section className="pb-24 bg-gradient-to-b from-background via-background/95 to-background/90">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="mb-6 inline-flex rounded-xl bg-primary/5 p-3 shadow-lg ring-1 ring-primary/10">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Everything you need to know about Studify. Can't find the answer you're looking for? Feel free to contact our support team.
            </p>
          </div>
  
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent blur-3xl -z-10" />
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="group border bg-card/50 backdrop-blur-sm rounded-lg px-6 shadow-md transition-all duration-200 hover:shadow-xl hover:shadow-primary/5 data-[state=open]:bg-card"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6 group-data-[state=open]:text-primary [&[data-state=open]>svg]:rotate-180">
                    <span className="text-lg font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    );
  };