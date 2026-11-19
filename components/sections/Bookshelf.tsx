import { BookSpine } from "@/components/sections/BookSpine";
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
          <ul className="flex w-max items-end gap-[6px]">
            {BOOKS.map((book) => (
              <li key={book.id} className="shrink-0">
                <span className="sr-only">{book.alt}</span>
                <BookSpine book={book} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
