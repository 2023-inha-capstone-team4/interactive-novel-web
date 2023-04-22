import { useEffect, useState } from 'react';
import PublisherAPI from '../../api/PublisherAPI';
import { Publisher } from '../../types/Publisher';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

function PublisherInfo(props: PublisherInfoProps) {
  const [publisher, setPublisher] = useState<Publisher>();

  useEffect(() => {
    PublisherAPI.findOne(props.publisherId).then((resp) => setPublisher(resp.data));
  }, [props.publisherId]);

  if (!publisher) return <></>;

  return (
    <Box marginX="15px" marginY="40px" textAlign="center">
      <ProfileImage src={'http://www.sbs.com.au/theboat/images/fb-image.jpg'} alt="profile" />
      <PublisherName>{publisher.name}</PublisherName>
      <PublisherDescription>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </PublisherDescription>
    </Box>
  );
}

interface PublisherInfoProps {
  publisherId: number;
}

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

const PublisherName = styled.h1`
  font-size: 32px;
  font-weight: bold;
`;

const PublisherDescription = styled.p`
  font-size: 12px;
  color: #797979;
`;

export default PublisherInfo;
