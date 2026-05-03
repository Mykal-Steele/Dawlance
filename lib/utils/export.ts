"use client";

import type { Itinerary } from "@/lib/types";

// ─── PDF export ───────────────────────────────────────────────────────────────

export function exportToPDF(itinerary: Itinerary): void {
  const element = document.getElementById("itinerary-export-root");
  if (!element) {
    throw new Error("Switch to List view before exporting PDF");
  }

  // Set a data attribute so the print CSS can target only this itinerary
  document.title = `${itinerary.destination} Itinerary`;
  document.body.setAttribute("data-printing", "itinerary");

  const cleanup = () => {
    document.body.removeAttribute("data-printing");
  };

  window.addEventListener("afterprint", cleanup, { once: true });
  window.print();
}

// ─── iCal export ─────────────────────────────────────────────────────────────

function toIcalDate(dateStr: string, timeStr: string): string {
  // dateStr: YYYY-MM-DD, timeStr: HH:MM
  const [year, month, day] = dateStr.split("-");
  const [hour, minute] = timeStr.split(":");
  return `${year}${month}${day}T${hour}${minute}00`;
}

function addMinutes(timeStr: string, minutes: number): string {
  const [h, m] = timeStr.split(":").map(Number);
  const total = (h ?? 0) * 60 + (m ?? 0) + minutes;
  const newH = Math.floor(total / 60) % 24;
  const newM = total % 60;
  return `${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")}`;
}

function escapeIcal(str: string): string {
  return str.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
}

export function exportToIcal(itinerary: Itinerary): void {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Dawlance Travel//AI Itinerary//EN",
    `X-WR-CALNAME:${escapeIcal(itinerary.destination)} Trip`,
    "X-WR-TIMEZONE:UTC",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  for (const day of itinerary.days) {
    for (const activity of day.activities) {
      if (activity.type === "empty") continue;

      const endTime = addMinutes(activity.time, activity.duration);
      const dtstart = toIcalDate(day.date, activity.time);
      const dtend = toIcalDate(day.date, endTime);
      const uid = `${activity.id}@dawlance-travel`;

      lines.push("BEGIN:VEVENT");
      lines.push(`UID:${uid}`);
      lines.push(`DTSTART:${dtstart}`);
      lines.push(`DTEND:${dtend}`);
      lines.push(`SUMMARY:${escapeIcal(activity.recommendation.name)}`);
      if (activity.recommendation.description) {
        lines.push(`DESCRIPTION:${escapeIcal(activity.recommendation.description)}`);
      }
      if (activity.recommendation.location?.address) {
        lines.push(`LOCATION:${escapeIcal(activity.recommendation.location.address)}`);
      }
      if (activity.notes) {
        lines.push(`COMMENT:${escapeIcal(activity.notes)}`);
      }
      lines.push("END:VEVENT");
    }
  }

  lines.push("END:VCALENDAR");

  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${itinerary.destination.replace(/\s+/g, "-")}-itinerary.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── Email export ─────────────────────────────────────────────────────────────

export function exportToEmail(itinerary: Itinerary): void {
  const subject = encodeURIComponent(`My trip to ${itinerary.destination}`);

  const bodyLines: string[] = [
    `Here's my travel plan for ${itinerary.destination}`,
    `Dates: ${itinerary.startDate} → ${itinerary.endDate}`,
    "",
  ];

  for (const day of itinerary.days) {
    bodyLines.push(`--- ${day.date} ---`);
    for (const activity of day.activities) {
      if (activity.type === "empty") continue;
      bodyLines.push(
        `  ${activity.time}  ${activity.recommendation.name} (${activity.duration}min)`
      );
    }
    bodyLines.push("");
  }

  const body = encodeURIComponent(bodyLines.join("\n"));
  window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
}
