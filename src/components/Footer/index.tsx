import styled from '@emotion/styled';

/**
 * 페이지의 Footer 요소입니다.
 */
function Footer() {
  return (
    <StyledFooter>
      <p>Interactive Novel</p>
      <a href="mailto:vivalavida@inha.edu">문의</a>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  margin-top: 50px;
  text-align: center;

  & > * {
    font-size: 10px;
    color: #424242;
  }
`;

export default Footer;
