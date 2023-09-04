import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' && (
        <footer className="footer">
          <p className="footer__copyright">© 2022. Алексей Лавриненков</p>
        </footer>
      )}
    </>
  );
}

export default Footer;
