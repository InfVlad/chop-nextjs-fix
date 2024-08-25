"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BadgeCheck, LoaderCircle, X } from "lucide-react";
import Link from "next/link";
import { useSchemaStore } from "@/providers/schema-store-provider";
import axios from "axios";
import CategoryButtons from "@/components/category-buttons";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";

export default function SearchPage() {
  const t = useTranslations("SearchPage");

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("geography");

  const {
    recentSearches,
    setRecentSearches,
    addRecentSearch,
    deleteRecentSearch,
  } = useSchemaStore((state) => state);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery) {
        setIsLoading(true);

        try {
          const response = await axios.get(
            `${baseUrl}/api/user/search?query=${searchQuery}`
          );
          const data = response.data;

          const timeoutId = setTimeout(() => {
            setSearchResults(data);
            setIsLoading(false);
          }, 1500);

          return () => clearTimeout(timeoutId);
        } catch (error) {
          console.error(t("fetchError"), error);
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [searchQuery, t]);

  const handleSearchResultClick = (result: any) => {
    addRecentSearch(result);
  };

  const handleDeleteRecentSearch = (id: string) => {
    deleteRecentSearch(id);
  };

  return (
    <div className="flex flex-col gap-4 py-8">
      <div className="mb-4">
        <Input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          ref={inputRef}
        />
      </div>

      {!searchQuery && !isLoading && (
        <CategoryButtons
          selectedCategory={selectedCategory}
          handleCategoryClick={setSelectedCategory}
        />
      )}

      {searchQuery === "" && (
        <div>
          <div className="flex flex-row justify-between items-center">
            <h2 className="font-bold">{t("recentTitle")}</h2>
            <Button
              variant="link"
              onClick={() => setRecentSearches([])}
              className="text-blue-500 hover:text-blue-700"
            >
              {t("clearAllButton")}
            </Button>
          </div>
          <ul>
            {recentSearches.length > 0 ? (
              recentSearches.map((search) => (
                <li
                  key={search.id}
                  className="flex items-center justify-between mb-2"
                >
                  <Link href={`/search/${search.username}`}>
                    <div className="flex items-center">
                      <Image
                        src={search.profile_picture}
                        alt={search.username}
                        height={100}
                        width={100}
                      />
                      <div>
                        <p className="font-semibold">{search.username}</p>
                        <p className="text-sm text-gray-500">
                          {search.name}{" "}
                          {search.verified && (
                            <BadgeCheck className="h-4 w-4" />
                          )}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <X
                    className="cursor-pointer text-secondary hover:text-gray-700 h-4 w-4"
                    onClick={() => handleDeleteRecentSearch(search.id)}
                  />
                </li>
              ))
            ) : (
              <p>{t("noRecentSearches")}</p>
            )}
          </ul>
        </div>
      )}

      {isLoading && searchQuery !== "" ? (
        <div className="flex justify-center items-center h-40">
          <LoaderCircle className="h-10 w-10 animate-spin" />
        </div>
      ) : (
        searchQuery !== "" && (
          <ul>
            {searchResults.map((result) => (
              <li
                key={result.id}
                className="flex items-center justify-between mb-2"
                onClick={() => handleSearchResultClick(result)}
              >
                <Link href={`/search/${result.username}`}>
                  <div className="flex items-center">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={result.profile_picture}
                        alt={result.username}
                      />
                      <AvatarFallback>AP</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{result.username}</p>
                      <p className="text-sm text-secondary">
                        {result.name} • {result.followers}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
