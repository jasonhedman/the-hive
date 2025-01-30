"use client";

interface Props {
    onSubmit: () => void,
}

export const useEnterSubmit = ({ onSubmit }: Props) => {

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
            onSubmit()
            event.preventDefault()
        }
    }

    return { onKeyDown }
}