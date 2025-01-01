import {createContext, useState, useContext, useRef, useEffect} from 'react';
import { useHeadContext } from '../layout';

const statefulContainerContext = createContext();


export default function StatefulContainerContext({children, isMain}){
    // const {head} = useHeadContext()
    const [mainContent, setMainContent] = useState(null);
    const [activeButton, setActiveButton] = useState(null);
    const [contents, setContents] = useState({});
    const [animationColor, setAnimationColor] = useState('black')
    const main = useRef();
    const links = useRef();
    
    const colors = ["transparent", "transparent", "transparent", "#a881af", "#dd7973", "#ffbd03", "#ED0800", "#5783db", "#33b249", "#80669d", "#5adbb5", "#55c2da"];
    useEffect(() => {
        const animation = document.createElement('style');
        animation.id = "changeBg"
        animation.textContent = `@keyframes changeBg {0%{background-color: rgba(0, 0, 0, 0.459)}30%{background-color: ${animationColor}}100%{background-color: rgba(0, 0, 0, 0.459)}}`;
        document.head.appendChild(animation);
    }, [])

    function animate(color){
        setAnimationColor(color);
        main.current.style.animation = "none";
        main.current.offsetHeight;
        main.current.style.animation = "changeBg 0.5s linear";
    }

    function updateContent(content, index){
        setMainContent(content || <>empty</>);
        updateActiveButton(links.current.children[index])
        animate("black");
    }

    function updateActiveButton(button){
        if (activeButton) activeButton.classList.remove('active')
        setActiveButton(button);
    }
    useEffect(() => {
        try{
            activeButton.classList.add('active');
        }
        catch{
        }
    }, [activeButton])

    const parentContext = useContext(statefulContainerContext);
    const providerRef = parentContext ? parentContext : null;

    return (
        <statefulContainerContext.Provider value={{setContent: updateContent, setActiveButton: updateActiveButton, activeButton, links, mainContent, contents, setContents, colors, providerRef}}>
            <div className={isMain ? "stateful_container main_stateful_container" : "stateful_container"}>
                <div ref={links} className={isMain ? "links main_links" : "links"}>
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