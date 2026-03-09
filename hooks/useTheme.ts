import useColorScheme from "./useColorScheme";
import Colors from "@/assets/colors/colors";

export function useTheme() {
  const colorScheme = useColorScheme();
  return Colors[colorScheme];
}
