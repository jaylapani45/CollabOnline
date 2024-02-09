import Image from "next/image"

export const EmptySearch = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
        <Image src="/empty-search.svg" alt="loading" width={140} height={140} priority={true} />
        <h2 className="font-semibold text-2xl mt-6">No results found</h2>
        <p className="text-muted-foreground textg-sm mt-2">Try searching for something else</p>
        </div>
    )
}