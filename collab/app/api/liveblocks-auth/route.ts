import { Liveblocks } from "@liveblocks/node";
import { currentUser,auth} from "@clerk/nextjs";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!,
)


const liveblocks = new Liveblocks({
  secret: process.env.LIVE_BLOCK_SECRET_KEY!
});

export async function POST(request: Request) {

  const authorization = auth();
  const user = await currentUser();

  if(!user || !authorization){
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();
  const board = await convex.query(api.board.get, { id: room });

  if(!board || board.orgId !== authorization.orgId){
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name:user.firstName || "unknown",
    avatar:user.imageUrl
  }

  const session = liveblocks.prepareSession(
      user.id,
      { userInfo }
    );

    if (room) {
        session.allow(room, session.FULL_ACCESS);
      }

  const { status, body } = await session.authorize();
  return new Response(body, { status });



  // // Get the current user from your database
  // const user = __getUserFromDB__(request);

  // // Start an auth session inside your endpoint
  // const session = liveblocks.prepareSession(
  //   user.id,
  //   { userInfo: user.metadata } // Optional
  // );

  // // Implement your own security, and give the user access to the room
  // 
  // if (room && __shouldUserHaveAccess__(user, room)) {
  //   session.allow(room, session.FULL_ACCESS);
  // }

  // // Authorize the user and return the result
  // const { status, body } = await session.authorize();
  // return new Response(body, { status });
}