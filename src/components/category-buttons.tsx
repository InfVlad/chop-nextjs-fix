import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function CategoryButtons({
  selectedCategory,
  handleCategoryClick,
}: {
  selectedCategory: any;
  handleCategoryClick: (category: any) => void;
}) {
  const t = useTranslations("");
  return (
    <div className="overflow-hidden max-w-md w-full">
      <div className="flex flex-row gap-4 mb-4 animate-scroll">
        <Button
          variant={selectedCategory === "geography" ? "default" : "outline"}
          className="h-6 text-xs"
          onClick={() => handleCategoryClick("geography")}
        >
          {t("Geography_Category")}
        </Button>
        <Button
          variant={selectedCategory === "history" ? "default" : "outline"}
          className="h-6 text-xs"
          onClick={() => handleCategoryClick("history")}
        >
          {t("History_Category")}
        </Button>
        <Button
          variant={selectedCategory === "soccer" ? "default" : "outline"}
          className="h-6 text-xs"
          onClick={() => handleCategoryClick("soccer")}
        >
          {t("Soccer_Category")}
        </Button>
        <Button
          variant={selectedCategory === "art-history" ? "default" : "outline"}
          className="h-6 text-xs"
          onClick={() => handleCategoryClick("art-history")}
        >
          {t("Art_History_Category")}
        </Button>
        <Button
          variant={selectedCategory === "basketball" ? "default" : "outline"}
          className="h-6 text-xs"
          onClick={() => handleCategoryClick("basketball")}
        >
          {t("Basketball_Category")}
        </Button>
        <Button
          variant={selectedCategory === "formula1" ? "default" : "outline"}
          className="h-6 text-xs"
          onClick={() => handleCategoryClick("formula1")}
        >
          {t("Formula1_Category")}
        </Button>
        <Button
          variant={selectedCategory === "italy" ? "default" : "outline"}
          className="h-6 text-xs"
          onClick={() => handleCategoryClick("italy")}
        >
          {t("Italy_Category")}
        </Button>
        <Button
          variant={selectedCategory === "tennis" ? "default" : "outline"}
          className="h-6 text-xs"
          onClick={() => handleCategoryClick("tennis")}
        >
          {t("Tennis_Category")}
        </Button>
      </div>
    </div>
  );
}
