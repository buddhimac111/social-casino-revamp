const STORAGE_KEYS = {
  RESET_EMAIL: "resetPasswordEmail",
} as const;

export const storeResetEmail = (email: string) => {
  try {
    localStorage.setItem(STORAGE_KEYS.RESET_EMAIL, email);
  } catch (error) {
    console.error("Failed to store reset email:", error);
  }
};

// Get stored reset email
export const getResetEmail = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEYS.RESET_EMAIL);
  } catch {
    return null;
  }
};

// Clear stored reset email
export const clearResetEmail = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.RESET_EMAIL);
  } catch (error) {
    console.error("Failed to clear reset email:", error);
  }
};
