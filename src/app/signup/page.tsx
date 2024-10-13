'use client'
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseInstance";


const page = () => {

    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        async function getSession() {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                router.push('/')
            }
        }
        getSession();
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        // Sign up the user using Supabase
        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
        });

        setLoading(false);
        if (error) {
            setError(error.message);
        } else {
            router.push('/login')
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <form
                onSubmit={handleSubmit}
                className={`bg-blue-900/30 backdrop-blur-md shadow-lg border-blue-400/20 rounded-lg border p-8 space-y-6 w-full max-w-md mx-4 md:mx-0`}
            >
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>

                {error && (
                    <div className="text-red-500 text-center">{error}</div>
                )}

                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="mt-2 w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className="mt-2 w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        className="mt-2 w-full p-2 border rounded-md"
                    />
                </div>

                <Button type="submit" className="w-full py-2 mt-4 ">
                    {
                        loading
                            ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing Up...
                                </>
                            )
                            : "Sign Up"}
                </Button>

                <p className="text-sm text-center text-gray-500">
                    Already have an account? <a href="/login" className="text-blue-600">Log In</a>
                </p>
            </form>
        </div>
    );
};

export default page;
