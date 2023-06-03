import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Stack,
} from '@mui/material';
import { ChangeEvent, Dispatch, SetStateAction, useContext, useState } from 'react';
import { validateEmailFormat } from '../../utils/validation';
import AuthAPI from '../../api/AuthAPI';
import { useNavigate } from 'react-router-dom';
import { AlertAPIContext } from '../../utils/alert';

/**
 * 회원가입 영역입니다.
 */
export default function SignUpPage() {
  const navigate = useNavigate();
  const showAlert = useContext(AlertAPIContext);

  // 상태: 회원가입 입력 폼
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 상태: 회원가입 성공 모달 표시 상태
  const [modalDisplayed, setModalDisplayed] = useState(false);

  /** 회원가입 성공 모달을 닫습니다. */
  const handleModalClose = () => {
    setModalDisplayed(false);
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
    // 이름란이 비어있는 경우
    if (!username) {
      showAlert('이름을 입력해주세요.');
      return false;
    }

    // 메일란이 비어 있는 경우
    if (!email) {
      showAlert('이메일을 입력해주세요.');
      return false;
    }

    // 이메일 입력 형식이 올바르지 않은 경우
    if (!validateEmailFormat(email)) {
      showAlert('이메일 형식이 올바르지 않습니다.');
      return false;
    }

    // 비밀번호란이 비어있는 경우
    if (!password) {
      showAlert('비밀번호를 입력해주세요.');
      return false;
    }

    return true;
  };

  /** 입력 데이터를 서버에 전송합니다. */
  const submit = () => {
    // 입력 데이터가 올바르지 않은 경우, API를 호출하지 않습니다.
    if (!validateInputs()) return;

    // 회원가입 API를 호출합니다.
    AuthAPI.signUp({ username, email, password })
      .then((resp) => {
        // 회원 가입 성공 모달
        setModalDisplayed(true);
      })
      .catch((error) => {
        // 회원가입 실패에 대한 메시지를 표시합니다.
        showAlert('회원가입에 실패했습니다.');
      });
  };

  return (
    <>
      <Stack direction="column" spacing={2}>
        <FormControl>
          <InputLabel htmlFor="input-username">이름</InputLabel>
          <OutlinedInput
            type="text"
            id="input-username"
            placeholder="이름을 입력해주세요"
            label="이름"
            value={username}
            onChange={inputChangeHandler(setUsername)}
            fullWidth
          />
        </FormControl>
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
          <FormHelperText id="input-email">
            입력하신 이메일은 서비스 아이디로 사용됩니다.
          </FormHelperText>
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
          <FormHelperText id="input-password">비밀번호 형식은 ...입니다.</FormHelperText>
        </FormControl>
        <Button onClick={submit} variant="contained" fullWidth>
          회원가입
        </Button>
      </Stack>
      <Dialog open={modalDisplayed} onClose={handleModalClose}>
        <DialogContent>
          입력하신 이메일 주소로 확인 메일이 전송되었습니다. 메일에 안내된 링크에 접속하여 계정 인증
          후 로그인해주세요.
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => navigate('/sign/in')}>
            로그인으로 이동
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
