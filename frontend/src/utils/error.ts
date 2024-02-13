export const throwErr = (message: any) => {
  throw new Error(JSON.stringify(message));
};
