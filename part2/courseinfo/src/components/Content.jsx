const Part = (props) => (
    <p>{props.part.name} {props.part.exercises}</p>
)

const Content = (props) => {
    return (
        <>
            {props.parts.map((part) => (
                <Part key={part.id} part={part} />
            ))}
        </>
    )
}

export default Content
