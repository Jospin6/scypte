import { z } from "zod";

export const schema = z.object({
  script: z.object({ 
    intro: z.string(),
    description: z.string(),
    outro: z.string(),
  })
});