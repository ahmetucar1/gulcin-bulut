"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navigation, navigationEn, siteConfig } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");
  const currentLang = isEnglish ? "EN" : "TR";
  const navItems = isEnglish ? navigationEn : navigation;
  const basePath = isEnglish ? "/en" : "";
  const trimmedPath = pathname?.replace(/^\/en/, "") || "/";
  const trPath = pathname === "/aydin-psikolog" ? "/" : pathname;
  const alternatePath = isEnglish
    ? trimmedPath === "" ? "/" : trimmedPath
    : `/en${trPath === "/" ? "" : trPath}`;
  const appointmentHref = `${basePath}/randevu`;
  const appointmentLabel = isEnglish ? "Book Appointment" : "Randevu Al";

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-[#fef6e1]/70 backdrop-blur-2xl shadow-[0_18px_50px_-28px_rgba(45,35,25,0.35)]">
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link
          href={basePath || "/"}
          className="flex items-center gap-4 font-serif text-xl md:text-2xl"
        >
          <div className="relative h-16 w-16 overflow-hidden rounded-full bg-[#fef6e1]">
            <Image
              src="/images/brand/logo-512-2.png"
              alt={`${siteConfig.name} logo`}
              fill
              sizes="64px"
              className="object-cover scale-[1.35]"
              priority
            />
          </div>
          <span>{siteConfig.name}</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={
                pathname === item.href
                  ? "font-semibold text-foreground underline decoration-foreground/40 decoration-2 underline-offset-8"
                  : "font-medium text-foreground/80 transition hover:text-foreground"
              }
            >
              {item.label}
            </Link>
          ))}
          <div className="relative">
            <button
              type="button"
              aria-label="Language"
              onClick={() => setLangOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/80 px-3 py-1.5 text-xs font-medium text-foreground/80 transition hover:text-foreground"
            >
              {currentLang}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {langOpen ? (
              <div className="absolute right-0 mt-2 rounded-xl border border-border/70 bg-white/95 p-2 shadow-soft">
                <Link
                  href={alternatePath}
                  onClick={() => setLangOpen(false)}
                  className="block rounded-lg px-3 py-1.5 text-xs font-medium text-foreground/80 transition hover:text-foreground"
                >
                  {isEnglish ? "TR" : "EN"}
                </Link>
              </div>
            ) : null}
          </div>
        </nav>
        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link href={appointmentHref}>{appointmentLabel}</Link>
          </Button>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-white/80 text-foreground transition hover:bg-white"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-border/70 bg-background/95 md:hidden">
          <div className="container grid gap-4 py-4 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === item.href ? "page" : undefined}
                className={
                  pathname === item.href
                    ? "font-semibold text-foreground underline decoration-foreground/40 decoration-2 underline-offset-8"
                    : "font-medium text-foreground/90 transition hover:text-foreground"
                }
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={alternatePath}
              onClick={() => {
                setLangOpen(false);
                setOpen(false);
              }}
              className="rounded-2xl border border-border/70 bg-white/80 px-4 py-2 text-xs font-medium text-foreground/80 transition hover:text-foreground"
            >
              {isEnglish ? "TR" : "EN"}
            </Link>
            <Button asChild size="sm" className="w-full">
              <Link href={appointmentHref} onClick={() => setOpen(false)}>
                {appointmentLabel}
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
