"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Printer, Monitor, Droplets, Tv2, BatteryCharging,
  Keyboard, PenTool, Camera, Wifi, Phone, Trash2,
  Laptop, Package, LayoutGrid,
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "imprimante-scanner":   <Printer className="w-4 h-4 shrink-0" />,
  "ordinateur":           <Laptop className="w-4 h-4 shrink-0" />,
  "consommables":         <Droplets className="w-4 h-4 shrink-0" />,
  "ecran-moniteur":       <Tv2 className="w-4 h-4 shrink-0" />,
  "onduleur":             <BatteryCharging className="w-4 h-4 shrink-0" />,
  "peripherique":         <Keyboard className="w-4 h-4 shrink-0" />,
  "tablette-graphique":   <PenTool className="w-4 h-4 shrink-0" />,
  "image-son":            <Camera className="w-4 h-4 shrink-0" />,
  "reseaux":              <Wifi className="w-4 h-4 shrink-0" />,
  "telephonie":           <Phone className="w-4 h-4 shrink-0" />,
  "destructeur-papiers":  <Trash2 className="w-4 h-4 shrink-0" />,
  "accessoires-composants": <Package className="w-4 h-4 shrink-0" />,
  "logiciels":            <Monitor className="w-4 h-4 shrink-0" />,
  "sacoche-sac-dos":      <Package className="w-4 h-4 shrink-0" />,
  "tablette-tactile":     <Monitor className="w-4 h-4 shrink-0" />,
};

export interface Category {
  id: number;
  name: string;
  slug: string;
  children?: Category[];
}

interface CategoryDropdownProps {
  categories: Category[];
  triggerText: string;
  basePath?: string;
}



const CategoryDropdown = ({
  categories,
  triggerText,
  basePath = "/catalogue",
}: CategoryDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeSlug, setActiveSlug] = React.useState<string>(
    categories[0]?.slug ?? ""
  );
  const ref = React.useRef<HTMLDivElement>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout>>();

  const activeCategory = categories.find((c) => c.slug === activeSlug);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMouseEnterTrigger = () => {
    clearTimeout(closeTimer.current);
    setIsOpen(true);
  };

  const handleMouseLeavePanel = () => {
    closeTimer.current = setTimeout(() => setIsOpen(false), 120);
  };

  const handleMouseEnterPanel = () => {
    clearTimeout(closeTimer.current);
  };

  const close = () => setIsOpen(false);

  return (
    <div ref={ref} className="relative h-full flex items-center">
      {/* Trigger */}
      <button
        onMouseEnter={handleMouseEnterTrigger}
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-white/10 transition font-medium text-white text-sm h-full"
      >
        <LayoutGrid className="w-4 h-4 shrink-0" />
        {triggerText}
        <ChevronRight
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
            isOpen && "rotate-90"
          )}
        />
      </button>

      {/* Mega dropdown */}
      {isOpen && (
        <div
          onMouseEnter={handleMouseEnterPanel}
          onMouseLeave={handleMouseLeavePanel}
          className="absolute left-0 top-full z-50 flex shadow-2xl border border-gray-200 bg-white"
          style={{ minHeight: 420 }}
        >
          {/* LEFT sidebar — fixed width, no scroll */}
<div className="w-64 shrink-0 bg-white border-r border-gray-100 py-1 overflow-y-auto">
  {categories.map((cat) => {
    const hasChildren = cat.children && cat.children.length > 0;
    const isActive = activeSlug === cat.slug;
    const icon = categoryIcons[cat.slug] ?? <LayoutGrid className="w-4 h-4 shrink-0" />;

    return (
      <Link
        key={cat.slug}
        href={`${basePath}/${cat.slug}`}
        onMouseEnter={() => setActiveSlug(cat.slug)}
        onClick={close}
        className={cn(
          "flex items-center gap-3 px-4 py-2.5 text-sm select-none transition-colors border-l-2 w-full",
          isActive
            ? "bg-gray-50 text-[#E94560] font-medium border-[#E94560]"
            : "text-gray-700 hover:bg-gray-50 hover:text-[#E94560] border-transparent"
        )}
      >
        {/* Icon */}
        <span className={cn(
          "shrink-0 transition-colors",
          isActive ? "text-[#E94560]" : "text-gray-400"
        )}>
          {icon}
        </span>

        {/* Name — fixed, no wrap, no overflow */}
        <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
          {cat.name}
        </span>

        {/* Chevron */}
        {hasChildren && (
          <ChevronRight className={cn(
            "w-3.5 h-3.5 shrink-0",
            isActive ? "text-[#E94560]" : "text-gray-300"
          )} />
        )}
      </Link>
    );
  })}

  <div className="border-t border-gray-100 mt-1 pt-1 px-4 py-2.5">
    <Link
      href={basePath}
      onClick={close}
      className="text-sm font-semibold text-[#0F3460] hover:text-[#E94560] transition-colors"
    >
      Voir tout →
    </Link>
  </div>
</div>

          {/* RIGHT mega panel */}
          {activeCategory?.children && activeCategory.children.length > 0 && (
            <div
              className="bg-white p-6 overflow-y-auto"
              style={{ minWidth: 480, maxWidth: 780, maxHeight: "75vh" }}
            >
              <div
                className="grid gap-x-10 gap-y-6"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(
                    activeCategory.children.length,
                    3
                  )}, minmax(160px, 1fr))`,
                }}
              >
                {activeCategory.children.map((group) => (
                  <div key={group.slug}>
                    {/* Group header */}
                    <Link
                      href={`${basePath}/${group.slug}`}
                      onClick={close}
                      className="block font-bold text-[#0F3460] uppercase text-xs tracking-wide pb-1.5 mb-2 border-b-2 border-amber-400 hover:text-[#E94560] transition-colors"
                    >
                      {group.name}
                    </Link>

                    {/* Bullet list of children */}
                    {group.children && group.children.length > 0 && (
                      <ul className="space-y-1.5">
                        {group.children.map((child) => (
                          <li key={child.slug} className="flex items-start gap-1.5">
                            <span className="text-gray-400 text-xs mt-1 shrink-0">•</span>
                            <Link
                              href={`${basePath}/${child.slug}`}
                              onClick={close}
                              className="text-sm text-gray-600 hover:text-[#0F3460] hover:underline transition-colors leading-snug"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;