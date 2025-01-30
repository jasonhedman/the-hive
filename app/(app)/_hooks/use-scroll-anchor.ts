"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollAnchor = (scrollToBottomOnMount = true) => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isAtBottom, setIsAtBottom] = useState(false);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      setIsAtBottom(true);
    }
  }, []);

  const checkAndScrollToBottom = useCallback(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [isAtBottom, scrollToBottom]);

  useEffect(() => {
    const { current } = scrollRef;
    if (current) {
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = current;
        setIsAtBottom(scrollHeight - scrollTop <= clientHeight + 1);
      };

      current.addEventListener("scroll", handleScroll, { passive: true });

      // Add initial scroll to bottom if scrollToBottomOnMount is true
      if (scrollToBottomOnMount) {
        scrollToBottom();
      }

      return () => {
        current.removeEventListener("scroll", handleScroll);
      };
    }
  }, [scrollToBottomOnMount, scrollToBottom]);

  useEffect(() => {
    const mutationObserver = new MutationObserver(checkAndScrollToBottom);
    const resizeObserver = new ResizeObserver(checkAndScrollToBottom);

    if (messagesRef.current) {
      mutationObserver.observe(messagesRef.current, {
        childList: true,
        subtree: true,
        characterData: true,
      });
      resizeObserver.observe(messagesRef.current);
    }

    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [checkAndScrollToBottom]);

  return {
    messagesRef,
    scrollRef,
    scrollToBottom,
    isAtBottom,
  };
};