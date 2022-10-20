import React from 'react';
import styled from 'styled-components';
import './GenreToggler.css';

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
      <Container>
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

                return (
                  <Option key={index}>
                    <Checkbox
                      checked={checked !== undefined ? true : false}
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
      </Container>
    );
  }
}

const Container = styled.div`
  width: 1080px;
  height: 600px;
  background-color: #232323;
  border-radius: 4px;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomSelect = styled.div`
  position: relative;
  width: 525px;
  height: 57px;
  background: #323232f2;
  border-radius: 4px;
  text-indent: 1rem;
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

const Checkbox = styled.input`
  cursor: pointer;
`;

const Genre = styled.label`
  cursor: pointer;
  user-select: none;
`;
