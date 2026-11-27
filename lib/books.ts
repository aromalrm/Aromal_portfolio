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
    id: "mans-search-for-meaning",
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    alt: "Man's Search for Meaning by Viktor E. Frankl",
  },
  {
    id: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    alt: "Deep Work by Cal Newport",
  },
  {
    id: "never-split-the-difference",
    title: "Never Split the Difference",
    author: "Chris Voss",
    alt: "Never Split the Difference by Chris Voss",
  },
  {
    id: "daily-stoic",
    title: "The Daily Stoic",
    author: "Ryan Holiday",
    alt: "The Daily Stoic by Ryan Holiday and Stephen Hanselman",
  },
  {
    id: "subtle-art",
    title: "The Subtle Art of Not Giving a Fuck",
    author: "Mark Manson",
    alt: "The Subtle Art of Not Giving a Fuck by Mark Manson",
  },
  {
    id: "almanack-of-naval-ravikant",
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    alt: "The Almanack of Naval Ravikant by Eric Jorgenson",
  },
  {
    id: "how-to-win-friends",
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    alt: "How to Win Friends and Influence People by Dale Carnegie",
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    alt: "Atomic Habits by James Clear",
  },
  {
    id: "way-of-the-superior-man",
    title: "The Way of the Superior Man",
    author: "David Deida",
    alt: "The Way of the Superior Man by David Deida",
  },
];
