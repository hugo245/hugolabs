import { lazy, Suspense } from 'react';
import { AboutProcess } from '../components/sections/AboutProcess';
import { FinalCta } from '../components/sections/FinalCta';
import { Hero } from '../components/sections/Hero';
import { SelectedWork } from '../components/sections/SelectedWork';
import { Services } from '../components/sections/Services';

const CinematicSequence = lazy(() => import('../components/sections/CinematicSequence').then((module) => ({ default: module.CinematicSequence })));

export function Home() {
  return <main id="main"><Hero /><Suspense fallback={<section className="story story--loading" aria-hidden="true" />}><CinematicSequence /></Suspense><Services /><SelectedWork /><AboutProcess /><FinalCta /></main>;
}
