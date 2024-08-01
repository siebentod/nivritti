import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

function About() {
  return (
    <>
      <Helmet>
        <title>About</title>
        <meta name="description" content="Simple Do-Nothing App" />
      </Helmet>
      <header>
        <div className="links">
          <div className="link link__github">
            <a href="https://github.com/siebentod/nivritti">
              Github{' '}
              <i
                className="fa-solid fa-arrow-up-right-from-square"
                style={{ fontSize: '9px' }}
              ></i>
            </a>
          </div>
          <div className="link link__about">
            <Link to="/">Home</Link>
          </div>
        </div>
      </header>
      <div className="about">
        <div className="about__main">
          <ul>
            <li>
              Nivritti – a sanskrit word. In Vaisheshika means
              &#34;Non-activity,&#34; but also has different meanings in other
              philosophical schools and religious traditions.
            </li>
            <li>
              Yogaś-citta-vṛtti-nirodhaḥ – &#34;Yoga is the cessation of mind
              turns,&#34; a Patanjali quote.
            </li>
            {/* <li>
              There are also more then 5 quotes that are not too hard to find on
              your own....
            </li> */}
            <li>
              The Idea is borrowed from{' '}
              <a href="http://www.donothingfor2minutes.com/">
                donothingfor2minutes.com{' '}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default About;
