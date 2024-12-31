import StatefulContainerContent from './statefulContainerContent';
import StatefulContainerContext from './statefulContainerContext';
import './styles/statefulContainer.css'

export default function StatefulContainer({children, isMain = false}){
    return (
        <StatefulContainerContext isMain={isMain}>
            <StatefulContainerContent>
                {children}
            </StatefulContainerContent>
        </StatefulContainerContext>
    )
}