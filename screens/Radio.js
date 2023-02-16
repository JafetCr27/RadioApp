import React, {useState} from 'react'
import { StyleSheet, ScrollView ,Image,Linking ,View, Text} from 'react-native'
import { LinearProgress,SocialIcon,Divider } from 'react-native-elements';
import { Audio } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';
import Loading from '../components/Loading'

export default function RadioScreen() {
   
    const [sound, setSound] = useState()
    const [liveText, setLiveText] = useState(null)
    const [determinate, setDeterminate] = useState("determinate")
    const [play, setPlay] = useState(false)
    const [loading, setLoading] = useState(false)
    const playSound = async (value) => {
        if(!value){
            setLiveText("..Pausa..")
            setDeterminate("determinate")
            await sound.pauseAsync(); 
        }
        else{
            setLoading(true);
            await Audio.setAudioModeAsync({
                 staysActiveInBackground: true,
                // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
                // playsInSilentModeIOS: true,
                // shouldDuckAndroid: true,
                 //interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
                // playThroughEarpieceAndroid: false
            })
            const { sound } = await Audio.Sound.createAsync (
                { uri: 'https://ssl.hostingtico.com:7006/stream.mp3' },
                { shouldPlay: true }
                //{ staysActiveInBackground :true }
            );


            setSound(sound);
            await sound.playAsync(); 
            setLoading(false);
            setLiveText("En vivo !!")
            setDeterminate("indeterminate")
        }
        setPlay(value)
        console.log(value)

    }
    const OpenURLButton = async (url) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
      };
    React.useEffect(() => {
      return sound
        ? () => {
            sound.unloadAsync(); }
        : undefined;
    }, [sound]);
    
    return (
        <ScrollView>
            <View 
                style={styles.viewBody}>
                    <Image
                        source ={require("../assets/PG.jpg")}
                        style= {
                            styles.image
                        }
                    />
                <Text
                    style={styles.titleText}
                    > Síguenos en nuestras redes
                </Text>
                <Divider 
                    style={styles.divider} 
                />
                <View 
                    style={{flexDirection: 'row',marginTop:5}}>
                    <SocialIcon
                        type="facebook"
                        onPress={() => OpenURLButton("https://www.facebook.com/gravityradiocr")}
                    />
                    <Text style={styles.iconsText}> Gravity Radio CR</Text>
                </View>
                <View 
                    style={{flexDirection: 'row'}}>
                    <SocialIcon
                        type="instagram"
                        onPress={() => OpenURLButton("https://www.instagram.com/gravityradiocr/?hl=en")}
                    />
                    <Text style={styles.iconsText}> @gravityradiocr</Text>
                </View>
                <View 
                    style={{flexDirection: 'row'}}>
                    <SocialIcon
                        type="youtube"
                        onPress={() =>  OpenURLButton("https://www.youtube.com/channel/UCc9y_c6vcliFSgY3ppZ6fAQ")}
                    />
                    <Text style={styles.iconsText}> Gravity Radio Costa Rica online</Text>
                </View>
                <View 
                    style={{flexDirection: 'column',flex:1}}
                >
                    <Text
                        style={styles.textLive}
                        > { liveText }
                    </Text>
                </View>
               
                <LinearProgress 
                    style={{ marginVertical: 10 }} 
                    variant ={determinate}
                />
                <View
                    style={
                            {
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }
                        }
                >
                    <Ionicons 
                        name = { play ? "pause-circle" : "play-circle"} 
                        size={60} 
                        color = { play ? "red" : "orange"} 
                        onPress = { ()=> playSound(!play) }
                        />
                </View>
                <Loading
                    isVisible={loading}
                    text="Cargando..."
                />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    viewBody:{
        //marginTop:25,
        marginHorizontal:10
    },
    image:{
        height:250,
        width:"100%",
    },
    button:{
        backgroundColor:"#442484"
    },
    textLive:{
        textAlignVertical:"center",
        textAlign:"center",
        color:"red",
        padding:0,
        
    },
    titleText:{
        color:"#442484",
        textAlign:"center",
        fontSize: 20,
    },
    iconsText:{
        textAlignVertical:"center",
        fontSize:18
    },
    divider:{
        width:"100%",
        height:1,
        color: "#442484",
        marginTop:10,
    },
    iconLive:{
         height:50,
         alignContent:"center"
        // width:"100%",
        // padding:0
    }
})
