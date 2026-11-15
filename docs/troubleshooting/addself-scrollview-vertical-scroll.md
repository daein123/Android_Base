# AddSelf 화면 운동 목록 세로 스크롤이 안 되는 문제

- 날짜: 2026-11-15
- 위치: `component/setworkout/addself.js`
- 환경: Expo SDK 57 / React Native 0.86 / react-native-web

## 1. 증상

운동 선택 화면(AddSelf)에서 운동 목록이 화면보다 길어도 세로 스크롤이 되지 않았다.
화면 아래쪽 운동 항목은 잘려서 보이지 않았다.

## 2. 원인

목록 `ScrollView`의 `contentContainerStyle`에 `flex: 1`과 `overflow: 'hidden'`이 들어가 있었다.

```js
<ScrollView contentContainerStyle={styles.exerciseContainer} showsVerticalScrollIndicator={false}>

exerciseContainer: {
    flex: 1,             // 내용물 높이를 바깥 틀 높이로 고정
    overflow: 'hidden'   // 틀 밖으로 넘친 항목을 잘라냄
},
```

이 부분은 원래 `<View style={styles.exerciseContainer}>`였다.
일반 View에서는 "남은 공간을 채우고, 넘치면 자른다"는 뜻이라 맞는 스타일이었다.
그런데 `ScrollView`로 바꾸면서 같은 스타일을 `contentContainerStyle`에 그대로 옮겨 써서 문제가 생겼다.

## 3. 해결

`contentContainerStyle`에서 `flex: 1`과 `overflow: 'hidden'`을 지웠다.

```js
exerciseContainer: {
    paddingBottom: 10,
},
```

부모 쪽(mainContainer → SafeAreaView → AddSelf container)은 모두 `flex: 1`이라 높이가 정해져 있다.
`ScrollView`는 기본값으로 남은 공간을 채우므로 바깥 틀(`style`)은 따로 손대지 않았다.

---

## 4. 개념 정리

### 4-1. ScrollView는 두 겹이다

```
┌─ 바깥 틀 (style) ──────────────┐   ← 화면에 보이는 창. 높이가 정해져 있음
│ ┌─ 내용물 (contentContainerStyle) ─┐
│ │ 운동 1                       │
│ │ 운동 2                       │
│ │ 운동 3                       │
└─│──────────────────────────────│─┘
  │ 운동 4   ← 창 밖, 스크롤해야 보임
  │ 운동 5                       │
  └──────────────────────────────┘
```

**스크롤 거리 = 내용물 높이 − 바깥 틀 높이**

이 값이 0 이하면 스크롤이 생기지 않는다. 스크롤 문제는 대부분 둘 중 하나다.

- 내용물이 틀 크기로 강제로 눌렸다. (이번 경우)
- 틀이 내용물만큼 늘어났다.

### 4-2. `style`과 `contentContainerStyle`에 넣을 것

| | `style` (바깥 틀) | `contentContainerStyle` (내용물) |
|---|---|---|
| 역할 | 창의 크기·위치 | 창 안에서 항목 배치 |
| 넣을 것 | `height`, `flexGrow: 0`, `margin`, `backgroundColor`, `borderWidth` | `padding`, `gap`, `alignItems`, `justifyContent`, `flexGrow: 1` |
| 넣으면 안 되는 것 | (특별히 없음) | **`flex: 1`**, **고정 `height`**, **`overflow: 'hidden'`** |

**틀은 크기, 내용물은 배치.** 내용물의 높이는 내용이 정하게 둔다.

### 4-3. `flex: 1`, `flexGrow: 1`, `flexGrow: 0`

| 내용물에 준 값 | 크기 기준 | 내용이 짧을 때 | 내용이 길 때 | 스크롤 |
|---|---|---|---|---|
| (없음) | 내용 | 내용 크기만큼 | 내용 크기만큼 | ✅ |
| `flex: 1` | **부모(틀)** | 틀 크기 | **틀 크기로 고정** | ❌ |
| `flexGrow: 1` | 내용 + 남는 공간 | 틀 크기까지 늘어남 | 내용 크기만큼 | ✅ |

- **`flex: 1`**: "부모가 준 공간에 정확히 맞춰라." 일반 View로 화면을 채울 때 쓴다.
- **`flexGrow: 1`**: "최소한 내용 크기는 지키고, 공간이 남으면 늘어나라." 목록이 비었을 때 안내 문구를 가운데에 두려면 내용물에 이 값을 쓴다.
- **`flexGrow: 0`**: "늘어나지 마라." RN의 ScrollView는 기본값이 `flexGrow: 1`이라 남은 공간을 다 차지하려 한다.
  그래서 가로 탭 ScrollView의 `style`에 `flexGrow: 0`을 줘서 세로 공간을 차지하지 않게 한다. (AddSelf의 `tabScroll`)

### 4-4. `overflow: 'hidden'`

틀 밖으로 나간 부분을 잘라내는 옵션이다.
ScrollView는 이미 자기가 잘라서 보여주므로, 내용물에 줄 필요가 없다. 오히려 넘친 항목을 숨겨서 스크롤을 막는다.
`borderRadius`가 있는 카드 안의 이미지 모서리를 자를 때처럼 일반 View에서 쓰는 옵션이다.

### 4-5. 플랫폼 차이

| | 안드로이드 | 웹 (react-native-web) |
|---|---|---|
| 스크롤 범위 계산 | 내용물 판의 높이 기준 | 판 밖으로 넘친 내용도 포함 |
| 막는 원인 | `flex: 1` 하나로도 막힘 | `overflow: 'hidden'`이 넘친 부분을 잘라서 막힘 |

같은 코드라도 플랫폼마다 결정적인 원인이 다르다. 그래서 두 값을 모두 지워야 하고, 두 플랫폼 모두에서 확인해야 한다.

---

## 5. 스크롤이 안 될 때 확인 순서

1. **내용물 스타일**: `contentContainerStyle`에 `flex: 1`, 고정 `height`, `overflow: 'hidden'`이 있는가? (이번 원인)
2. **부모 높이**: 화면 최상단부터 ScrollView까지 `flex: 1`이 끊긴 곳이 있는가? 부모 높이가 안 정해지면 틀이 내용만큼 늘어나서 스크롤할 필요가 없어진다.
3. **중첩**: 세로 ScrollView 안에 또 세로 ScrollView가 있는가? 바깥이 스크롤을 가져간다.
4. **가로 ScrollView**: `style`에 `flexGrow: 0`이 없어서 아래 목록의 공간을 차지하고 있지 않은가?

## 6. AddSelf 레이아웃 구조

```
mainContainer      flex: 1        ✅ 높이 확정
└ SafeAreaView     flex: 1        ✅
  └ AddSelf        flex: 1        ✅
    ├ 검색바        height: 40
    ├ 탭 ScrollView style flexGrow: 0  ✅ 세로 공간 안 먹음
    ├ 정렬          height: 50
    ├ 목록 ScrollView (기본 flexGrow: 1 → 남은 공간 = 틀)
    │  └ 내용물     flex: 1 + overflow: hidden  ❌ ← 원인
    └ 하단 버튼     height: 50
```

## 7. 참고

- 운동 목록이 수백 개로 늘어나면 `ScrollView` 대신 `FlatList`를 쓴다.
  `ScrollView`는 항목을 한꺼번에 다 그리고, `FlatList`는 화면에 보이는 것만 그린다.
- 더 공부할 것: Flexbox의 `flex-grow` / `flex-shrink` / `flex-basis`. `flex: 1`은 이 세 값을 한꺼번에 정하는 축약형이다.
