export type Book = {
  id: string;
  title: string;
  author: string;
  alt: string;
};

/** Shelf order, left to right. */
export const BOOKS: Book[] = [
  {
    id: "psycho-cybernetics",
    title: "Psycho-Cybernetics",
    author: "Maxwell Maltz",
    alt: "Psycho-Cybernetics by Maxwell Maltz",
  },
  {
    id: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    alt: "Meditations by Marcus Aurelius",
  },
  {
    id: "never-split-the-difference",
    title: "Never Split the Difference",
    author: "Chris Voss",
    alt: "Never Split the Difference by Chris Voss",
  },
  {
    id: "sapiens",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    alt: "Sapiens: A Brief History of Humankind by Yuval Noah Harari",
  },
  {
    id: "mans-search-for-meaning",
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    alt: "Man's Search for Meaning by Viktor E. Frankl",
  },
  {
    id: "subtle-art",
    title: "The Subtle Art of Not Giving a Fuck",
    author: "Mark Manson",
    alt: "The Subtle Art of Not Giving a Fuck by Mark Manson",
  },
  {
    id: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    alt: "Deep Work by Cal Newport",
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    alt: "Atomic Habits by James Clear",
  },
];
