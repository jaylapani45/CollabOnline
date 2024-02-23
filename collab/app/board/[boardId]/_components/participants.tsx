"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelf, useOthers } from "@/liveblocks.config";
import { UserAvatar } from "./user-avatar";
import { OpenDialog } from "@/components/open-dialog";
import { Divide } from "lucide-react";
import { AllUserAvatar } from "./all-users";

export const Participants = () => {
  const MAX_SHOWN_USERS = 2;
  const currentUser = useSelf();
  const otherUser = useOthers();
  return (
    <div className="absolute h-12 px-1.5 top-2 right-2 rounded-md shadow-md flex items-center bg-white">
      <div className="flex gap-x-2">
        <UserAvatar
          src={currentUser.info?.avatar}
          name={currentUser.info?.name + "(You)"}
          fallback={currentUser.info?.name?.[0]}
          borderColor="black"
        ></UserAvatar>

        {otherUser.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => (
          <UserAvatar
            key={connectionId}
            src={info?.avatar!}
            name={info?.name}
            fallback={info?.name?.[0]}
          ></UserAvatar>
        ))}

        {otherUser.length > MAX_SHOWN_USERS && (
          <OpenDialog
            title="All Users"
            content={
              <div className="flex flex-row justify-center items-center gap-x-6">
                <AllUserAvatar
                src={currentUser.info?.avatar}
                name={currentUser.info?.name + "(You)"}
                fallback={currentUser.info?.name?.[0]}
                borderColor="black"
                >
                </AllUserAvatar>
                {otherUser.map(({ connectionId, info }) => (
                    <AllUserAvatar
                      key={connectionId}
                      src={info?.avatar!}
                      name={info?.name}
                      fallback={info?.name?.[0]}
                    ></AllUserAvatar>
                  
                ))}
              </div>
            }
          >
            <button>
              <UserAvatar
                src=""
                name="Show more"
                fallback={`+${otherUser.length - MAX_SHOWN_USERS}`}
              ></UserAvatar>
            </button>
          </OpenDialog>
        )}
      </div>
    </div>
  );
};

Participants.Skeleton = function ParticipantsSkeleton() {
  return (
    <div className="w-[250px] absolute h-12 top-2 right-2 rounded-md shadow-md flex items-center bg-white">
      <Skeleton className="h-full w-full"></Skeleton>
    </div>
  );
};
