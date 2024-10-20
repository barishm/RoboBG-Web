import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const Contact = () => {
  const lang = useSelector((state) => state.language.lang);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={
        screenSize > 767 ? 'container p-3 my-4 h-100' : 'container my-4 h-100'
      }
    >
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div
            className={screenSize > 767 ? 'card shadow-sm' : ''}
            style={{ borderRadius: '1rem' }}
          >
            <div className="card-body p-1 p-md-5 text-center">
              <h2 className="fw-bold mb-3">
                {lang === 'en' ? 'Contact us' : 'Свържете се с нас'}
              </h2>
              <div className="form-outline form-white mb-3">
                <input
                  type="text"
                  name="name"
                  required
                  className="form-control form-control-md"
                  placeholder={lang === 'en' ? 'Name' : 'Име'}
                  style={
                    screenSize > 767
                      ? {}
                      : { backgroundColor: 'rgb(245,245,245)' }
                  }
                />
              </div>
              <div className="form-outline form-white mb-4">
                <input
                  type="email"
                  name="email"
                  required
                  className="form-control form-control-md"
                  placeholder={lang === 'en' ? 'Email' : 'Имейл'}
                  style={
                    screenSize > 767
                      ? {}
                      : { backgroundColor: 'rgb(245,245,245)' }
                  }
                />
              </div>
              <div className="form-outline form-white mb-3">
                <textarea
                  type="text"
                  name="message"
                  required
                  className="form-control form-control-md"
                  placeholder={lang === 'en' ? 'Message' : 'Съобщение'}
                  style={
                    screenSize > 767
                      ? { height: '180px' }
                      : {
                          backgroundColor: 'rgb(245,245,245)',
                          height: '180px',
                        }
                  }
                />
              </div>
              <button className="btn btn-dark btn-md px-5 mt-4">
                {lang === 'en' ? 'Submit' : 'Изпращане'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
