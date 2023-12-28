import * as React from "react"
// import Svg, { G, Path } from "react-native-svg"
import { Animated, Easing, View } from "react-native";
import { WithLocalSvg } from "react-native-svg";

function Spinner(props) {
    const animationValue = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      Animated.loop(
        Animated.timing(animationValue, {
          toValue: 1, // 애니매이션의 100%일때의 값을 추출
          duration: 2000, // 애니메이션이 진행되는 시간
          useNativeDriver: true,
          easing: Easing.linear
        }),
      ).start();
    }, []);

    const RotateData = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View style={{transform: [{ rotate: RotateData }],width: 100, height: 100}} >
          <WithLocalSvg
              width={100}
              height={100}
              fill={"#000000"}
              asset={require("../animation/Spinner.svg")}
          />
          {/* <View style={{width: 100, height: 100, backgroundColor: "red"}} >

          </View> */}
            {/* <Svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    margin: "auto",
                    background: "#f1f2f3"
                }}
                width="200px"
                height="200px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
                display="flex"
                shapeRendering="auto"
                {...props}
                >
                <G transform="translate(50 50)">
                    <Path
                    d="M30.508-5.5h11v11h-11a31 31 0 01-5.046 12.183l7.778 7.779-7.778 7.778-7.779-7.778A31 31 0 015.5 30.508v11h-11v-11a31 31 0 01-12.183-5.046l-7.779 7.778-7.778-7.778 7.778-7.779A31 31 0 01-30.508 5.5h-11v-11h11a31 31 0 015.046-12.183l-7.778-7.779 7.778-7.778 7.779 7.778A31 31 0 01-5.5-30.508v-11h11v11a31 31 0 0112.183 5.046l7.779-7.778 7.778 7.778-7.778 7.779A31 31 0 0130.508-5.5M0-20a20 20 0 100 40 20 20 0 100-40"
                    fill="#e6af0b"
                    />
                </G>
            </Svg> */}
        </Animated.View>
  )
}

export default Spinner;
