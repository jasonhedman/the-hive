'use client'

import React, { useState } from 'react'

import type { GetPoolsResultBodyType } from '@/ai'
import { RaydiumPool } from '../../../utils'
import { Button } from '@/components/ui'

interface Props {
    body: GetPoolsResultBodyType
}

const GetPoolsResult: React.FC<Props> = ({ body }) => {

    const [showAll, setShowAll] = useState(false);
    
    return (
        <div className="flex flex-col gap-2">
            <div className='flex flex-col gap-2'>
                {
                    body.pools.slice(0, showAll ? body.pools.length : 1).map((pool) => (
                        <RaydiumPool 
                            key={pool.pool.id}
                            pool={pool.pool} 
                            pair={pool.pair} 
                        />
                    ))
                }
            </div>
            {
                body.pools.length > 1 && (
                    <Button 
                        variant="outline"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? "Show Less" : `Show ${body.pools.length - 1} More Pools`}
                    </Button>
                )
            }
        </div>
    )
}

export default GetPoolsResult;