import styled from '@emotion/styled';
import { Box, Divider, Stack } from '@mui/material';
import PlainStyleLink from '../../components/PlainStyleLink';

const googleLogo = require('../../assets/img/google-logo.png');
const naverLogo = require('../../assets/img/naver-logo.png');

function SocialLogin() {
  return (
    <>
      <Divider variant="middle" />
      <Title>다른 계정으로 로그인</Title>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <SocialLoginButton icon={googleLogo} title="Google" href="#" />
        <SocialLoginButton icon={naverLogo} title="네이버" href="#" />
      </Stack>
    </>
  );
}

const Title = styled.p`
  margin: 20px 0;
  font-size: 12px;
  text-align: center;
  color: #777777;
`;

function SocialLoginButton(props: SocialLoginButtonProps) {
  return (
    <PlainStyleLink to={props.href}>
      <ButtonContainer>
        <img src={props.icon} alt="icon" />
        <p>{props.title}</p>
      </ButtonContainer>
    </PlainStyleLink>
  );
}

interface SocialLoginButtonProps {
  icon: string;
  title: string;
  href: string;
}

const ButtonContainer = styled.div`
  width: 60px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  & > img {
    width: inherit;
  }

  & > p {
    margin: 5px 0;
    font-size: 12px;
    color: #777777;
  }
`;

export default SocialLogin;
