import { useParams, Navigate } from 'react-router-dom';
import PublisherInfo from './PublisherInfo';
import Section from '../../components/Section';
import { useEffect, useState } from 'react';
import PublisherAPI from '../../api/PublisherAPI';
import { Novel } from '../../types/Novel';
import NovelList from '../../components/NovelList';

function PublisherPage() {
  const [novels, setNovels] = useState<Novel[]>([]);

  const { id } = useParams();
  const publisherId = parseInt(id!);

  useEffect(() => {
    if (!id) return;
    if (isNaN(publisherId)) return;
    PublisherAPI.findNovels(publisherId).then((resp) => setNovels(resp.data));
  }, [id]);

  return (
    <>
      <PublisherInfo publisherId={publisherId} />
      <Section title={`작품 (${novels.length})`}>
        <NovelList novels={novels} />
      </Section>
    </>
  );
}

export default PublisherPage;
