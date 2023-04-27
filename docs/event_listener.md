# Event Listener

1. Main -> Room
    - 프론트 -> 백 (`emit`)
        - `init` : 소켓 서버 통신 확인 완료
        - `ready` : 준비 완료
    - 백 -> 프론트 (`on`)
        - `set_id` : 소켓 아이디 설정 저장 및 매칭 시작
        - `set_room` : 매칭 완료 및 개인 카메라 설정
        - `ready` : 모든 플레이어 준비 완료 및 게임 시작

2. Camera
    - 프론트 -> 백 (`emit`)
        - `emotion` : 카메라로 인식된 이모지 전달
    - 백 -> 프론트 (`on`)
        - `emotion` : 프론트한테 받은 이모지 전달

3. JokerGameRoom
    - 프론트 -> 백 (`emit`)
        - `peek` : 카드 집기
        - `select` : 카드 최종 선택
        - `time-out` : 제한시간 초과
    - 백 -> 프론트 (`on`)
        - `role` : 자신 턴 확인
        - `peek` : 집은 카드 확인
        - `select` : 최종 카드 확인
        - `deck` : 턴 종료에 따른 덱 정리
        - `result` : 게임결과 확인
        - `time-out` : 제한시간 초과 확인
