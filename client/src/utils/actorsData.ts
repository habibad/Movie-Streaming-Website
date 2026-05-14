import type { Actor } from '@/types';

/* ── Extended types ──────────────────────────────────────────── */
export interface ActorListItem extends Actor {
  nationality: string;
  label: string; // e.g. "American Actor"
}

export interface ActorFilm {
  id: string;
  title: string;
  year: number;
  genre: string;
  poster: string;
}

export interface ActorInterviewItem {
  id: string;
  title: string;
  duration: string;
  category: string;
  thumbnail: string;
  isLive?: boolean;
}

export interface ActorDetailData {
  id: string;
  name: string;
  fullName: string;
  label: string;
  image: string;
  shortBio: string;
  biography: string;
  born: string;
  majorAwards: string;
  training: string;
  filmography: ActorFilm[];
  exclusiveInterviews: ActorInterviewItem[];
  similarActors: ActorListItem[];
}

/* ── All actors for the grid ─────────────────────────────────── */
export const allActors: ActorListItem[] = [
  {
    id: 'actor-1',
    name: 'Denzel Washington',
    label: 'American Actor',
    nationality: 'American',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&q=80',
    bio: 'Two-time Academy Award winning actor known for Malcolm X, Training Day, and Fences.',
  },
  {
    id: 'actor-2',
    name: 'Angelina Jolie',
    label: 'American Actress',
    nationality: 'American',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80',
    bio: 'Academy Award winning actress and humanitarian known for Girl, Interrupted and Lara Croft.',
  },
  {
    id: 'actor-3',
    name: 'Tom Hanks',
    label: 'American Actor',
    nationality: 'American',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    bio: 'Two-time Academy Award winning actor known for Forrest Gump and Philadelphia.',
  },
  {
    id: 'actor-4',
    name: 'Robert De Niro',
    label: 'American Actor',
    nationality: 'American',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    bio: 'Legendary actor known for The Godfather Part II, Raging Bull, and Goodfellas.',
  },
  {
    id: 'actor-5',
    name: 'Jennifer Aniston',
    label: 'American Actress',
    nationality: 'American',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
    bio: 'Emmy and Golden Globe winning actress known for Friends and The Morning Show.',
  },
  {
    id: 'actor-6',
    name: 'Meryl Streep',
    label: 'American Actress',
    nationality: 'American',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80',
    bio: 'Three-time Academy Award winner widely regarded as the greatest actress of her generation.',
  },
  {
    id: 'actor-7',
    name: 'Frances McDormand',
    label: 'American Actress',
    nationality: 'American',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80',
    bio: 'Three-time Academy Award winning actress known for Fargo, Three Billboards, and Nomadland.',
  },
  {
    id: 'actor-8',
    name: 'Brad Pitt',
    label: 'American Actor',
    nationality: 'American',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80',
    bio: 'Academy Award winning actor and producer known for Fight Club, Once Upon a Time in Hollywood.',
  },
  {
    id: 'actor-9',
    name: 'Morgan Freeman',
    label: 'American Actor',
    nationality: 'American',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&q=80',
    bio: 'Academy Award winning actor known for The Shawshank Redemption and Million Dollar Baby.',
  },
  {
    id: 'actor-10',
    name: 'Cate Blanchett',
    label: 'American Actress',
    nationality: 'Australian',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80',
    bio: 'Two-time Academy Award winning actress known for Blue Jasmine and The Aviator.',
  },
  {
    id: 'actor-11',
    name: 'Christian Bale',
    label: 'American Actor',
    nationality: 'British',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80',
    bio: 'Academy Award winning actor known for The Dark Knight trilogy and The Fighter.',
  },
  {
    id: 'actor-12',
    name: 'Helen Mirren',
    label: 'American Actress',
    nationality: 'British',
    image: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=600&q=80',
    bio: 'Academy Award winning actress known for The Queen and Prime Suspect.',
  },
  {
    id: 'actor-13',
    name: 'Al Pacino',
    label: 'American Actor',
    nationality: 'American',
    image: 'https://images.unsplash.com/photo-1519340333755-56e9c1d04579?w=600&q=80',
    bio: 'Iconic actor known for The Godfather trilogy, Scarface, and Serpico.',
  },
  {
    id: 'actor-14',
    name: 'Charlize Theron',
    label: 'South African Actress',
    nationality: 'South African',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80',
    bio: 'Academy Award winning actress known for Monster, Mad Max: Fury Road, and Atomic Blonde.',
  },
  {
    id: 'actor-mahershala',
    name: 'Mahershala Ali',
    label: 'American Actor',
    nationality: 'American',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    bio: 'Two-time Academy Award winner known for Moonlight and Green Book.',
  },
  {
    id: 'actor-sterling',
    name: 'Sterling K. Brown',
    label: 'American Actor',
    nationality: 'American',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    bio: 'Emmy and Golden Globe winning actor known for This Is Us and American Crime Story.',
  },
  {
    id: 'actor-lakeith',
    name: 'Lakeith Stanfield',
    label: 'American Actor',
    nationality: 'American',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80',
    bio: 'Acclaimed actor known for Get Out, Sorry to Bother You, and Atlanta.',
  },
  {
    id: 'actor-jeffrey',
    name: 'Jeffrey Wright',
    label: 'American Actor',
    nationality: 'American',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80',
    bio: 'Acclaimed actor known for Angels in America, Westworld, and The Batman.',
  },
  {
    id: 'actor-john',
    name: 'John David Washington',
    label: 'American Actor',
    nationality: 'American',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    bio: 'Actor known for BlacKkKlansman and Tenet, son of Denzel Washington.',
  },
  {
    id: 'actor-daniel',
    name: 'Daniel Kaluuya',
    label: 'British Actor',
    nationality: 'British',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&q=80',
    bio: 'Academy Award winning actor known for Get Out and Judas and the Black Messiah.',
  },
];

