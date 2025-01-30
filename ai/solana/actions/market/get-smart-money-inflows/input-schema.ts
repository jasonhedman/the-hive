import { z } from "zod";

import { Granularity } from "@/services/hellomoon/types";

export const GetSmartMoneyInflowsInputSchema = z.object({
    granularity: z.nativeEnum(Granularity).default(Granularity.ONE_WEEK)
}); 