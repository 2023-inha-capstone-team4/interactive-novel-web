import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Stack,
} from '@mui/material';
import { ChangeEvent, SyntheticEvent, useState, Dispatch, SetStateAction } from 'react';
import AuthAPI from '../../api/AuthAPI';
import { AuthToken } from '../../types/Auth';
import { validateEmailFormat } from '../../utils/validation';

/**
 * 로그인 영역입니다.
 */
function Signin() {
  // 상태: 로그인 폼 데이터
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 상태: 로그인 에러 메시지의 표시 상태
  const [alertDisplayed, setAlertDisplayed] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  /** 주어진 에러 메시지를 표시합니다. */
  const showAlertMsg = (msg: string) => {
    setAlertMsg(msg);
    setAlertDisplayed(true);
  };

  /** input 요소의 변경 이벤트를 처리하는 핸들러 함수를 반환합니다. */
  const inputChangeHandler = (setValue: Dispatch<SetStateAction<any>>) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };
  };

  /**
   * 입력한 폼 데이터들이 올바른지 검사하고,
   * 올바르지 않은 경우 에러 메시지를 출력합니다.
   */
  const validateInputs = (): boolean => {
    // 메일란이 비어 있는 경우
    if (!email) {
      showAlertMsg('이메일을 입력해주세요.');
      return false;
    }

    // 이메일 입력 형식이 올바르지 않은 경우
    if (!validateEmailFormat(email)) {
      showAlertMsg('이메일 형식이 올바르지 않습니다.');
      return false;
    }

    // 비밀번호란이 비어있는 경우
    if (!password) {
      showAlertMsg('비밀번호를 입력해주세요.');
      return false;
    }

    return true;
  };

  /** 입력 데이터를 서버에 전송합니다. */
  const submit = () => {
    // 입력 데이터가 올바르지 않은 경우, API를 호출하지 않습니다.
    if (!validateInputs()) return;

    // 로그인 API를 호출합니다.
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
        showAlertMsg('로그인에 실패했습니다. 이메일과 비밀번호를 다시 확인해주세요.');
      });
  };

  /** 로그인 실패 메시지를 닫기 위한 핸들러 함수입니다. */
  const handleAlertClose = (event: SyntheticEvent | Event, reason: string) => {
    // 화면의 다른 영역을 클릭하는 이벤트에 대해서는 실패 메시지를 닫지 않습니다.
    if (reason === 'clickaway') {
      return;
    }

    setAlertDisplayed(false);
    setAlertMsg('');
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
          <Alert severity="error">{alertMsg}</Alert>
        </Snackbar>
      </Stack>
    </>
  );
}

export default Signin;
