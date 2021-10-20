import * as React from "react";
import Icon from 'react-native-vector-icons/AntDesign';
import {default as FaIcon} from 'react-native-vector-icons/FontAwesome5';

const GithubIcon =()=> <Icon name="github" size={20} color="#000"/>;

const ToadIcon =()=> <FaIcon name="frog" size={20} color="#000"/>;

export {
    GithubIcon,
    ToadIcon
};