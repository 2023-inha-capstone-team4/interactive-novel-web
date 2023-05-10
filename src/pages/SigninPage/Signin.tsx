import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Stack,
} from '@mui/material';
import { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react';
import AuthAPI from '../../api/AuthAPI';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import { AuthToken } from '../../types/Auth';

/**
 * 로그인 영역입니다.
 */
function Signin() {
  // 상태: 로그인 폼 데이터
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 상태: 로그인 에러 메시지의 표시 상태
  const [alertDisplayed, setAlertDisplayed] = useState(false);

  // input 요소의 변경 이벤트를 처리하는 핸들러 함수를 반환합니다.
  const inputChangeHandler = (setValue: Dispatch<SetStateAction<any>>) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };
  };

  // 입력 데이터를 서버에 전송합니다.
  const submit = () => {
    AuthAPI.signIn({ email, password })
      .then((resp) => {
        const PREFIX = '로그인에 성공하였습니다.';

        // 응답 바디 안에 포함된 JSON 문자열을 통해 AuthToken 객체를 생성합니다.
        const body = resp.data;
        const tokenRawStr = body.replace(PREFIX, '');
        const authToken: AuthToken = JSON.parse(tokenRawStr);

        // 토큰을 로컬 스토리지에 저장합니다.
        localStorage.setItem('access-token', authToken.accessToken);
        localStorage.setItem('refresh-token', authToken.refreshToken);
      })
      .catch((error) => {
        // 로그인 실패에 대한 메시지를 표시합니다.
        setAlertDisplayed(true);
      });
  };

  // 로그인 실패 메시지를 닫기 위한 핸들러 함수입니다.
  const handleAlertClose = (event: SyntheticEvent | Event, reason: string) => {
    // 화면의 다른 영역을 클릭하는 이벤트에 대해서는 실패 메시지를 닫지 않습니다.
    if (reason === 'clickaway') {
      return;
    }

    setAlertDisplayed(false);
  };

  return (
    <>
      <Stack direction="column" spacing={2}>
        <FormControl>
          <InputLabel htmlFor="input-email">이메일</InputLabel>
          <OutlinedInput
            type="email"
            id="input-email"
            placeholder="이메일을 입력해주세요"
            label="이메일"
            value={email}
            onChange={inputChangeHandler(setEmail)}
            fullWidth
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="input-password">비밀번호</InputLabel>
          <OutlinedInput
            type="password"
            id="input-password"
            placeholder="비밀번호를 입력해주세요"
            label="비밀번호"
            value={password}
            onChange={inputChangeHandler(setPassword)}
            fullWidth
          />
        </FormControl>
        <Button onClick={submit} variant="contained" fullWidth>
          로그인
        </Button>
        <Snackbar open={alertDisplayed} autoHideDuration={5000} onClose={handleAlertClose}>
          <Alert severity="error">
            로그인에 실패했습니다. 이메일과 비밀번호를 다시 확인해주세요.
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}

export default Signin;
