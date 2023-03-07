const Input = (props) => {
  const { error, label } = props

  return (
    <div error={error}>
      <label>{label}</label>
      <input {...props} />
      <p>{error}</p>
    </div>
  )
}

export default Input
