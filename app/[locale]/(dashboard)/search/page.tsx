"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { BadgeCheck, SearchIcon, X } from "lucide-react";
import { useSchemaStore } from "../../../../providers/schema-store-provider";
import TopicButtons from "../../../../components/topic-buttons";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { useTranslations } from "next-intl";
import { userProfiles, topics } from "../../../../data/explore/user-profiles";
import { filterUserProfiles, filterTopics, updateRecentSearches, removeRecentSearch } from "../../../../lib/search-utils";

export default function SearchPage() {
  const t = useTranslations("SearchPage");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedTopic, setSelectedTopic] = useState("geography");

  const {
    recentSearches = [],
    setRecentSearches,
  } = useSchemaStore((state) => state);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      const filteredUserProfiles = filterUserProfiles(userProfiles, searchQuery);
      const filteredTopics = filterTopics(topics, searchQuery);
      setSearchResults([...filteredUserProfiles, ...filteredTopics]);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchResultClick = (result: any) => {
    if (result) {
      setRecentSearches((prev = []) => updateRecentSearches(prev, result));
    }
  };

  const handleDeleteRecentSearch = (id: string | undefined) => {
    setRecentSearches((prev = []) => removeRecentSearch(prev, id));
  };

  return (
    <div className="flex flex-col gap-4 py-8">
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          ref={inputRef}
        />
        <Button variant="default" onClick={handleSearch}>
          <SearchIcon />
        </Button>
      </div>

      {!searchQuery && (
        <TopicButtons
          selectedTopic={selectedTopic}
          handleTopicClick={setSelectedTopic}
          topics={topics}
        />
      )}

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
          {Array.isArray(recentSearches) && recentSearches.length > 0 ? (
            recentSearches.map((search) => (
              search && (
                <li
                  key={search.id || search.label}
                  className="flex items-center justify-between mb-2 hover:bg-secondary p-2 rounded-md cursor-pointer"
                  onClick={() => handleSearchResultClick(search)}
                >
                  <div className="flex items-center">
                    {search.username ? (
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={search.profile_picture}
                          alt={search.username}
                        />
                        <AvatarFallback>
                          {search.name ? search.name.charAt(0).toUpperCase() : search.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {search.label && search.label.split(' ')[0]}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className="ml-4">
                      <p className="font-semibold flex items-center">
                        {search.username || search.label}
                        {search.verified && search.username && (
                          <BadgeCheck className="h-4 w-4 ml-2 text-blue-500" />
                        )}
                      </p>
                    </div>
                  </div>
                  <X
                    className="cursor-pointer text-secondary hover:text-gray-700 h-4 w-4"
                    onClick={() => handleDeleteRecentSearch(search.id || search.label)}
                  />
                </li>
              )
            ))
          ) : (
            <p>{t("noRecentSearches")}</p>
          )}
        </ul>
      </div>

      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((result) => (
            result && (
              <li
                key={result.id || result.label}
                className="flex items-center justify-between mb-2 hover:bg-secondary p-2 rounded-md cursor-pointer"
                onClick={() => handleSearchResultClick(result)}
              >
                <div className="flex items-center">
                  {result.username ? (
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={result.profile_picture}
                        alt={result.username}
                      />
                      <AvatarFallback>
                        {result.name ? result.name.charAt(0).toUpperCase() : result.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {result.label && result.label.split(' ')[0]}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="ml-4">
                    <p className="font-semibold flex items-center">
                      {result.username || result.label}
                    </p>
                  </div>
                </div>
              </li>
            )
          ))}
        </ul>
      )}
    </div>
  );
}
