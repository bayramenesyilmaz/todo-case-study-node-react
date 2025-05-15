import { useDispatch, useSelector } from "react-redux";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { toggleTheme } from "../../../store/slices/themeSlice";

export default function ThemeToggle({ isMobile }) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  if (isMobile) {
    return (
      <button
        onClick={() => dispatch(toggleTheme())}
        className="w-full flex items-center gap-2 py-2 text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
      >
        {darkMode ? (
          <>
            <SunIcon className="w-5 h-5 text-yellow-500" />
            <span>Açık Tema</span>
          </>
        ) : (
          <>
            <MoonIcon className="w-5 h-5 text-gray-500" />
            <span>Koyu Tema</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
      title={darkMode ? "Açık Temaya Geç" : "Koyu Temaya Geç"}
    >
      {darkMode ? (
        <SunIcon className="w-5 h-5 text-yellow-500" />
      ) : (
        <MoonIcon className="w-5 h-5 text-gray-500" />
      )}
    </button>
  );
}
