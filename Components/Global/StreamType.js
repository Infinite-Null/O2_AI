import React, { useState, useEffect } from 'react';
import {Text} from "react-native";

const StreamType = ({ text, delay, selectable,style }) => {
    const [currentWord, setCurrentWord] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        if (currentIndex < text.length) {
            setTimeout(() => {
                if(currentIndex===0){
                    setCurrentWord(prevText => prevText + text[currentIndex]);
                }
                else{
                    setCurrentWord(prevText => prevText + " " + text[currentIndex]);
                }
                setCurrentIndex(prevIndex => ++prevIndex);
            }, delay);

        }
    }, [currentIndex, delay]);

    return <Text selectable={selectable} style={style}>{currentWord}</Text>;
};

export default StreamType;
