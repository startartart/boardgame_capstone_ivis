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