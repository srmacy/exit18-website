"use client";

import { useState } from "react";
import { siteContent } from "@/content/siteContent";

type Status = "idle" | "submitting" | "success" | "error";

export function ServiceRequestForm() {
  const {
    formCopy,
    formFields,
    machineBrands,
    requestSection,
  } = siteContent.servicePage;

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    setStatus("submitting");
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      address: String(fd.get("address") ?? "").trim(),
      brand: String(fd.get("brand") ?? "").trim(),
      model: String(fd.get("model") ?? "").trim(),
      issue: String(fd.get("issue") ?? "").trim(),
      pickup: String(fd.get("pickup") ?? "no"),
      contactTime: String(fd.get("contactTime") ?? ""),
    };

    try {
      const res = await fetch("/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok?: boolean; message?: string };

      if (!res.ok || !json.ok) {
        setStatus("error");
        setErrorMsg(
          (json as { message?: string }).message ?? "Something went wrong.",
        );
        return;
      }
      e.currentTarget.reset();
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error — try again or call the shop.");
    }
  }

  const inputClass =
    "mt-1.5 w-full min-h-[46px] rounded-lg border border-exit-dark/[0.12] bg-white px-4 py-2.5 text-[15px] text-exit-dark shadow-sm outline-none transition placeholder:text-exit-gray/50 focus:border-exit-green focus:ring-2 focus:ring-exit-green/25";
  const labelClass =
    "block text-[12px] font-bold uppercase tracking-[0.12em] text-exit-dark/70";

  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_20px_56px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.03] md:p-8">
      <h3 className="font-display border-b border-black/[0.06] pb-4 text-2xl font-black uppercase tracking-tight text-exit-dark md:text-[1.65rem]">
        {formCopy.title}
      </h3>
      <p className="mt-4 text-[14px] leading-relaxed text-exit-gray">
        {formCopy.subtitle}
      </p>

      {status === "success" ? (
        <p
          className="mt-8 rounded-xl border border-exit-green/30 bg-exit-lime/15 px-5 py-6 text-[15px] font-medium leading-relaxed text-exit-dark"
          role="status"
        >
          {formCopy.successMessage}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="sr-name">
                {formFields.name} <span className="text-red-600">*</span>
              </label>
              <input
                id="sr-name"
                name="name"
                required
                autoComplete="name"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="sr-phone">
                {formFields.phone} <span className="text-red-600">*</span>
              </label>
              <input
                id="sr-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="sr-email">
                {formFields.email}
              </label>
              <input
                id="sr-email"
                name="email"
                type="email"
                autoComplete="email"
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="sr-address">
                {formFields.address}
              </label>
              <input
                id="sr-address"
                name="address"
                autoComplete="street-address"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="sr-brand">
                {formFields.brand}
              </label>
              <select
                id="sr-brand"
                name="brand"
                className={`${inputClass} appearance-none bg-[length:1rem] bg-[position:right_1rem_center] bg-no-repeat`}
                defaultValue=""
              >
                <option value="" disabled>
                  {formFields.brandPlaceholder}
                </option>
                {machineBrands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="sr-model">
                {formFields.model}
              </label>
              <input id="sr-model" name="model" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="sr-issue">
                {formFields.issue} <span className="text-red-600">*</span>
              </label>
              <textarea
                id="sr-issue"
                name="issue"
                required
                rows={5}
                className={`${inputClass} min-h-[120px] resize-y py-3`}
              />
            </div>

            <fieldset className="sm:col-span-2">
              <legend className={`${labelClass} mb-3`}>{formFields.pickup}</legend>
              <div className="flex flex-wrap gap-6">
                <label className="flex cursor-pointer items-center gap-2.5 text-[15px] text-exit-dark">
                  <input
                    type="radio"
                    name="pickup"
                    value="yes"
                    className="size-4 accent-exit-green"
                  />
                  {formFields.pickupYes}
                </label>
                <label className="flex cursor-pointer items-center gap-2.5 text-[15px] text-exit-dark">
                  <input
                    type="radio"
                    name="pickup"
                    value="no"
                    defaultChecked
                    className="size-4 accent-exit-green"
                  />
                  {formFields.pickupNo}
                </label>
              </div>
            </fieldset>

            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="sr-time">
                {formFields.contactTime}
              </label>
              <select
                id="sr-time"
                name="contactTime"
                className={inputClass}
                defaultValue={requestSection.contactTimeOptions[0]}
              >
                {requestSection.contactTimeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {status === "error" && errorMsg && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="flex w-full min-h-[52px] items-center justify-center rounded-lg border-2 border-exit-green bg-exit-green px-6 text-sm font-bold uppercase tracking-wide text-white transition hover:border-exit-green-mid hover:bg-exit-green-mid disabled:opacity-60"
          >
            {status === "submitting" ? formCopy.submittingLabel : formCopy.submitLabel}
          </button>

          <p className="flex items-start gap-2 text-[12px] leading-relaxed text-exit-gray">
            <span aria-hidden className="mt-0.5 shrink-0">
              🔒
            </span>
            {formCopy.privacyLine}
          </p>
        </form>
      )}
    </div>
  );
}
