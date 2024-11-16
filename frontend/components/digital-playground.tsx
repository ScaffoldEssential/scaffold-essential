"use client";

import { useState } from "react";
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

export function DigitalPlaygroundComponent() {
  const { toast } = useToast();
  const [contractAddress, setContractAddress] = useState("");
  const [functionAddress, setFunctionAddress] = useState("");
  const [decisionVariables, setDecisionVariables] = useState([""]);
  const [stateMutations, setStateMutations] = useState([
    { key: "", value: "" },
  ]);

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
        description: "Please enter contract and function",
      });
      return;
    }

    try {
      const solution = {
        data: [
          {
            predicate_to_solve: {
              contract: contractAddress,
              predicate: functionAddress,
            },
            decision_variables: decisionVariables.filter((val) => val !== ""),
            state_mutations: stateMutations
              .filter(
                (mutation) => mutation.key !== "" && mutation.value !== "",
              )
              .map((mutation) => ({
                key: [`${mutation.key.padStart(16, "0")}`],
                value: [`${mutation.value.padStart(16, "0")}`],
              })),
          },
        ],
      };

      console.log("Generated Solution:", solution);

      // Mock API call or save operation
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
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
      </Tabs>
    </div>
  );
}
