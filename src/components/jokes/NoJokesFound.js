import { Link } from 'react-router-dom/cjs/react-router-dom';
import styles from './NoJokesFound.module.css';

const NoJokesFound = () => {
  return (
    <div className={styles['no-jokes']}>
      <p>No jokes found!</p>
      <Link to='/add-a-joke' className='btn'>Add a Joke</Link>
    </div>
  );
};

export default NoJokesFound;
