import React from 'react'

import { Skeleton } from '@/components/ui'

const Loading: React.FC = () => {
    return (
        <Skeleton className="h-full w-full" />
    )
}

export default Loading