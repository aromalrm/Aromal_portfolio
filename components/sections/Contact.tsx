"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Calendar,
  Mail,
  Twitter,
  ArrowUpRight,
  ArrowRight,
  Clock,
  CircleCheck,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactForm = z.infer<typeof contactSchema>;

const OPTIONS = [
  {
    icon: Calendar,
    title: "Schedule a free call",
    subtitle: "30-minute strategy session",
    href: "https://cal.com/", // ← update with your Cal.com link
    external: true,
  },
  {
    icon: Mail,
    title: PERSONAL_INFO.email,
    subtitle: "Quick inquiries & questions",
    href: `mailto:${PERSONAL_INFO.email}`,
    external: false,
  },
  {
    icon: Twitter,
    title: "Connect on X",
    subtitle: "Follow for updates & insights",
    href: "https://x.com/aromalramesh", // ← update
    external: true,
  },
];

export function Contact() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactForm) => {
    setState("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, subject: `Message from ${data.name}` }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to send");
      setState("success");
      reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setState("error");
    }
  };

  const inputCls = (hasError: boolean) =>
    `w-full px-3 py-[11px] rounded-[9px] border ${
      hasError ? "border-red-500/50" : "border-border"
    } bg-background text-foreground text-xs placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-ring transition-colors`;

  return (
    <section id="contact" className="px-5 py-7" aria-labelledby="contact-heading">
      <div className="max-w-[720px] mx-auto">
        <h2
          id="contact-heading"
          className="text-[11px] font-semibold tracking-[1.5px] text-muted-foreground text-center mb-[18px]"
        >
          LET&apos;S WORK TOGETHER
        </h2>

        <div className="grid md:grid-cols-2 gap-3.5">
          {/* Left — Get in Touch */}
          <div className="border border-border rounded-2xl p-5 bg-card flex flex-col">
            <h3 className="text-base font-bold text-foreground mb-1.5">
              Get in Touch
            </h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-3.5">
              Choose your preferred method to connect and let&apos;s discuss your
              project.
            </p>

            <div className="flex flex-col">
              {OPTIONS.map((o) => {
                const Icon = o.icon;
                return (
                  <a
                    key={o.title}
                    href={o.href}
                    target={o.external ? "_blank" : undefined}
                    rel={o.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 py-3 px-2 -mx-2 border-t border-border rounded-lg hover:bg-accent transition-colors group"
                  >
                    <div className="w-[34px] h-[34px] rounded-[9px] bg-muted flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {o.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {o.subtitle}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="text-muted-foreground shrink-0"
                    />
                  </a>
                );
              })}
            </div>

            <div className="mt-auto pt-3.5 border-t border-border flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <Clock size={13} className="text-muted-foreground" />
                <span className="text-[11px] text-muted-foreground">
                  Replies within 24 hours
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck size={13} className="text-green-500" />
                <span className="text-[11px] text-muted-foreground">
                  Open to remote, freelance &amp; full-time
                </span>
              </div>
            </div>
          </div>

          {/* Right — Send a Message */}
          <div className="border border-border rounded-2xl p-5 bg-card flex flex-col">
            <h3 className="text-base font-bold text-foreground mb-1.5">
              Send a Message
            </h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-3.5">
              Prefer to write? Fill out the form and I&apos;ll get back to you
              within 24 hours.
            </p>

            {state === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center py-6"
              >
                <CheckCircle2 size={28} className="text-green-500 mb-2" />
                <p className="text-sm font-semibold text-foreground mb-1">
                  Message sent!
                </p>
                <p className="text-[11px] text-muted-foreground mb-3">
                  I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setState("idle")}
                  className="text-[11px] text-muted-foreground hover:text-foreground underline underline-offset-2"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2.5 flex-1"
                noValidate
              >
                <div>
                  <input
                    {...register("name")}
                    placeholder="Full Name"
                    autoComplete="name"
                    className={inputCls(!!errors.name)}
                    disabled={state === "loading"}
                  />
                  {errors.name && (
                    <p className="text-[10px] text-red-500 mt-1" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email Address"
                    autoComplete="email"
                    className={inputCls(!!errors.email)}
                    disabled={state === "loading"}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-red-500 mt-1" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="flex-1 flex flex-col">
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder="Your Message"
                    className={`${inputCls(!!errors.message)} resize-none flex-1`}
                    disabled={state === "loading"}
                  />
                  {errors.message && (
                    <p className="text-[10px] text-red-500 mt-1" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {state === "error" && (
                  <p className="text-[10px] text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-2.5 py-1.5">
                    {errorMsg || "Failed to send. Please email directly."}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="w-full py-[11px] rounded-[9px] bg-foreground text-background text-[12.5px] font-semibold flex items-center justify-center gap-1.5 hover:opacity-85 transition-opacity disabled:opacity-50"
                >
                  {state === "loading" ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
