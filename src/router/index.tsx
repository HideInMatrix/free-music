import DetailLayout from "@/app/(detail)/layout";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Component } from "react";

const HomePage = lazy(() => import("@/app/App"));
const MainLayout = lazy(() => import("@/app/MainLayout"));

const SearchLayout = lazy(() => import("@/app/search/layout"));
const SongsPage = lazy(() => import("@/app/search/@songs/page"));
const AlbumsPage = lazy(() => import("@/app/search/@albums/page"));
const ArtistsPage = lazy(() => import("@/app/search/@artists/page"));
const PlaylistsPage = lazy(() => import("@/app/search/@playlists/page"));
const ShareSongPage = lazy(() => import("@/app/(share)/song/[id]/page")); // 新增 ShareSon

const AlbumsDetailPage = lazy(() => import("@/app/(detail)/albums/[id]/page"));
const PlaylistsDetailPage = lazy(
  () => import("@/app/(detail)/playlists/[id]/page")
);
const ArtistsDetailPage = lazy(
  () => import("@/app/(detail)/artists/[id]/page")
);

interface ErrorBoundaryProps {
  children: React.ReactNode;
}
class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError(_error: any) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>出错了，请稍后再试。</h1>;
    }

    return this.props.children;
  }
}
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: (
      <ErrorBoundary>
        <div className="flex-auto flex flex-col p-6">出错了，请稍后再试。</div>
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense
            fallback={
              <div className="flex-auto flex flex-col p-6">加载中...</div>
            }>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/search",
        element: (
          <Suspense
            fallback={
              <div className="flex-auto flex flex-col p-6">加载中...</div>
            }>
            <SearchLayout />
          </Suspense>
        ),
        children: [
          {
            path: "songs",
            element: (
              <Suspense
                fallback={
                  <div className="flex-auto flex flex-col p-6">加载中...</div>
                }>
                <SongsPage />
              </Suspense>
            ),
          },
          {
            path: "albums",
            element: (
              <Suspense
                fallback={
                  <div className="flex-auto flex flex-col p-6">加载中...</div>
                }>
                <AlbumsPage />
              </Suspense>
            ),
          },
          {
            path: "artists",
            element: (
              <Suspense
                fallback={
                  <div className="flex-auto flex flex-col p-6">加载中...</div>
                }>
                <ArtistsPage />
              </Suspense>
            ),
          },
          {
            path: "playlists",
            element: (
              <Suspense
                fallback={
                  <div className="flex-auto flex flex-col p-6">加载中...</div>
                }>
                <PlaylistsPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/albums/:id",
        element: (
          <DetailLayout>
            <Suspense
              fallback={
                <div className="flex-auto flex flex-col p-6">加载中...</div>
              }>
              <AlbumsDetailPage />
            </Suspense>
          </DetailLayout>
        ),
      },
      {
        path: "/playlists/:id",
        element: (
          <DetailLayout>
            <Suspense
              fallback={
                <div className="flex-auto flex flex-col p-6">加载中...</div>
              }>
              <PlaylistsDetailPage />
            </Suspense>
          </DetailLayout>
        ),
      },
      {
        path: "/artists/:id",
        element: (
          <DetailLayout>
            <Suspense
              fallback={
                <div className="flex-auto flex flex-col p-6">加载中...</div>
              }>
              <ArtistsDetailPage />
            </Suspense>
          </DetailLayout>
        ),
      },
      {
        path: "share/song/:id",
        element: (
          <Suspense
            fallback={
              <div className="flex-auto flex flex-col p-6">加载中...</div>
            }>
            <ShareSongPage />
          </Suspense>
        ),
      }
    ],
  },
]);
