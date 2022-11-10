import React from 'react';
import styled from 'styled-components';

export class GenreToggler extends React.PureComponent<
  any,
  { genres: string[]; selectedGenres: string[]; toggle: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      genres: ['Crime', 'Documentary', 'Horror', 'Comedy'],
      selectedGenres: [],
      toggle: false,
    };
  }

  handleClick(e: any) {
    if (e.currentTarget === e.target)
      this.setState({ toggle: !this.state.toggle });
  }

  handleSelect(e: any, genre: string) {
    if (e.target.checked)
      this.setState({
        selectedGenres: [...this.state.selectedGenres, genre],
      });
    else
      this.setState({
        selectedGenres: this.state.selectedGenres.filter(
          sGenre => sGenre !== genre
        ),
      });
  }

  render() {
    return (
      <CustomSelect
        onClick={e => {
          this.handleClick(e);
        }}>
        <Triangle
          onClick={e => {
            this.handleClick(e);
          }}
          style={{
            transform: `rotateZ(${!this.state.toggle ? 0 : '180deg'})`,
          }}
        />
        Select Genre
        <OptionWrapper>
          {this.state.toggle &&
            this.state.genres.map((genre, index) => {
              const checked = this.state.selectedGenres.find(
                sGenre => sGenre === genre
              );
              const isCheck = checked !== undefined ? true : false;
              console.log(isCheck);

              return (
                <Option key={index}>
                  <Checkbox
                    isCheck={isCheck}
                    id={String(index)}
                    type={'checkbox'}
                    onChange={e => {
                      this.handleSelect(e, genre);
                    }}
                  />
                  <Genre htmlFor={String(index)}>{genre}</Genre>
                </Option>
              );
            })}
        </OptionWrapper>
      </CustomSelect>
    );
  }
}

const CustomSelect = styled.div`
  z-index: 1;
  position: relative;
  width: 525px;
  height: 57px;
  background: #323232f2;
  border-radius: 4px;
  text-indent: 18px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 20px;
  font-weight: 400;
  line-height: 57px;
  cursor: pointer;
  user-select: none;
`;

const Triangle = styled.div`
  position: absolute;
  right: 19px;
  top: 22px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 12px solid #f65261;
`;

const OptionWrapper = styled.div`
  width: 525px;
  background: rgba(35, 35, 35, 0.918051);
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1), 0px 2px 10px rgba(0, 0, 0, 0.1),
    0px 10px 20px rgba(0, 0, 0, 0.1), 0px 10px 50px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(13.5914px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 4px;
`;

const Option = styled.div`
  cursor: default;
`;

const triangleUrl =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDExIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEuNDUwMTEgMy4zMzU0M0wwLjAxODc5ODggNC43NzA4NkwzLjgzMDk1IDhMMTAuMDgxMyAxLjI2NzVMOC40NzQxNSAwTDMuNjQ4NjUgNS4xOTc3NEwxLjQ1MDExIDMuMzM1NDNaIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==';

const Checkbox = styled.input`
  cursor: pointer;
  width: 16px;
  height: 16px;
  display: inline-block;
  text-align: center;
  vertical-align: -1px;
  line-height: 16px;
  position: relative;
  margin-right: 7px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }

  &::before {
    content: ${(props: { isCheck: boolean }) =>
      props.isCheck && `url(${triangleUrl})`};
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${(props: { isCheck: boolean }) =>
      props.isCheck && '#e64c5a'};
    width: 100%;
    height: 100%;
    border-radius: 2px;
    font-size: 12px;
    text-indent: 1px;
  }
`;

const Genre = styled.label`
  cursor: pointer;
  user-select: none;
`;
