/**
 * User Menu Component
 * ====================
 * Dropdown menu for authenticated users.
 *
 * @file src/components/auth/user-menu.tsx
 * @project Turen Indah Bangunan
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    User,
    Package,
    Settings,
    LogOut,
    ChevronDown,
    Shield,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';

export function UserMenu() {
    const router = useRouter();
    const { user, isAdmin, logout, isLoading } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                    <Link href="/login">Masuk</Link>
                </Button>
                <Button asChild>
                    <Link href="/register">Daftar</Link>
                </Button>
            </div>
        );
    }

    const initials = user.displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const handleLogout = async () => {
        setIsOpen(false);
        await logout();
        router.push('/');
        router.refresh();
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photoURL} alt={user.displayName} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-block max-w-[100px] truncate text-sm">
                        {user.displayName}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.displayName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {isAdmin && (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href="/admin" className="cursor-pointer">
                                <Shield className="mr-2 h-4 w-4" />
                                Admin Dashboard
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                )}

                <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profil Saya
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/orders" className="cursor-pointer">
                        <Package className="mr-2 h-4 w-4" />
                        Pesanan Saya
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Pengaturan
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Keluar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserMenu;
