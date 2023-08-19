const InputForCheckout = ({htmlFor, label, type, placeholder, errors, register, title, validation}) => {
  return (
    <div>
      {title}
      <label className={errors[htmlFor]?.message && "show"} htmlFor={htmlFor}>
        {label}
      </label>
      <span className="show">{errors[htmlFor]?.message}</span>
      <input
        className={`${errors[htmlFor]?.message && "error"}`}
        type={type}
        id={htmlFor}
        placeholder={placeholder}
        {...register(htmlFor, validation)}
      />
    </div>
  )
}
export default InputForCheckout