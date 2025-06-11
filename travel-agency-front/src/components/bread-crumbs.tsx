import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

const Breadrumbs = ({ title }: { title?: string }) => {
  return (
    <section className="bg-gray-50 py-4 px-6">
      <Breadcrumb>
        <BreadcrumbList className="text-sm text-gray-600">
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="inline-flex items-center gap-1 hover:text-blue-500 text-blue-900 hover:underline"
            >
              <Home size={16} /> Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink
              href="/research"
              className="capitalize hover:underline hover:text-blue-500 text-blue-900"
            >
              Research
            </BreadcrumbLink>
          </BreadcrumbItem>

          {title && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="capitalize font-medium text-gray-800">
                  {title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </section>
  );
};

export default Breadrumbs;
