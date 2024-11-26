import { useTheme } from "../config/themeProvider";

export const ContentWrapper = ({ children }) => {
  const { darkMode } = useTheme();
  const rect = document.body.getBoundingClientRect()

  return (
    <div
      className={`w-[95%] mx-auto p-4 rounded-md shadow-md min-h-36 h-full mt-3 ${rect.width > 850 ? 'ml-16' : ''}
        ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`
      }
    >
      {children}
    </div>
  )
}

export function reduceArrayToHalf(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i += 2) {
    result.push(arr[i] + arr[i + 1]);
  }
  return result;
}