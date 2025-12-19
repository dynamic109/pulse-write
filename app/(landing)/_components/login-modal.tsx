import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const LoginModal = ({
  open,
  onOpenChange,
  onSwitchToRegister,
  trigger,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToRegister: () => void;
  trigger?: React.ReactNode;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-center text-xl lg:text-2xl font-semibold">
            Welcome back.
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 flex flex-col gap-4">
          <Button
            size="lg"
            className="bg-[white] hover:bg-[white]/90 text-[#000000] px-8 py-3 h-fit cursor-pointer rounded-full text-base font-semibold tracking-wide border border-[#000000]"
          >
            <Image
              src="/icons/flat-color-icons_google.svg"
              alt="Google Logo"
              width={22}
              height={22}
            />
            Sign in with Google
          </Button>
          <Button
            size="lg"
            className="bg-[white] hover:bg-[white]/90 text-[#000000] px-8 py-3 h-fit cursor-pointer rounded-full text-base font-semibold tracking-wide border border-[#000000]"
          >
            <Image
              src="/icons/x_icon.svg"
              alt="X Logo"
              width={20}
              height={20}
            />
            Sign in with X
          </Button>
          <Button
            size="lg"
            className="bg-[white] hover:bg-[white]/90 text-[#000000] px-8 py-3 h-fit cursor-pointer rounded-full text-base font-semibold tracking-wide border border-[#000000]"
          >
            <Image
              src="/icons/email_icon.svg"
              alt="Email Logo"
              width={20}
              height={20}
            />
            Sign in with Email
          </Button>
        </div>

        <p className="text-center text-sm">
          Already have an account?
          <Button
            onClick={() => onSwitchToRegister?.()}
            className="p-0 shadow-none text-[#00747D] pl-0.5 hover:underline cursor-pointer bg-transparent hover:bg-transparent"
          >
            Sign in
          </Button>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
