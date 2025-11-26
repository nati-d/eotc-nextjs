"use client";

import { FAQ } from "@/components/ui/faq";

export function FAQSection() {
  const faqItems = [
    {
      question: "What is EOTC Resource Hub?",
      answer: "EOTC Resource Hub is a centralized platform designed for English-speaking converts to the Ethiopian Orthodox Church. It provides all the resources you need for your spiritual journey in one easily accessible location.",
    },
    {
      question: "How do I upload resources?",
      answer: "Simply create an account, navigate to the upload section, and submit your resource. All uploads go through an admin review process to ensure quality and theological accuracy before being made public.",
    },
    {
      question: "Can I search for specific resources?",
      answer: "Yes! You can search by topic, resource type (PDF, video, audio), keywords, or filter by conversion stages such as catechism, baptism, or post-baptismal life.",
    },
    {
      question: "Who can see the resources I upload?",
      answer: "Once your uploaded resource is approved by an administrator, it becomes available to all community members. You can see who uploaded each resource and when it was added.",
    },
    {
      question: "Is there a cost to use this platform?",
      answer: "No, EOTC Resource Hub is free to use. Our goal is to support converts in their spiritual journey by providing easy access to valuable resources.",
    },
    {
      question: "How do I get started?",
      answer: "Create a free account, explore the resources library, and start your journey. You can upload resources you've found or created, search for what you need, and connect with the community.",
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <FAQ items={faqItems} />
    </div>
  );
}

