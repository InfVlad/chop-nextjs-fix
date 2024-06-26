import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";
import { Logo } from "../logo";
import Link from "next/link";
import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/data/nav-links";
import { usePathname } from "next/navigation";
import { NavLinkProps } from "@/types/navlink";
import { GlassesIcon } from "lucide-react";
import { InviteFriendsDialog } from "../invite-friends-dialog";

const NavLink: React.FC<NavLinkProps> = ({ href, icon: Icon, children, isActive, ...props }) => {
    return (
        <Link href={href} prefetch={false} {...props} className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50 ${isActive
            ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
            : "text-gray-500 dark:text-gray-400"
            }`} >
            <Icon className="h-4 w-4" />
            {children}
        </Link>
    );
};



const Navbar = () => {
    const pathname = usePathname();

    return (
        <>
            <div className="flex h-[60px] items-center border-b px-6 justify-between">
                <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                    <GlassesIcon className="h-6 w-6" />
                    <span>Chop</span>
                </Link>
                <Badge>
                    Beta
                </Badge>
            </div>
            <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                    {navLinks.map(({ href, icon, label }) => (
                        <NavLink
                            key={href}
                            href={href}
                            icon={icon}
                            isActive={pathname === href}
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>
            </div>
            <div className="px-4 py-6">
                <InviteFriendsDialog />
            </div>

        </>
    );
}

export default Navbar;