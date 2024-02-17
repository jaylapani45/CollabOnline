import { api } from "@/convex/_generated/api";
import { EmptyBoard } from "./empty-board";
import { EmptyFavorite } from "./empty-favorite";
import { EmptySearch } from "./empty-search";
import { useQuery } from "convex/react";
import { Key } from "lucide-react";
import { BoardCard } from "./board-card";
import { NewBoardButton } from "./new-board-button";
import { useApiMutation } from "@/hooks/use-api-mutation";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorite?: boolean;
  };
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, { orgId: orgId , search:query.search , favorite:query.favorite});
  

  if (data==undefined) {
    return(
      <div>
      <h1 className="text-2xl">
        {query.favorite ? "Favorite boards" : "Team boards"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton
          orgId={orgId}
          disabled={true}
          
         />
        <BoardCard.Skeleton />
        <BoardCard.Skeleton />
        <BoardCard.Skeleton />
        <BoardCard.Skeleton />
      </div>
      </div>
    )
  }

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }
  if (!data?.length && query.favorite) {
    return <EmptyFavorite />;
  }
  if (!data?.length) {
    return <EmptyBoard />;
  }
  return (
    <div>
      <h1 className="text-2xl">
        {query.favorite ? "Favorite boads" : "Team boards"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton
          orgId={orgId}
          
         />
        {data?.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            orgId={board.orgId}
            title={board.title}
            authorId={board.authorId}
            authorName={board.authorName}
            imageUrl={board.imageUrl}
            time={board._creationTime}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};
