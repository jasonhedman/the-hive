import React, { Suspense } from "react";

import { Card, Skeleton } from "@/components/ui";

import TokenChart from "../../_components/token/chart";

import Header from "./_components/header";
import TokenDashboardTabs from "./_components/tabs";
import SidePanel from "./_components/side-panel";

const TokenPage = async ({ params }: { params: Promise<{ address: string }> }) => {

    const { address } = await params;

    return (
        <div className="flex flex-col gap-2 h-full max-h-full overflow-hidden">
            <Header address={address} />
            <div className="md:flex-1 md:h-0 overflow-y-auto md:overflow-hidden flex flex-col md:flex-row gap-2">
                <div className="flex flex-col gap-2 w-full md:w-2/3 md:h-full">
                    <Card className="overflow-hidden">
                        <TokenChart mint={address} height={350} />
                    </Card>
                    <Card className="flex-1 h-0 overflow-hidden">
                        <Suspense fallback={<Skeleton className="h-full w-full m-2" />}>
                            <TokenDashboardTabs address={address} />
                        </Suspense>
                    </Card>   
                </div>
                <Card className="md:w-1/3 md:h-full flex flex-col gap-2 overflow-hidden">
                    <SidePanel address={address} />
                </Card>
            </div>
        </div>
    )
}

export default TokenPage;