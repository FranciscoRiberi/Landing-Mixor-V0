/**
 * Theme configuration based on environment variable.
 * Set THEME=mundial in Vercel to activate the World Cup theme.
 * Remove the variable to return to the default Mixor red theme.
 */
export const THEME = process.env.THEME || "default";

export const isMundialTheme = THEME === "mundial";
