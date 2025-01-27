import React from 'react'

import Link from 'next/link';

import { cn } from '@/lib/utils';

interface Props {
    href?: string;
    className?: string;
    children: React.ReactNode;
    target?: string;
}

export const OptionalLink: React.FC<Props> = ({ href, className, children, target }) => {

    if (!href) {
        return children;
    }

    return (
        <Link href={href} className={cn(className)} target={target}>
            {children}
        </Link>
    )
}