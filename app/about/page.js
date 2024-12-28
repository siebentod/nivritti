import BackButton from '../_components/ui/BackButton';
import { FaGithub } from 'react-icons/fa';

export default function Page() {
  return (
    <div className="grid min-h-screen">
      <BackButton />
      <div className="about__main m-auto max-w-[570px] py-5 pr-3 pl-9 bg-zinc-800 border border-zinc-700 rounded-lg text-md">
        <ul className="list-disc">
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
            turns,&#34; a&nbsp;Patanjali quote. There are some more quotes.
          </li>
          {/* <li>
              There are also more then 5 quotes that are not too hard to find on
              your own....
            </li> */}
          <li>
            The Idea is borrowed from{' '}
            <a
              href="http://www.donothingfor2minutes.com/"
              className="underline underline-offset-2 hover:text-[#c2c9d6]"
            >
              donothingfor2minutes.com
            </a>
            .
          </li>
          <li>
            Audiofiles are taken from{' '}
            <a
              href="https://freesound.org"
              className="underline underline-offset-2 hover:text-[#c2c9d6]"
            >
              freesound.org
            </a>
            , all of them are under CC0 license.
          </li>
          <li>
            Github
            <FaGithub className="text-xs ml-0.5 align-baseline inline-block" />:{' '}
            <a
              href="https://github.com/siebentod"
              className="underline underline-offset-2 hover:text-[#c2c9d6] inline-flex items-center gap-0.5"
            >
              siebentod
            </a>
            .
          </li>
        </ul>
      </div>
    </div>
  );
}
