export const getGenreStr = (genres: string[]) => {
  const len = genres.length;

  if (len >= 3) return genres.join(', ');
  return genres.join(' & ');
};

export const formatRuntime = (runtime: number | string) => {
  // for add modal case, need return '' to enable runtime input placeholder
  if (runtime === '') return runtime;
  // for other cases
  if (runtime === null) runtime = 0;
  runtime = parseInt(String(Number(runtime)));
  return `${Math.floor(runtime / 60)}h ${runtime % 60}min`;
};
