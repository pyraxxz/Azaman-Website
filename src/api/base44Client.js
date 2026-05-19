// Mocked client for the static informational website to bypass GitHub Actions build errors
export const base44 = {
  auth: {
    me: async () => {
      // Throwing an error forces the AuthContext to gracefully fail and treat the user as a public visitor
      const error = new Error("Static site: no active user");
      error.status = 401;
      throw error;
    },
    logout: () => {
      console.log("Logout triggered from static site");
    },
    redirectToLogin: () => {
      console.log("Login triggered from static site");
    }
  }
};
