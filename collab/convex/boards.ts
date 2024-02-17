import { query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorite: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("unauthorised");

    let boards = [];
    const title = args.search;

    if (args.favorite) {
      console.log("favorite");
      const favoriteBoards = await ctx.db
        .query("userFavorite")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", identity.subject).eq("orgId", args.orgId)
        )
        .order("desc")
        .collect();

      const ids = favoriteBoards.map((b) => b.boardId);

      if(ids.length === 0) return (boards = []);

       boards = await Promise.all(
        ids.map(async (id) => {
          const board = await ctx.db
            .query("boards")
            .filter((q) => q.eq(q.field("_id"), id))
            .unique();
            return board!
        })
        )
            return boards.map((board)=>({
                ...board,
                isFavorite:true,
              })
              )
        
    }

    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgId", args.orgId)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

    const boardWithFavoriteRelation = boards.map(async (boards) => {
      const addFavorite = await ctx.db
            .query("userFavorite")
            .withIndex("by_user_board", (q) => q.eq("boardId", boards._id).eq("userId",identity.subject))
            .unique();
        return {
            ...boards,
            isFavorite: !!addFavorite,
        };
    });

     const boardWithFavorite = Promise.all(boardWithFavoriteRelation);

     return boardWithFavorite;
  },
});
