import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import { selectFilters, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { SearchPizzaParams, fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';
import { Status } from 'ahooks/lib/useExternal';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);

  const isMounted = React.useRef(false);

  const { categoryId, currentPage, sort, searchValue } = useSelector(selectFilters);
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
    // eslint-disable-next-line
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const setFetchPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const page = `&page=${currentPage}`;

      dispatch(
        fetchPizzas({
          sortBy,
          order,
          category,
          search,
          currentPage: String(page),
        }),
      );
    window.scrollTo(0, 0);
  };

  //Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId: categoryId > 0 ? categoryId : null,
        currentPage,
      }, { skipNulls: true });

      navigate(`/?${queryString}`);
    }

    if (!window.location.search) {
      dispatch(fetchPizzas({} as SearchPizzaParams));
    }
    // eslint-disable-next-line
  }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
    
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        }),
      );
      isMounted.current = true;
    }
    // eslint-disable-next-line
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      setFetchPizzas();
    }

    isSearch.current = false;
    // eslint-disable-next-line
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items
    .map((obj: any) => (
        <PizzaBlock {...obj} key={obj.id} />
    ));
  const sceletons = [...new Array(4)].map((_, index) => <Sceleton key={index} />);



  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status as Status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>К сожалению, не удалось получить шарики. Попробуйте повоторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? sceletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
