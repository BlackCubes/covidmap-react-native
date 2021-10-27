import * as React from "react";
import Icon from 'react-native-vector-icons/AntDesign';
import {default as FaIcon} from 'react-native-vector-icons/FontAwesome5';
import {default as Entypo} from 'react-native-vector-icons/Entypo';

const GithubIcon =()=> <Icon name="github" size={20} color="#000"/>;

const ToadIcon =()=> <FaIcon name="frog" size={20} color="#000"/>;

const USAFlagIcon =()=> <FaIcon name="flag-usa" size={15} color="#000"/>;

const GlobeIcon =()=> <Entypo name="globe" size={15} color="#000"/>;

const SyringeIcon =()=> <FaIcon name="syringe" size={15} color="#000"/>;

const SearchIcon =()=> <Icon name="search1" size={20} color="#000" />

const MenuIcon =()=> <Icon name="menu-fold" size={15} color="#000"/>

export {
    GithubIcon,
    ToadIcon,
    USAFlagIcon,
    GlobeIcon,
    SyringeIcon,
    SearchIcon,
    MenuIcon
};