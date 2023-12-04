import { View, Text, Pressable ,Dimensions,Image} from 'react-native'
import React from 'react'
import { router } from "expo-router/src/imperative-api";

const data = [
    {
        artist:"P!nk",
        image:"https://i.scdn.co/image/ab67706c0000da84f745831fcb2f01a952b8fc14",
        description: "P!nk is a singer-songwriter hailing from Philadelphia, United States who was born on September 8th, 1979. Since her debut in 2000 she has released six studio albums and has become one of the most commercially successful artists of her generation."
    },
    {
        artist:"BTS",
        image:"https://seeded-session-images.scdn.co/v2/img/122/secondary/artist/3Nrfpe0tUJi4K4DXYWgMUX/en",
        description: "BTS, a South Korean boy band, has taken the global music scene by storm. Known for their impeccable choreography and socially conscious lyrics, the seven-member group has amassed a massive international fanbase called the ARMY. Their influence extends beyond music, making them cultural icons. "
    }, {
        artist:"Hillsong UNITED",
        image:"https://thisis-images.spotifycdn.com/37i9dQZF1DZ06evO4bbJPq-default.jpg",
        description: "Hillsong UNITED is committed to writing songs that speak truth, create a unique sound, connects with churches, individuals and ultimately connects people everywhere with God.  Originating from Australia's Hillsong Church, their anthemic songs like 'Oceans' and 'What a Beautiful Name' have resonated globally. Their impactful lyrics and sound continue to inspire and connect with diverse audiences worldwide."
    }, {
        artist:"Taylor Swift",
        image:"https://i.scdn.co/image/ab67616100005174859e4c14fa59296c8649e0e4",
        //write 50 words decription about her
        description: "Taylor Swift is that rarest of pop phenomena: a superstar who managed to completely cross over from country to the mainstream. Other singers performed similar moves -- notably, Dolly Parton and Willie Nelson both became enduring mainstream icons based on their '70s work -- but Swift shed her country roots like they were a second skin; it was a necessary molting to reveal she was perhaps the sharpest, savviest populist singer/songwriter of her generation, one who could harness the Zeitgeist and turn it personal and, just as impressively, perform the reverse. These skills were evident on her earliest hits, especially the neo-tribute “Tim McGraw,” but her second album, 2008’s Fearless, showcased a songwriter discovering who she was and, in the process, finding a mass audience. "
    }, {
        artist:"Billie Eilish",
        image:"https://i.scdn.co/image/ab67616100005174d8b9980db67272cb4d2c3daf",
         //write 50 words decription about her
            description: "Billie Eilish Pirate Baird O'Connell is an American singer-songwriter. She first gained attention in 2015 when she uploaded the song 'Ocean Eyes' to SoundCloud, which was subsequently released by the Interscope Records subsidiary Darkroom."
    }, {
        artist:"Khalid",
        image:"https://i.scdn.co/image/ab6761610000517431072db9da0311ecfabe96bf"
,
            //write 50 words decription about her
            description: "Khalid Donnel Robinson is an American singer and songwriter. He is signed to Right Hand Music Group and RCA Records. His debut single, 'Location', was released in July 2016 and peaked at number 16 on the US Billboard Hot 100 chart and was later certified quadruple platinum by the Recording Industry Association of America."

    }, {
        artist:"Ariana Grande",
        image:"https://i.scdn.co/image/ab67616100005174cdce7620dc940db079bf4952"

        ,
            //write 50 words decription about her
            description: "Ariana Grande-Butera is an American singer, songwriter, and actress. Born in Boca Raton, Florida, Grande began her career at age 15 in the 2008 Broadway musical 13. She rose to fame for her role as Cat Valentine in the Nickelodeon television series Victorious and Sam & Cat."
    }, {
        artist:"Post Malone",
        image:"https://i.scdn.co/image/ab676161000051746be070445b03e0b63147c2c1",
        description: "Austin Richard Post, known professionally as Post Malone, is an American rapper, singer, songwriter, and record producer. Known for his introspective songwriting and laconic vocal style, Malone has gained acclaim for bending a range of genres including country, grunge, hip hop and R&B."
    }, {
        artist:"Lil Nas X",
        image:"https://i.scdn.co/image/ab67616100005174d66f1e0c883f319443d68c45",
        description: "Montero Lamar Hill, known professionally as Lil Nas X, is an American rapper, singer, and songwriter. He rose to prominence with the release of his country rap single 'Old Town Road', which first achieved viral popularity on the micro-platform video sharing app TikTok in early 2019, and was Diamond certified by November the same year."
    }, {
        artist:"Queen",
        image:"https://i.scdn.co/image/c06971e9ff81696699b829484e3be165f4e64368",
        description: "Queen are a British rock band formed in London in 1970. Their classic line-up was Freddie Mercury, Brian May, Roger Taylor and John Deacon. Their earliest works were influenced by progressive rock, hard rock and heavy metal, but the band gradually ventured into more conventional and radio-friendly works by incorporating further styles, such as arena rock and pop rock."
    },
]
const TopArtists = () => {
    const {width, height} = Dimensions.get("window")
const handlePress = (item)=>{
    router.push({
        pathname:"(screens)/artist_profile",
        params:{
            item:JSON.stringify(item)
        }
    })
}
  return (
    <View className = "mx-2 mt-6">
      <Text className = "text-xl font-bold">Top Artists: Billboards</Text>
      <View className = "flex flex-row flex-wrap justify-center gap-y-6 gap-x-6  mt-6 ">
        {data.map((item)=>(
           <Pressable onPress={()=>handlePress(item)} key={item.artist} className = "flex items-center">
            <View style= {{width:width/4, height:height/8.5}} key={item.title}>
                <Image style = {{width:"100%", height:"100%", borderRadius:100}} source={{uri:item.image}}/>
            </View>
            <Text className = "font-semibold">{item.artist}</Text>
            </Pressable>
        ))}
      </View>
    </View>
  )
}

export default TopArtists