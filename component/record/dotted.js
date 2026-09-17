import React, { useState } from 'react';
import { View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

export default function DottedBorderContainer({
    children,
    color = '#007AFF', // 기본 점선 색상
    strokeWidth = 2,   // 점선 두께
    borderRadius = 8,  // 모서리 라운딩
    style,
}) {
    const [layout, setLayout] = useState({ width: 0, height: 0 });

    // 컴포넌트의 실제 가로/세로 크기를 동적으로 측정
    const onLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        setLayout({ width, height });
    };

    return (
        <View onLayout={onLayout} style={[{ position: 'relative' }, style]}>
            {/* 테두리 안에 들어갈 실제 콘텐츠 */}
            {children}

            {/* 테두리를 그리는 SVG 레이어 (콘텐츠 위에 절대 좌표로 덮음) */}
            {layout.width > 0 && (
                <Svg
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: layout.width,
                        height: layout.height,
                    }}
                    pointerEvents="none" // 클릭/터치 이벤트가 뒤에 있는 콘텐츠에 그대로 전달되도록 설정
                >
                    <Rect
                        x={strokeWidth / 2}
                        y={strokeWidth / 2}
                        width={layout.width - strokeWidth}
                        height={layout.height - strokeWidth}
                        rx={borderRadius}
                        ry={borderRadius}
                        fill="none"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        // strokeDasharray: [점의 길이, 공백의 길이]
                        // strokeLinecap="round"와 조합되어 동그란 점선이 만들어집니다.
                        strokeDasharray={`${strokeWidth}, ${strokeWidth * 2}`}
                        strokeLinecap="round"
                    />
                </Svg>
            )}
        </View>
    );
}
