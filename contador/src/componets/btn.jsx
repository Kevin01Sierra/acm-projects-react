export function Btn({children, onClick}){
    return(
        <>
        <button className="btn" onClick={onClick}>{children}</button>
        </>)
}
