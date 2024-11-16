"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function LearnFrontendComponent() {
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    console.log("Component mounted");
    return () => console.log("Component will unmount");
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    toast({
      title: "Input Submitted",
      description: `You entered: ${inputValue}`,
    });
    setInputValue("");
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">
        Learn Essential Frontend
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Using shadcn/ui Components</CardTitle>
          <CardDescription>
            Example of form input and toast notification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter some text"
              value={inputValue}
              onChange={handleInputChange}
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Adding New shadcn/ui Components</CardTitle>
          <CardDescription>
            Steps to add new components to your project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            <li>Open your terminal and navigate to your project directory</li>
            <li>
              Run the command:{" "}
              <code className="bg-muted p-1 rounded">
                npx shadcn@latest add [component-name]
              </code>
            </li>
            <li>
              Replace [component-name] with the desired component (e.g., button,
              card, toast)
            </li>
            <li>
              The component will be added to your project in the{" "}
              <code className="bg-muted p-1 rounded">components/ui</code>{" "}
              directory
            </li>
            <li>Import and use the component in your React code</li>
          </ol>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            For more information, visit the{" "}
            <a
              href="https://ui.shadcn.com/"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              shadcn/ui documentation
            </a>
          </p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exploring the Next.js App Router</CardTitle>
          <CardDescription>
            Key changes and features in the new App Router
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>File-Based Routing:</strong> The `app` directory
              introduces a new structure for organizing routes. Each folder can
              act as a route, and special files like `layout.tsx` and `page.tsx`
              define layouts and pages.
            </li>
            <li>
              <strong>Server Components by Default:</strong> Components in the
              `app` directory are server components by default, ensuring
              optimized server-side rendering and smaller JavaScript bundles.
            </li>
            <li>
              <strong>Nested Layouts:</strong> With the `layout.tsx` file, you
              can define persistent layouts shared across different pages or
              parts of the app.
            </li>
            <li>
              <strong>Streaming and Suspense:</strong> The App Router fully
              supports React’s Suspense and Streaming capabilities, enabling
              better loading states and faster data fetching.
            </li>
            <li>
              <strong>Client Components:</strong> Use the `use client` directive
              at the top of files for interactivity where needed.
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Learn more from the{" "}
            <a
              href="https://nextjs.org/docs/app"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js App Router Documentation
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
