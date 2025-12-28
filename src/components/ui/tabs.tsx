'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

function Tabs({
    className,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
    return (
        <TabsPrimitive.Root
            data-slot="tabs"
            className={cn('flex flex-col gap-2', className)}
            {...props}
        />
    )
}

function TabsList({
    className,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
    return (
        <TabsPrimitive.List
            data-slot="tabs-list"
            className={cn(
                'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
                className,
            )}
            {...props}
        />
    )
}

function TabsTrigger({
    className,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
    return (
        <TabsPrimitive.Trigger
            data-slot="tabs-trigger"
            className={cn(`
                relative
                inline-flex flex-1 items-center justify-center
                px-4 py-3
                text-sm font-medium whitespace-nowrap
                text-slate-500
                hover:text-slate-900
                transition-colors duration-200
                focus-visible:outline-none
                disabled:pointer-events-none disabled:opacity-50
                /* indicator line */
                after:absolute
                after:left-0
                after:bottom-0
                after:h-[2px]
                after:w-full
                after:scale-x-0
                after:origin-center
                after:bg-blue-600
                after:transition-transform
                after:duration-200
                data-[state=active]:text-blue-900
                data-[state=active]:after:scale-x-65
            `, className)}
            {...props}
        />
    )
}


function TabsContent({
    className,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
    return (
        <TabsPrimitive.Content
            data-slot="tabs-content"
            className={cn('flex-1 outline-none', className)}
            {...props}
        />
    )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
