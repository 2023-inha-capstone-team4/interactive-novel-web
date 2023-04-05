import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';

/**
 * 회원가입 영역입니다.
 */
function Signup() {
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
            fullWidth
          />
          <FormHelperText id="input-password">비밀번호 형식은 ...입니다.</FormHelperText>
        </FormControl>
        <Button variant="contained" fullWidth>
          회원가입
        </Button>
      </Stack>
    </>
  );
}

export default Signup;
