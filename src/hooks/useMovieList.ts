import { useReducer } from 'react';

type Movie = {
  id: number;
  title: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  poster_path: string;
  overview: string;
  budget: number;
  revenue: number;
  genres: string[];
  runtime: number;
};

export type LocalMovie = {
  id?: number;
  title: string;
  rating: number;
  releaseDate: string;
  movieUrl: string;
  overview: string;
  genres: string[];
  runtime: number;
};

type MovieId = {
  id: number;
};

const specificGenereFilters = ['Documentary', 'Comedy', 'Horror', 'Crime'];
export const genreFilters = [
  'All',
  'Documentary',
  'Comedy',
  'Horror',
  'Crime',
  'Other',
] as const;
export type GenreFilters = typeof genreFilters[number];

type GenreFilter = {
  genreFilter: GenreFilters;
};

export const sortTypes = ['Release date', 'Movie name', 'Rating'] as const;
const orderTypes = ['desc', 'asc'] as const;
export type SortTypes = typeof sortTypes[number];
export type OrderTypes = typeof orderTypes[number];

type Sort = {
  type: SortTypes;
  order: OrderTypes;
};

export type MovieListState = {
  totalAmount: number;
  data: Movie[];
  filteredData: Movie[];
  offset: number;
  limit: number;
  focusMovieId: number;
  genreFilter: GenreFilters;
  sort: Sort;
  selectedMovie: LocalMovie | null;
};

