import type { FC, JSX } from "react";

interface TitleProps {
  text: string;
  className?: string;
  centered?: boolean;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Title: FC<TitleProps> = ({
  text,
  className = "",
  centered = true,
  level = 2,
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements; // 👈 Typage explicite

  return (
    <Tag
      className={`font-special text-[color:var(--color-primary)] text-3xl md:text-4xl lg:text-5xl tracking-tight ${
        centered ? "text-center" : "text-left"
      } my-8 ${className}`}
    >
      {text}
    </Tag>
  );
};

export default Title;
