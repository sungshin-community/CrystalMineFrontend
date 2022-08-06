## 검색


### `SearchInput `
**상단 헤더에 위치한 검색어를 입력하는 input 컴포넌트**

검색어를 입력해야 하는 페이지에 있으며 첫 렌더링 시 `navigation.setOptions`를 통해 헤더에 위치함

`setSearchWord`를 통해 input에 입력한 value 값을 받아옴

`startSearching` 함수는 최근 검색어의 중복 검사, 최근 검색어의 최대 개수(5개)를 유지시켜줌 
검색 버튼을 클릭한 경우 실행되며 `SearchResult`에서 실행

`components` 폴더 안에 있음

****

### `BoardSearch`

**검색 버튼 누른 후 [최근 검색어]가 나오는 화면**

`route.params`를 받아오는 경우는 특정 게시판에서 검색하는 경우로 해당 게시판 이름과 고유 아이디 값을 받아옴 >> `SearchResultInBoard` 컴포넌트로 이동

그 외는 전체 검색인 경우로 `SearchResult` 컴포넌트로 이동

****

### `SearchResult`

**홈(`HomeFragment`), 게시판(`BoardFragment`)에서 검색했을 때 검색 결과로 나오는 [`게시글`, `게시판 이름`, `태그`] 탭을 모은 화면**

게시글, 게시판 이름, 태그 컴포넌트는 하단 `<Tab.Screen>`의 `children` 프로퍼티를 통해 결과를 띄움

screens > board 폴더 안에 위치

****

### `SearchResultInBoard`

**특정 게시판(`PostListScreen`)에서 검색했을 때 검색 결과로 나오는 [`게시글`, `태그`] 탭을 모은 화면**

`BoardSearch`에서 게시판 이름(`boardName`)과 게시판 고유 아이디(`boardId`)를 받아옴
> `boardName은` input에 placeholder로 표기하기 위함

> `boardId는` 뒤로가기를 눌렀을 경우 해당 게시판으로 이동하기 위함

게시글, 태그 컴포넌트는 하단 `<Tab.Screen>`의 `children` 프로퍼티를 통해 결과를 띄움

screens > post 폴더 안에 위치

****

### `PostSearchResult`

**게시글 검색 결과의 탭 컵포넌트, 검색어를 받아와 렌더링될 때 검색 결과를 받음**

`isInBoard`가 존재하는 경우에는 특정 게시판 안에서 검색하는 경우로 전체 검색과 특정 게시판 내 검색 api 함수 호출을 구분하기 위함

****

### `BoardSearchResult`

**게시판 검색 결과의 탭 컵포넌트, 검색어를 받아와 렌더링될 때 검색 결과를 받으며 전체 검색인 경우에만 존재하는 탭**