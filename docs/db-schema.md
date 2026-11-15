# DB 스키마

운동일지 앱의 MySQL 스키마입니다.

- DBMS: MySQL 8.0
- 데이터베이스: `workout_diary` (utf8mb4)
- 앱 접속 계정: `workout_app`@`localhost` (이 DB에만 권한)

## 테이블 관계

- `users` 1 : N `workout_log`
- `workout_log` 1 : N `exercise_record`
- `exercise` 1 : N `exercise_record`
- `exercise_record` 1 : N `workout_set`

## 테이블

### users — 사용자

| 컬럼 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | BIGINT | PK, AUTO_INCREMENT | |

로그인 기능을 붙일 때 컬럼을 추가합니다. 지금은 로그인이 없어서 사용자 1명을 미리 넣어두고 사용합니다.

### exercise — 운동 종류 (모든 사용자 공유)

| 컬럼 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | BIGINT | PK, AUTO_INCREMENT | |
| name | VARCHAR(50) | NOT NULL, UNIQUE | 운동 이름. 프론트가 이 이름으로 이미지를 연결 |
| category | VARCHAR(200) | | 부위 (하체, 가슴, 등, 어깨, 복근, 유산소 등) |
| default_rest_time | INT | NULL 허용 | 운동별 기본 휴식 시간(초). 비어 있으면 전체 기본 휴식을 사용 |

### workout_log — 하루 일지

| 컬럼 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | BIGINT | PK, AUTO_INCREMENT | |
| user_id | BIGINT | NOT NULL, FK → users.id, ON DELETE CASCADE | |
| log_date | DATE | NOT NULL | 운동한 날짜 |
| memo | TEXT | | |
| total_volume | DECIMAL(10,2) | DEFAULT 0 | 하루 전체 볼륨 |

- `UNIQUE (user_id, log_date)`: 사용자마다 하루 일지 1개

### exercise_record — 그날 한 운동 종목

| 컬럼 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | BIGINT | PK, AUTO_INCREMENT | |
| log_id | BIGINT | NOT NULL, FK → workout_log.id, ON DELETE CASCADE | |
| exercise_id | BIGINT | NOT NULL, FK → exercise.id | 운동 이름과 카테고리는 JOIN으로 가져옴 |
| sort_order | INT | | 일지 안에서의 순서 |
| rest_time | INT | | 휴식 시간(초). 기록 당시 적용된 값을 복사해서 저장 |
| total_volume | DECIMAL(10,2) | DEFAULT 0 | 종목 볼륨 |

### workout_set — 세트

| 컬럼 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | BIGINT | PK, AUTO_INCREMENT | |
| record_id | BIGINT | NOT NULL, FK → exercise_record.id, ON DELETE CASCADE | |
| sort_order | INT | | 종목 안에서의 순서 |
| weight | DECIMAL(6,2) | DEFAULT 0 | 무게(kg). 22.5 같은 소수 가능 |
| rep | INT | DEFAULT 0 | 횟수 |
| pre | INT | NULL, DEFAULT 0 | 체감 강도 1~9 (입력 기능은 추후) |
| checked | BOOLEAN | DEFAULT FALSE | 세트 완료 여부 |

## 삭제 규칙

- 사용자를 삭제하면 그 사용자의 일지 → 운동 기록 → 세트가 연쇄로 삭제됩니다 (CASCADE).
- 운동 종류는 기록에서 쓰이고 있으면 삭제할 수 없습니다 (`exercise_id`에는 CASCADE 없음).

## 볼륨 합계

- 볼륨 = weight × rep. 완료 체크 여부와 관계없이 모든 세트를 포함합니다.
- `workout_log.total_volume`과 `exercise_record.total_volume`은 컬럼으로 저장합니다.
- 합계는 앱이 보내지 않고, 서버가 저장할 때 받은 세트로 직접 계산해서 넣습니다.
- 백엔드 구현 시 검토할 것: 세트 저장과 두 합계 갱신을 한 트랜잭션으로 묶을지

## 휴식 시간

세트를 체크했을 때 도는 휴식 시간은 아래 순서로 정하고, 정해진 값은 `exercise_record.rest_time`에 복사해서 기록합니다.

1. 사용자가 그 운동에 직접 설정한 휴식 시간 (기기 저장소)
2. 운동별 기본 휴식 시간 (`exercise.default_rest_time`)
3. 전체 기본 휴식 시간 (기기 저장소)

## DB에 저장하지 않는 데이터

| 데이터 | 처리 위치 | 이유 |
|---|---|---|
| 전체 기본 휴식 시간, 사용자가 설정한 운동별 휴식 시간 | 기기 저장소 | 이 기기만의 사용자 설정 |
| 운동 빈도 (빈도순 정렬) | 기록을 COUNT해서 계산 | 사용자마다 다르고 기록으로 계산 가능 |
| 운동 선택 체크 (운동 선택 화면) | 화면 state | 화면에서만 쓰는 임시 상태 |

## 미결정 사항

- **`workout_set.pre` 기본값:** 지금은 `NULL DEFAULT 0`이라 "입력 안 함"이 NULL과 0 두 가지로 표현됩니다. 평균 같은 통계에서 0은 계산에 포함되고 NULL은 빠지기 때문에 결과가 달라집니다. NULL로 통일할지(`DEFAULT 0` 제거), 0으로 통일할지(`NOT NULL DEFAULT 0`) 정해야 합니다.

## 생성 스크립트

DROP 문은 데이터까지 지우므로, 실제 데이터가 쌓이기 전 개발 단계에서만 사용합니다.

이미 만들어진 DB에 `default_rest_time`을 추가할 때는 데이터를 유지하도록 `ALTER TABLE`을 씁니다.

```sql
ALTER TABLE exercise ADD COLUMN default_rest_time INT NULL;
```

```sql
USE workout_diary;

drop table if exists workout_set;
drop table if exists exercise_record;
drop table if exists workout_log;
drop table if exists exercise;
drop table if exists users;

 create table users (
	id bigint primary key auto_increment
);
create table exercise (
	id bigint primary key auto_increment,
    name varchar(50) not null unique, -- image_key은 빼고 name 가지고 프론트에서 처리
    category varchar(200), -- 문자열로 처리하기
    default_rest_time int null -- 운동별 기본 휴식(초), 비어 있으면 전체 기본 휴식
);
create table workout_log (
	id bigint primary key auto_increment,
    user_id bigint not null,
    log_date date not null,
    memo text,
    total_volume decimal(10, 2) default 0,
    
    unique (user_id, log_date),
    foreign key(user_id) references users(id) on delete cascade
);
create table exercise_record (
	id bigint primary key auto_increment,
    log_id bigint not null,
    exercise_id bigint not null,
    sort_order int,
    rest_time int,
    total_volume decimal(10, 2) default 0,
    
    foreign key(log_id) references workout_log(id) on delete cascade,
    foreign key(exercise_id) references exercise(id)
);
create table workout_set (
	id bigint primary key auto_increment,
    record_id bigint not null,
    sort_order int,
    weight decimal(6, 2) default 0,
    rep int default 0,
    pre int null default 0 ,
    checked boolean default false,
    
    foreign key(record_id) references exercise_record(id) on delete cascade
);
```
