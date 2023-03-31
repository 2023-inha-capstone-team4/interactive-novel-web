import { ChangeEvent, useState } from 'react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

/**
 * 검색 바 요소입니다.
 */
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <StyledSearchBar>
      <SearchField
        type="search"
        value={searchTerm}
        onChange={handleTextFieldChange}
        placeholder="작품명, 작가, 태그 검색"
      />
      <SearchButton variant="contained">검색</SearchButton>
    </StyledSearchBar>
  );
}

/**
 * 검색 바 영역의 스타일입니다.
 */
const StyledSearchBar = styled.div`
  height: 50px;
  padding: 0 15px;

  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
`;

/**
 * 검색 텍스트 필드의 스타일입니다.
 */
const SearchField = styled.input`
  height: 30px;
  flex-grow: 1;
  border-radius: 8px;
  border: none;
  background-color: #eeeeee;
  font-size: 14px;
  padding: 0 10px;
`;

/**
 * 검색 버튼의 스타일입니다.
 */
const SearchButton = styled(Button)`
  width: 50px;
  height: 30px;
  margin-left: 5px;
  border-radius: 8px;
  background-color: #ff6868;

  &:hover {
    background-color: #ff6868;
  }
`;

export default SearchBar;
