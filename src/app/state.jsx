export default function State(props){
    const {children} = props;
    console.log(children);
    return(
        <div className="state">
            <div className="content">{children}</div>
        </div>
    )
  }