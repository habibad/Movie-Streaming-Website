import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('\n🌱  Seeding BlackTree.TV database…\n');

  // Clear existing rows (order matters for FK safety)
  await prisma.chatMessage.deleteMany();
  await prisma.movieRequest.deleteMany();
  await prisma.interview.deleteMany();
  await prisma.episode.deleteMany();
  await prisma.actor.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.user.deleteMany();

  // ── Users ──────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash('password123', 12);

  await prisma.user.createMany({
    data: [
      {
        email: 'admin@blacktree.tv',
        password: passwordHash,
        name: 'Admin',
        isPremium: true,
      },
      {
        email: 'jamal@blacktree.tv',
        password: passwordHash,
        name: 'Jamal',
        avatar: 'https://i.pravatar.cc/40?img=68',
        isPremium: true,
      },
      {
        email: 'guest@blacktree.tv',
        password: passwordHash,
        name: 'Guest User',
        isPremium: false,
      },
    ],
  });
  console.log('  ✔  Users seeded');

  // ── Movies ─────────────────────────────────────────────────────
  await prisma.movie.createMany({
    data: [
      {
        title: 'Black Panther',
        description: 'A Marvel superhero epic set in the fictional African nation of Wakanda.',
        poster: 'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
        backdrop: 'https://image.tmdb.org/t/p/original/b6ZJZHUdMEFECvGiDpJjlfUWela.jpg',
        category: 'vod',
        genre: 'Action',
        year: 2018,
        duration: 134,
        rating: 7.3,
        isFeatured: true,
      },
      {
        title: 'Morbius',
        description: 'Biochemist Michael Morbius tries to cure himself of a rare blood disease.',
        poster: 'https://image.tmdb.org/t/p/w500/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg',
        category: 'vod',
        genre: 'Action',
        year: 2022,
        duration: 104,
        rating: 5.2,
        isFeatured: true,
      },
      {
        title: 'Doctor Strange: Multiverse of Madness',
        description: 'Doctor Strange teams with a mysterious teenager who traverses multiverses.',
        poster: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
        category: 'vod',
        genre: 'Action',
        year: 2022,
        duration: 126,
        rating: 6.9,
        isFeatured: true,
      },
      {
        title: 'Jungle Cruise',
        description: 'A scientist embarks on a journey to find a tree with healing properties.',
        poster: 'https://image.tmdb.org/t/p/w500/9dKCd55IuTT5QRs989m9Qlb7d2B.jpg',
        category: 'vod',
        genre: 'Adventure',
        year: 2021,
        duration: 127,
        rating: 6.6,
        isFeatured: false,
      },
      {
        title: 'The Mother',
        description: 'A deadly female assassin comes out of hiding to protect the daughter she gave up years ago.',
        poster: 'https://image.tmdb.org/t/p/w500/rUyVTGlVPQwPQfDGjkvHM1cu5oC.jpg',
        category: 'vod',
        genre: 'Action',
        year: 2023,
        duration: 115,
        rating: 6.5,
        isFeatured: false,
      },
    ],
  });
  console.log('  ✔  Movies seeded');

  // ── Actors ─────────────────────────────────────────────────────
  await prisma.actor.createMany({
    data: [
      {
        name: 'American Actor: Denzel Washington',
        bio: 'Three-time Academy Award winner known for powerful dramatic performances.',
        image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&q=80',
        nationality: 'American',
      },
      {
        name: 'American Actress: Angelina Jolie',
        bio: 'Academy Award-winning actress, director, and humanitarian.',
        image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80',
        nationality: 'American',
      },
      {
        name: 'American Actor: Tom Hanks',
        bio: 'Two-time Academy Award winner beloved for his versatile performances.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
        nationality: 'American',
      },
      {
        name: 'American Actress: Jenifer Aniston',
        bio: 'Golden Globe-winning actress famous for both comedy and drama roles.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
        nationality: 'American',
      },
      {
        name: 'American Actor: Al Pacino',
        bio: 'Legendary actor whose career spans six decades of iconic performances.',
        image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80',
        nationality: 'American',
      },
    ],
  });
  console.log('  ✔  Actors seeded');

  // ── Episodes ───────────────────────────────────────────────────
  const now = new Date();
  const m = 60_000;

  await prisma.episode.createMany({
    data: [
      {
        title: 'Beyond Thr Story',
        description: 'Episode 4: Finding Home',
        thumbnail: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&q=80',
        scheduledAt: new Date(now.getTime() - 15 * m),
        endsAt: new Date(now.getTime() + 15 * m),
        status: 'live',
        isLive: true,
      },
      {
        title: 'The Culture Code',
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
        scheduledAt: new Date(now.getTime() + 30 * m),
        endsAt: new Date(now.getTime() + 60 * m),
        status: 'scheduled',
        isLive: false,
      },
      {
        title: 'Urban Voices',
        thumbnail: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
        scheduledAt: new Date(now.getTime() + 60 * m),
        endsAt: new Date(now.getTime() + 90 * m),
        status: 'scheduled',
        isLive: false,
      },
      {
        title: 'Legend Of The Game',
        thumbnail: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&q=80',
        scheduledAt: new Date(now.getTime() + 90 * m),
        endsAt: new Date(now.getTime() + 120 * m),
        status: 'scheduled',
        isLive: false,
      },
      {
        title: 'Black Excellence',
        thumbnail: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
        scheduledAt: new Date(now.getTime() + 120 * m),
        endsAt: new Date(now.getTime() + 150 * m),
        status: 'scheduled',
        isLive: false,
      },
      {
        title: 'Classic Black Cinema',
        thumbnail: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&q=80',
        scheduledAt: new Date(now.getTime() + 150 * m),
        endsAt: new Date(now.getTime() + 180 * m),
        status: 'scheduled',
        isLive: false,
      },
    ],
  });
  console.log('  ✔  Episodes seeded');

  // ── Interviews ─────────────────────────────────────────────────
  await prisma.interview.create({
    data: {
      label: 'EXCLUSIVE INTERVIW',
      name: 'TARAJI P. HENSON',
      tagline: 'Breaking Barriers. Building Legacy',
      description:
        'An intimate conversation about her journey in hollywood and beyond.',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=80',
      isActive: true,
    },
  });
  console.log('  ✔  Interviews seeded');

  // ── Movie requests (initial votes) ─────────────────────────────
  await prisma.movieRequest.createMany({
    data: [
      { movieName: 'Legend Of The Game', votes: 89 },
      { movieName: 'Black Excellence', votes: 78 },
    ],
  });
  console.log('  ✔  Movie requests seeded');

  console.log('\n🎉  Seed complete!\n');
  console.log('  Test login credentials:');
  console.log('  email: jamal@blacktree.tv');
  console.log('  password: password123\n');
}

main()
  .catch((e: unknown) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
