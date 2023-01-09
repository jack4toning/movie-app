import { fireEvent, screen, render } from '@testing-library/react';
import SearchBar from './SearchBar';
import { BrowserRouter as Router } from 'react-router-dom';

describe('SearchBar', () => {
  it('should render same results each time no matter what other code changes', () => {
    const { container } = render(
      <Router>
        <SearchBar />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });

  test('url should change to /search/"searchValue" when click search button', () => {
    render(
      <Router>
        <SearchBar />
      </Router>
    );
    fireEvent.change(
      screen.getByPlaceholderText('What do you want to watch?'),
      {
        target: { value: 'Shawshank' },
      }
    );
    fireEvent.click(screen.getByRole('button'));
    console.log(window.location.pathname);
    expect(window.location.pathname).toBe('/search/Shawshank');
  });
});
