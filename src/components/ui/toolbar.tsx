"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export type ToolbarOrientation = "horizontal" | "vertical";

export interface ToolbarItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface ToolbarProps {
  items: ToolbarItem[];
  activeId: string;
  ariaLabel: string;
  orientation?: ToolbarOrientation;
  className?: string;
}

const HIGHLIGHT_WIDTH = 1.75;
const HIGHLIGHT_MOVE = 1.875;

export function Toolbar({
  items,
  activeId,
  ariaLabel,
  orientation = "horizontal",
  className,
}: ToolbarProps) {
  const router = useRouter();
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const highlightRef = React.useRef<HTMLSpanElement>(null);
  const prevIdRef = React.useRef(activeId);

  const isVertical = orientation === "vertical";
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === activeId)
  );

  React.useEffect(() => {
    const node = highlightRef.current;
    if (!node) return;

    const prevIndex = Math.max(
      0,
      items.findIndex((item) => item.id === prevIdRef.current)
    );
    const nextIndex = activeIndex;

    if (prevIndex === nextIndex) {
      const offset = `${nextIndex * HIGHLIGHT_MOVE}em`;
      const size = `${HIGHLIGHT_WIDTH}em`;
      if (isVertical) {
        node.style.top = offset;
        node.style.left = "0";
        node.style.height = size;
        node.style.width = size;
      } else {
        node.style.left = offset;
        node.style.top = "0";
        node.style.width = size;
        node.style.height = size;
      }
      return;
    }

    const moveA = `${prevIndex * HIGHLIGHT_MOVE}em`;
    const moveB = `${nextIndex * HIGHLIGHT_MOVE}em`;
    const indexIsLower = nextIndex < prevIndex;
    const moveFrames = indexIsLower
      ? [moveA, moveB, moveB]
      : [moveA, moveA, moveB];

    const widthA = `${HIGHLIGHT_WIDTH}em`;
    const widthB = `${HIGHLIGHT_WIDTH + HIGHLIGHT_MOVE * Math.abs(nextIndex - prevIndex)}em`;
    const widthFrames = [widthA, widthB, widthA];

    const keyframes: Keyframe[] = moveFrames.map((m, i) => {
      if (isVertical) {
        return { top: m, height: widthFrames[i] };
      }
      return { left: m, width: widthFrames[i] };
    });

    node.animate(keyframes, {
      duration: 300,
      easing: "cubic-bezier(0.65,0,0.35,1)",
      fill: "forwards",
    });

    prevIdRef.current = activeId;
  }, [activeId, activeIndex, isVertical, items]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const buttons =
      toolbarRef.current?.querySelectorAll<HTMLAnchorElement>("[data-toolbar-item]");
    if (!buttons || buttons.length === 0) return;

    const go = (idx: number) => {
      e.preventDefault();
      const next = items[idx];
      buttons[idx].focus();
      router.push(next.href);
    };

    const forward = () => go((activeIndex + 1) % items.length);
    const backward = () =>
      go(activeIndex - 1 < 0 ? items.length - 1 : activeIndex - 1);

    switch (e.code) {
      case "ArrowRight":
      case "ArrowDown":
        forward();
        break;
      case "ArrowLeft":
      case "ArrowUp":
        backward();
        break;
      case "Home":
        go(0);
        break;
      case "End":
        go(items.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <div
      ref={toolbarRef}
      role="toolbar"
      aria-label={ariaLabel}
      aria-orientation={orientation}
      onKeyDown={handleKeyDown}
      className={cn(
        "toolbar",
        isVertical && "toolbar--vertical",
        className
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const pressed = item.id === activeId;
        return (
          <Link
            key={item.id}
            href={item.href}
            data-toolbar-item
            aria-label={item.label}
            aria-pressed={pressed}
            tabIndex={pressed ? 0 : -1}
            className="toolbar__button"
          >
            <Icon className="toolbar__icon" aria-hidden="true" />
            <span className="toolbar__button-tip">{item.label}</span>
          </Link>
        );
      })}
      <span ref={highlightRef} className="toolbar__highlight" aria-hidden="true" />
    </div>
  );
}
