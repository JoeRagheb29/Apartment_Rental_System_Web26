import styles from './SearchBar.module.css';

const SearchBar = () => {
  return (
    <input type="text" placeholder="Search for apartments..." className={styles.searchBar} />
  );
};

export default SearchBar;
