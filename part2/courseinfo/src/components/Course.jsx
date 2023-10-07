const Header = ({name}) => (
    <h1>{name}</h1>
  )

  const Part = ({name, exercises}) => (
    <p>
      {name} {exercises}
    </p>
  )

  const Content = ({parts}) => (
    <>
      {parts.map(part =>
        <Part
          key={part.id}
          name={part.name}
          exercises={part.exercises}
        />
      )}
    </>
  )

  const Total = ({parts}) => (
    <p>
      <strong>
        Total of {parts.map(p => p.exercises).reduce((a, b) => a + b, 0)} exercises
      </strong>
    </p>
  )

  const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name} />
        <Content
          parts={course.parts}
        />
        <Total
          parts={course.parts}
        />
      </div>
    )
  }

  export default Course
