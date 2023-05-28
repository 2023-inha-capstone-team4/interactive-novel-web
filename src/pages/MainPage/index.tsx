import { Novel } from '../../types/Novel';
import HorizontalSlider from '../../components/HorizontalSlider';
import Section from '../../components/Section';
import { useContext, useEffect, useState } from 'react';
import NovelCard from './NovelCard';
import { Tab, Tabs } from '@mui/material';
import TabPanel from '../../components/TabPanel';
import NovelList from '../../components/NovelList';
import { useLocation } from 'react-router-dom';
import NovelAPI from '../../api/NovelAPI';
import { AlertAPIContext } from '../../utils/alert';

/**
 * 메인 페이지 요소입니다.
 */
function MainPage() {
  const location = useLocation();

  // URL Fragement 발견 시 해당 요소 위치로 스크롤
  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  return (
    <>
      <NewNovelsSection />
      <HotNovelsSection />
      <CategorizedNovels />
    </>
  );
}

/**
 * 메인 페이지의 신규 작품 섹션입니다.
 */
function NewNovelsSection() {
  const showAlert = useContext(AlertAPIContext);
  const [novels, setNovels] = useState<Novel[]>([]);

  useEffect(() => {
    NovelAPI.newNovels()
      .then((resp) => setNovels(resp.data))
      .catch((e) => showAlert(e.response.data.errorMessage));
  }, []);

  return (
    <Section id="new" title="따끈따끈한 신규 작품">
      <HorizontalSlider>
        {novels.map((novel: Novel) => (
          <NovelCard novel={novel} href={`/novel/${novel.id}`} />
        ))}
      </HorizontalSlider>
    </Section>
  );
}

/**
 * 메인 페이지의 인기 작품 섹션입니다.
 */
function HotNovelsSection() {
  const showAlert = useContext(AlertAPIContext);
  const [novels, setNovels] = useState<Novel[]>([]);

  useEffect(() => {
    NovelAPI.hotNovels()
      .then((resp) => setNovels(resp.data))
      .catch((e) => showAlert(e.response.data.errorMessage));
  }, []);

  return (
    <Section id="hot" title="인기 작품">
      <HorizontalSlider>
        {novels.map((novel: Novel) => (
          <NovelCard novel={novel} href={`/novel/${novel.id}`} />
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
    <Section id="category" title="카테고리">
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
  return <NovelList novels={[]} />;
}

interface NovelListForCategoryProps {
  category: string;
}

export default MainPage;
