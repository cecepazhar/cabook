export interface GeneratedNavItem {
  key: string;
  label: string;
  href: string;
  icon: string;
  description: string;
  path: string;
}

export const GENERATED_NAV_ITEMS: GeneratedNavItem[] = [
  {
    key: "library",
    label: "Library Hub",
    href: "/",
    icon: "book-open",
    description: "Perpustakaan & Katalog Pembelajaran",
    path: "M4.26 10.147a60.438 60.438 0 0 1-4.147-2.397 1.5 1.5 0 0 1 0-2.397 1.5 1.5 0 0 1 2.397-.001l1.154-.934a21.654 21.654 0 0 1 7.064-2.621 3.18 3.18 0 0 1 2.411 0 21.654 21.654 0 0 1 7.064 2.621l1.154.934a1.5 1.5 0 0 1 2.397.001 1.5 1.5 0 0 1 0 2.397 60.438 60.438 0 0 1-4.147 2.397 51.312 51.312 0 0 0-6.945 1.471 2.452 2.452 0 0 1-1.184 0 51.309 51.309 0 0 0-6.945-1.471z"
  },
  {
    key: "playlists",
    label: "Learning Playlists",
    href: "/playlists",
    icon: "list-video",
    description: "Playlist Belajar & Materi",
    path: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
  },
  {
    key: "player",
    label: "Media & Reader",
    href: "/player",
    icon: "play-circle",
    description: "Studio Media & Buku",
    path: "M21 12a9 9 0 1 1-9-9m9 9a9 9 0 0 1-9 9m9-9H9m9 0a9 9 0 0 1-9 9"
  },
  {
    key: "ambient",
    label: "Ambient Focus",
    href: "/ambient",
    icon: "headphones",
    description: "Studio Fokus Suara",
    path: "M12 18v-3.255a7.005 7.005 0 0 0-7-7 7.005 7.005 0 0 1 7-7 7.005 7.005 0 0 1 7 7 7.005 7.005 0 0 0-7 7V18M3.04 14.858a9.001 9.001 0 0 0 17.92 0"
  },
  {
    key: "notes",
    label: "Time-Synced Notes",
    href: "/notes",
    icon: "file-text",
    description: "Catatan Belajar & Bookmark",
    path: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625A2.25 2.25 0 0 0 3.375 3.375v17.25A2.25 2.25 0 0 0 5.625 22.875h7.125"
  }
];
