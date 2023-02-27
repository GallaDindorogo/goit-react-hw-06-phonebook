import { useSelector, useDispatch } from 'react-redux';

import { setFilter } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';

import styles from './contactFilter.module.scss';

const ContactFilter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleFilter = ({ target }) => dispatch(setFilter(target.value));

  return (
    <div className={styles.formGroup}>
      <h4>Find</h4>
      <input
        name="filter"
        value={filter}
        onChange={handleFilter}
        placeholder="tel"
      />
    </div>
  );
};

export default ContactFilter;
