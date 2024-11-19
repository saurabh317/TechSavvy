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

export const IDENTITY_TOKEN = 'U2FsdGVkX18lreBwDMZIZaWXmCA+9GGYXAFttifVV7ovRjRGNNlnl3F8QSfmgxbGrm4zk42ud8ygR0rZccDFlOVDj01aIUTjKrX6TNza+qoIkSe0xGH0MxBlUXrV+c+ULtgFHS9XcTXbrIGbSN1Cwt18SZK5UOGF3aavkG5ZGXwOAopznMUp4CJOxE9a7DzNsb0rJpsguSXehn+Fw0b6GT30m/c0+7Nhbtwi8GFflEgr8F41hE4jMoLwCEajSkxQhTxorAqtJRF0tlM5sUeAvBODqx4sZMB8MNv9v9NzQ7cA+P+FKB6VSS9QIwRx5PC4LQnmthfupakaZmnRL1YbZ56rPbt8lu3QSRS1yuV/GwRuCN3MBwaHitsgzMYEnAMiYGup+W/nbNsukqCXhSZGtg=='

export function reduceArrayToHalf(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i += 2) {
    result.push(arr[i] + arr[i + 1]);
  }
  return result;
}