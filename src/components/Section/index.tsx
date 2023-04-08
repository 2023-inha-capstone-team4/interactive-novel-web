import styled from '@emotion/styled';

function Section(props: SectionProps) {
  return (
    <section style={{ position: 'relative' }}>
      <SectionTitle>{props.title}</SectionTitle>
      <div>{props.children}</div>
    </section>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const SectionTitle = styled.h1`
  margin: 30px 15px 20px;
  font-size: 20px;
  font-weight: bold;
`;

export default Section;
