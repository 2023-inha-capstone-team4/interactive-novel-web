import styled from '@emotion/styled';
import { Box } from '@mui/material';

function Section(props: SectionProps) {
  return (
    <section id={props.id} style={{ position: 'relative' }}>
      <Box marginY="30px">
        <SectionTitle>{props.title}</SectionTitle>
        <SectionDescription>{props.description}</SectionDescription>
      </Box>
      <div>{props.children}</div>
    </section>
  );
}

interface SectionProps {
  title: string;
  id?: string;
  description?: string;
  children?: React.ReactNode;
}

const SectionTitle = styled.h1`
  margin: 0px 15px;
  font-size: 20px;
  font-weight: bold;
`;

const SectionDescription = styled.p`
  margin: 0px 15px 20px;
  font-size: 12px;
  color: #797979;
`;

export default Section;
