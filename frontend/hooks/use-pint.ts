import { useMutation } from "@tanstack/react-query";

type IUsePint = {
  url: string;
  solutionJson: object; // solutionJson is an object, not JSON directly
};

const usePint = ({ url, solutionJson }: IUsePint) => {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationKey: ["submit-solution", solutionJson],
    mutationFn: async () => {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(solutionJson),
      });

      if (!res.ok) {
        throw new Error("Failed to submit the solution");
      }

      const json = await res.json();
      return json;
    },
  });

  return {
    isLoading: isPending,
    isError,
    submitSolution: mutateAsync,
  };
};

export default usePint;
