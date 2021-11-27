import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

import './HomeBtn.scss';

const HomeBtn = ({ style }) => (
  <Link to="/" style={style} className="home-btn">
    <BsArrowLeft />
    <p>back home</p>
  </Link>
);
export default HomeBtn;
