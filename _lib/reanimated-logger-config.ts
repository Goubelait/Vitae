type ReanimatedLogPayload = {
  level: number;
  message: string;
};

const logFunction = ({ level, message }: ReanimatedLogPayload) => {
  if (level === 1) {
    console.warn(message);
  } else {
    console.error(message);
  }
};

// Initialize a safe default config BEFORE Reanimated is imported anywhere.
// This prevents crashes if Reanimated logs during module initialization.
if (typeof globalThis !== "undefined") {
  const g: any = globalThis as any;
  if (!g.__reanimatedLoggerConfig) {
    g.__reanimatedLoggerConfig = {
      logFunction,
      level: 1, // warn
      strict: false,
    };
  }
}
