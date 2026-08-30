export type WindowId = "about" | "projects" | "contact" | "resume";

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowState {
  id: WindowId;
  title: string;
  filename: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: Position;
  size: Size;
}

export interface DesktopIconItem {
  id: WindowId;
  label: string;
  iconType: "folder" | "file";
  shortcut?: boolean;
}
