import { useEffect, useState } from 'react';
import Section from '../../components/Section';
import { Novel } from '../../types/Novel';
import UserAPI from '../../api/UserAPI';
import NovelList from '../../components/NovelList';

function BookmarkPage() {
  const [novels, setNovels] = useState<Novel[]>([]);

  useEffect(() => {
    UserAPI.findBookmarks().then((resp) => setNovels(resp.data));
  }, []);

  return (
    <Section title="북마크" description="좋아요한 작품들">
      <NovelList novels={novels} />
    </Section>
  );
}

export default BookmarkPage;
