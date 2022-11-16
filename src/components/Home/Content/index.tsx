import React, { Dispatch, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GenreFilter } from './GenreFilter';
import { Sorter } from './Sorter';
import { MovieList } from './MovieList';
import useSelector from '../../../hooks/useSelector';
import { MovieListAction, MovieListState } from '../../../hooks/useMovieList';
import useDispatch from '../../../hooks/useDispatch';

export function Content(props: { isModalOpen: boolean }) {
  const { isModalOpen } = props;

  const {
    filteredData: movieList,
    sort,
    genreFilter,
  } = useSelector(state => state.movieList) as MovieListState;

  const dispatch = useDispatch(
    dispatches => dispatches.movieList
  ) as Dispatch<MovieListAction>;

  // logic: source data 一有变化（此处指增删改）就需要将最新的 source data 映射到 filtered data 上，再对 filtered data 重新排序
  // 此功能还包含了 filter 和 sort 的初始化，即页面初次加载时需要用初始 filter 来从 data 映射数据到 filter data 上，然后按默认 sort 排序 filtered data
  // ！最新消息：这样做会多渲染一次，导致屏闪，故改为只初始化做一次（也会导致首屏渲染时的一次屏闪，
  // ！但实际在生产中，要么是我们从服务端得到的数据是按照默认 filter, sort 处理过的，要么我们需要在异步action里执行 dispatch(setMovieList)，dispatch(filter)，dispatch(sort)）。
  // ！source data 增删改时需要的 filter 和 sort 放到每一次的 dispatch(add/edit/del) 所在的 handler 来做
  useEffect(() => {
    dispatch({ type: 'FILTER_MOVIE', payload: { genreFilter } });
    dispatch({ type: 'SORT_MOVIE', payload: { ...sort } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sort 的对象是 filtered data, 当 genreFilter 发生变化时，需要做两件事情，1，根据 filter 重新生成 filtered data。 2，根据当前 sort 重新对 filtered data 排序。
  // 所以此处需要监控 genreFilter
  // ！最新消息，将 filter 后排序的工作移动到 dispatch(filter) 所在的 handler 来做，这样可以避免屏闪
  // useEffect(() => {
  //   // dispatch({ type: 'FILTER_MOVIE', payload: { genreFilter } });
  //   dispatch({ type: 'SORT_MOVIE', payload: { ...sort } });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [genreFilter]);

  return (
    <Container isModalOpen={isModalOpen}>
      <FilterSorterWrapper>
        <GenreFilter />
        <Sorter />
        <Horizon />
      </FilterSorterWrapper>
      <MovieListWrapper>
        <MoviesCount>
          <CountNumber>{movieList.length}</CountNumber> movies found
        </MoviesCount>
        <MovieList movieList={movieList} />
      </MovieListWrapper>
    </Container>
  );
}

Content.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
};

const Container = styled.div`
  width: 1200px;
  height: ${({ isModalOpen }: { isModalOpen: boolean }) =>
    isModalOpen ? '953px' : 'auto'};
  background: #232323;
  padding: 0 60px 23px 60px;
  /* overflow: hidden; */
  /* margin-bottom: 10px; */
`;

const FilterSorterWrapper = styled.div`
  position: relative;
  height: 64px;
`;

const Horizon = styled.div`
  width: 100%;
  height: 4px;
  background: #424242;
  border-bottom: 2px solid #080707;
  position: absolute;
  top: 60px;
`;

const MovieListWrapper = styled.div`
  margin-top: 24px;
`;

const MoviesCount = styled.div`
  font-size: 20px;
  margin-bottom: 28px;
`;

const CountNumber = styled.span`
  font-weight: 600;
`;
