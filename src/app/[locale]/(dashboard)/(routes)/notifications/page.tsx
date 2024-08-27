"use client";
import { useSchemaStore } from "@/providers/schema-store-provider";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function SettingsScreen() {
    const { user_input_generation } = useSchemaStore((state) => state);
    const router = useRouter();
    const t = useTranslations("");

    return (
        <div className="flex justify-center h-fit bg-background text-foreground p-8">
            <div className="flex flex-col space-y-6 w-full max-w-md">
                <h1 className="text-2xl font-semibold">{t("Notifications")}</h1>
                <h2>No activity yet.</h2>


            </div>
        </div>
    );
}