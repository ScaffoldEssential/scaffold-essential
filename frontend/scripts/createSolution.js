#!/usr/bin / env node
import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";

// Helper function to convert array of numbers to array of strings (Words)
const convertToWords = (arr) =>
  arr.map((num) => num.toString(16).padStart(64, "0"));

// Function to ask for user input for contract address, predicate, and state mutations
async function run() {
  console.log(chalk.blue("Welcome to the Contract Solution Generator! 🚀"));

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "contractAddress",
      message: "Enter the contract address:",
      default:
        "1899743AA94972DDD137D039C2E670ADA63969ABF93191FA1A4506304D4033A2",
    },
    {
      type: "input",
      name: "predicateAddress",
      message: "Enter the predicate address:",
      default:
        "355A12DCB600C302FFD5D69C4B7B79E60BA3C72DDA553B7D43F4C36CB7CC0948",
    },
    {
      type: "input",
      name: "functionName",
      message:
        "Enter the function name to call (e.g., Increment, Mint, Transfer):",
      default: "Increment",
    },
    {
      type: "input",
      name: "mutationKey",
      message: "Enter the state mutation key (as an integer):",
      default: 0,
    },
    {
      type: "input",
      name: "mutationValue",
      message: "Enter the state mutation value (as an integer):",
      default: 1,
    },
    {
      type: "input",
      name: "decisionVariables",
      message:
        'Enter decision variables (comma-separated) if any (e.g., 100, "0x123..."):',
      default: "",
    },
  ]);

  const {
    contractAddress,
    predicateAddress,
    functionName,
    mutationKey,
    mutationValue,
    decisionVariables,
  } = answers;

  // Process decision variables
  const decisionVariablesArray = decisionVariables
    ? decisionVariables.split(",").map((val) => val.trim())
    : [];

  // Generate state mutations
  const stateMutations = [
    {
      key: convertToWords([parseInt(mutationKey)]),
      value: convertToWords([parseInt(mutationValue)]),
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

  const solutionFileName = `./scripts/${functionName}.json`;
  fs.writeFileSync(solutionFileName, JSON.stringify(solution, null, 2));

  console.log(chalk.green(`Solution file created: ${solutionFileName}`));
}

run().catch((err) => console.error(chalk.red(err)));
