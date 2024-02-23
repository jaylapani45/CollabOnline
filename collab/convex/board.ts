import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { toast } from "sonner";


const images = [
  "/placeholder/1.svg",
  "/placeholder/2.svg",
  "/placeholder/3.svg",
  "/placeholder/4.svg",
  "/placeholder/5.svg",
  "/placeholder/6.svg",
  "/placeholder/7.svg",
  "/placeholder/8.svg",
  "/placeholder/9.svg",
  "/placeholder/10.svg",

];
export const create = mutation({
  
  args: { orgId:v.string(),title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if(!identity) throw new Error("Unauthorized");

    const randomImages = images[Math.floor(Math.random() * images.length)];

    const board = await ctx.db.insert("boards",{
      title:args.title,
      orgId:args.orgId,
      authorId:identity.subject,
      authorName:identity.name!,
      imageUrl:randomImages

    })
    return board;

  },
});


export const remove = mutation({
  args: { id: v.id("boards") }, 
  handler: async (ctx, args) => {

    const isFavorite = await ctx.db.query("userFavorite").withIndex("by_user_board",(q)=>q.eq(("boardId"),args.id)).unique()
    if(isFavorite){
    await ctx.db.delete(isFavorite?._id)
    }

    await ctx.db.delete(args.id);
    
  },
});

export const edit = mutation({
  args:{id:v.id("boards"),title:v.string()},
  async handler(ctx, args) {
      await ctx.db.patch(args.id, { title: args.title })
  },
})

export const addFavorite = mutation({
  args:{id:v.id("boards"),userId:v.string(),orgId:v.string()},
  async handler(ctx, args) {


    const isFavorite = await ctx.db.query("userFavorite").withIndex("by_board",(q)=>q.eq(("boardId"),args.id)).unique()

    if(isFavorite){
      await ctx.db.delete(isFavorite._id)
      
    }
    else{
      await ctx.db.insert("userFavorite",{
        userId:args.userId,
        boardId:args.id,
        orgId:args.orgId,
      })

    }
    
  },
})

export const get = query({
  args:{id:v.id("boards")},
  handler(ctx, args) {
    return ctx.db.get(args.id)
  },
})
