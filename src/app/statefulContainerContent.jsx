import { useStatefulContainer } from './statefulContainerContext';
import { useEffect } from 'react';


export default function StatefulContainerContent({children}){
    const {mainContent, contents, setContent, colors} = useStatefulContainer();
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

    useEffect(() => {
        !mainContent && setContent(states[0].props.children, null);
    })
    
    return (
            <>
                {states.map((state, index) => {
                    let title = state.props.title;
                    let content = state.props.children;
                    contents[title || (index + 1).toString()] = {'content': content, 'index': index};
                    return <button className='link' key={index} onClick={() => {setContent(content, colors[index % length])}}>{title ? title : index + 1}</button>
                })}
            </>
    )
}