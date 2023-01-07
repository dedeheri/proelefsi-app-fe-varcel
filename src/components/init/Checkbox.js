function Checkbox({ label, ...rest }) {
  return (
    <div className="flex items-center space-x-2">
      <input type={"checkbox"} id="remember-me" name="rememberMe" {...rest} />
      <label
        htmlFor="remember-me"
        className="cursor-pointer text-md font-medium  text-sm  text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white duration-300"
      >
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
