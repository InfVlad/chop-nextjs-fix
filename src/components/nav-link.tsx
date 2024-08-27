import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface NavLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    collapsed?: boolean;
    tooltipSide?: "top" | "right" | "bottom" | "left";
    isBottomTab?: boolean; // New prop to indicate BottomTabNavigation usage
}

export default function NavLink({ href, icon, label, collapsed = false, tooltipSide = "top", isBottomTab = false }: NavLinkProps) {
    const pathname = usePathname();

    // Extract the locale from the current pathname
    const locale = pathname.split('/')[1];
    const getLocalizedPath = (path: string) => `/${locale}${path}`;

    // Determine if the current path is active
    const isActive = pathname === getLocalizedPath(href);

    // Tailwind CSS classes
    const baseClasses = "relative inline-flex items-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md";
    const activeClasses = isBottomTab ? "bg-primary text-secondary" : "bg-primary text-primary-foreground";
    const hoverClasses = "hover:bg-secondary hover:text-secondary-foreground";
    const defaultClasses = isBottomTab ? "text-primary" : "bg-transparent text-foreground";

    const linkClasses = cn(
        baseClasses,
        isActive ? activeClasses : defaultClasses,
        !isActive && hoverClasses,
        isBottomTab ? "flex-col items-center justify-center h-auto w-20 py-3" : collapsed ? "justify-center w-full" : "justify-start px-3"
    );

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link href={getLocalizedPath(href)} className={linkClasses} prefetch={false}>
                        <div className={cn("flex items-center justify-center", isBottomTab ? "flex-col" : collapsed ? "justify-center w-full" : "justify-start w-full")}>
                            <div className="relative flex items-center justify-center">
                                {icon}
                                {href === "/notifications" && collapsed && (
                                    <span className={cn(
                                        "absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2",
                                        "text-xs text-white bg-red-600 h-5 w-5 rounded-full flex items-center justify-center"
                                    )}>
                                        2
                                    </span>
                                )}
                            </div>
                            {!collapsed && !isBottomTab && <span className="ml-2">{label}</span>}
                            {href === "/notifications" && !collapsed && (
                                <span className={cn(
                                    "absolute top-1 right-5 transform",
                                    "text-xs text-white bg-red-600 h-5 w-5 rounded-full flex items-center justify-center"
                                )}>
                                    2
                                </span>
                            )}
                        </div>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side={tooltipSide}>{label}</TooltipContent>
            </Tooltip>
        </TooltipProvider >
    );
}