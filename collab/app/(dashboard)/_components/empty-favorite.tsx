import Image from "next/image"

export const EmptyFavorite = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
        <Image src="/empty-favorites.svg" alt="loading" width={140} height={140} priority={true} />
        <h2 className="font-semibold text-2xl mt-6">No favorites found</h2>
        <p className="text-muted-foreground textg-sm mt-2">Try favoriting board</p>
        </div>
    )
}