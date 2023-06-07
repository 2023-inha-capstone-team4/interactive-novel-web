import { useEffect, useState } from 'react';
import Section from '../../components/Section';
import { Novel } from '../../types/Novel';
import UserAPI from '../../api/UserAPI';
import NovelList from '../../components/NovelList';

function BookmarkPage() {
  const [novels, setNovels] = useState<Novel[]>([]);

  useEffect(() => {
    UserAPI.bookmarkedNovels().then(({ data }) => {
      const novels = data.map(
        (bookmark) =>
          ({
            id: bookmark.novelId,
            novelName: bookmark.novelName,
            novelImageUrl: bookmark.novelImageUrl,
          } as any as Novel),
      );

      setNovels(novels);
    });
  }, []);

  return (
    <Section title="북마크" description="내가 북마크한 작품들">
      <NovelList novels={novels} />
    </Section>
  );
}

export default BookmarkPage;
