import {StyleSheet} from "react-native"
import {useFonts} from "expo-font"
import {scale} from "./utils.js"
import { Dimensions } from 'react-native';

const RADIUS = 10

const windowHeight = Dimensions.get('window').height;


const homeStyles = StyleSheet.create({
  container: {
    backgroundColor:'#fffff',
    padding:'2.5%',
    paddingTop:'10%',
    left:0,
    display:'flex',
    flexDirection:"column",
    justifyContent: 'top',

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
    backgroundColor:"#f4f4f4",
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
      backgroundColor:"#f4f4f4",
      alignItems: "center",
      justifyContent:"center",
      width:"65%",
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
    height:"82%",
    width:"100%",

    backgroundColor:"#ffffff",
    borderRadius:'0, 0, 15,15',
    padding:"2%",
    shadowOpacity: 0,


    shadowRadius: 2.00,

  },
  container:{
    height:"100%",
    width:"100%",

    backgroundColor:"#ffffff",
    display:"flex",
    
    elevation: 2,
    
    padding:"5%",
    overflowY:"scroll",
  },
  fadeContainer:{
    
    width:"100%",
    borderRadius:scale(RADIUS),
    backgroundColor:"#f4f4f4",
    display:"flex",
  
    padding:"5%"  },
  add:{
    backgroundColor:"#147efb",
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
  container: {
    display: "flex",
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#fff",
    borderWidth: scale(1),
    padding: "2%",
    marginBottom: "5%",
    height: "fit-content",
  },
  controls: {
    display: "flex",
    flexDirection: "row",
    columnGap: scale(4),
  },
  slider: {
    size: scale(18),
    padding: "2%",
    borderRadius: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "2%",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    textAlign: "left",
    borderRadius: scale(5),
    alignItems: "baseline",
    fontSize: scale(15),
    padding: "1%",
  },
  checkbox: {
    margin: 8,
    height: scale(27.5),
    aspectRatio: 1,
  },
  checkContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "5%",
  },
  textInputContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: scale(5),
    alignItems: "flex-start",
    height: "fit-content",
    multiline: true,
    minHeight:scale(10),
    maxHeight:scale(150),
  },
  label: {
    fontSize: scale(15),
    justifyContent: "center",
    padding: "2%",
    width: "auto",
  },
  deleteField: {
    padding: "5%",
    position: "absolute",
    right: 0,
    height: "100%",
  },
  stack: {
    display: "flex",
  },
  content: {},
  textInput: {
    backgroundColor: "#efefef",
    borderRadius: scale(5),
    fontSize: scale(15),
    width: "100%",
    minHeight: scale(75),
    maxHeight: scale(150),
    height: "fit-content",
    multiline: true,
    textAlignVertical: "top", // Ensures the cursor starts at the top
  },
  numericalInput: {
    backgroundColor: "#efefef",
    height: "fit-content",
    minWidth: '30%',
    minHeight: '50%',
    width:"fit-content",
    borderRadius: scale(5),

  },
});

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
  nameBox:{
    display:"flex",
    flexDirection:"row"
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
  colorPicker:{
    height:scale(40),
    marginTop:"5%",
    width:"15%",
    borderRadius:scale(RADIUS),
    borderWidth:1,

  },
  name:{
    width:"90%",
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