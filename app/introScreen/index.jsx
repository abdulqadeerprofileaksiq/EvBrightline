import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  useWindowDimensions,
  Animated,
  FlatList,
  Image,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { useRouter } from "expo-router";
import COLOR from "../../constants/colors";
import { FONT } from "../../constants/font";
import HeadingText from "../../components/global/HeadingText";
import RegularText from "../../components/global/RegularText";

// Use PNG images
const MapImage = require("../../assets/images/intro/map.png");
const ElectricCarImage = require("../../assets/images/intro/car_electric.png");

const SLIDES = [
  {
    id: "1",
    image: MapImage,
    title: "Find and locate charging stations near you",
    description: "Quickly find nearby charging stations and recharge whenever you need.",
  },
  {
    id: "2",
    image: ElectricCarImage,
    title: "Sit back, relax, and let\nyour EV charge.",
    description: "Pull up, plug in, and power up—charging\nmade effortless.",
  },
];

const IntroScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: currentIndex === 0 ? 0.5 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentIndex]);

  const handleDone = async () => {
    router.replace("/registerScreen"); 
  };

  const handleNextSlide = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleDone();
    }
  };

  const handleSkipIntro = () => handleDone();

  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { width: screenWidth }]}>
      <Image
        source={item.image}
        style={[
          styles.slideImage,
          { width: screenWidth, height: screenHeight * 0.5 }, // Increased to 50% height
        ]}
        resizeMode="contain"
      />
    </View>
  );

  const renderProgressIndicator = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[
            styles.progressBarFill,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: ['0%', '50%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );

  const renderTextContent = () => {
    const currentSlide = SLIDES[currentIndex];
    return (
      <View style={styles.textContainer}>
        <HeadingText 
          text={currentSlide.title} 
          textStyles={styles.customHeadingStyle}
        />
        <RegularText 
          text={currentSlide.description} 
          textStyles={styles.customRegularStyle}
        />
      </View>
    );
  };

  return (
      <View style={styles.screenContainer}>
        {/* Image slider - 60% of screen */}
        <View style={styles.imagesContainer}>
          <FlatList
            ref={flatListRef}
            data={SLIDES}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            onViewableItemsChanged={handleViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={screenWidth}
            getItemLayout={(_, index) => ({
              length: screenWidth,
              offset: screenWidth * index,
              index,
            })}
          />
        </View>

        {/* Content container - 40% of screen */}
        <View style={styles.contentContainer}>
          <View style={styles.upperContentContainer}>
            {renderProgressIndicator()}
            {renderTextContent()}
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={handleSkipIntro}>
              <Text style={styles.skipButton}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextSlide}>
              <Text style={styles.nextButton}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  imagesContainer: {
    height: "60%",
    width: "100%",
    paddingTop: "80@ms",
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  contentContainer: {
    height: "40%",
    justifyContent: "space-between",
  },
  upperContentContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: "60@ms",
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20@ms",
    width: "100%",
  },
  progressBarBackground: {
    width: "140@ms",
    height: "8@ms",
    backgroundColor: COLOR.lightGray,
    borderRadius: "4@ms",
    overflow: "hidden",
    position: "relative",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLOR.purple,
    borderRadius: "4@ms",
    position: "absolute",
    left: 0,
    top: 0,
  },
  textContainer: {
    paddingHorizontal: "24@ms",
    alignItems: "center", // Already centered horizontally
    justifyContent: "center",
  },
  customHeadingStyle: {
    marginBottom: "12@ms",
    color: COLOR.darkGray,
    textAlign: "center", // Add text alignment center
  },
  customRegularStyle: {
    color: COLOR.mediumGray,
    textAlign: "center", // Add text alignment center
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "40@ms",
    paddingBottom: "30@ms",
    width: "100%",
  },
  skipButton: {
    fontFamily: FONT.medium,
    fontSize: "16@ms",
    color: COLOR.mediumGray,
  },
  nextButton: {
    fontFamily: FONT.semiBold,
    fontSize: "16@ms",
    color: COLOR.amber,
  },
});

export default IntroScreen;