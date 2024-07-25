import xss from "xss";

export const sanitizerInput = (input: string) => {
  return xss(input);
};
