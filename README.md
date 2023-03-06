## 💻 프로젝트 주제

- 대용량 트래픽, 데이터를 고려한 커머스 플랫폼 설계 + 주문, 포인트 적립/사용, 부분 환불 처리 로직 고도화
<img width="1376" alt="스크린샷 2022-09-23 오후 4 46 53" src="https://user-images.githubusercontent.com/30984241/223147219-d1ee54ae-e6db-46d5-b068-22a6dfdf9e5e.png">
<img width="1119" alt="스크린샷 2022-09-23 오후 4 58 46" src="https://user-images.githubusercontent.com/30984241/223147263-2e46895a-dc95-479d-bc2c-143c8e98212f.png">

## 🛠 기술 스택
<img width="1136" alt="스크린샷 2022-09-23 오후 4 47 40" src="https://user-images.githubusercontent.com/30984241/223147310-cc01d1f5-5d6f-4835-84a5-256d6e33c970.png">


## 💡 주요 내용

### 적립금 부분 환불 기능 고도화 → 이슈 개선 방안 제시

- 아임웹 프로덕션 내 고객이 부분 환불 요청 시 적립금을 부분 반환 처리에 이슈 발견
- 데이터베이스 설계에 문제를 발견하고 해당 부분을 다대다 매핑 테이블 활용하여 재설계 및 트랜젝션 처리
    
<img width="1135" alt="스크린샷 2022-09-23 오후 4 47 56" src="https://user-images.githubusercontent.com/30984241/223147427-e1b72b2f-5f63-46e3-9fe8-b4c11d79330d.png">

<img width="1127" alt="스크린샷 2022-09-23 오후 5 00 31" src="https://user-images.githubusercontent.com/30984241/223147633-d6288614-0cb0-4912-a842-6e9b08b85302.png">


### 데이터베이스 커넥션 제어 → 리소스 활용 효율 향상

- ORM 사용 시 발생하는 단점(쿼리 제어, 성능 저하 등)mysql 드라이버를 활용
- 커넥션 풀 사용, 커넥션 개수를 제한하여 리소스 고갈 방지

<img width="1134" alt="스크린샷 2022-09-23 오후 4 48 30" src="https://user-images.githubusercontent.com/30984241/223147819-64741349-b24e-4a81-b5d2-6d244e9c012c.png">
<img width="1130" alt="스크린샷 2022-09-23 오후 5 00 59" src="https://user-images.githubusercontent.com/30984241/223148044-4fd3de89-a9b6-4c3b-ae53-b88508ea8213.png">

### 데이터베이스 이중화(읽기&쓰기 전용 분리) → DB 접근 부하 분산

- Master & Slave 구조를 사용, 쓰기 전용 DB(Master)와 읽기 전용 DB(Slave)를 별도로 두고, 용도에 맞게 사용함으로써 DB 접근 부하를 분산
    
<img width="1137" alt="스크린샷 2022-09-23 오후 4 48 49" src="https://user-images.githubusercontent.com/30984241/223148094-9253ffa6-5989-48db-b3cf-224d2e93aec1.png">


### 레디스 Bull Queue → DB 접근 병목 방지

- Redis 위에 npm Bull로 메세지 큐를 구현하고, 주문 로직을 비동기 프로세스 처리
- DB에 동시 트래픽이 몰리지 않도록 대기열로 DB접근 쿼리를 제어
<img width="1132" alt="스크린샷 2022-09-23 오후 4 49 23" src="https://user-images.githubusercontent.com/30984241/223148327-44df3155-2f14-44c1-ac86-b66d7f32a194.png">
<img width="1134" alt="스크린샷 2022-09-23 오후 4 49 06" src="https://user-images.githubusercontent.com/30984241/223148350-38510992-676b-4626-9e4e-8c8756f32d09.png">


### 테스트 코드 작성

- jest를 이용하여 서비스, 컨트롤러 메서드 유닛 테스트 진행
- mock 함수 및 mock data 활용을 통해 테스트 로직의 의존성 분리
<img width="1130" alt="스크린샷 2022-09-23 오후 4 50 28" src="https://user-images.githubusercontent.com/30984241/223148456-fb18ec09-effb-4a6e-a9eb-23faeb9fe0c6.png">
<img width="1132" alt="스크린샷 2022-09-23 오후 4 50 41" src="https://user-images.githubusercontent.com/30984241/223148519-78d93e2b-eb0a-418b-9219-f93543f3709a.png">


