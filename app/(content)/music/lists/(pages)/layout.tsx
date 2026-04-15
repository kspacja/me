import pageLayout from "components/PagesLayout";
import { createBreadcrumbLD } from "app/json-ld";

const InnerLayout = pageLayout("/music/lists");

const breadcrumbLD = createBreadcrumbLD([
  { name: "Home", path: "/" },
  { name: "Music", path: "/music" },
  { name: "Music Lists", path: "/music/lists" },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />
      <InnerLayout>{children}</InnerLayout>
    </>
  );
}
