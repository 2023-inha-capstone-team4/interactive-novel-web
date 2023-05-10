import { Button, FormControl, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import AuthAPI from '../../api/AuthAPI';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import { AuthToken } from '../../types/Auth';

/**
 * 로그인 영역입니다.
 */
function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // input 요소의 변경 이벤트를 처리하는 핸들러 함수를 반환합니다.
  const inputChangeHandler = (setValue: Dispatch<SetStateAction<any>>) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };
  };

  // 입력 데이터를 서버에 전송합니다.
  const submit = () => {
    AuthAPI.signIn({ email, password }).then((resp) => {
      const PREFIX = '로그인에 성공하였습니다.';

      // 응답 바디 안에 포함된 JSON 문자열을 통해 AuthToken 객체를 생성합니다.
      const body = resp.data;
      const tokenRawStr = body.replace(PREFIX, '');
      const authToken: AuthToken = JSON.parse(tokenRawStr);

      // 토큰을 로컬 스토리지에 저장합니다.
      localStorage.setItem('access-token', authToken.accessToken);
      localStorage.setItem('refresh-token', authToken.refreshToken);
    });
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
      </Stack>
    </>
  );
}

export default Signin;
