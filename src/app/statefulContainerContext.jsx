import {createContext, useState, useContext, useRef} from 'react';

const statefulContainerContext = createContext();

const keyframes = document.createElement('style');
document.head.appendChild(keyframes);

export default function StatefulContainerContext({children, isMain}){
    
    const [mainContent, setMainContent] = useState(null);
    const [contents, setContents] = useState({});
    const [animationColor, setAnimationColor] = useState('purple')
    const main = useRef();

    const colors = ["transparent", "transparent", "transparent", "#a881af", "#dd7973", "#ffbd03", "#ED0800", "#5783db", "#33b249", "#80669d", "#5adbb5", "#55c2da"];
    keyframes.innerHTML = `@keyframes changeBg {0%{background-color: rgba(240, 255, 255, 0.562)}30%{background-color: ${animationColor}}100%{background-color: rgba(240, 255, 255, 0.562)}}`

    function animate(color){
        setAnimationColor(color);
        main.current.style.animation = "none";
        main.current.offsetHeight;
        main.current.style.animation = "changeBg 1s linear";
    }

    function updateContent(content, color){
        setMainContent(content || <>empty</>);
        // animate(color);
    }

    const parentContext = useContext(statefulContainerContext);
    const providerRef = parentContext ? parentContext : null;

    return (
        <statefulContainerContext.Provider value={{setContent: updateContent, mainContent, contents, colors, providerRef}}>
            <div className={isMain ? "stateful_container main_stateful_container" : "stateful_container"}>
                <div className={isMain ? "links main_links" : "links"}>
                    {children}
                </div>
                <div ref={main} className={isMain? "main_content main_main_content" : "main_content"}>
                    {mainContent}
                </div>
            </div>
        </statefulContainerContext.Provider>
    ) 
}

export function useStatefulContainer(){
    return useContext(statefulContainerContext);
} 