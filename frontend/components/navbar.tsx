"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Github, Book } from "lucide-react";

export function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: "GitHub",
      href: "https://github.com/your-repo/scaffold-essential",
      icon: <Github className="h-4 w-4" />,
    },
    {
      name: "Docs",
      href: "https://your-docs-url.com",
      icon: <Book className="h-4 w-4" />,
    },
  ];

  return (
    <nav className="border-b">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <Link href="/" className="font-bold text-xl">
          Scaffold-Essential
        </Link>

        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Button key={item.name} variant="ghost" asChild>
              <Link href={item.href} className="flex items-center space-x-1">
                {item.icon && item.icon}
                <span>{item.name}</span>
              </Link>
            </Button>
          ))}
        </div>

        {/* Mobile menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-4">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2"
                  >
                    {item.icon && item.icon}
                    <span>{item.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
