import { Novel } from '../../types/Novel';
import HorizontalSlider from '../../components/HorizontalSlider';
import NavBar from './NavBar';
import Section from '../../components/Section';
import { useState } from 'react';
import NovelCard from './NovelCard';
import { Tab, Tabs } from '@mui/material';
import TabPanel from '../../components/TabPanel';
import NovelList from '../../components/NovelList';

/**
 * 메인 페이지 요소입니다.
 */
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

/**
 * 임시 노벨 데이터이며, 실제 데이터를 대신해 사용합니다.
 */
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

/**
 * 메인 페이지의 신규 작품 섹션입니다.
 */
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

/**
 * 메인 페이지의 인기 작품 섹션입니다.
 */
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

/**
 * 메인 페이지의 카테고리별 작품 섹션입니다.
 */
function CategorizedNovels() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Section title="카테고리">
      <Tabs value={currentTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
        {categories.map((category: string) => (
          <Tab label={category} />
        ))}
      </Tabs>
      {categories.map((category: string, index: number) => (
        <TabPanel value={currentTab} index={index}>
          <NovelListForCategory category={category} />
        </TabPanel>
      ))}
    </Section>
  );
}

const categories = [
  '로맨스',
  '판타지',
  '액션',
  '일상',
  '스릴러',
  '개그',
  '무협/사극',
  '드라마',
  '감성',
  '스포츠',
];

/**
 * 노벨 리스트 요소입니다.
 */
function NovelListForCategory(props: NovelListForCategoryProps) {
  return <NovelList novels={dummyNovelList} />;
}

interface NovelListForCategoryProps {
  category: string;
}

export default MainPage;
