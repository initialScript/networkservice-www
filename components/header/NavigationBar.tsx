// components/NavigationBar.tsx
'use client';

import Link from "next/link";
import React from "react";
import CategoryDropdown from "@/components/ui/category-dropdown";
import { Dispatch, RefObject, SetStateAction } from "react";
import { navigationBarLinks } from "@/utils/navigationBarLinks";
import { Category } from "@/hooks/useCategories";

interface NavigationBarProps {
  categories: Category[];
  categoryRef: RefObject<HTMLDivElement | null>;
  isCategoryOpen: boolean;
  setIsCategoryOpen: Dispatch<SetStateAction<boolean>>;
}

const NavigationBar = ({
  categories,
  categoryRef,
  isCategoryOpen,
  setIsCategoryOpen,
}: NavigationBarProps) => {
  return (
    <div className="hidden lg:block bg-[#0c0d0e]">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-center h-10 text-sm text-white gap-1">
          <CategoryDropdown 
            categories={categories}
            triggerText="Tous nos produits"
            basePath="/catalogue"
          />
          
          {navigationBarLinks.map((link) => (
            <Link key={link.id} href={link.path} className="px-3 py-1.5 rounded hover:bg-white/10 transition font-medium">
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default NavigationBar;