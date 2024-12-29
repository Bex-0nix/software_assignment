export default function Form ({route}){
    let action = `/${route}`;
    return (
        <> 
            <form action={action} method="get">
                <input type="text" name="in" id="" placeholder="?" autoComplete="off"/>
            </form>
        </>
    )
}

