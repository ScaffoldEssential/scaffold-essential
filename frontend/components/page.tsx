"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Code, Flame, PlayIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function BlockPage() {
  const [showAlert, setShowAlert] = useState(false);
  const { push } = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-background to-secondary">
      <main className="max-w-4xl w-full space-y-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to <span className="text-primary">Scaffold-Essential</span>
        </h1>

        <p className="text-xl text-muted-foreground">
          Get started by editing your files and building amazing applications!
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            icon={<Code className="w-6 h-6" />}
            title="Edit Your Frontend"
            description="Modify your frontend in packages/nextjs/app/page.tsx"
            onClick={() => push("/learn-frontend")}
          />
          <Card
            icon={<Flame className="w-6 h-6" />}
            title="Smart Contract"
            description="Edit your smart contract contract.pnt in backend/src"
            onClick={() => push("/learn-backend")}
          />
          <Card
            icon={<PlayIcon className="w-6 h-6" />}
            title="Playground"
            description="Explore the playground and learn more about the stack"
          />
        </div>

        <div className="space-y-4">
          <Button variant="outline" onClick={() => setShowAlert(!showAlert)}>
            Toggle Alert
          </Button>
        </div>

        {showAlert && (
          <Alert>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add alerts like this to show important information to your
              users.
            </AlertDescription>
          </Alert>
        )}
      </main>
    </div>
  );
}

function Card({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center p-6 bg-card text-card-foreground rounded-lg shadow-lg"
      onClick={onClick}
    >
      <div className="mb-4 p-3 bg-primary/10 rounded-full text-primary">
        {icon}
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
