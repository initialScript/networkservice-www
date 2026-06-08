// components/ui/nested-dropdown.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

export interface Category {
  id: number;
  name: string;
  slug: string;
  children?: Category[];
}

interface NestedDropdownProps {
  categories: Category[];
  triggerText: string;
  basePath?: string;
}

const NestedDropdown = ({ categories, triggerText, basePath = "/catalogue" }: NestedDropdownProps) => {
  const renderMenuItems = (items: Category[]) => {
    return items.map((category) => {
      const hasChildren = category.children && category.children.length > 0;
      const href = `${basePath}/${category.slug}`;

      if (hasChildren) {
        return (
          <DropdownMenuSub key={category.slug}>
            <DropdownMenuSubTrigger className="flex justify-between items-center cursor-pointer">
              <span>{category.name}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="min-w-[220px]">
              <div className="py-1">
                <Link
                  href={href}
                  className="block px-2 py-1.5 text-sm font-semibold text-[#0F3460] hover:bg-gray-50 rounded-sm"
                >
                  Tous les {category.name.toLowerCase()} →
                </Link>
                <div className="border-t my-1" />
                {category.children!.map((child) => (
                  <DropdownMenuItem key={child.slug} asChild>
                    <Link href={`${basePath}/${child.slug}`} className="cursor-pointer">
                      {child.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        );
      }

      return (
        <DropdownMenuItem key={category.slug} asChild>
          <Link href={href} className="cursor-pointer">
            {category.name}
          </Link>
        </DropdownMenuItem>
      );
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 px-3 py-1.5 rounded hover:bg-white/10 transition font-medium text-white">
          {triggerText}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[240px] bg-white shadow-xl rounded-lg border">
        {renderMenuItems(categories)}
        <div className="border-t my-1" />
        <DropdownMenuItem asChild>
          <Link href={basePath} className="font-semibold text-[#0F3460] cursor-pointer">
            Voir tout le catalogue →
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NestedDropdown;