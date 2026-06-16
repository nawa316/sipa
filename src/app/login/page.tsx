"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, ShieldCheck, HeartHandshake, FileSearch } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

// Form Validation Schema
const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    // Simulate network delay for dummy authentication
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Always succeed in dummy auth
    setIsLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex w-full bg-white">
      {/* Left Pane - Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-16"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <ShieldCheck className="text-white w-7 h-7" />
            </div>
            <span className="text-2xl font-bold text-white tracking-wide">
              UPT PPSAB
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
              Sistem Informasi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Pelayanan Adopsi Anak
              </span>
            </h1>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed">
              Platform terpadu untuk memfasilitasi dan memantau proses adopsi anak dengan aman, transparan, dan terpercaya di wilayah Jawa Timur.
            </p>
          </motion.div>
        </div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 grid gap-6"
        >
          <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-2xl backdrop-blur-sm border border-slate-700/50 max-w-sm">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <FileSearch className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Verifikasi Cepat</h3>
              <p className="text-slate-400 text-sm">Proses validasi dokumen terpusat</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-2xl backdrop-blur-sm border border-slate-700/50 max-w-sm ml-8">
            <div className="p-3 bg-indigo-500/20 rounded-xl">
              <HeartHandshake className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Smart Matching</h3>
              <p className="text-slate-400 text-sm">Pencocokan COTA dan anak akurat</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 relative">
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="flex lg:hidden items-center gap-3 mb-12 absolute top-8 left-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-wide">
            SIPA
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Selamat Datang</h2>
            <p className="text-slate-500">
              Silakan masuk ke akun Anda untuk melanjutkan.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">Email Address</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@ppsab.jatim.go.id"
                  className={`pl-10 h-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-colors ${
                    errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
                  }`}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700">Password</Label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Lupa password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className={`pl-10 h-12 bg-slate-50/50 border-slate-200 focus:bg-white transition-colors ${
                    errors.password ? "border-red-500 focus-visible:ring-red-500" : ""
                  }`}
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium rounded-xl shadow-lg shadow-blue-600/25 transition-all mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Masuk ke Sistem"
              )}
            </Button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-10">
            Butuh bantuan akses?{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Hubungi Administrator
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
