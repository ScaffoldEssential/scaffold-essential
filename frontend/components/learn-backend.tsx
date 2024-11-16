"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Code2, Box, Cpu, AlertCircle } from "lucide-react";

export function LearnBackendComponent() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Learn Essential Backend</h1>
        <p className="text-lg text-muted-foreground">
          Understanding Rust, Pint, and the Essential Architecture
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Early Development</AlertTitle>
        <AlertDescription>
          Essential is in early stages of development. Features may change
          rapidly, and some functionality might be experimental.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rust">Rust Backend</TabsTrigger>
          <TabsTrigger value="pint">Pint Language</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Essential Architecture</CardTitle>
              <CardDescription>Understanding the core concepts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold">Declarative System</h3>
              <p>
                Essential is a declarative system that allows you to express
                powerful applications in an elegant and intuitive way. Instead
                of writing imperative code that describes how to do something,
                you declare what you want to achieve.
              </p>

              <div className="grid gap-4 mt-4">
                <div className="flex items-start gap-4">
                  <Box className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h4 className="font-semibold">Component-Based</h4>
                    <p className="text-muted-foreground">
                      Build your application using reusable, composable
                      components that encapsulate both logic and presentation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Cpu className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h4 className="font-semibold">State Management</h4>
                    <p className="text-muted-foreground">
                      Essential handles state management automatically, ensuring
                      your application state remains consistent and predictable.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rust" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rust Backend</CardTitle>
              <CardDescription>The power of Rust in Essential</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Essential uses Rust as its backend language, providing memory
                safety, thread safety, and high performance without garbage
                collection.
              </p>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-mono text-sm mb-2">
                  Example Rust Integration:
                </h4>
                <pre className="text-sm overflow-x-auto">
                  {`#[essential::component]
struct Counter {
    count: i32,
}

impl Counter {
    fn increment(&mut self) {
        self.count += 1;
    }
}`}
                </pre>
              </div>

              <h3 className="text-lg font-semibold mt-6">Key Benefits</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Memory safety without garbage collection</li>
                <li>Concurrent programming without data races</li>
                <li>Zero-cost abstractions</li>
                <li>Interoperability with existing Rust code</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pint" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pint Language</CardTitle>
              <CardDescription>
                {/* eslint-disable-next-line */}
                Essential's declarative language
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                {/* eslint-disable-next-line */}
                Pint is Essential's declarative language for defining components
                and their behavior. It provides a simple, intuitive syntax for
                expressing complex application logic.
              </p>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-mono text-sm mb-2">
                  Example Pint Component:
                </h4>
                <pre className="text-sm overflow-x-auto">
                  {`component Counter {
    state count: i32 = 0

    fn increment() {
        self.count += 1
    }

    view {
        Button(onClick: self.increment) {
            "Count: {self.count}"
        }
    }
}`}
                </pre>
              </div>

              <h3 className="text-lg font-semibold mt-6">Pint Features</h3>
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  <Code2 className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h4 className="font-semibold">Declarative Syntax</h4>
                    <p className="text-muted-foreground">
                      Write your application logic in a clear, declarative way
                      that focuses on what you want to achieve rather than how
                      to achieve it.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Box className="w-6 h-6 mt-1 text-primary" />
                  <div>
                    <h4 className="font-semibold">Component Model</h4>
                    <p className="text-muted-foreground">
                      Define reusable components with their own state, methods,
                      and views. Components can be composed to build complex
                      applications.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Create your first Essential application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  To create a new Essential application, follow these steps:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Install the Essential CLI tool</li>
                  <li>
                    Create a new project using{" "}
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">
                      essential new my-app
                    </code>
                  </li>
                  <li>Navigate to your project directory</li>
                  <li>
                    Start the development server with{" "}
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">
                      essential dev
                    </code>
                  </li>
                </ol>
                <Button className="mt-4">View Full Documentation</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
