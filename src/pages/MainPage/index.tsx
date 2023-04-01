import { Novel } from '../../types/Novel';
import HorizontalSlider from '../../components/HorizontalSlider';
import NavBar from './NavBar';
import Section from '../../components/Section';
import { useState } from 'react';
import NovelCard from './NovelCard';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <>
      <NavBar />
      <NewNovelsSection />
      <HotNovelsSection />
      <CategorizedNovels />
    </>
  );
}

const dummyNovelList = [
  {
    id: 1,
    publisher: { id: 1, name: 'SBS' },
    name: 'The Boat',
    totalScore: 4.5,
    publishedDate: new Date(),
  },
  {
    id: 1,
    publisher: { id: 1, name: 'SBS' },
    name: 'The Boat',
    totalScore: 4.5,
    publishedDate: new Date(),
  },
  {
    id: 1,
    publisher: { id: 1, name: 'SBS' },
    name: 'The Boat',
    totalScore: 4.5,
    publishedDate: new Date(),
  },
  {
    id: 1,
    publisher: { id: 1, name: 'SBS' },
    name: 'The Boat',
    totalScore: 4.5,
    publishedDate: new Date(),
  },
  {
    id: 1,
    publisher: { id: 1, name: 'SBS' },
    name: 'The Boat',
    totalScore: 4.5,
    publishedDate: new Date(),
  },
];

function NewNovelsSection() {
  const [novels, setNovels] = useState(dummyNovelList);

  return (
    <Section title="따끈따끈한 신규 작품">
      <HorizontalSlider>
        {novels.map((novel: Novel) => (
          <NovelCard novel={novel} href="#" />
        ))}
      </HorizontalSlider>
    </Section>
  );
}

function HotNovelsSection() {
  const [novels, setNovels] = useState(dummyNovelList);

  return (
    <Section title="인기 작품">
      <HorizontalSlider>
        {novels.map((novel: Novel) => (
          <NovelCard novel={novel} href="#" />
        ))}
      </HorizontalSlider>
    </Section>
  );
}

function CategorizedNovels() {
  return (
    <Section title="카테고리">
      <HorizontalSlider>{}</HorizontalSlider>
    </Section>
  );
}

export default MainPage;
