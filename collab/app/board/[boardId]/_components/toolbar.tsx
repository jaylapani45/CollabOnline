import { Skeleton } from "@/components/ui/skeleton";

export const ToolBar = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col  gap-y-4">
      <div className="bg-white rounded-md flex flex-col items-center gap-y-1 shadow-md p-1.5">
        <div>pencil</div>
        <div>eraser</div>
        <div>color</div>
      </div>
      <div className="bg-white rounded-md flex flex-col items-center gap-y-1 shadow-md p-1.5">
        <div>Undo</div>
        <div>Redo</div>
      </div>
    </div>
  );
};
ToolBar.Skeleton =
  function ToolBarSkeleton() {
    return (
      <div className="w-[50px] absolute top-[50%] -translate-y-[50%] left-2 flex flex-col  gap-y-4">
        <div className="h-[100px] bg-white rounded-md  shadow-md">
          <Skeleton className="h-full w-full"></Skeleton>
        </div>

        <div className="h-[60px] bg-white rounded-md  shadow-md ">
            <Skeleton className="h-full w-full"></Skeleton>
        </div>
      </div>
    );
  };
