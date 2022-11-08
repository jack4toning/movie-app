import React from 'react';
import styled from 'styled-components';

export default function ModalForm({ title }: { title: string }) {
  return (
    <Container>
      <Title>{title}</Title>
      <FlexWrapper>
        <OptionWrapper>
          <SmallTitle>title</SmallTitle>
          <LongInput placeholder='title' />
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>release date</SmallTitle>
          <DatePicker />
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>movie url</SmallTitle>
          <LongInput placeholder='https://' />
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>rating</SmallTitle>
          <ShortInput placeholder='7.8' />
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>genre</SmallTitle>
          <LongInput placeholder='7.8' />
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>runtime</SmallTitle>
          <ShortInput placeholder='minutes' />
        </OptionWrapper>
      </FlexWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 976px;
  height: 917px;
  padding: 60px;
  margin: 175px auto;
  background: #232323;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1), 0px 2px 10px rgba(0, 0, 0, 0.07),
    0px 10px 20px rgba(0, 0, 0, 0.05), 0px 10px 50px rgba(0, 0, 0, 0.05);
`;

const Title = styled.div`
  text-transform: uppercase;
  font-weight: 300;
  font-size: 40;
  letter-spacing: 1px;
  margin-bottom: 38px;
`;

const SmallTitle = styled.div`
  font-weight: 600;
  letter-spacing: 0.888889px;
  text-transform: uppercase;
  color: #f65261;
  opacity: 0.8;
  margin-bottom: 13px;
`;

const LongInput = styled.input`
  width: 525px;
  height: 57px;
  background: rgba(50, 50, 50, 0.948044);
  opacity: 0.8;
  border-radius: 4px;
  font-size: 20px;

  ::placeholder {
    opacity: 0.3;
  }
`;

const ShortInput = styled(LongInput)`
  width: 301px;
  height: 57px;
`;

const DatePicker = styled.div`
  width: 301px;
  height: 57px;
  background: rgba(50, 50, 50, 0.948044);
  opacity: 0.8;
  border-radius: 4px;
  font-size: 20px;
  opacity: 0.3;
`;

const FlexWrapper = styled.div`
  display: flex;
`;

const OptionWrapper = styled.div`
  margin: 0 30px 30px 0;
`;
