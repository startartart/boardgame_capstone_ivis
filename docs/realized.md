# Realized

- 화살표 함수 에러
- 에러 내용 : `Array.prototype.map() expects a value to be returned at the end of arrow function.`
- 처리 내용 : 화살표 함수를 통해 `return` 되는 값이 존재하지 않는 경우가 있다. `else`인 부분에 `null`로 처리하여 경고문을 없앴다. 
```jsx
<GameModeDescription theme={props.theme}>
    {DescriptionText.map((text, index) => {
        if (index === selectedGameMode) {
            return (
                <div key={index}>
                    <img src={text.path_link} alt={text.name}/>
                    <p>{text.name}</p>
                    <p>{text.description}</p>
                </div>
            );
        } else {
            return null;
        }
    })}
</GameModeDescription>
```

- styled-componens string 경고
- 경고 내용 : 
```
    react_devtools_backend.js:2655 Warning: Received `false` for a non-boolean attribute `loading`.
    If you want to write it to the DOM, pass a string instead: loading="false" or loading={value.toString()}.
    If you used to conditionally omit it with loading={condition && value}, pass loading={condition ? value : undefined} instead.
```
- 처리 내용 : 경고 내용에 따라 loading 특성값을 문자열로 처리했다. `toString()`
```jsx
    ${props => props.loading === "true" && `filter: blur(5px);`}

    // ... 

    <MainContainer loading={user.isReady.toString()}>

    // ...
```

- 모바일 디바이스의 웹앱 환경에서 JS Media API `getUserMedia`를 로컬환경에서 호출하기 위해서 해야할 일
- 처리 내용
    1. 로컬환경에서는 당연히 된다.
    2. 그런데 모바일환경(내 휴대폰)은 로컬이 아니기때문에(ip타고 들어가기 때문) https 즉, SSL 인증서를 받아야한다.
    3. chrome 리모트 디버깅 툴을 사용하여 데스크탑 환경에서의 제어를 모바일과 연동시킨다. (8080port -> 3000으로 원격제어)
    4. 이제 모바일 디바이스에서 카메라를 제어할 수 있다.
- 참고 자료
    - [jsMediaAPI 문서](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#browser_compatibility)
    - [스택오버플로 ssl관련](https://stackoverflow.com/questions/51862313/navigator-getusermedia-not-working-on-android-chrome)
    - [디버깅환경 구축](https://uxdev.org/entry/%EC%95%88%EB%93%9C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EA%B8%B0%EA%B8%B0%EB%A1%9C-%EB%AA%A8%EB%B0%94%EC%9D%BC%EC%9B%B9%ED%81%AC%EB%A1%AC-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EB%AA%A8%EB%93%9CWeb-Inspector-%EB%94%94%EB%B2%84%EA%B9%85-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0)
    