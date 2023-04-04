# Event Listener

1. Main -> Room
    - 서버로 소켓통신 요청 : 일정 인원이 모이면 서버로부터 request 받음
    - 같은 socket 객체에서 다른 플레이어와 룸네임을 가진 Room으로 이동

2. Room -> Main
    - 플레이어 중 하나가 서버와의 접속이 끊겼을 때
    - 게임이 끝났을 때
