"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function BlogPage() {
    const t = useTranslations("BlogPage");
    const blogPosts = [
        {
            id: 1,
            title: t("post1.title"),
            excerpt: t("post1.excerpt"),
            imageUrl: "/placeholder.svg",
            altText: t("post1.image_alt"),
            link: `/blog/1`
        },
        {
            id: 2,
            title: t("post2.title"),
            excerpt: t("post2.excerpt"),
            imageUrl: "/placeholder.svg",
            altText: t("post2.image_alt"),
            link: `/blog/2`
        },
        {
            id: 3,
            title: t("post3.title"),
            excerpt: t("post3.excerpt"),
            imageUrl: "/placeholder.svg",
            altText: t("post3.image_alt"),
            link: `/blog/3`
        },
    ];

    return (
        <main className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {t("title")}
            </h1>
            <p className="mt-4 text-muted-foreground">
                {t("subtitle")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                    <Card key={post.id} className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <Link href={post.link} className="block" prefetch={false}>
                            <img
                                src={post.imageUrl}
                                width={600}
                                height={400}
                                alt={post.altText}
                                className="w-full h-48 object-cover"
                                style={{ aspectRatio: "600/400", objectFit: "cover" }}
                            />
                        </Link>
                        <CardContent className="p-4">
                            <h2 className="text-xl font-semibold mb-2">
                                <Link href={post.link} className="hover:underline" prefetch={false}>
                                    {post.title}
                                </Link>
                            </h2>
                            <p className="text-muted-foreground line-clamp-3">
                                {post.excerpt}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    );
}
