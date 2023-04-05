import { Button, FormControl, InputLabel, OutlinedInput, Stack } from '@mui/material';

/**
 * 로그인 영역입니다.
 */
function Signin() {
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
            fullWidth
          />
        </FormControl>
        <Button variant="contained" fullWidth>
          로그인
        </Button>
      </Stack>
    </>
  );
}

export default Signin;
