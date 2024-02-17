import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  isFavorite: boolean;
  authorLabel: string;
  createdAtLabel: string;
  title: string;
  onClick: () => void;
  disabled: boolean;
}

export const Footer = ({
  isFavorite,
  authorLabel,
  createdAtLabel,
  title,
  onClick,
  disabled,
}: FooterProps) => {
  
  return (
    <div className="relative bg-white p-3">
      <p className="truncate text-[13px] max-w-[calc(100%-20px)]">{title}</p>
      <p className="truncate text-[11px] opacity-0 group-hover:opacity-100 transition-opacity">
        {authorLabel} , {createdAtLabel}
      </p>

      <button
        className={cn(
          "opacity-0 group-hover:opacity-100 transition absolute hover:text-blue-600 top-3 right-3 text-muted-foreground",
          disabled && "courser-not-allowed opacity-75"
        )}
        onClick={onClick}
        disabled={disabled}
      >
        <Star
          className={cn("h-4 w-4", isFavorite && "fill-blue-500 text-blue-600")}
        />
      </button>
    </div>
  );
};
