import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../app/redux/authSlice';
import { setLanguage } from '../app/redux/languageSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { username, role } = useSelector((state) => state.auth);
  const lang = useSelector((state) => state.language.lang);

  const navigate = useNavigate();

  const handleChangeLanguage = (language) => {
    dispatch(setLanguage(language));
  };

  const logoutUser = () => {
    dispatch(logOut());
  };

  const closeCollapse = () => {
    const navbar = document.getElementById('navbarSupportedContent');
    const isCollapsed = navbar.classList.contains('show');
    if (isCollapsed) {
      navbar.classList.remove('show');
    }
  }

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary">
      <div className="container">
        <a
          className="navbar-brand"
          href="#"
          onClick={() => {
            navigate('/');
            closeCollapse();
          }}
        >
          RoboBG
        </a>
        <div className="d-flex align-items-center">
          {username ? (
            <div className="dropdown d-md-none">
              <button
                className="dropdown-toggle rounded-3 me-md-1 btn btn-light rounded-5"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-user"></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <span className="dropdown-item-text">@{username}</span>
                </li>
                <li>
                  <button className="dropdown-item" onClick={logoutUser}>
                    {lang === 'en' ? 'Sign out' : 'Отписване'}
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className="btn btn-light rounded-5 d-md-none"
              onClick={() => {
                navigate('/login');
                closeCollapse();
              }}
            >
              Sign in
            </button>
          )}
          <div className="dropdown-center d-md-none me-2">
            <button
              className="btn btn-light rounded-5 dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {lang === "bg" ? <img className='mb-1' src="/images/bulgaria.png" alt="Bulgarian" width="18" height="18" /> : <img className='mb-1' src="/images/united-kingdom.png" alt="English" width="18" height="18" />}
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton"
            >
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleChangeLanguage('bg')}
                >
                  Български
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleChangeLanguage('en')}
                >
                  English
                </button>
              </li>
            </ul>
          </div>
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate('/');
                  closeCollapse();
                }}
              >
                {lang === 'en' ? 'Home' : 'Начало'}
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate('/robots');
                  closeCollapse();
                }}
              >
                {lang === 'en' ? 'All Robots' : 'Всички роботи'}
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate('/compare');
                  closeCollapse();
                }}
              >
                {lang === 'en' ? 'Compare' : 'Сравни'}
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate('/contact');
                  closeCollapse();
                }}
              >
                {lang === 'en' ? 'Contact us' : 'Контакти'}
              </a>
            </li>
            {(role === 'ADMIN' || role === 'MODERATOR') && (
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/dashboard');
                    closeCollapse();
                  }}
                >
                  {lang === 'en' ? 'Dashboard' : 'Панел'}
                </a>
              </li>
            )}
          </ul>
          {username ? (
            <div className="dropdown d-none d-md-block">
              <button
                className="dropdown-toggle rounded-3 me-md-1 btn btn-light rounded-5"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-user"></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <span className="dropdown-item-text">@{username}</span>
                </li>
                <li>
                  <button className="dropdown-item" onClick={logoutUser}>
                    {lang === 'en' ? 'Sign out' : 'Отписване'}
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className="btn btn-light d-none d-md-block rounded-5"
              onClick={() => {
                navigate('/login');
                closeCollapse();
              }}
            >
              Sign in
            </button>
          )}
          <div className="dropdown-center d-none d-md-block">
            <button
              className="btn btn-light rounded-5 dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {lang === "bg" ? <img className='mb-1' src="/images/bulgaria.png" alt="Bulgarian" width="18" height="18" /> : <img className='mb-1' src="/images/united-kingdom.png" alt="English" width="18" height="18" />}
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton"
            >
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleChangeLanguage('bg')}
                >
                  Български
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleChangeLanguage('en')}
                >
                  English
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
