import {StyleSheet} from "react-native"
import {useFonts} from "expo-font"
import {scale} from "./utils.js"
import { Dimensions } from 'react-native';

const RADIUS = 10

const windowHeight = Dimensions.get('window').height;


const homeStyles = StyleSheet.create({
  container: {
    top:"0",
    left:0,
    display:"flex",
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingRight:"5%",
    paddingLeft:"5%",
    paddingTop:"2%",
    height:"100%",
    opacity:1,
    elevation:0,
    zIndex:0,
    textAlign:"left",
    minHeight:windowHeight
  },
  scroll:{
    top:"0",
    left:0,
    backgroundColor: '#fff',
    height:"100%",
    width:"100%",
    opacity:1,
    elevation:0,
    zIndex:0,
    textAlign:"left",

  },
  fadeContainer:{
    top:"0",
    left:0,
    display:"flex",
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingRight:"5%",
    paddingLeft:"5%",
    paddingTop:"2%",
    height:"100%",
    opacity:1,
    elevation:0,
    zIndex:0,
    textAlign:"left",
    opacity:0.4,    

  },
  welcome:{
    color:"#000",
    fontWeight:"bold",
    fontSize:scale(30),
    padding:"2%",
    textAlign:"left"
  }
})

const buttonStyles = StyleSheet.create({
    caret:{
          paddingLeft:10,
        },
    buttonIcon: {
      paddingLeft:scale(10),
      color:"white"
  
    },
    button:{
      padding: scale(1),
      backgroundColor:"#ff7000",
      alignItems: "center",
      justifyContent:"center",
      width:"65%",
      marginLeft:"17.5%",
      borderRadius: scale(RADIUS),
      display:"flex",
      flexDirection:"row",
      borderColor: "#ff7000",
      borderWidth:scale(3),
      
            
    },


    text:{
      color:"#fff",
      fontWeight:"bold",
      fontSize:scale(20),
      textAlign: "center",
    }}); 

const trackerStyles=StyleSheet.create({
  parent:{
    height:"80%",
    width:"100%",

    backgroundColor:"#f6f6f6",
    marginBottom:"5%",
    borderRadius:scale(RADIUS),
    padding:"2%",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3,
    },

    shadowOpacity: 1,
    shadowRadius: 2.00,

  },
  container:{
    height:"100%",
    width:"100%",

    backgroundColor:"#f6f6f6",
    display:"flex",
    
    elevation: 2,
    
    padding:"5%",
    overflowY:"scroll",
  },
  fadeContainer:{
    
    height:"70%",
    width:"100%",
    borderRadius:scale(RADIUS),
    backgroundColor:"#fefefe",
    display:"flex",
  
    padding:"5%"  },
  add:{
    backgroundColor:"blue",
    position:"absolute",
    right:"5%",
    bottom:"2%",
    padding:"1%",
    height:"7%",
    aspectRatio:"1",
    borderRadius:scale(RADIUS),
    alignItems: "center",
    justifyContent:"center",


  },
  icon:{
    color:"white",

  }

})

const itemStyles = StyleSheet.create({
  container:{
    display:"flex",
    width:"100%",
    borderRadius:scale(2),
    backgroundColor:"#fff",
    borderColor:"#079ced",
    borderWidth:scale(1),
    padding:"2%",
    marginBottom:"5%",

  },
  slider:{
    size:scale(18),
    backgroundColor:"#079ced",
    padding:"2%",
    borderRadius:10
  },
  header:{
    display:"flex",
    flexDirection:"row",
    marginBottom:"2%",
    justifyContent:"space-between"
  },
  title:{
    backgroundColor:"#079ced",
    color:"#fff",
    textAlign:"left",
    borderRadius:scale(5),
    alignItems: 'baseline',
    fontSize:scale(15),
    padding:"1%"
  },
  checkbox:{
    margin: 8,
    height:scale(27.5),
    aspectRatio:1,

  },
  checkContainer:{
    display:"flex",
    flexDirection:"row",
    marginBottom:"5%",

  },
  label:{
    fontSize:scale(15),
    justifyContent:"center",
    height:"100%",
    padding:"2%",
    width:'auto'
  },
  deleteField:{
    padding:"5%",
    position:"absolute",
    right:0,
    height:"100%"
  },
  stack:{
    display:"flex"
  },
  content:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
  },
  textInput:{
    width:"50%",
    backgroundColor:"#efefef",
    padding:"1%",
    borderRadius:scale(5),
    fontSize:scale(15),
    
  },

})

const dialogStyles = StyleSheet.create({
  container:{
    position:"absolute",
    height:"65%",
    top:"20%",
    width:"80%",
    left:"10%",
    backgroundColor:"#fff",                         
    display:"flex",
    padding:"5%",
    borderRadius:scale(RADIUS),
    zIndex:10,
    elevation:10,
    minHeight:0.65*windowHeight
  },
  list:{
    height:"80%",
    padding:"5%",
  },
  title:{
    fontSize:scale(30),
    fontWeight:"bold",

  },
  header:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    borderBottomColor:"#000",
    borderBottomWidth:scale(1),

  },
  name:{
    width:"100%",
    height:scale(40),
    backgroundColor:"#efefef",
    color:"#000",
    padding:"1%",
    fontSize:scale(17),
    paddingLeft:"5%",
    paddingRight:"5%",
    borderRadius:scale(RADIUS),
    marginTop:"5%",

  },
  fields:{
    height:"70%",
    borderColor:"#efefef",
    borderWidth:scale(1),
    marginTop:"5%",
    padding:"2%",
    borderRadius:scale(5),
    display:"flex"
  },
  dropdown:{
    borderColor:"#efefef",
    borderRadius:scale(5),
    borderWidth:scale(2),
  },
  fieldTitle:{
    fontSize:scale(15),
    fontWeight:"bold"
  },
  fieldName:{
    width:"100%",
    height:scale(40),
    backgroundColor:"#efefef",
    color:"#000",
    padding:"1%",
    fontSize:scale(17),
    paddingLeft:"5%",
    paddingRight:"5%",
    borderRadius:scale(RADIUS),
    marginTop:"5%",

  },


})



export  {homeStyles}
export  {buttonStyles}
export  {trackerStyles}
export  {itemStyles}
export  {dialogStyles}