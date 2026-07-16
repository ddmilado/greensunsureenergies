"use client";

import { useChat } from "@ai-sdk/react";
import { PaperPlaneTilt, ChatCircleDots, X } from "@phosphor-icons/react";
import { useState, useRef, useEffect } from "react";
import { site } from "../data/site";

function renderLinks(text: string, siteOrigin: string) {
  const parts: { type: "text" | "link"; content: string; href?: string }[] = [];
  let last = 0;
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push({ type: "text", content: text.slice(last, match.index) });

    const href = match[2];
    try {
      const url = new URL(href, siteOrigin);
      if (url.origin !== siteOrigin) {
        parts.push({ type: "text", content: match[0] });
      } else {
        parts.push({ type: "link", content: match[1], href: url.href });
      }
    } catch {
      parts.push({ type: "text", content: match[0] });
    }

    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push({ type: "text", content: text.slice(last) });
  return parts;
}

function messageText(m: any): string {
  if (m.parts && Array.isArray(m.parts)) {
    const texts = m.parts
      .filter((p: any) => p?.type === "text")
      .map((p: any) => p?.text ?? "");
    if (texts.length > 0) return texts.join("");
  }
  if (m.content) return m.content;
  if (m.text) return m.text;
  return "";
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isLoading = status === "submitted" || status === "streaming";
  const isError = status === "error";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-28 right-6 z-50 flex w-[400px] max-w-[calc(100vw-48px)] flex-col rounded-[1.75rem] bg-white shadow-[0_24px_80px_rgba(3,17,31,0.18)] ring-1 ring-[var(--line)] dark:bg-[var(--ink-900)]">
          <div className="flex items-center justify-between rounded-t-[1.75rem] bg-[var(--ink-950)] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--solar-lime)]">
                <ChatCircleDots size={20} weight="fill" className="text-[var(--ink-950)]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Green Sunsure Assistant</p>
                <span className="inline-flex items-center gap-1 rounded-full border border-[var(--solar-lime)]/30 bg-[var(--solar-lime)]/15 px-2 py-0.5 text-[10px] font-medium text-[var(--solar-lime)]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--solar-lime)]" />
                  Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex h-[440px] flex-col overflow-y-auto bg-[var(--shell)] px-4 py-4">
            {messages.length === 0 && (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--solar-lime)]/10">
                  <ChatCircleDots size={32} weight="duotone" className="text-[var(--solar-lime)]" />
                </div>
                <p className="mt-4 text-sm font-semibold text-[var(--ink-950)]">
                  Hi! How can we help you?
                </p>
                <p className="mt-1 max-w-[240px] text-xs text-[var(--ink-600)]">
                  Ask about solar pricing, services, installations, and more.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {["How much for a 3-bedroom?", "What areas do you cover?", "Do you offer payment plans?"].map(
                    (q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => sendMessage({ text: q })}
                        className="rounded-full border border-[var(--line)] px-3.5 py-2 text-xs font-medium text-[var(--ink-700)] transition-colors hover:border-[var(--solar-lime)] hover:bg-[var(--solar-lime)] hover:text-[var(--ink-950)]"
                      >
                        {q}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}

            {messages.map((m, i) => {
              const txt = messageText(m);
              return (
                <div
                  key={i}
                  className={`mb-3 max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto rounded-br-md bg-[var(--solar-lime)] text-[var(--ink-950)] shadow-[0_2px_8px_rgba(146,210,67,0.2)]"
                      : "mr-auto rounded-bl-md bg-white text-[var(--ink-950)] ring-1 ring-[var(--line)] dark:bg-[var(--shell)]"
                  }`}
                >
                  {renderLinks(txt, origin).map((part, j) =>
                    part.type === "link" ? (
                      <a
                        key={j}
                        href={part.href}
                        target="_blank"
                        rel="noopener noreferrer"
                          className={
                            m.role === "user"
                              ? "underline text-[var(--ink-950)]/70"
                              : "underline text-[var(--solar-lime)] font-semibold"
                          }
                      >
                        {part.content}
                      </a>
                    ) : (
                      <span key={j}>{part.content}</span>
                    ),
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="mr-auto flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-[var(--solar-lime)]/20 bg-[var(--solar-lime)]/8 px-5 py-3.5">
                <span className="h-3 w-3 animate-bounce rounded-full bg-[var(--solar-lime)] [animation-delay:0ms]" />
                <span className="h-3 w-3 animate-bounce rounded-full bg-[var(--solar-lime)] [animation-delay:120ms]" />
                <span className="h-3 w-3 animate-bounce rounded-full bg-[var(--solar-lime)] [animation-delay:240ms]" />
              </div>
            )}

            {isError && (
              <div className="mr-auto rounded-2xl rounded-bl-md bg-red-50 px-4 py-3 text-xs text-red-600 ring-1 ring-red-200">
                Connection issue. Please try again or call {site.phone}.
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t border-[var(--line)] bg-white px-4 py-3 dark:bg-[var(--ink-900)]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              className="form-field min-h-0 flex-1 resize-none rounded-2xl py-3 text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--solar-lime)] text-[var(--ink-950)] shadow-[0_4px_12px_rgba(146,210,67,0.3)] transition-all hover:scale-105 hover:shadow-[0_6px_20px_rgba(146,210,67,0.4)] disabled:opacity-40 disabled:hover:scale-100"
              aria-label="Send message"
            >
              <PaperPlaneTilt size={18} weight="fill" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--solar-lime)] text-[var(--ink-950)] shadow-[0_8px_32px_rgba(146,210,67,0.45)] transition-all hover:scale-110 hover:shadow-[0_12px_40px_rgba(146,210,67,0.6)] active:scale-95"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X size={26} weight="bold" /> : <ChatCircleDots size={30} weight="fill" />}
      </button>
    </>
  );
}
