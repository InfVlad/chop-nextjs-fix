"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfilePage() {
  // Inline useLocalePath logic
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const getLocalizedPath = (path: string) => `/${locale}${path}`;

  return (
    <div className="flex justify-center h-2/3 text-foreground p-4">
      <div className="flex flex-col space-6 w-full rounded-md">
        <div className='flex flex-row ml-4 items-center'>
          {/* Profile Picture */}
          <div className="">
            <Avatar className='h-20 w-20'>
              <AvatarImage src="https://github.com/alvropena.png" alt="@alvropena" />
              <AvatarFallback>AP</AvatarFallback>
            </Avatar>
          </div>

          {/* Profile Info */}
          <div className="ml-4">
            <h2 className="text-2xl font-bold">alvropena</h2>
            <p className="text-muted-foreground">Alvaro Peña</p>
            <p className="text-sm">can’t rush greatness</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-4 flex justify-around border-t pt-4">
          <div className="text-center">
            <span className="block text-lg font-bold">5</span>
            <span className="text-sm text-muted-foreground">Streak</span>
          </div>
          <Link href={getLocalizedPath('/profile/followers')} className="flex flex-col items-center justify-center">
            <div className="text-center cursor-pointer">
              <span className="block text-lg font-bold">442</span>
              <span className="text-sm text-muted-foreground">Followers</span>
            </div>
          </Link>
          <Link href={getLocalizedPath('/profile/following')} className="flex flex-col items-center justify-center">
            <div className="text-center cursor-pointer">
              <span className="block text-lg font-bold">423</span>
              <span className="text-sm text-muted-foreground">Following</span>
            </div>
          </Link>
        </div>

        {/* Profile Actions */}
        <div className="mt-4 flex space-x-2">
          <Link href={getLocalizedPath('/profile/edit')} className="flex-1 mx-4">
            <Button className="w-full py-2">
              Edit Profile
            </Button>
          </Link>
          {/* <Link href={getLocalizedPath('/profile/analytics')} className="flex-1">
        <Button className="w-full py-2">
            View Analytics
          </Button>
        </Link> */}
        </div>

        {/* Statistics Section */}
        <div className="mt-6 p-4 flex-grow border-secondary rounded-lg">
          <h3 className="text-lg font-semibold">Information</h3>
          <div className="mt-4 flex justify-around">
            <p>No activity yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}