import { useState } from "react";

export const useContractSolutionGenerator = () => {
  const [formData, setFormData] = useState({
    contractAddress:
      "1899743AA94972DDD137D039C2E670ADA63969ABF93191FA1A4506304D4033A2",
    predicateAddress:
      "355A12DCB600C302FFD5D69C4B7B79E60BA3C72DDA553B7D43F4C36CB7CC0948",
    mutationKey: 0,
    mutationValue: 1,
    decisionVariables: "",
  });

  const [generatedSolution, setGeneratedSolution] = useState<any>(null);

  const generateSolution = () => {
    const {
      contractAddress,
      predicateAddress,
      mutationKey,
      mutationValue,
      decisionVariables,
    } = formData;

    // Process decision variables
    const decisionVariablesArray = decisionVariables
      ? decisionVariables.split(",").map((val) => val.trim())
      : [];

    // Generate state mutations
    const stateMutations = [
      {
        key: [parseInt(mutationKey.toString())],
        value: [parseInt(mutationValue.toString())],
      },
    ];

    // Prepare solution JSON
    const solution = {
      data: [
        {
          predicate_to_solve: {
            contract: contractAddress,
            predicate: predicateAddress,
          },
          decision_variables: decisionVariablesArray,
          state_mutations: stateMutations,
        },
      ],
    };

    setGeneratedSolution(solution);
    return solution;
  };

  // @ts-ignore
  const handleInputChange = (key: string, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    formData,
    handleInputChange,
    generateSolution,
    generatedSolution,
  };
};
