import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const TestPage = () => {
  return (
    <div>
      test
      <FontAwesomeIcon icon={faHeart} beat />
    </div>
  );
};

export default TestPage;
