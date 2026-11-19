import Image from "next/image";
import { BOOKS } from "@/lib/books";

export function Bookshelf() {
  return (
    <section
      id="bookshelf"
      aria-labelledby="bookshelf-heading"
      className="bg-[#09090b] px-5 pb-12 pt-8"
    >
      <div className="mx-auto w-full max-w-[560px]">
        <h2
          id="bookshelf-heading"
          className="text-[18px] font-semibold tracking-tight text-white"
        >
          My bookshelf
        </h2>

        <div className="mt-9 overflow-x-auto">
          <ul className="flex w-max items-end gap-[clamp(3px,0.8vw,5px)]">
            {BOOKS.map((book) => (
              <li key={book.id} className="shrink-0">
                <Image
                  src={book.src}
                  alt={book.alt}
                  width={book.width}
                  height={book.height}
                  unoptimized
                  draggable={false}
                  style={{ width: "auto" }}
                  className="h-[clamp(156px,48vw,278px)] w-auto select-none"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
