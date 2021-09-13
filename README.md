# CrystalMineFrontend

## 컴포넌트별 사용법

<table>
  <tr>
    <td>컴포넌트명</td>
    <td>컴포넌트 설명</td>
    <td>속성</td>
    <td>설명</td>
    <td>import해야 할 파일</td>
  </tr>
  <tr>
    <td rowspan=2>TwoLineTitle</td>
    <td rowspan=2>두줄짜리 큰 텍스트</td>
    <td>firstLineText</td>
    <td>첫번째줄에 올 텍스트</td>
    <td rowspan=2>/src/components/Top</td>
  </tr>
    <td>TwoLineTitle</td>
    <td>두번째줄에 올 텍스트</td>
  </tr>
  <tr>
    <td rowspan=2>FocusInput</td>
    <td rowspan=2>인풋창 탭 시(보라)</td>
    <td>MiddleFocusInput</td>
    <td>작은 인풋창</td>
    <td rowspan=6>/src/components/Input</td>
  </tr>
    <td>BigFocusInput</td>
    <td>큰 인풋창</td>
  </tr>
  <tr>
    <td rowspan=2>ErrorInput</td>
    <td rowspan=2>인풋창 오류(빨강)</td>
    <td>MiddleErrorInput</td>
    <td>작은 인풋창</td>
  </tr>
    <td>BigErrorInput</td>
    <td>큰 인풋창</td>
  </tr>
  <tr>
    <td rowspan=2>InactiveInput</td>
    <td rowspan=2>인풋창 비활성화(회색)</td>
    <td>MiddleInactiveInput</td>
    <td>작은 인풋창</td>
  </tr>
    <td>BigInactiveInput</td>
    <td>큰 인풋창</td>
  </tr>
</table>

### 세부 사용법
- Input Component
```javascript
<MiddleFocusInput placeholder="플레이스홀더" title="도움말은 여기에 표시됩니다." />
<MiddleErrorInput placeholder="플레이스홀더" title="도움말은 여기에 표시됩니다." />
<MiddleInactiveInput placeholder="플레이스홀더" title="도움말은 여기에 표시됩니다." />
<BigFocusInput placeholder="플레이스홀더" title="도움말은 여기에 표시됩니다." />
<BigErrorInput placeholder="플레이스홀더" title="도움말은 여기에 표시됩니다." />
<BigInactiveInput placeholder="플레이스홀더" title="도움말은 여기에 표시됩니다." />
```
<img width="307" alt="스크린샷 2021-09-13 오후 5 21 55" src="https://user-images.githubusercontent.com/73841260/133049245-1c2c3ace-96cc-4b2d-90af-cc8524f86a85.png">
