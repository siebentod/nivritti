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
            <a href="https://github.com/siebentod/">
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
              Simple Do-Nothing, Don&#39;t-Move-Your-Mouse, &#34;Meditation&#34;
              App.
            </li>
            {/* <li>Don't-move-your-mouse simple meditation app</li> */}
            <li>
              Nivritti is a Sanskrit word, which means &#34;Non-activity&#34; in
              Vaisheshika, but has more meanings in other philosophical and
              religious traditions.
            </li>
            <li>
              Yogaś-citta-vṛtti-nirodhaḥ – &#34;Yoga is the cessation of mind
              turns,&#34; a&nbsp;Patanjali quote. There are more quotes, that
              are googleable with ease.
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
