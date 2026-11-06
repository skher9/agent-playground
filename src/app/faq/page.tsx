import type { Metadata } from "next";

import FaqItem from "@/app/faq/FaqItem";

export const metadata: Metadata = {
  title: "Frequently asked questions",
};

const faqs: { question: string; answer: string }[] = [
  {
    question: "What is this app?",
    answer: "This is a small Next.js starter app you can build on.",
  },
  {
    question: "How do I report a problem?",
    answer: "Send an email describing what you expected and what happened instead.",
  },
  {
    question: "How do I request a feature?",
    answer: "Email us your idea and we will consider adding it to the roadmap.",
  },
  {
    question: "How do I get in touch?",
    answer: "Use the contact email listed on our site and we will reply as soon as we can.",
  },
];

export default function FaqPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Frequently asked questions</h1>
      <ul className="mt-4 max-w-2xl">
        {faqs.map((faq) => (
          <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </ul>
    </main>
  );
}
