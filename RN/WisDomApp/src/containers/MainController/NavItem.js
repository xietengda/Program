import React, {PureComponent} from 'react'
import {StyleSheet, View, Image, Text, TouchableOpacity, viewPropTypes} from 'react-native'

type Props = {
    title?:string,
    titleStytle?:viewPropTypes.style,
    icon?:any,
    iconStyle?:viewPropTypes.style,
    onPress?:Function,
}

type State ={

}

class NavItem extends PureComponent<Props, State> {
  render () {
    let {title, titleStytle, icon, iconStyle, onPress} = this.props

    let titleElement = title && (
      <Text style={[styles.title, titleStytle]}>{title}</Text>
    )
    let iconElement = icon && (
      <Image source={icon} style={[styles.icon, iconStyle]}/>
    )
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        {titleElement}
        {iconElement}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  title: {
    fontSize: 15,
    color: '#333333',
    margin: 8
  },
  icon: {
    width: 27,
    height: 27,
    margin: 8
  }

})

export default NavItem
