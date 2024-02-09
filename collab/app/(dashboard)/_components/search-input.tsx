"use client";
import { useDebouncedCallback } from "use-debounce";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import qs from "query-string";

export const SearchInput = () => {
  const router = useRouter();
  const handleSearch = useDebouncedCallback((term) => {
    const query = qs.stringifyUrl(
      {
        url: "/",
        query: { search: term },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(query);
  }, 300);

  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-4 w-4 text-muted-foreground" />
      <Input
        onChange={(e) => handleSearch(e.target.value)}
        className=" w-full max-w[516px] pl-9"
        placeholder="Search boards..."
      />
    </div>
  );
};
