import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type ReactElement,
} from "react";
import { cn } from "../../lib/utils";

const CardHoverContext = createContext<boolean>(false);

export function useCardHover(): boolean {
  return useContext(CardHoverContext);
}

interface CardBaseProps {
  children: ReactNode;
  className?: string;
  badge?: ReactNode;
  hoverable?: boolean;
}

type CardAsAnchor = CardBaseProps &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof CardBaseProps
  > & {
    href: string;
  };

type CardAsDiv = CardBaseProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof CardBaseProps> & {
    href?: never;
  };

export type CardProps = CardAsAnchor | CardAsDiv;

export function Card({
  children,
  className,
  badge,
  hoverable,
  ...props
}: CardProps): ReactElement {
  const isAnchor = "href" in props && props.href != null;
  const [isHovered, setIsHovered] = useState(false);
  const shouldHover = hoverable ?? isAnchor;

  const hoverHandlers = shouldHover
    ? {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
      }
    : {};

  const wrapperClassName = cn(
    "block p-6 rounded-md border relative no-underline transition-all duration-300 ease-out",
    shouldHover &&
      (isHovered
        ? "border-[var(--theme-acc)]/30 bg-[var(--theme-acc)]/[0.03] -translate-y-1 shadow-[0_18px_50px_rgba(0,0,0,.5)]"
        : "border-[var(--theme-br)] bg-transparent"),
    className,
  );

  const common = {
    ...hoverHandlers,
    className: wrapperClassName,
    ...(isAnchor ? { "data-h": true } : {}),
  };

  const content = (
    <>
      {badge && (
        <span className="absolute top-3 right-3 font-mono text-[8px] tracking-[0.14em] px-[7px] py-[3px] bg-[var(--theme-am)]/10 border border-[var(--theme-am)]/25 rounded-sm text-[var(--theme-am)]">
          {badge}
        </span>
      )}
      <CardHoverContext.Provider value={isHovered}>
        {children}
      </CardHoverContext.Provider>
    </>
  );

  if (isAnchor) {
    const { href, ...rest } = props as CardAsAnchor;
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...common}
        {...rest}
      >
        {content}
      </a>
    );
  }

  const rest = props as CardAsDiv;
  return <div {...common} {...rest}>{content}</div>;
}
