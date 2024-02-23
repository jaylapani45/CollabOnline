"use client";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard,Star } from "lucide-react";
import { useSearchParams } from "next/navigation";

const PoppinsFont = Poppins({
  subsets: ["latin"],
  weight:["500"]
})
  

export const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const favorite = searchParams.get("favorite");
  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-6 pt-6">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image src="/logo.png" alt="logo" width={60} height={60} />
          <span className={cn("font-semibold text-2xl",PoppinsFont.className)}>Collab</span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              width:"100%",
            },
            organizationSwitcherTrigger: {
              width:"inherit",
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              gap:"0.5rem",
              padding:"0.5rem 1rem",
              borderRadius:"0.5rem",
              backgroundColor:"rgba(227, 228, 230,0.2)",
              boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",
              cursor:"pointer",
              accentColor:"accent",
            },
            }
          
          
        }}
       />
       <div className="space-y-1 w-full">
        <Button asChild variant={favorite?"ghost":"secondary"} className="w-full px-2 font-normal justify-start">
          <Link href="/">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Team board
          </Link>
          </Button>
          <Button asChild variant={favorite?"secondary":"ghost"} className="w-full px-2 font-normal justify-start">
          <Link href={{
            pathname:"/",
            query: { favorite: true },
          }}>
            <Star className="h-4 w-4 mr-2" />
            Favorite Boards
            </Link>
            </Button>
       </div>
    </div>
  );
};
