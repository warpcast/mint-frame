export function isUserRejectionError(error: unknown): boolean {
  const errorMessage = error instanceof Error ? error.message.toLowerCase() : "";

  return (
    errorMessage.includes("user rejected") ||
    errorMessage.includes("user denied") ||
    errorMessage.includes("action_rejected")
  );
}
