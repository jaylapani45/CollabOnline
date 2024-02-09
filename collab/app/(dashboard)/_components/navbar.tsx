"use client"
import { 
    OrganizationSwitcher,
    UserButton,
    useOrganization, 
} from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { InviteMember } from "./invite-member";

export const Navbar = () => {
    const {organization} = useOrganization();
  return (
    <div className="flex items-center gap-x-4 p-5 ">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <div className="block lg:hidden flex-1 justify-center">
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              maxWidth: "376px",
            },
            organizationSwitcherTrigger: {
              padding:"6px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "0.5rem",
              backgroundColor: "rgba(227, 228, 230,0.2)",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            },
            organizationSwitcher: {
                backgroundColor: "black",
            }
          },
        }}
      />
      </div>
      {organization && (
        <InviteMember />
      )}
      
      <UserButton />
    </div>
  );
};
