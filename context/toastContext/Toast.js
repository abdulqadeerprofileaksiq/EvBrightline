import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  Animated, 
  TouchableOpacity,
  StatusBar,
  Platform,
  Image
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ScaledSheet } from 'react-native-size-matters';
import { FONT } from '../../constants/font';

// Import PNG icons with correct paths
const SuccessIcon = require('../../assets/images/toast/tick.png');
const ErrorIcon = require('../../assets/images/toast/exclamationRed.png');
const InfoIcon = require('../../assets/images/toast/exclamationBlue.png');

const Toast = ({ visible, message, type, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const loadingAnim = useRef(new Animated.Value(0)).current;
  
  const toastTypes = {
    error: {
      bgColor: '#FAEAE8',
      progressColor: '#C9190B',
      textColor: '#D32F2F',
      icon: ErrorIcon
    },
    info: {
      bgColor: '#E3F2FD',
      progressColor: '#2196F3',
      textColor: '#1976D2',
      icon: InfoIcon
    },
    success: {
      bgColor: '#E8F5E9',
      progressColor: '#4CAF50',
      textColor: '#388E3C',
      icon: SuccessIcon
    }
  };
  
  const currentType = toastTypes[type] || toastTypes.info;
  
  const renderFormattedMessage = (text) => {
    if (!text.includes(':')) {
      return (
        <Text 
          style={[styles.message, { color: currentType.textColor }]}
          allowFontScaling={false}
          numberOfLines={2}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.9}
        >
          {text}
        </Text>
      );
    }
    
    const parts = text.split(':');
    const boldPart = parts[0];
    const regularPart = parts.slice(1).join(':');
    
    return (
      <Text 
        style={[styles.message, { color: currentType.textColor }]}
        allowFontScaling={false}
        numberOfLines={2}
        adjustsFontSizeToFit={true}
        minimumFontScale={0.9}
      >
        <Text 
          style={styles.boldText}
          allowFontScaling={false}
        >
          {boldPart}:
        </Text>
        {regularPart}
      </Text>
    );
  };
  
  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 80,
        friction: 10,
        useNativeDriver: true
      }).start();
      
      Animated.timing(loadingAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false
      }).start(() => {
        handleSlideOut();
      });
    } else {
      slideAnim.setValue(-100);
      loadingAnim.setValue(0);
    }
  }, [visible]);
  
  const handleSlideOut = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      if (onClose) onClose();
    });
  };
  
  const handleClose = () => {
    handleSlideOut();
  };
  
  if (!visible) return null;
  
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight;

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          backgroundColor: currentType.bgColor,
          marginTop: STATUSBAR_HEIGHT ? styles.container.marginTop + STATUSBAR_HEIGHT : styles.container.marginTop,
        }
      ]}
    >
      <Animated.View 
        style={[
          styles.loadingBar, 
          { 
            backgroundColor: currentType.progressColor,
            width: loadingAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%']
            })
          }
        ]}
      />
      
      <View style={styles.content}>
        <Image 
          source={currentType.icon}
          style={styles.icon}
        />
        
        {renderFormattedMessage(message)}
        
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <AntDesign name="close" size={24} color={currentType.textColor} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = ScaledSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginHorizontal: '18@s',
    marginTop: '10@vs',
    borderRadius: '8@ms',
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 9999,
    minHeight: '50@vs',
  },
  loadingBar: {
    height: '4@vs',
    position: 'absolute',
    top: 0,
    left: 0
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '8@ms',
    paddingTop: '12@ms',
  },
  icon: {
    marginRight: '10@ms',
    alignSelf: 'flex-start',
    marginTop: '2@ms',
    width: '22@ms',
    height: '22@ms',
    resizeMode: 'contain',
  },
  message: {
    flex: 1,
    fontFamily: FONT.regular,
    fontSize: '14@ms',
    lineHeight: '18@ms',
    flexWrap: 'wrap',
  },
  boldText: {
    fontFamily: FONT.semiBold,
    fontWeight: '700', 
    fontSize: '14@ms',
  },
  closeButton: {
    padding: '4@ms',
    alignSelf: 'flex-start',
    marginTop: '-2@ms'
  }
});

export default Toast;
