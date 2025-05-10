import { Card, CardContent } from "./card";
import { CheckCircle, UploadCloud, ThumbsUp } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <UploadCloud className="w-8 h-8 text-blue-500" />,
      title: "1. Report the Issue",
      description:
        "Take a photo and submit details about road damage or river pollution.",
    },
    {
      icon: <ThumbsUp className="w-8 h-8 text-green-500" />,
      title: "2. Community Votes",
      description:
        "Users can like reports, helping the most urgent ones get visibility.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-emerald-600" />,
      title: "3. Companies Act",
      description:
        "Popular reports are forwarded to companies and authorities for action.",
    },
  ];

  return (
    <section className="py-12 bg-[#2325d]">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 shadow-md">
              <CardContent className="flex flex-col items-center space-y-4">
                {step.icon}
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
