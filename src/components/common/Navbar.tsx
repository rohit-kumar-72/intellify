'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes'; // For dark mode toggle
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Moon, Sun, Menu } from "lucide-react";
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseInstance';
import { useRouter } from 'next/navigation';
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetClose,
    SheetTrigger,
} from "@/components/ui/sheet"

const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [session, setSession] = useState<Session | null>(null);

    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        async function getSession() {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setSession(session);
            } else {
                router.push('/login')
            }
            console.log(session)
        }
        getSession();
    }, []);

    if (!mounted) {
        return null;
    }

    async function handleSignout() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            setSession(null);
            // router.push('/login');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    return (
        <nav className="w-full bg-gray-100 dark:bg-gray-900 shadow-lg">
            <div className="flex items-center justify-between w-11/12 mx-auto py-4">

                {/* Company Name (Visible in both mobile and desktop) */}
                <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    Intellify
                </span>

                {/* Right Side: Theme Toggle & Company Name */}
                <div className="flex items-center space-x-4">
                    {/* Theme Toggle Button */}
                    <Button
                        variant="ghost"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>

                    {/* right Side: Sign In Button */}
                    <form>
                        <div className="flex items-center">
                            {session ? (
                                <Button
                                    variant="destructive" className="hidden md:block mr-4"
                                    onClick={handleSignout}
                                >
                                    Log Out
                                </Button>
                            ) : (
                                <Button
                                    variant="outline" className="hidden md:block mr-4"
                                    onClick={() => router.push('/login')}
                                >
                                    Sign In
                                </Button>
                            )}


                            {/* Mobile Hamburger Menu */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="md:hidden"
                                    >
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    {/* Sidebar Menu for Mobile */}
                                    <div className="md:hidden mt-4 space-y-4">
                                        {session ? (
                                            <Button
                                                variant="destructive" className="w-full"
                                                onClick={handleSignout}
                                            >
                                                Log Out
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline" className="w-full"
                                                onClick={() => router.push('/login')}
                                            >
                                                Sign In
                                            </Button>
                                        )}

                                        {/* Search Bar for mobile */}
                                        <Input
                                            type="text"
                                            placeholder="Search..."
                                            className="w-full rounded-md border border-gray-300 dark:border-gray-700"
                                        />

                                        <Button variant="link" className="w-full text-left">
                                            Dashboard
                                        </Button>
                                    </div>
                                    <SheetFooter>
                                        <SheetClose asChild>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </form>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;
