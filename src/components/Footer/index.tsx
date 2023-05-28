import styled from '@emotion/styled';
import { signOut } from '../../services/auth-service';
import useUserInfo from '../../hooks/useUserInfo';

/**
 * 페이지의 Footer 요소입니다.
 */
function Footer() {
  const userInfo = useUserInfo();

  /** 로그아웃 버튼 클릭에 대한 핸들러 함수입니다. */
  const handleLogoutClick = () => {
    signOut();
  };

  return (
    <StyledFooter>
      <p>Interactive Novels</p>
      <div className="buttons">
        <a href="mailto:vivalavida@inha.edu">문의</a>
        {userInfo && (
          <p className="button" onClick={handleLogoutClick}>
            로그아웃
          </p>
        )}
      </div>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  margin-top: 50px;
  padding-bottom: 50px;
  text-align: center;

  & > * {
    font-size: 10px;
    color: #424242;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .button {
      cursor: pointer;
    }

    & > * {
      margin: 0 5px;
    }
  }
`;

export default Footer;
