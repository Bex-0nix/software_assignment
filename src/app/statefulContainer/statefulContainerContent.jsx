import { useStatefulContainer } from './statefulContainerContext';
import { useEffect } from 'react';


export default function StatefulContainerContent({children}){
    const {activeButton, setActiveButton, contents, setContent, colors, providerRef} = useStatefulContainer();
    let states;
    let length = colors.length;
    if (Array.isArray(children)){
        states = children.filter((child) => {
            if (child.type.name == "State") return true;
        });
    }
    else {
        if(children.type.name == "State") 
            {states = [children];
            }
        }
    
    const parentSetters = getParentSetters(providerRef);
    function getParentSetters(providerRef){
        let buffer = []
        while (providerRef){
            buffer.push(providerRef.setContent);
            providerRef = providerRef.providerRef;
        }
        return buffer;
    }
    useEffect(() => {
        setContent(states[0].props.children, null);
    }, parentSetters)
    
    return (
            <>
                {states.map((state, index) => {
                    let title = state.props.title;
                    let content = state.props.children;
                    contents[title || (index + 1).toString()] = {'content': content, 'index': index};
                    return <button className={!activeButton && index == 0 ? "link active" : "link"} key={index} onClick={(e) => {setContent(content, index); setActiveButton(e.target)}}>{title ? title : index + 1}</button>; 
                })}
            </>
    )
}