/* ── Featured actor detail (Mahershala Ali) ──────────────────── */
export const mahershalaAliDetail: ActorDetailData = {
  id: 'actor-mahershala',
  name: 'Mahershala Ali',
  fullName: 'Mahershalalhashbaz Ali',
  label: 'FEATURED TALENT',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  shortBio:
    "A two-time Academy Award winner known for his profound emotional depth and commanding screen presence. From the streets of Miami in 'Moonlight' to the refined concert halls of 'Green Book', Ali continues to redefine excellence in modern cinema.",
  biography:
    "Mahershalalhashbaz Ali, known professionally as Mahershala Ali, has emerged as one of the most respected and versatile actors of his generation. Born in Oakland, California, and raised in Hayward, Ali's journey into the arts began after developing a passion for basketball which eventually led him to discover his true calling in the theater at Saint Mary's College of California.\n\nHis breakout performance in 'Moonlight' (2016) garnered him his first Academy Award for Best Supporting Actor, making history as the first Muslim actor to win an Oscar. He repeated this success with another win for 'Green Book' (2018), cementing his status as a cinematic powerhouse who brings nuance and dignity to every role he inhabits.",
  born: 'February 16, 1974 · Oakland, CA',
  majorAwards: '2 Academy Awards, 1 Golden Globe, 1 BAFTA',
  training: 'NYU Tisch School of the Arts',
  filmography: [
    {
      id: 'f-1',
      title: 'Moonlight',
      year: 2016,
      genre: 'Drama',
      poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80',
    },
    {
      id: 'f-2',
      title: 'Green Book',
      year: 2018,
      genre: 'Biography',
      poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80',
    },
    {
      id: 'f-3',
      title: 'True Detective',
      year: 2019,
      genre: 'Crime',
      poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&q=80',
    },
    {
      id: 'f-4',
      title: 'Swan Song',
      year: 2021,
      genre: 'Sci-Fi',
      poster: 'https://images.unsplash.com/photo-1606293459239-915abe7ce5fc?w=400&q=80',
    },
    {
      id: 'f-5',
      title: 'The Place Beyond the Pines',
      year: 2012,
      genre: 'Thriller',
      poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80',
    },
  ],
  exclusiveInterviews: [
    {
      id: 'ei-1',
      title: "The Craft of Character: Ali on 'Swan Song'",
      duration: '24 min',
      category: 'Exclusive',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
      isLive: true,
    },
    {
      id: 'ei-2',
      title: 'Red Carpet: 91st Academy Awards',
      duration: '15 min',
      category: 'Awards Season',
      thumbnail: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80',
      isLive: false,
    },
    {
      id: 'ei-3',
      title: "Reflections on Moonlight: 5 Years Later",
      duration: '42 min',
      category: 'Featurette',
      thumbnail: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80',
      isLive: false,
    },
  ],
  similarActors: [
    {
      id: 'actor-sterling',
      name: 'Sterling K. Brown',
      label: 'American Actor',
      nationality: 'American',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    },
    {
      id: 'actor-lakeith',
      name: 'Lakeith Stanfield',
      label: 'American Actor',
      nationality: 'American',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    },
    {
      id: 'actor-jeffrey',
      name: 'Jeffrey Wright',
      label: 'American Actor',
      nationality: 'American',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80',
    },
    {
      id: 'actor-john',
      name: 'John David Washington',
      label: 'American Actor',
      nationality: 'American',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    },
    {
      id: 'actor-daniel',
      name: 'Daniel Kaluuya',
      label: 'British Actor',
      nationality: 'British',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80',
    },
    {
      id: 'actor-6b',
      name: 'Daniel Kaluuya',
      label: 'British Actor',
      nationality: 'British',
      image: 'https://images.unsplash.com/photo-1519340333755-56e9c1d04579?w=400&q=80',
    },
    {
      id: 'actor-7b',
      name: 'Daniel Kaluuya',
      label: 'British Actor',
      nationality: 'British',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    },
    {
      id: 'actor-8b',
      name: 'Daniel Kaluuya',
      label: 'British Actor',
      nationality: 'British',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80',
    },
    {
      id: 'actor-9b',
      name: 'Daniel Kaluuya',
      label: 'British Actor',
      nationality: 'British',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80',
    },
  ],
};

/* ── Lookup helper ───────────────────────────────────────────── */
export function getActorDetailById(id: string | undefined): ActorDetailData {
  if (id === 'actor-mahershala') return mahershalaAliDetail;
  // Fallback — in production this would be an API call
  return mahershalaAliDetail;
}