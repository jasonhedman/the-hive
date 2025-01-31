type TweetData = {
    start: string;
    tweet_count: number;
};

type DailyMetrics = {
    dailyAverage: number;
    maxDailyMentions: number;
    growthRate: number;
    mostActiveDay: string;
};

type HourlyStats = {
    maxHourlyMentions: number;
    mostActiveHour: string;
    averageHourlyMentions: number;
    quietestHour: string;
    minHourlyMentions: number;
};

type TimeOfDayStats = {
    morningAvg: number;
    afternoonAvg: number;
    eveningAvg: number;
    nightAvg: number;
    mostActiveTimeOfDay: string;
};

export const calculateDailyMetrics = (data: TweetData[]): DailyMetrics => {
    const dailyData = data.reduce((acc, curr) => {
        const date = new Date(curr.start).toLocaleDateString();
        if (!acc[date]) acc[date] = 0;
        acc[date] += curr.tweet_count;
        return acc;
    }, {} as Record<string, number>);

    const dailyCounts = Object.values(dailyData);
    const dailyAverage = dailyCounts.reduce((a, b) => a + b, 0) / dailyCounts.length;

    const maxDailyEntry = Object.entries(dailyData).reduce((max, [date, count]) => 
        count > max[1] ? [date, count] : max,
        ['', 0]
    );

    const growthRate = dailyCounts.length > 1
        ? (dailyCounts[0] - dailyCounts[dailyCounts.length - 1]) / dailyCounts[dailyCounts.length - 1] * 100
        : 0;

    return {
        dailyAverage,
        maxDailyMentions: maxDailyEntry[1],
        mostActiveDay: maxDailyEntry[0],
        growthRate: dailyCounts[dailyCounts.length - 1] > 0 ? growthRate : 0
    };
};

export const calculateHourlyStats = (data: TweetData[]): HourlyStats => {
    const stats = data.reduce((acc, entry) => {
        const timeStr = new Date(entry.start).toLocaleString();
        
        if (entry.tweet_count > acc.maxHourlyMentions) {
            acc.maxHourlyMentions = entry.tweet_count;
            acc.mostActiveHour = timeStr;
        }
        if (entry.tweet_count < acc.minHourlyMentions) {
            acc.minHourlyMentions = entry.tweet_count;
            acc.quietestHour = timeStr;
        }
        
        return acc;
    }, {
        maxHourlyMentions: 0,
        mostActiveHour: '',
        minHourlyMentions: Infinity,
        quietestHour: '',
        averageHourlyMentions: 0
    });

    const totalMentions = data.reduce((sum, entry) => sum + entry.tweet_count, 0);
    stats.averageHourlyMentions = totalMentions / data.length;

    return stats;
};

export const calculateTimeOfDayStats = (data: TweetData[]): TimeOfDayStats => {
    const totals = data.reduce((acc, entry) => {
        const hour = new Date(entry.start).getHours();
        
        if (hour >= 6 && hour < 12) {
            acc.morningSum += entry.tweet_count;
            acc.morningCount++;
        } else if (hour >= 12 && hour < 18) {
            acc.afternoonSum += entry.tweet_count;
            acc.afternoonCount++;
        } else if (hour >= 18 && hour < 24) {
            acc.eveningSum += entry.tweet_count;
            acc.eveningCount++;
        } else {
            acc.nightSum += entry.tweet_count;
            acc.nightCount++;
        }
        
        return acc;
    }, {
        morningSum: 0, afternoonSum: 0, eveningSum: 0, nightSum: 0,
        morningCount: 0, afternoonCount: 0, eveningCount: 0, nightCount: 0
    });

    const stats = {
        morningAvg: totals.morningCount > 0 ? totals.morningSum / totals.morningCount : 0,
        afternoonAvg: totals.afternoonCount > 0 ? totals.afternoonSum / totals.afternoonCount : 0,
        eveningAvg: totals.eveningCount > 0 ? totals.eveningSum / totals.eveningCount : 0,
        nightAvg: totals.nightCount > 0 ? totals.nightSum / totals.nightCount : 0,
        mostActiveTimeOfDay: ''
    };

    const timeOfDayAverages = [
        { time: 'Morning (6am-12pm)', avg: stats.morningAvg },
        { time: 'Afternoon (12pm-6pm)', avg: stats.afternoonAvg },
        { time: 'Evening (6pm-12am)', avg: stats.eveningAvg },
        { time: 'Night (12am-6am)', avg: stats.nightAvg }
    ];

    stats.mostActiveTimeOfDay = timeOfDayAverages.reduce((max, curr) => 
        curr.avg > max.avg ? curr : max
    ).time;

    return stats;
}; 