import DetailLayout from "@/app/(detail)/layout";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const HomePage = lazy(() => import("@/app/App"));
const MainLayout = lazy(() => import("@/app/MainLayout"));

const SearchLayout = lazy(() => import("@/app/search/layout"));
const SongsPage = lazy(() => import("@/app/search/@songs/page"));
const AlbumsPage = lazy(() => import("@/app/search/@albums/page"));
const ArtistsPage = lazy(() => import("@/app/search/@artists/page"));
const PlaylistsPage = lazy(() => import("@/app/search/@playlists/page"));

const AlbumsDetailPage = lazy(() => import("@/app/(detail)/albums/[id]/page"));
const PlaylistsDetailPage = lazy(
  () => import("@/app/(detail)/playlists/[id]/page")
);
const ArtistsDetailPage = lazy(
  () => import("@/app/(detail)/artists/[id]/page")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/search",
        element: (
          <Suspense fallback={<div className="flex-auto h-full">loading</div>}>
            <SearchLayout />
          </Suspense>
        ),
        children: [
          { path: "songs", element: <SongsPage /> },
          { path: "albums", element: <AlbumsPage /> },
          { path: "artists", element: <ArtistsPage /> },
          { path: "playlists", element: <PlaylistsPage /> },
        ],
      },
      {
        path: "/albums/:id",
        element: (
          <Suspense
            fallback={<div className="flex-auto overflow-hidden">loading</div>}>
            <DetailLayout>
              <AlbumsDetailPage />
            </DetailLayout>
          </Suspense>
        ),
      },
      {
        path: "/playlists/:id",
        element: (
          <Suspense
            fallback={<div className="flex-auto overflow-hidden">loading</div>}>
            <DetailLayout>
              <PlaylistsDetailPage />
            </DetailLayout>
          </Suspense>
        ),
      },
      {
        path: "/artists/:id",
        element: (
          <Suspense
            fallback={<div className="flex-auto overflow-hidden">loading</div>}>
            <DetailLayout>
              <ArtistsDetailPage />
            </DetailLayout>
          </Suspense>
        ),
      },
    ],
  },
]);
