import Bests from './components/Bests';
import PopularComparisons from '../Compare/components/PopularComparisons';
import YoutubeVideos from './components/YoutubeVideos';
import HomePageCompareForm from './components/HomePageCompareForm';

const Home = (props) => {
  const setIds = props.setIds;
  const Ids = props.Ids;

  return (
    <div>
      <section className="mt-4">
        <div className="container d-flex">
          <div className="col-12 col-md-12 col-lg-9">
            <Bests setIds={setIds} Ids={Ids} />
            <YoutubeVideos />
          </div>
          <div
            className="col-12 col-md-12 col-lg-3"
            style={{ marginTop: '48px', padding: '20px' }}
          >
            <div className="card d-none d-lg-block text-center">
              <div className="card-body" style={{ paddingBottom: '20px'}}>
                <HomePageCompareForm />
              </div>
            </div>
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
