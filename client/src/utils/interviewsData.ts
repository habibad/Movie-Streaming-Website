import type {
  InterviewCard,
  InterviewHeroSlide,
  InterviewFilterOption,
} from '@/types';

/* ── Hero carousel (4 slides per the design dots) ────────────── */
export const interviewHeroSlides: InterviewHeroSlide[] = [
  {
    id: 'ih-1',
    label: 'EXCLUSIVE INTERVIW',
    name: 'TARAJI P. HENSON',
    tagline: 'Breaking Barriers. Building Legacy',
    description: 'An intimate conversation about her journey in hollywood and beyond.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1600&q=80',
  },
  {
    id: 'ih-2',
    label: 'EXCLUSIVE INTERVIW',
    name: 'DENZEL WASHINGTON',
    tagline: 'A Lifetime in the Spotlight',
    description: 'Reflecting on five decades of cinema and the craft of acting.',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=1600&q=80',
  },
  {
    id: 'ih-3',
    label: 'BEHIND THE SCENES',
    name: 'MARTIN SCORSESE',
    tagline: 'The Director\'s Lens',
    description: 'A masterclass on storytelling, vision, and the future of film.',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1600&q=80',
  },
  {
    id: 'ih-4',
    label: 'LIVE TONIGHT',
    name: 'VIOLA DAVIS',
    tagline: 'Owning Every Room',
    description: 'A live conversation on power, presence, and purpose in cinema.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1600&q=80',
  },
];

/* ── Filter pills ────────────────────────────────────────────── */
export const interviewFilters: InterviewFilterOption[] = [
  { id: 'all',               label: 'All' },
  { id: 'exclusive',         label: 'Exclusive' },
  { id: 'behind-the-scenes', label: 'Behind the Scenes' },
  { id: 'live',              label: 'Live', hasLiveDot: true },
];

/* ── Interview cards ─────────────────────────────────────────── */
export const interviewCards: InterviewCard[] = [
  {
    id: 'ic-1',
    title: 'On the Set of Moonlight',
    description: "Exploring the visual language of Barry Jenkins' masterpiece.",
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900&q=80',
    duration: '12:45',
    category: 'exclusive',
  },
  {
    id: 'ic-2',
    title: 'Crafting the Character',
    description: 'Method acting and the psychology of performance.',
    thumbnail: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=900&q=80',
    duration: '18:20',
    category: 'behind-the-scenes',
  },
  {
    id: 'ic-3',
    title: 'The Sound of Cinema',
    description: 'How audio creates the immersive theatrical experience.',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=80',
    duration: '09:15',
    category: 'exclusive',
  },
  {
    id: 'ic-4',
    title: 'Script to Screen',
    description: 'Writing dialogue that resonates with cultural depth.',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=80',
    duration: '24:00',
    category: 'behind-the-scenes',
  },
  {
    id: 'ic-5',
    title: 'Premiere Nights',
    description: 'Interviews from the red carpet of the latest blockbusters.',
    thumbnail: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=900&q=80',
    duration: '15:50',
    category: 'exclusive',
  },
  {
    id: 'ic-6',
    title: 'The Legacy of 35mm',
    description: 'Directors discuss why film still matters in a digital age.',
    thumbnail: 'https://images.unsplash.com/photo-1606293459239-915abe7ce5fc?w=900&q=80',
    duration: '32:10',
    category: 'behind-the-scenes',
  },
];