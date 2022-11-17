export const getGenreStr = (genres: string[]) => {
  const len = genres.length;

  if (len >= 3) return genres.join(', ');
  return genres.join(' & ');
};

export const formatRuntime = (runtime: number) =>
  `${Math.floor(runtime / 60)}h ${runtime % 60}min`;
