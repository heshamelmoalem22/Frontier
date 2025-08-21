import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../context/ThemeContext";
import ButtonIcon from "./ButtonIcon";

function ThemeToggle() {
const { isDarkMode, toggleDarkMode } = useDarkMode();

return (
  <ButtonIcon onClick={toggleDarkMode}>
    {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
  </ButtonIcon>
);
}

export default ThemeToggle;
