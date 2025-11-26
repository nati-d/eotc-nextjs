"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-950 font-sans">
      <Container className="py-20">
        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
          Frequently Asked Questions
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm mb-12">
          Everything you need to know to get the most out of your spiritual journey
        </p>
      </Container>

      <Container>
        <div className="space-y-4 pb-20">
          {items.map((item, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground pr-4">
                  {item.question}
                </h3>
                <span
                  className={cn(
                    "text-2xl font-light text-muted-foreground transition-transform flex-shrink-0",
                    openIndex === index && "rotate-45"
                  )}
                >
                  +
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

