import { Novel } from '../../types/Novel';
import HorizontalSlider from '../../components/HorizontalSlider';
import Section from '../../components/Section';
import { useContext, useEffect, useState } from 'react';
import NovelCard from './NovelCard';
import { Box, Button, CircularProgress, Tab, Tabs } from '@mui/material';
import TabPanel from '../../components/TabPanel';
import NovelList from '../../components/NovelList';
import { useLocation } from 'react-router-dom';
import NovelAPI from '../../api/NovelAPI';
import { AlertAPIContext } from '../../utils/alert';
import { Category } from '../../types/enums/Category';

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
          <NovelCard novel={novel} key={novel.id} href={`/novel/${novel.id}`} />
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
    NovelAPI.hotNovels(0, 10)
      .then((resp) => setNovels(resp.data))
      .catch((e) => showAlert(e.response.data.errorMessage));
  }, []);

  return (
    <Section id="hot" title="인기 작품">
      <HorizontalSlider>
        {novels.map((novel: Novel) => (
          <NovelCard novel={novel} key={novel.id} href={`/novel/${novel.id}`} />
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

  const categories = Object.entries(Category);

  return (
    <Section id="category" title="카테고리">
      <Tabs value={currentTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
        {categories.map(([key, name]) => (
          <Tab label={name} />
        ))}
      </Tabs>
      {categories.map(([key, name], index: number) => (
        <TabPanel value={currentTab} index={index}>
          <NovelListForCategory categoryKey={key} />
        </TabPanel>
      ))}
    </Section>
  );
}

/**
 * 노벨 리스트 요소입니다.
 */
function NovelListForCategory(props: NovelListForCategoryProps) {
  const showAlert = useContext(AlertAPIContext);

  const [novels, setNovels] = useState<Novel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const PAGE_SIZE = 15;

  const loadMore = () => {
    setIsLoading(true);
    const start = novels.length;
    const end = start + PAGE_SIZE - 1;

    NovelAPI.novelsByCategory(props.categoryKey, start, end)
      .then(({ data }) => {
        setNovels([...novels, ...data]);
        setIsLoading(false);
      })
      .catch((e) => {
        showAlert(e.response.data.errorMessage);
        setIsLoading(false);
      });
  };

  useEffect(() => loadMore(), []);

  return (
    <>
      <NovelList novels={novels} />
      <Box textAlign="center" padding={1}>
        {isLoading ? <CircularProgress /> : <Button onClick={loadMore}>더 보기</Button>}
      </Box>
    </>
  );
}

interface NovelListForCategoryProps {
  categoryKey: string;
}

export default MainPage;
