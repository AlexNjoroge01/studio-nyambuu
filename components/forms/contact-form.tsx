"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarDays, Check, ChevronDown } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { sendEnquiryEmail } from "@/app/actions/send-enquiry";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getCollectionItem } from "@/content/collection";
import { contactContent } from "@/content/contact";
import { whatsappUrl } from "@/lib/site";
import {
  buildWhatsAppMessage,
  contactSchema,
  type ContactValues,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-11 rounded-none border-0 border-b border-border bg-transparent px-0 text-base text-ink shadow-none placeholder:text-cocoa/80 focus-visible:border-ink focus-visible:ring-0 aria-[invalid=true]:border-vermilion";

const labelClass = "label text-cocoa";

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-xs text-vermilion" role="alert">
      {message}
    </p>
  );
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const [dateOpen, setDateOpen] = useState(false);

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "not-sure",
      occasion: "",
      budget: "",
      sizes: "",
      message: "",
      consent: false,
      website: "",
    },
  });

  useEffect(() => {
    const piece = searchParams.get("piece");
    const occasion = searchParams.get("occasion");

    if (piece) {
      const item = getCollectionItem(piece);
      form.setValue("service", "collection");
      form.setValue(
        "message",
        item
          ? `I'd like to enquire about ${item.name} (ref: ${item.id}).`
          : `I'd like to enquire about a piece from The Collection (ref: ${piece}).`
      );
    } else if (occasion) {
      form.setValue("service", "occasion-styling");
      form.setValue("message", `I'm enquiring about styling for ${occasion}.`);
    }
    // Run once for the incoming query string.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(values: ContactValues) {
    if (values.website) return;

    const message = buildWhatsAppMessage(values);
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    toast.success(contactContent.form.success);

    // Optional Resend email — skipped silently when no API key is configured.
    void sendEnquiryEmail(values).catch(() => undefined);

    form.reset({
      name: "",
      phone: "",
      email: "",
      service: "not-sure",
      occasion: "",
      budget: "",
      sizes: "",
      message: "",
      consent: false,
      website: "",
    });
  }

  const { errors, isSubmitting } = form.formState;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="space-y-7"
      aria-label="Styling enquiry form"
    >
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className={labelClass}>
            {contactContent.form.name} *
          </Label>
          <Input
            id="name"
            autoComplete="name"
            className={fieldClass}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...form.register("name")}
          />
          <ErrorText id="name-error" message={errors.name?.message} />
        </div>

        <div>
          <Label htmlFor="phone" className={labelClass}>
            {contactContent.form.phone} *
          </Label>
          <Input
            id="phone"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+254 7…"
            className={fieldClass}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            {...form.register("phone")}
          />
          <ErrorText id="phone-error" message={errors.phone?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="email" className={labelClass}>
          {contactContent.form.email}
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...form.register("email")}
        />
        <ErrorText id="email-error" message={errors.email?.message} />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <Label htmlFor="service" className={labelClass}>
            {contactContent.form.service} *
          </Label>
          <Controller
            control={form.control}
            name="service"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="service"
                  className={cn(fieldClass, "w-full justify-between rounded-none")}
                >
                  <SelectValue placeholder="Choose a service" />
                  <ChevronDown className="size-4 text-cocoa" aria-hidden />
                </SelectTrigger>
                <SelectContent>
                  {contactContent.services.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Label htmlFor="occasion" className={labelClass}>
            {contactContent.form.occasion}
          </Label>
          <Controller
            control={form.control}
            name="occasion"
            render={({ field }) => (
              <Popover open={dateOpen} onOpenChange={setDateOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    id="occasion"
                    className={cn(
                      fieldClass,
                      "flex w-full items-center justify-between text-left",
                      !field.value && "text-cocoa/80"
                    )}
                  >
                    {field.value || "Pick a date"}
                    <CalendarDays className="size-4 text-cocoa" aria-hidden />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      field.onChange(date ? format(date, "d MMMM yyyy") : "");
                      setDateOpen(false);
                    }}
                    disabled={{ before: new Date() }}
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>
      </div>

      <div>
        <p className={labelClass}>{contactContent.form.budget}</p>
        <Controller
          control={form.control}
          name="budget"
          render={({ field }) => (
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="mt-3 flex flex-wrap gap-x-5 gap-y-2.5"
            >
              {contactContent.budgets.map((budget) => (
                <label
                  key={budget.value}
                  className="flex cursor-pointer items-center gap-2 text-sm text-ink"
                >
                  <RadioGroupItem value={budget.value} id={`budget-${budget.value}`} />
                  {budget.label}
                </label>
              ))}
            </RadioGroup>
          )}
        />
      </div>

      <div>
        <Label htmlFor="sizes" className={labelClass}>
          {contactContent.form.sizes}
        </Label>
        <Textarea
          id="sizes"
          rows={2}
          placeholder="Bust, waist, hips, height, shoe size — anything you know."
          className="mt-2 min-h-20 resize-y rounded-none border-border bg-transparent px-0 focus-visible:border-ink focus-visible:ring-0"
          {...form.register("sizes")}
        />
      </div>

      <div>
        <Label htmlFor="message" className={labelClass}>
          {contactContent.form.message} *
        </Label>
        <Textarea
          id="message"
          rows={4}
          className="mt-2 min-h-28 resize-y rounded-none border-border bg-transparent px-0 focus-visible:border-ink focus-visible:ring-0"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...form.register("message")}
        />
        <ErrorText id="message-error" message={errors.message?.message} />
      </div>

      {/* Honeypot — hidden from people, visible to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...form.register("website")}
        />
      </div>

      <Controller
        control={form.control}
        name="consent"
        render={({ field }) => (
          <div>
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-cocoa">
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? "consent-error" : undefined}
                className="mt-0.5"
              />
              <span>{contactContent.form.consent}</span>
            </label>
            {errors.consent && (
              <p id="consent-error" className="mt-1 text-xs text-vermilion" role="alert">
                {errors.consent.message}
              </p>
            )}
          </div>
        )}
      />

      <Button
        type="submit"
        variant="ink"
        size="lg"
        className="w-full sm:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? contactContent.form.submitting : contactContent.form.submit}
        <Check className="size-4" aria-hidden />
      </Button>

      <p className="text-xs leading-relaxed text-cocoa/80">
        Your details are used only to reply to this enquiry. Nothing is stored on
        this website. See our <a href="/privacy" className="underline underline-offset-2">privacy note</a>.
      </p>
    </form>
  );
}
