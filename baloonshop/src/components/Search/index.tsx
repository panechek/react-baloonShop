import React from 'react';
import debounce from 'lodash.debounce';
import { setSearchValue } from '../../redux/slices/filterSlice';

import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';

const Search: React.FC = () => {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClearInput = () => {
    setSearchValue('');
    setValue('');
    inputRef.current?.focus();
  };
// eslint-disable-next-line
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 250),
    [],
  );

  const onChangeInput = (event: any) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        viewBox="0 96 960 960"
        width="48"
      >
        <path d="M796 935 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l264 262-44 44ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z" />
      </svg>
      <input
        className={styles.input}
        placeholder="Поиск..."
        value={value}
        onChange={onChangeInput}
        ref={inputRef}
      />
      {value && (
        <svg
          className={styles.clearIcon}
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 96 960 960"
          width="48"
          onClick={onClearInput}
        >
          <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
        </svg>
      )}
    </div>
  );
}

export default Search;
