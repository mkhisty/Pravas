import { PixelRatio } from "react-native"

export function scale(value){
    ratio = PixelRatio.getFontScale()
    return value/ratio
}