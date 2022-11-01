import React from 'react';
import PropTypes from 'prop-types';

export function Content(props: { movieList: any[] }) {
  return <div>Content</div>;
}

Content.propTypes = {
  movieList: PropTypes.array.isRequired,
};
