"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import type { Itinerary } from "@/lib/types";
import { exportToIcal, exportToEmail } from "@/lib/utils/export";

interface ExportShareMenuProps {
  itinerary: Itinerary;
}

export function ExportShareMenu({ itinerary }: ExportShareMenuProps): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  async function handlePDF(): Promise<void> {
    setOpen(false);
    setIsGeneratingPDF(true);
    const toastId = toast.loading("Generating PDF…");
    try {
      const { exportToPDF } = await import("@/lib/utils/export");
      await exportToPDF(itinerary);
      toast.success("PDF downloaded!", { id: toastId });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Export failed";
      toast.error(msg, { id: toastId });
    } finally {
      setIsGeneratingPDF(false);
    }
  }

  function handleIcal(): void {
    setOpen(false);
    try {
      exportToIcal(itinerary);
      toast.success("Calendar file downloaded!");
    } catch {
      toast.error("Could not export calendar");
    }
  }

  function handleEmail(): void {
    setOpen(false);
    exportToEmail(itinerary);
  }

  async function handleCopyLink(): Promise<void> {
    setOpen(false);
    setIsGeneratingLink(true);
    const toastId = toast.loading("Creating share link…");
    try {
      const res = await fetch("/api/plans/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itinerary }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Failed to create share link");
      }

      const data = (await res.json()) as { shareUrl: string };

      // Use native share API on mobile if available
      if (navigator.share) {
        await navigator.share({
          title: `${itinerary.destination} Itinerary`,
          text: `Check out my trip to ${itinerary.destination}!`,
          url: data.shareUrl,
        });
        toast.success("Shared!", { id: toastId });
      } else {
        await navigator.clipboard.writeText(data.shareUrl);
        toast.success("Share link copied to clipboard!", { id: toastId });
      }
    } catch (err) {
      // User cancelled native share — not an error
      if (err instanceof Error && err.name === "AbortError") {
        toast.dismiss(toastId);
        return;
      }
      const msg = err instanceof Error ? err.message : "Could not create link";
      toast.error(msg, { id: toastId });
    } finally {
      setIsGeneratingLink(false);
    }
  }

  const isLoading = isGeneratingPDF || isGeneratingLink;

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isLoading}
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 disabled:opacity-50"
        aria-label="Export or share itinerary"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        Export & Share
      </button>

      {open && (
        <div className="absolute top-full right-0 z-50 mt-1.5 w-52 rounded-2xl border border-gray-100 bg-white p-1.5 shadow-xl">
          <MenuItem
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            }
            label="Export as PDF"
            onClick={handlePDF}
          />
          <MenuItem
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            }
            label="Add to Calendar"
            onClick={handleIcal}
          />
          <MenuItem
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            }
            label="Email Itinerary"
            onClick={handleEmail}
          />
          <div className="my-1 h-px bg-gray-100" />
          <MenuItem
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            }
            label="Copy Share Link"
            onClick={handleCopyLink}
          />
        </div>
      )}
    </div>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
    >
      <span className="text-gray-400">{icon}</span>
      {label}
    </button>
  );
}
