export type Book = {
  id: string;
  title: string;
  alt: string;
  src: string;
  width: number;
  height: number;
};

/** Spines from the bookshelf reference, left to right. */
export const BOOKS: Book[] = [
  {
    id: "universal-principles-of-ux",
    title: "Universal Principles of UX",
    alt: "Universal Principles of UX",
    src: "/images/books/universal-principles-of-ux.png",
    width: 25,
    height: 276,
  },
  {
    id: "the-song-of-achilles",
    title: "The Song of Achilles",
    alt: "The Song of Achilles by Madeline Miller",
    src: "/images/books/the-song-of-achilles.png",
    width: 40,
    height: 278,
  },
  {
    id: "steve-jobs",
    title: "Steve Jobs",
    alt: "Steve Jobs by Walter Isaacson",
    src: "/images/books/steve-jobs.png",
    width: 49,
    height: 280,
  },
  {
    id: "project-japan",
    title: "Project Japan",
    alt: "Project Japan: Metabolism Talks by Rem Koolhaas and Hans Ulrich Obrist",
    src: "/images/books/project-japan.png",
    width: 54,
    height: 279,
  },
  {
    id: "wkw",
    title: "WKW",
    alt: "WKW: The Cinema of Wong Kar Wai",
    src: "/images/books/wkw.png",
    width: 38,
    height: 277,
  },
  {
    id: "twenty-thousand-leagues-under-the-sea",
    title: "20,000 Leagues Under the Sea",
    alt: "20,000 Leagues Under the Sea by Jules Verne",
    src: "/images/books/twenty-thousand-leagues-under-the-sea.png",
    width: 54,
    height: 278,
  },
  {
    id: "kenzo-tange",
    title: "Kenzo Tange 1946–69",
    alt: "Kenzo Tange 1946–69",
    src: "/images/books/kenzo-tange.png",
    width: 39,
    height: 278,
  },
  {
    id: "blue-period",
    title: "Blue Period",
    alt: "Blue Period, volume 1 by Tsubasa Yamaguchi",
    src: "/images/books/blue-period.png",
    width: 37,
    height: 278,
  },
  {
    id: "jujutsu-kaisen",
    title: "呪術廻戦 30",
    alt: "呪術廻戦 30 (Jujutsu Kaisen) by Gege Akutami",
    src: "/images/books/jujutsu-kaisen.png",
    width: 30,
    height: 278,
  },
  {
    id: "spy-family",
    title: "SPY×FAMILY",
    alt: "SPY×FAMILY, volume 1 by Tatsuya Endo",
    src: "/images/books/spy-family.png",
    width: 30,
    height: 278,
  },
];
