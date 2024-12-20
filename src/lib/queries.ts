import {
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useCallback } from "react";

import { api, ApiEthereumAddress } from "./api";

const usePrefetchFeaturedMint = () => {
  const qc = useQueryClient();

  return useCallback(() => {
    return qc.prefetchQuery({
      queryKey: ["featuredMint"],
      queryFn: async () => {
        const response = await api.getFeaturedMint();
        return response.data;
      },
    });
  }, [qc]);
};


const useFeaturedMint = () => {
  return useSuspenseQuery({
    queryKey: ["featuredMint"],
    queryFn: async () => {
      const response = await api.getFeaturedMint();
      return response.data;
    },
  });
};

const useFeaturedMintTransaction = () => {
  const queryClient = useQueryClient();

  return {
    fetchTransaction: async (address: ApiEthereumAddress) => {
      const response = await api.getFeaturedMintTransaction({ address });
      queryClient.setQueryData(['featuredMintTx'], response.data);
      return response.data;
    }
  };
};

export {
  useFeaturedMint,
  useFeaturedMintTransaction,
  usePrefetchFeaturedMint
};
