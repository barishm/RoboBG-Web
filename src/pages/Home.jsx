import Bests from 'src/components/homePage/Bests';
import PopularComparisons from 'src/components/common/PopularComparisons';
import YoutubeVideos from 'src/components/homePage/YoutubeVideos';
import HomePageCompareForm from 'src/components/homePage/HomePageCompareForm';
import Ozone from 'src/ads/Ozone';

const Home = () => {

  return (
    <div>
      <section className="mt-4">
        <div className="container d-flex">
          <div className="col-12 col-md-12 col-lg-9">
            <Bests />
            <YoutubeVideos />
          </div>
          <div
            className="col-12 col-md-12 col-lg-3"
            style={{ marginTop: '48px', padding: '20px' }}
          >
            <div className="card d-none d-lg-block text-center">
              <div className="card-body" style={{ paddingBottom: '20px' }}>
                <HomePageCompareForm />
              </div>
            </div>
            {/* <div className="d-none d-lg-block">
              <Ozone />
            </div> */}
            <div className="d-none d-lg-block">
              <PopularComparisons />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