const movieList = [
  {
    id: 337167,
    title: 'Fifty Shades Freed',
    tagline: "Don't miss the climax",
    vote_average: 6.1,
    vote_count: 1195,
    release_date: '2018-02-07',
    poster_path:
      'https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg',
    overview:
      'Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embrace an inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey and he relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it even begins.',
    budget: 55000000,
    revenue: 136906000,
    genres: ['Drama', 'Romance'],
    runtime: 106,
  },
  {
    id: 181808,
    title: 'Star Wars: The Last Jedi',
    tagline: 'The Saga Continues',
    vote_average: 7.1,
    vote_count: 4732,
    release_date: '2017-12-13',
    poster_path:
      'https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg',
    overview:
      'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.',
    budget: 200000000,
    revenue: 1325937250,
    genres: ['Fantasy', 'Adventure', 'Science Fiction'],
    runtime: 152,
  },
  {
    id: 284054,
    title: 'Black Panther',
    tagline: 'Long live the king',
    vote_average: 7.3,
    vote_count: 3788,
    release_date: '2018-02-13',
    poster_path:
      'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
    overview:
      "King T'Challa returns home from America to the reclusive, technologically advanced African nation of Wakanda to serve as his country's new leader. However, T'Challa soon finds that he is challenged for the throne by factions within his own country as well as without.  Using powers reserved to Wakandan kings, T'Challa assumes the Black Panther mantel to join with girlfriend Nakia, the queen-mother, his princess-kid sister,  members of the Dora Milaje (the Wakandan \"special forces\"), and an American secret agent, to prevent Wakanda from being dragged into a world war.",
    budget: 200000000,
    revenue: 1245257672,
    genres: ['Action', 'Adventure', 'Fantasy', 'Science Fiction'],
    runtime: 134,
  },
  {
    id: 354912,
    title: 'Coco',
    tagline: 'The celebration of a lifetime',
    vote_average: 7.8,
    vote_count: 3619,
    release_date: '2017-10-27',
    poster_path:
      'https://image.tmdb.org/t/p/w500/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg',
    overview:
      "Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.",
    budget: 175000000,
    revenue: 700920729,
    genres: ['Adventure', 'Comedy', 'Family', 'Animation'],
    runtime: 105,
  },
  {
    id: 333339,
    title: 'Ready Player One',
    tagline: 'A better reality awaits.',
    vote_average: 8.1,
    vote_count: 617,
    release_date: '2018-03-28',
    poster_path:
      'https://image.tmdb.org/t/p/w500/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg',
    overview:
      'When the creator of a popular video game system dies, a virtual contest is created to compete for his fortune.',
    budget: 175000000,
    revenue: 0,
    genres: ['Adventure', 'Science Fiction', 'Action'],
    runtime: 140,
  },
  {
    id: 338970,
    title: 'Tomb Raider',
    tagline: 'Her legend begins',
    vote_average: 6.2,
    vote_count: 817,
    release_date: '2018-03-08',
    poster_path:
      'https://image.tmdb.org/t/p/w500/ePyN2nX9t8SOl70eRW47Q29zUFO.jpg',
    overview:
      'Lara Croft, the fiercely independent daughter of a missing adventurer, must push herself beyond her limits when she finds herself on the island where her father disappeared.',
    budget: 94000000,
    revenue: 126025000,
    genres: ['Action', 'Adventure'],
    runtime: 118,
  },
  {
    id: 284053,
    title: 'Thor: Ragnarok',
    tagline: 'No Hammer. No Problem.',
    vote_average: 7.4,
    vote_count: 5349,
    release_date: '2017-10-25',
    poster_path:
      'https://image.tmdb.org/t/p/w500/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg',
    overview:
      'Thor is imprisoned on the other side of the universe and finds himself in a race against time to get back to Asgard to stop Ragnarok, the prophecy of destruction to his homeworld and the end of Asgardian civilization, at the hands of an all-powerful new threat, the ruthless Hela.',
    budget: 180000000,
    revenue: 854229371,
    genres: ['Action', 'Adventure', 'Fantasy'],
    runtime: 130,
  },
  {
    id: 321612,
    title: 'Beauty and the Beast',
    tagline: 'Be our guest.',
    vote_average: 6.8,
    vote_count: 7861,
    release_date: '2017-03-16',
    poster_path:
      'https://image.tmdb.org/t/p/w500/tWqifoYuwLETmmasnGHO7xBjEtt.jpg',
    overview:
      "A live-action adaptation of Disney's version of the classic tale of a cursed prince and a beautiful young woman who helps him break the spell.",
    budget: 160000000,
    revenue: 1263521126,
    genres: ['Family', 'Fantasy', 'Romance'],
    runtime: 129,
  },
  {
    id: 399055,
    title: 'The Shape of Water',
    tagline: 'A Fairy Tale for Troubled Times',
    vote_average: 7.3,
    vote_count: 3200,
    release_date: '2017-12-01',
    poster_path:
      'https://image.tmdb.org/t/p/w500/k4FwHlMhuRR5BISY2Gm2QZHlH5Q.jpg',
    overview:
      'An other-worldly story, set against the backdrop of Cold War era America circa 1962, where a mute janitor working at a lab falls in love with an amphibious man being held captive there and devises a plan to help him escape.',
    budget: 19500000,
    revenue: 185545281,
    genres: ['Drama', 'Fantasy', 'Romance'],
    runtime: 123,
  },
];

export const initialState: MovieListState = {
  totalAmount: 9,
  data: movieList,
  filteredData: movieList,
  offset: 0,
  limit: 10,
  focusMovieId: -1,
  genreFilter: genreFilters[0],
  sort: { type: sortTypes[0], order: orderTypes[0] },
  selectedMovie: null,
};

export type MovieListAction =
  | { type: 'ADD_MOVIE'; payload: LocalMovie }
  | { type: 'EDIT_MOVIE'; payload: LocalMovie }
  | { type: 'DELETE_MOVIE'; payload: MovieId }
  | { type: 'SORT_MOVIE'; payload: Sort }
  | { type: 'FOCUS_ON_MOVIE'; payload: MovieId }
  | { type: 'FILTER_MOVIE'; payload: GenreFilter }
  | { type: 'SELECT_MOVIE'; payload: LocalMovie | null };

