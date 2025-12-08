"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { login, register } from "../_actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const EmailSignUp = ({
  open,
  onOpenChange,
  onSwitchToLogin,
  trigger,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
  trigger?: React.ReactNode;
}) => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      if (email && password && !isSignIn) {
        setLoading(true);
        const response = await register({ email, password });
        toast.success(response?.msg);
        onOpenChange(false);
        router.push("/verification-page");
      }

      if (email && password && isSignIn) {
        setLoading(true);
        const response = await login({ email, password });
        toast.success(response?.msg || "Login successful!!");
        onOpenChange(false);
        router.push("/dashboard");
      }
    } catch (error: any) {
      const errorMsg = error?.message;
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center text-center text-xl lg:text-2xl font-semibold gap-2">
            <Image
              src={"/icons/ri_mail-send-line.svg"}
              alt="email icon"
              width={35}
              height={30}
            />
            {isSignIn ? "Sign in with email" : "Sign up with email"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Your email</Label>
            <Input
              id="email"
              name="email"
              value={email}
              type="email"
              className="focus-visible:ring-0 py-6 rounded-full"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Your password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                value={password}
                type={showPassword ? "text" : "password"}
                className="focus-visible:ring-0 py-6 rounded-full relative"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                {showPassword ? (
                  <Button
                    className="[&_svg:not([class*='size-'])]:size-fit"
                    variant="link"
                    onClick={() => setShowPassword(false)}
                  >
                    <EyeOff strokeWidth={1.5} />
                  </Button>
                ) : (
                  <Button
                    className="[&_svg:not([class*='size-'])]:size-fit"
                    variant="link"
                    onClick={() => setShowPassword(true)}
                  >
                    <Eye strokeWidth={1.5} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="py-4 flex flex-col gap-4">
          <Button
            onClick={handleSubmit}
            disabled={loading ? true : false}
            type="submit"
            size="lg"
            className="bg-[#00747D] hover:bg-[#00747D]/90 text-white px-8 py-3 h-fit cursor-pointer rounded-full text-base font-semibold tracking-wide"
          >
            {loading && <Loader className="animate-spin" />}
            Continue
          </Button>
          <Button
            className="w-fit shadow-none underline self-center cursor-pointer"
            onClick={() => onSwitchToLogin?.()}
          >
            Back to signup options
          </Button>
        </div>

        <p className="text-center text-sm">
          Already have an account?
          <Button
            onClick={() => setIsSignIn(!isSignIn)}
            className="p-0 shadow-none text-[#00747D] pl-0.5 hover:underline cursor-pointer"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </Button>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default EmailSignUp;
