/**
 * Asset registry.
 * Every entry keeps the ORIGINAL file name from the old site (logo.png, being.png,
 * portfolio1.jpg ... reel1.mp4). Drop those files next to index.html and they are used
 * automatically. Until then, a curated stock/placeholder fallback is displayed so the
 * layout never breaks.
 */

export const FALLBACK = {
  portrait: "https://images.pexels.com/photos/19080880/pexels-photo-19080880.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  portraitAlt:
    "https://images.pexels.com/photos/16139537/pexels-photo-16139537.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
};

const square = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900`;

export type Work = {
  src: string;
  fallback: string;
  alt: string;
  title: string;
  tags: string[];
};

/** Creative Canvas — project1.jpg … project6.jpg */
export const WORKS: Work[] = [
  ["project1.jpg", "821652", "Project 1", ["Art Direction", "Still Life"]],
  ["project2.jpg", "6901810", "Project 2", ["Packaging", "Colour"]],
  ["project3.jpg", "17650223", "Project 3", ["Product", "Studio"]],
  ["project4.jpg", "17650224", "Project 4", ["Campaign", "Retouch"]],
  ["project5.jpg", "17650220", "Project 5", ["Motion", "Key Visual"]],
  ["project6.jpg", "11942007", "Project 6", ["Social", "Series"]],
].map(([src, id, title, tags]) => ({
  src: src as string,
  fallback: square(id as string),
  alt: title as string,
  title: title as string,
  tags: tags as string[],
}));

export type Reel = {
  id: number;
  video: string;
  poster: string;
  label: string;
  tag: string;
};

/** The original four clips plus eight new reel slots, for 12 videos in total. */
export const REELS: Reel[] = [
  { id: 1, video: "reel1.mp4", poster: "reel1.jpg", label: "Signature Reel", tag: "Beingadot" },
  { id: 2, video: "preschoolreel1.mp4", poster: "reel2.jpg", label: "Pre School", tag: "Brand Film" },
  { id: 3, video: "coursereel1.mp4", poster: "reel3.jpg", label: "Course Promo", tag: "Education" },
  { id: 4, video: "stockreel2.mp4", poster: "reel4.jpg", label: "Stock Cut", tag: "Commerce" },
  { id: 5, video: "reel5.mp4", poster: "reel5.jpg", label: "Brand Story", tag: "Identity" },
  { id: 6, video: "reel6.mp4", poster: "reel6.jpg", label: "Social Edit", tag: "Campaign" },
  { id: 7, video: "reel7.mp4", poster: "reel7.jpg", label: "Type in Motion", tag: "Typography" },
  { id: 8, video: "reel8.mp4", poster: "reel8.jpg", label: "Editorial Cut", tag: "Direction" },
  { id: 9, video: "reel9.mp4", poster: "reel9.jpg", label: "Portfolio Film", tag: "Showcase" },
  { id: 10, video: "reel10.mp4", poster: "reel10.jpg", label: "Creative Process", tag: "Behind Scenes" },
  { id: 11, video: "reel11.mp4", poster: "reel11.jpg", label: "Colour Study", tag: "Visual Design" },
  { id: 12, video: "reel12.mp4", poster: "reel12.jpg", label: "Final Frame", tag: "Campaign" },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  photo: string;
  fallback: string;
  stars: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Absolutely transformed our digital presence! The attention to detail and creative solutions were beyond our expectations.",
    name: "Ranveer Bhatiya",
    role: "CEO, TechSolutions",
    photo: "man1.jpg",
    fallback: square("7752822"),
    stars: 5,
  },
  {
    quote:
      "Delivered our project ahead of schedule with pixel-perfect execution. Will definitely work together again!",
    name: "Sarah Singh",
    role: "Owner, Pre School",
    photo: "man3.jpg",
    fallback: square("33680700"),
    stars: 5,
  },
  {
    quote:
      "Brought fresh ideas to the table that elevated our brand. Professional, communicative, and highly skilled.",
    name: "Sachin Awasthi",
    role: "Ecommerce Owner",
    photo: "man2.jpg",
    fallback: square("38740728"),
    stars: 4,
  },
];
