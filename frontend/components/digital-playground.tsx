"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import usePint from "@/hooks/use-pint";

function createHttp2Curl(
  url: string,
  method = "POST",
  headers = {},
  body = "",
) {
  const headersString = Object.entries(headers)
    .map(([key, value]) => `-H "${key}: ${value}"`)
    .join(" ");

  return `curl --http2 -X ${method} ${headersString} -d '${JSON.stringify(body)}' ${url}`;
}
const solutionJson = {
  data: [
    {
      predicate_to_solve: {
        contract:
          "1899743AA94972DDD137D039C2E670ADA63969ABF93191FA1A4506304D4033A2",
        predicate:
          "355A12DCB600C302FFD5D69C4B7B79E60BA3C72DDA553B7D43F4C36CB7CC0948",
      },
      decision_variables: [],
      state_mutations: [
        {
          key: [1],
          value: [2],
        },
      ],
    },
  ],
};
const URL = "http://localhost:3554/submit-solution";
export default function DigitalPlaygroundComponent() {
  const { toast } = useToast();
  const [contractAddress, setContractAddress] = useState("");
  const [functionAddress, setFunctionAddress] = useState("");
  const [decisionVariables, setDecisionVariables] = useState([""]);
  const [stateMutations, setStateMutations] = useState([
    { key: "", value: "" },
  ]);
  const [curlCommand, setCurlCommand] = useState("");

  const { submitSolution } = usePint({
    url: URL,
    solutionJson,
  });

  useEffect(() => {
    const headers = { "Content-Type": "application/json" };
    // @ts-expect-error solutionJson is an object
    setCurlCommand(createHttp2Curl(URL, "POST", headers, solutionJson));
  }, []);

  const handleAddDecisionVariable = () => {
    setDecisionVariables([...decisionVariables, ""]);
  };

  const handleAddStateMutation = () => {
    setStateMutations([...stateMutations, { key: "", value: "" }]);
  };

  const handleInvokeFunction = async () => {
    if (!contractAddress || !functionAddress) {
      toast({
        title: "Missing Fields",
        description: "Please enter contract and function addresses.",
      });
      return;
    }

    try {
      await submitSolution();
      toast({
        title: "Function Invoked",
        description: "Successfully invoked function.",
      });
    } catch (error) {
      console.error("Failed to invoke function", error);
      toast({
        title: "Failed to Invoke Function",
        description: "An error occurred while invoking the function.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Contracts Playground</h1>

      <Tabs defaultValue="write" className="space-y-4">
        <TabsList>
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="terminal">Terminal</TabsTrigger>
        </TabsList>

        <TabsContent value="write">
          <Card>
            <CardHeader>
              <CardTitle>Write Data</CardTitle>
              <CardDescription>
                Enter contract and predicate details to update the state.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="contractAddress"
                    className="text-sm font-medium"
                  >
                    Contract Address
                  </label>
                  <Input
                    id="contractAddress"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    placeholder="Enter Contract Address"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="functionAddress"
                    className="text-sm font-medium"
                  >
                    Function Address (Predicate)
                  </label>
                  <Input
                    id="functionAddress"
                    value={functionAddress}
                    onChange={(e) => setFunctionAddress(e.target.value)}
                    placeholder="Enter Function Address"
                    required
                  />
                </div>

                {/* Decision Variables */}
                <div>
                  <label className="text-sm font-medium">
                    Decision Variables
                  </label>
                  {decisionVariables.map((variable, index) => (
                    <div key={index} className="flex space-x-2 mt-2">
                      <Input
                        value={variable}
                        onChange={(e) => {
                          const updatedVariables = [...decisionVariables];
                          updatedVariables[index] = e.target.value;
                          setDecisionVariables(updatedVariables);
                        }}
                        placeholder={`Variable ${index + 1}`}
                      />
                      <Button
                        onClick={() =>
                          setDecisionVariables(
                            decisionVariables.filter((_, i) => i !== index),
                          )
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button className="mt-2" onClick={handleAddDecisionVariable}>
                    Add Variable
                  </Button>
                </div>

                {/* State Mutations */}
                <div>
                  <label className="text-sm font-medium">State Mutations</label>
                  {stateMutations.map((mutation, index) => (
                    <div key={index} className="flex space-x-2 mt-2">
                      <Input
                        value={mutation.key}
                        onChange={(e) => {
                          const updatedMutations = [...stateMutations];
                          updatedMutations[index].key = e.target.value;
                          setStateMutations(updatedMutations);
                        }}
                        placeholder={`Key ${index + 1}`}
                      />
                      <Input
                        value={mutation.value}
                        onChange={(e) => {
                          const updatedMutations = [...stateMutations];
                          updatedMutations[index].value = e.target.value;
                          setStateMutations(updatedMutations);
                        }}
                        placeholder={`Value ${index + 1}`}
                      />
                      <Button
                        onClick={() =>
                          setStateMutations(
                            stateMutations.filter((_, i) => i !== index),
                          )
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button className="mt-2" onClick={handleAddStateMutation}>
                    Add Mutation
                  </Button>
                </div>

                <Button className="mt-4" onClick={handleInvokeFunction}>
                  Invoke Function
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terminal">
          <Card>
            <CardHeader>
              <CardTitle>Curl Command</CardTitle>
              <CardDescription>
                Copy and paste this curl command to make the request manually.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{curlCommand}</code>
              </pre>
              <Button
                className="mt-4"
                onClick={() => {
                  navigator.clipboard.writeText(curlCommand);
                  toast({
                    title: "Copied to Clipboard",
                    description:
                      "The curl command has been copied to your clipboard.",
                  });
                }}
              >
                Copy to Clipboard
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Resolve and Build</CardTitle>
              <CardDescription>Pint Submit Method</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  pint submit --builder-address $curl --solution
                  $locationToSolution
                </code>
              </pre>
              <Button
                className="mt-4"
                onClick={() => {
                  navigator.clipboard.writeText(curlCommand);
                  toast({
                    title: "Copied to Clipboard",
                    description:
                      "The pint submit command has been copied to your clipboard.",
                  });
                }}
              >
                Copy to Clipboard
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
