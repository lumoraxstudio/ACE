// Tournament utilities

export const tournaments = [
  {
    id: 1,
    name: 'VALORANT LEAGUE',
    description: 'Competitive tactical tournament',
    game: 'Valorant',
    prizePool: '$10,000',
    teams: 16,
    dates: 'Aug 15 - Aug 31, 2026',
    status: 'Registering',
    image: '/images/valorant.jpg',
  },
  {
    id: 2,
    name: 'FREE FIRE LEGENDS TOURNAMENT',
    description: 'Battle royale championship',
    game: 'Free Fire',
    prizePool: '$5,000',
    teams: 32,
    dates: 'Sep 1 - Sep 15, 2026',
    status: 'Coming Soon',
    image: '/images/freefire.jpg',
  },
  {
    id: 3,
    name: 'BGMI SUPER LEAGUE',
    description: 'Mobile esports excellence',
    game: 'BGMI',
    prizePool: '$8,000',
    teams: 24,
    dates: 'Sep 20 - Oct 5, 2026',
    status: 'Coming Soon',
    image: '/images/bgmi.jpg',
  },
];

export const getTournamentById = (id) => {
  return tournaments.find((t) => t.id === id);
};

export const getActiveTournaments = () => {
  return tournaments.filter((t) => t.status === 'Registering');
};

export const getUpcomingTournaments = () => {
  return tournaments.filter((t) => t.status === 'Coming Soon');
};
