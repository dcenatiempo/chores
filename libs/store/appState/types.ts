export interface AppState {
  device: {
    isDark: boolean;
    screenWidth: number;
    screenHeight: number;
  };
  application: {
    isKidMode: boolean;
    kidModePin: string | undefined;
  };
}
