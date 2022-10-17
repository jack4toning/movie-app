import React from 'react';
import styled from 'styled-components';

export class SearchBar extends React.Component<any, { keyword: string }> {
  constructor(props: any) {
    super(props);
    this.state = { keyword: '' };
  }

  handleInput(keyword: string) {
    this.setState({ keyword });
  }

  render() {
    return (
      <Container>
        <CustomInput
          placeholder='What do you want to watch?'
          autoFocus
          onChange={e => {
            this.handleInput(e.target.value);
          }}
        />
        <CustomButton>SEARCH</CustomButton>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 1080px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #232323;
  border-radius: 4px;
  margin-bottom: 24px;
`;

const CustomInput = styled.input`
  width: 713px;
  height: 57px;
  background: rgba(50, 50, 50, 0.8);
  opacity: 0.7;
  border-radius: 4px;
  border: none;
  outline: none;
  text-indent: 1rem;
  color: #fff;
  caret-color: #d4d4d4;
  font-size: 20px;
  font-weight: 400;
`;

const CustomButton = styled.button`
  width: 233px;
  height: 57px;
  margin: 0 0 0 14px;
  background-color: #f65261;
  border-radius: 4px;
  border: none;
  font-size: 20px;
  font-weight: 500;
  color: #ffffff;
`;
