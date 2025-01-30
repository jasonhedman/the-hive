'use client'

import React from 'react'

interface Props {
    contractAddress: string
}

const BubbleMapsResult: React.FC<Props> = ({ contractAddress }) => {
    return (
        <iframe 
            className="w-[500px] h-[500px] max-w-full rounded-md"
            src={`https://app.bubblemaps.io/sol/token/${contractAddress}`} 
        />
    )
}

export default BubbleMapsResult