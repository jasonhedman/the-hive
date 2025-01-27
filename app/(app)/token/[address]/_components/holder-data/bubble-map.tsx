'use client'

import React from 'react'

interface Props {
    address: string
}

export const BubbleMap: React.FC<Props> = ({ address }) => {
    return (
        <iframe 
            className="w-full h-full max-w-full"
            src={`https://app.bubblemaps.io/sol/token/${address}`} 
        />
    )
}

export default BubbleMap