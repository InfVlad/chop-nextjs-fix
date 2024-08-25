"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from './ui/button';

export default function LandingFooter() {
    const t = useTranslations("LandingFooter");

    return (
        <footer className="flex flex-row items-center justify-between w-full  p-4 border-t border-secondary">
            <p className="text-sm">&copy; 2024 {t("companyName")} {t("allRightsReserved")}</p>
            <Button variant="link" onClick={() => window.open("https://github.com/alvropena/chop-nextjs", "_blank", "noopener,noreferrer")}>
                Source
            </Button>
        </footer>
    )
}