const useMovieList = () => {
  const MovieListReducer = (
    prevState: MovieListState,
    action: MovieListAction
  ): MovieListState => {
    const { data: movieList } = prevState;

    switch (action.type) {
      case 'ADD_MOVIE': {
        // find the maximal id
        let maxId = 0;
        movieList.forEach(({ id }) => {
          if (id > maxId) maxId = id;
        });
        maxId++;

        const {
          title,
          releaseDate: release_date,
          movieUrl: poster_path,
          rating: vote_average,
          genres,
          runtime,
          overview,
        } = action.payload;

        const movie = {
          id: maxId,
          title,
          tagline: '',
          vote_average,
          vote_count: 0,
          release_date,
          poster_path,
          overview,
          budget: 0,
          revenue: 0,
          genres,
          runtime,
        };

        return {
          ...prevState,
          totalAmount: prevState.totalAmount + 1,
          data: [...prevState.data, movie],
        };
      }
      case 'EDIT_MOVIE': {
        const {
          id,
          title,
          releaseDate: release_date,
          movieUrl: poster_path,
          rating: vote_average,
          genres,
          runtime,
          overview,
        } = action.payload;

        const movie = {
          id: id as number,
          title,
          tagline: '',
          vote_average,
          vote_count: 0,
          release_date,
          poster_path,
          overview,
          budget: 0,
          revenue: 0,
          genres,
          runtime,
        };
        const newMovieList = [...movieList];
        const index = movieList.findIndex(movie => movie.id === id);
        newMovieList.splice(index, 1, movie);
        return {
          ...prevState,
          data: newMovieList,
        };
      }
      case 'DELETE_MOVIE': {
        const { id } = action.payload;
        const newMovieList = movieList.filter(movie => movie.id !== id);
        return {
          ...prevState,
          totalAmount: prevState.totalAmount - 1,
          data: newMovieList,
        };
      }
      case 'SORT_MOVIE': {
        const { type, order } = action.payload;

        const compareDate = (d1: Date, d2: Date) => {
          return d1.getTime() - d2.getTime();
        };

        const movieList = [...prevState.filteredData];

        switch (type) {
          case 'Release date':
            movieList.sort((a, b) => {
              const res = compareDate(
                new Date(a.release_date),
                new Date(b.release_date)
              );

              return order === 'desc' ? -res : res;
            });
            break;
          case 'Movie name':
            movieList.sort((a, b) => {
              if (a.title > b.title) return order === 'desc' ? -1 : 1;
              else if (a.title < b.title) return order === 'desc' ? 1 : -1;
              else return 0;
            });
            break;
          case 'Rating':
            movieList.sort((a, b) => {
              const res = a.vote_average - b.vote_average;

              return order === 'desc' ? -res : res;
            });
            break;
          default:
            break;
        }

        return {
          ...prevState,
          filteredData: movieList,
          sort: { ...action.payload },
        };
      }
      case 'FOCUS_ON_MOVIE': {
        const { id } = action.payload;
        return {
          ...prevState,
          focusMovieId: id,
        };
      }
      case 'FILTER_MOVIE': {
        const { genreFilter } = action.payload;
        switch (genreFilter) {
          case 'All':
            return {
              ...prevState,
              filteredData: [...prevState.data],
              genreFilter,
            };
          case 'Other':
            return {
              ...prevState,
              filteredData: prevState.data.filter(movie => {
                const isInclude = movie.genres.findIndex(genre => {
                  const isContain = specificGenereFilters.findIndex(
                    filter => filter.toUpperCase() === genre.toUpperCase()
                  );
                  if (isContain !== -1) return true;
                  else return false;
                });
                if (isInclude !== -1) return false;
                else return true;
              }),
              genreFilter,
            };
          default:
            return {
              ...prevState,
              filteredData: prevState.data.filter(movie => {
                const isInclude = movie.genres.findIndex(
                  genre => genre.toUpperCase() === genreFilter.toUpperCase()
                );
                if (isInclude !== -1) return true;
                else return false;
              }),
              genreFilter,
            };
        }
      }
      case 'SELECT_MOVIE': {
        return {
          ...prevState,
          selectedMovie: action.payload,
        };
      }
      default:
        throw new Error('Bad action!');
    }
  };

  const [movieListState, dispatch] = useReducer(MovieListReducer, initialState);
  return { movieListState, dispatch };
};

export default useMovieList;
