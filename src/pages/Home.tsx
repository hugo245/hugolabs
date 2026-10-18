import { AboutProcess } from '../components/sections/AboutProcess';
import { FinalCta } from '../components/sections/FinalCta';
import { Hero } from '../components/sections/Hero';
import { SelectedWork } from '../components/sections/SelectedWork';
import { Services } from '../components/sections/Services';

export function Home() {
  return <main id="main"><Hero /><Services /><SelectedWork /><AboutProcess /><FinalCta /></main>;
}
