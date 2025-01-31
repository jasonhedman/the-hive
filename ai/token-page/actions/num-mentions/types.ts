import { z } from "zod";

import { TokenPageActionResult } from "../token-page-action";

import { TokenPageNumMentionsInputSchema } from "./input-schema";

export type TokenPageNumMentionsSchemaType = typeof TokenPageNumMentionsInputSchema;

export type TokenPageNumMentionsArgumentsType = z.infer<TokenPageNumMentionsSchemaType>;

export type TokenPageNumMentionsResultBodyType = {
    numMentions: number;
    trendMetrics: {
        dailyAverage: number;
        maxDailyMentions: number;
        growthRate: number;
        mostActiveDay: string;
        hourlyStats: {
            maxHourlyMentions: number;
            mostActiveHour: string;
            averageHourlyMentions: number;
            quietestHour: string;
            minHourlyMentions: number;
        };
        timeOfDayStats: {
            morningAvg: number;    // 6am-12pm
            afternoonAvg: number;  // 12pm-6pm
            eveningAvg: number;    // 6pm-12am
            nightAvg: number;      // 12am-6am
            mostActiveTimeOfDay: string;
        };
    };
}; 

export type TokenPageNumMentionsResultType = TokenPageActionResult<TokenPageNumMentionsResultBodyType>;