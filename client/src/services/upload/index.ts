import { Transactions } from "@types";
import apiClient from "services/apiClient";

type UploadTransactionsResponse = {
  data: Transactions;
  status: number;
};

export async function uploadTransactions(
  formData: FormData
): Promise<UploadTransactionsResponse> {
  const { data, status } = await apiClient.post(
    "/transaction/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return { data, status };
}
